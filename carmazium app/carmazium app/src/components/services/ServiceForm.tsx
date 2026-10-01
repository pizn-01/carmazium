import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@/components/BrandIcon';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize } from '../../constants/typography';
import { Radius } from '../../constants/spacing';
import { IconButton } from '../IconButton';

/**
 * Shared chrome for the TradeXchange customer forms (post a job, post an
 * enquiry). Two screens each hand-rolling the same header, field and submit
 * button is how the rest of the services surface drifted out of step.
 */

export const ServiceFormShell: React.FC<{
  title: string;
  subtitle?: string;
  onBack: () => void;
  children: React.ReactNode;
}> = ({ title, subtitle, onBack, children }) => {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.header}>
        <IconButton
          style={styles.headerButton}
          icon={<Ionicons name="chevron-back" size={19} color={Colors.white} />}
          onPress={onBack}
          accessibilityLabel="Go back"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>{title}</Text>
          {subtitle ? <Text style={styles.headerSub}>{subtitle}</Text> : null}
        </View>
      </View>
      <ScrollView
        contentContainerStyle={[styles.body, { paddingBottom: insets.bottom + 40 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionBody}>{children}</View>
  </View>
);

export const Field: React.FC<
  TextInputProps & { label: string; hint?: string; mono?: boolean }
> = ({ label, hint, mono, style, ...input }) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      {...input}
      accessibilityLabel={label}
      placeholderTextColor={Colors.textMuted}
      style={[styles.input, mono && styles.inputMono, input.multiline && styles.inputMulti, style]}
    />
    {hint ? <Text style={styles.hint}>{hint}</Text> : null}
  </View>
);

export function ChoiceRow<T extends string | number | boolean>({
  label,
  value,
  options,
  onChange,
}: {
  label?: string;
  value: T;
  options: { value: T; label: string; hint?: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <View style={styles.field}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.choiceWrap}>
        {options.map((o) => {
          const active = o.value === value;
          return (
            <TouchableOpacity
              key={String(o.value)}
              style={[styles.choice, active && styles.choiceActive]}
              activeOpacity={0.8}
              onPress={() => onChange(o.value)}
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
            >
              <Text style={[styles.choiceText, active && styles.choiceTextActive]}>{o.label}</Text>
              {o.hint ? <Text style={styles.choiceHint}>{o.hint}</Text> : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export const ConsentRow: React.FC<{
  value: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}> = ({ value, onChange, children }) => (
  <View style={styles.consent}>
    <Switch
      value={value}
      onValueChange={onChange}
      trackColor={{ false: Colors.whiteAlpha10, true: Colors.accent }}
      thumbColor={Colors.white}
    />
    <Text style={styles.consentText}>{children}</Text>
  </View>
);

export const FormError: React.FC<{ message: string | null }> = ({ message }) =>
  message ? (
    <View style={styles.error} accessibilityRole="alert">
      <Ionicons name="alert-circle-outline" size={17} color={Colors.error} />
      <Text style={styles.errorText}>{message}</Text>
    </View>
  ) : null;

export const InfoNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.note}>
    <Ionicons name="information-circle-outline" size={17} color={Colors.accentGreen} />
    <Text style={styles.noteText}>{children}</Text>
  </View>
);

export const SubmitButton: React.FC<{
  label: string;
  busy: boolean;
  onPress: () => void;
}> = ({ label, busy, onPress }) => (
  <TouchableOpacity
    style={[styles.submit, busy && { opacity: 0.6 }]}
    activeOpacity={0.85}
    onPress={onPress}
    disabled={busy}
    accessibilityRole="button"
  >
    {busy ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.submitText}>{label}</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.whiteAlpha08,
  },
  headerButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.whiteAlpha06,
    borderWidth: 1,
    borderColor: Colors.whiteAlpha10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontFamily: FontFamily.bold, fontSize: FontSize.lg, color: Colors.white },
  headerSub: { fontFamily: FontFamily.regular, fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  body: { padding: 18, gap: 18 },
  section: {
    backgroundColor: Colors.bgSecondaryAlt,
    borderWidth: 1,
    borderColor: Colors.whiteAlpha08,
    borderRadius: Radius.card,
    padding: 16,
    gap: 12,
  },
  sectionTitle: { fontFamily: FontFamily.bold, fontSize: FontSize.md, color: Colors.white },
  sectionBody: { gap: 12 },
  field: { gap: 6 },
  label: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  input: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    color: Colors.white,
    backgroundColor: Colors.whiteAlpha05,
    borderWidth: 1,
    borderColor: Colors.whiteAlpha10,
    borderRadius: Radius.inline,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  inputMono: { fontFamily: FontFamily.monoRegular, textTransform: 'uppercase' },
  inputMulti: { minHeight: 96, textAlignVertical: 'top' },
  hint: { fontFamily: FontFamily.regular, fontSize: FontSize.xs, color: Colors.textMuted },
  choiceWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  choice: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: Radius.inline,
    borderWidth: 1,
    borderColor: Colors.whiteAlpha10,
    backgroundColor: Colors.whiteAlpha05,
    flexGrow: 1,
  },
  choiceActive: { borderColor: Colors.accent, backgroundColor: Colors.accentAlpha10 },
  choiceText: { fontFamily: FontFamily.semiBold, fontSize: FontSize.sm, color: Colors.textSecondary },
  choiceTextActive: { color: Colors.white },
  choiceHint: { fontFamily: FontFamily.regular, fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  consent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: Radius.inline,
    borderWidth: 1,
    borderColor: Colors.whiteAlpha10,
    backgroundColor: Colors.whiteAlpha05,
  },
  consentText: { flex: 1, fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 19 },
  error: {
    flexDirection: 'row',
    gap: 9,
    alignItems: 'flex-start',
    padding: 14,
    borderRadius: Radius.inline,
    borderWidth: 1,
    borderColor: Colors.error,
    backgroundColor: Colors.errorAlpha10,
  },
  errorText: { flex: 1, fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.error },
  note: {
    flexDirection: 'row',
    gap: 9,
    alignItems: 'flex-start',
    padding: 14,
    borderRadius: Radius.inline,
    backgroundColor: Colors.successAlpha10,
  },
  noteText: { flex: 1, fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 19 },
  submit: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.inline,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: { fontFamily: FontFamily.bold, fontSize: FontSize.base, color: Colors.white, letterSpacing: 0.6 },
});
