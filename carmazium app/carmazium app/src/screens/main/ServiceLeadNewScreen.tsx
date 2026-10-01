import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStackNavigator';
import { CreateServiceLeadInput, createServiceLead } from '../../lib/servicesApi';
import {
  ChoiceRow,
  ConsentRow,
  Field,
  FormError,
  FormSection,
  InfoNote,
  ServiceFormShell,
  SubmitButton,
} from '../../components/services/ServiceForm';

type Props = NativeStackScreenProps<MainStackParamList, 'ServiceLeadNew'>;

const TERMS = ['24', '36', '48', '60', '72'];
const EMPLOYMENT = ['Employed', 'Self-employed', 'Retired', 'Other'];
const WARRANTY_MONTHS = ['3', '6', '12', '24', '36'];
const WARRANTY_LEVELS = ['Essential', 'Comprehensive', 'Premium', 'Not sure'];

// £ text → integer pence, or undefined when blank / not a number.
const pence = (v: string): number | undefined => {
  if (!v.trim()) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n * 100) : undefined;
};
const num = (v: string): number | undefined => {
  if (!v.trim()) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};

export const ServiceLeadNewScreen: React.FC<Props> = ({ navigation, route }) => {
  const type = route.params?.serviceType ?? 'FINANCE';
  const isFinance = type === 'FINANCE';

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);

  const [registration, setRegistration] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [value, setValue] = useState('');
  const [postcode, setPostcode] = useState('');
  const [phone, setPhone] = useState('');
  const [summary, setSummary] = useState('');
  const [deposit, setDeposit] = useState('');
  const [term, setTerm] = useState('48');
  const [monthlyBudget, setMonthlyBudget] = useState('');
  const [employment, setEmployment] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [warrantyMonths, setWarrantyMonths] = useState('12');
  const [warrantyLevel, setWarrantyLevel] = useState('Comprehensive');

  const submit = async () => {
    setError(null);
    if (!consent) return setError('Please confirm that approved providers may contact you about this enquiry.');
    if (!registration.trim() && !(make.trim() && model.trim())) {
      return setError('Enter the registration, or the vehicle make and model.');
    }
    if (isFinance) {
      if (!postcode.trim()) return setError('Enter the UK postcode for this finance enquiry.');
      if (!(Number(value) > 0)) return setError('Enter the approximate vehicle value.');
      if (!employment) return setError('Select your employment status.');
      if (!(Number(monthlyBudget) > 0) && !(Number(annualIncome) > 0)) {
        return setError('Enter either your monthly budget or annual income.');
      }
    }

    const input: CreateServiceLeadInput = {
      serviceType: type,
      vehicleRegistration: registration.trim() || undefined,
      vehicleMake: make.trim() || undefined,
      vehicleModel: model.trim() || undefined,
      vehicleYear: num(year),
      vehicleMileage: num(mileage),
      vehicleValuePence: pence(value),
      postcode: postcode.trim() || undefined,
      phone: phone.trim() || undefined,
      summary: summary.trim() || undefined,
      ...(isFinance
        ? {
            depositPence: pence(deposit),
            termMonths: num(term),
            monthlyBudgetPence: pence(monthlyBudget),
            employmentStatus: employment || undefined,
            annualIncomePence: pence(annualIncome),
          }
        : {
            warrantyMonths: num(warrantyMonths),
            warrantyLevel: warrantyLevel || undefined,
          }),
      consentToProviderContact: true,
    };

    setBusy(true);
    try {
      const lead = await createServiceLead(input);
      navigation.replace('ServiceLeadDetail', { leadId: lead.id });
    } catch (err: any) {
      setError(err?.message || 'Could not submit your enquiry.');
      setBusy(false);
    }
  };

  return (
    <ServiceFormShell
      title={isFinance ? 'Vehicle finance enquiry' : 'Warranty enquiry'}
      subtitle="Matched, approved providers respond to you"
      onBack={() => navigation.goBack()}
    >
      <FormError message={error} />

      <FormSection title="Vehicle">
        <Field label="Registration" mono value={registration} onChangeText={setRegistration} maxLength={10} autoCapitalize="characters" placeholder="AB12 CDE" />
        <View style={styles.row}>
          <View style={styles.half}><Field label="Make" value={make} onChangeText={setMake} placeholder="Toyota" /></View>
          <View style={styles.half}><Field label="Model" value={model} onChangeText={setModel} placeholder="Yaris" /></View>
        </View>
        <View style={styles.row}>
          <View style={styles.half}><Field label="Year" value={year} onChangeText={(t) => setYear(t.replace(/\D/g, ''))} keyboardType="number-pad" maxLength={4} /></View>
          <View style={styles.half}><Field label="Mileage" value={mileage} onChangeText={(t) => setMileage(t.replace(/\D/g, ''))} keyboardType="number-pad" /></View>
        </View>
        <Field label="Approx. vehicle value (£)" value={value} onChangeText={setValue} keyboardType="decimal-pad" placeholder="12000" />
      </FormSection>

      {isFinance ? (
        <FormSection title="What finance are you looking for?">
          <Field label="Deposit (£)" value={deposit} onChangeText={setDeposit} keyboardType="decimal-pad" />
          <ChoiceRow
            label="Preferred term"
            value={term}
            onChange={setTerm}
            options={TERMS.map((t) => ({ value: t, label: `${t} mo` }))}
          />
          <Field label="Monthly budget (£)" value={monthlyBudget} onChangeText={setMonthlyBudget} keyboardType="decimal-pad" />
          <ChoiceRow
            label="Employment status"
            value={employment}
            onChange={setEmployment}
            options={EMPLOYMENT.map((e) => ({ value: e, label: e }))}
          />
          <Field label="Annual income (£)" value={annualIncome} onChangeText={setAnnualIncome} keyboardType="decimal-pad" hint="Give a monthly budget, an annual income, or both." />
        </FormSection>
      ) : (
        <FormSection title="Cover preference">
          <ChoiceRow
            label="Warranty length"
            value={warrantyMonths}
            onChange={setWarrantyMonths}
            options={WARRANTY_MONTHS.map((m) => ({ value: m, label: `${m} mo` }))}
          />
          <ChoiceRow
            label="Cover level"
            value={warrantyLevel}
            onChange={setWarrantyLevel}
            options={WARRANTY_LEVELS.map((l) => ({ value: l, label: l }))}
          />
        </FormSection>
      )}

      <FormSection title="Contact & notes">
        <Field label="Postcode" mono value={postcode} onChangeText={setPostcode} maxLength={10} autoCapitalize="characters" placeholder="B19 1ES" />
        <Field label="Phone (optional)" value={phone} onChangeText={setPhone} keyboardType="phone-pad" hint="Your account phone is used if you leave this blank." />
        <Field label="Anything providers should know?" value={summary} onChangeText={setSummary} maxLength={2000} multiline />
      </FormSection>

      <ConsentRow value={consent} onChange={setConsent}>
        I agree that CarMazium may share this enquiry and my contact details with up to five matched, approved{' '}
        {isFinance ? 'vehicle finance' : 'warranty'} providers so they can respond to me.
      </ConsentRow>

      <InfoNote>
        Finance and warranty are matched enquiries. No CarMazium payment is taken — you deal directly with the provider you choose.
      </InfoNote>

      <SubmitButton label="SUBMIT ENQUIRY" busy={busy} onPress={submit} />
    </ServiceFormShell>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10 },
  half: { flex: 1 },
});
