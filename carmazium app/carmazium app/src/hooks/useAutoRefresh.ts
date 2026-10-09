import { useCallback, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

/**
 * Keeps a screen's server data current without a manual pull-to-refresh.
 *
 * Why this exists: the TradeXchange job screens loaded once on mount and never
 * again. React Navigation keeps screens mounted underneath the stack, so a job
 * posted from a form never appeared in the list behind it, a quote sent from
 * the job screen never reached the feed, and a customer who paid in the browser
 * came back to a job still showing ACCEPTED. Stripe Checkout returns to the
 * website (backend success_url), not the app, so the app can only notice the
 * change when it comes back to the foreground.
 *
 * Refreshes when:
 *  - the screen regains focus (but not the first time — the screen's own mount
 *    effect already loads),
 *  - the app returns to the foreground while this screen is focused,
 *  - every `intervalMs` while focused and the app is active (optional).
 *
 * `refresh` should be silent: no full-screen spinner and no error banner on
 * failure, otherwise a background refresh would wipe a form the user is using.
 */
export function useAutoRefresh(
  refresh: () => void | Promise<unknown>,
  options: { intervalMs?: number | null } = {},
): void {
  const { intervalMs = null } = options;

  // Always call the latest closure without re-subscribing every render.
  const refreshRef = useRef(refresh);
  refreshRef.current = refresh;

  const firstFocus = useRef(true);
  const focused = useRef(false);

  const run = useCallback(() => {
    void Promise.resolve(refreshRef.current()).catch(() => undefined);
  }, []);

  useFocusEffect(
    useCallback(() => {
      focused.current = true;
      if (firstFocus.current) {
        firstFocus.current = false;
      } else {
        run();
      }

      const timer = intervalMs && intervalMs > 0
        ? setInterval(() => {
            if (AppState.currentState === 'active') run();
          }, intervalMs)
        : null;

      return () => {
        focused.current = false;
        if (timer) clearInterval(timer);
      };
    }, [intervalMs, run]),
  );

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active' && focused.current) run();
    });
    return () => sub.remove();
  }, [run]);
}
