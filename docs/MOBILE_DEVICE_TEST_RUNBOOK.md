# Mobile TradeXchange — connected-device test runbook

For a Claude Code session running **on the build machine** (`C:\ca\carmazium\`, which has the JDK and
Android SDK) with a physical Android phone attached over USB. Companion to
`MOBILE_TRADEXCHANGE_TEST_CHECKLIST.md` (what to check) — this file is **how to run it safely**.

## 0. The environment is PRODUCTION — read first
`.env` and every `eas.json` profile point at the live API (`carmazium-hjoh9w.fly.dev`), the live Supabase
project and a **live Stripe key (`pk_live_…`)**. There is no staging build. So:

- **Never press ACCEPT & PAY, or enter any card.** Stop at the Stripe hand-off. That means the PAID →
  IN_PROGRESS → COMPLETED → RELEASED states, delivery-from-purchase and the review flow **cannot be tested
  here**. Record them as *untested on production*, not as passed.
- **Do not submit a finance or warranty enquiry.** It shares the customer's contact details with up to five
  real approved providers. Test the form up to validation errors only.
- **Do not create accounts.** Use only the two test accounts the owner provides.
- **Never type, read out or store a password.** The owner signs each account in on the phone; the session
  drives the app only after sign-in. (The sign-in screen is a live production sign-in, not a local dev host.)
- **Test jobs must be obviously fake and short-lived.** Title them `ZZ-TEST <date> <n>`, and **cancel every
  one before finishing** (customer → job → "Cancel service request"; it is only possible while OPEN).
- **Keep real providers out of it.** Before posting, make the test provider the only match: give it a job
  postcode area almost nobody covers (e.g. `ZE`, Shetland) in Matching, then use `ZE1 0AA` → `ZE2 9AA` as the
  route. After posting, the job screen shows "N verified providers currently match" — **if N is more than 1,
  cancel immediately**.
- Any step that would affect real users or money: **stop and ask the owner.**

## 1. Prerequisites (build machine)
```cmd
cd "C:\ca\carmazium\carmazium app\carmazium app"
git pull
npm install
```
`@react-native-community/netinfo` and `expo-location` are declared dependencies; `npm install` provides them.
Phone: Developer options → USB debugging on → plug in → accept the RSA prompt.
```cmd
adb devices            :: must list the phone as "device" (not "unauthorized")
```

## 2. Build and run (dev client — one native build, then hot reload)
```cmd
npx expo prebuild --clean --platform android
npx expo run:android   :: builds a debug APK, installs it, launches it connected to Metro
npm start              :: later sessions: just this; open the installed dev-client app
```
JS/TSX edits hot-reload; rebuild only after a native/`app.json`/dependency change. `.env` is loaded
automatically. If the build fails at SDK resolution, `ANDROID_HOME` is not set for that shell.

## 3. Driving the device with adb
No password entry. Everything else is allowed on the test accounts.
```cmd
adb exec-out screencap -p > shot.png                       :: look at the screen
adb shell uiautomator dump /sdcard/ui.xml && adb pull /sdcard/ui.xml   :: element text + bounds
adb shell input tap X Y                                    :: tap the centre of a bounds="[x1,y1][x2,y2]"
adb shell input swipe X1 Y1 X2 Y2 300                      :: scroll
adb shell input text "ZZ-TEST%s1"                          :: %s is a space; no passwords
adb shell input keyevent 4                                 :: Back      (66 = Enter, 111 = Esc)
adb shell dumpsys input_method | findstr mInputShown       :: is the keyboard up?
adb logcat -c && adb logcat *:E ReactNativeJS:V            :: JS errors / red-box causes
```
Prefer `uiautomator dump` over guessing coordinates. **Keyboard-cover test:** focus a field near the
bottom, screenshot with the keyboard up, and compare the field's `bounds` with the top of the keyboard
(`mInputShown=true`; keyboard height ≈ the bottom ~40 % of the screen). The field must sit fully above it.

## 4. What to run (production-safe subset)
Account **C** = customer test account, **P** = approved provider test account. The owner signs each in.

| # | Flow (checklist ref) | Steps | Pass if |
|---|---|---|---|
| R1 | Home entry (1.1–1.3) | As C: Home → TradeXchange chip, then the row | Both open Services; four cards only |
| R2 | Hub kill switches (2.3) | Open Services | Four tappable cards (note any greyed) |
| R3 | Post job keyboard (9.1) | Delivery form: focus Notes and Year | Field never hidden by the keyboard |
| R4 | Post delivery job (3.1–3.5) | Empty submit → errors; then valid `ZZ-TEST` job on the `ZE` route | Validation messages, then 201 and job detail |
| R5 | List freshness (9.3) | Back to My Service Jobs | New job is **already listed** without pulling |
| R6 | Eligible providers (§0) | Read "N verified providers match" | N = 1, else cancel now |
| R7 | Provider quote taps (9.4) | As P: open the job, type a price, tap SEND QUOTE **with the keyboard open** | Sends on the first tap |
| R8 | Amount parsing (9.5, 9.6) | Prices `1,200`, `0.50`, `60000` | £1,200.00 accepted; clear errors for the others |
| R9 | No blanking (9.7) | Send, update, withdraw a quote | Screen stays; text and scroll kept; banner shows |
| R10 | Feed freshness (9.8) | P: back to Available | Row shows the quote without pulling |
| R11 | Live quote on customer (9.9) | C has the job open while P quotes | Quote appears within ~15 s |
| R12 | Provider keyboard sweep | P: Partner Account (business fields), Verification (label/issuer fields), Matching (postcode areas), Lead detail | Each field visible above the keyboard; buttons work on the first tap |
| R13 | Foreground refresh | P: Partner Account, start typing in Business name, switch to another app for 10 s, return | Typed text is **kept** |
| R14 | Enquiry forms (4.1, 4.2) | Open finance form; **do not consent or submit**; trigger each validation error | Errors only; nothing sent |
| R15 | Dealer menu (7.1–7.4) | With a dealer test account if available | Entries match permissions |
| R16 | Cancel & clean up | C: cancel every `ZZ-TEST` job | Status CANCELLED; list shows none OPEN |
| R17 | Offline (9.14) | Airplane mode 30 s on a job screen, then back | No error banner; refreshes after |

Record **pass / fail / untestable-on-production** for each, with a screenshot and the `logcat` excerpt for any
failure. Do not mark anything `VERIFIED` in `docs/parity/` — the owner does that.

## 5. Report back
List each failure with: screen, exact steps, expected vs actual, screenshot, log line, and the suspected
file. Commit fixes on a branch, not `main`, unless the owner says otherwise.
