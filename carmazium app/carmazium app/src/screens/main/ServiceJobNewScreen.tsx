import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@/components/BrandIcon';
import { MainStackParamList } from '../../navigation/MainStackNavigator';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize } from '../../constants/typography';
import { CreateServiceJobInput, createServiceJob } from '../../lib/servicesApi';
import {
  ChoiceRow,
  Field,
  FormError,
  FormSection,
  InfoNote,
  ServiceFormShell,
  SubmitButton,
} from '../../components/services/ServiceForm';

type Props = NativeStackScreenProps<MainStackParamList, 'ServiceJobNew'>;

interface VehicleDraft {
  registration: string;
  make: string;
  model: string;
  year: string;
  notes: string;
}

const EMPTY_VEHICLE: VehicleDraft = { registration: '', make: '', model: '', year: '', notes: '' };
const MAX_VEHICLES = 12;

/**
 * Parses the optional "on or after" date. Returns undefined for blank (= as soon
 * as possible), null when the text is not a real, non-past YYYY-MM-DD date.
 * There is no date-picker dependency in this app, so the field is typed text.
 */
function parseRequestedFor(text: string): string | undefined | null {
  const t = text.trim();
  if (!t) return undefined;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(t)) return null;
  const d = new Date(`${t}T09:00:00`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== t) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (d.getTime() < today.getTime()) return null;
  return d.toISOString();
}

const yearOf = (v: string): number | undefined => {
  const n = Number(v);
  return v.trim() && Number.isInteger(n) ? n : undefined;
};

export const ServiceJobNewScreen: React.FC<Props> = ({ navigation, route }) => {
  const serviceType = route.params?.serviceType ?? 'DELIVERY';
  const isDelivery = serviceType === 'DELIVERY';

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isRecovery, setIsRecovery] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pickupPostcode, setPickupPostcode] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryPostcode, setDeliveryPostcode] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [servicePostcode, setServicePostcode] = useState('');
  const [serviceAddress, setServiceAddress] = useState('');
  const [requestedFor, setRequestedFor] = useState('');
  const [vehicles, setVehicles] = useState<VehicleDraft[]>([{ ...EMPTY_VEHICLE }]);

  const setVehicle = (i: number, patch: Partial<VehicleDraft>) =>
    setVehicles((vs) => vs.map((v, idx) => (idx === i ? { ...v, ...patch } : v)));

  const submit = async () => {
    setError(null);
    const when = parseRequestedFor(requestedFor);
    if (when === null) return setError('Enter the date as YYYY-MM-DD, today or later — or leave it blank for as soon as possible.');

    const hasVehicle = (v: VehicleDraft) => v.registration.trim() || (v.make.trim() && v.model.trim());

    let input: CreateServiceJobInput;
    if (isDelivery) {
      if (!title.trim()) return setError('Give the job a short title, e.g. "BMW 3 Series, Leeds to Bristol".');
      if (!pickupPostcode.trim() || !deliveryPostcode.trim()) return setError('Both postcodes are needed to quote the route.');
      if (vehicles.some((v) => !hasVehicle(v))) return setError('Each vehicle needs a registration, or a make and model.');
      input = {
        serviceType: 'DELIVERY',
        isRecovery,
        title: title.trim(),
        description: description.trim() || undefined,
        pickupPostcode: pickupPostcode.trim(),
        pickupAddress: pickupAddress.trim() || undefined,
        deliveryPostcode: deliveryPostcode.trim(),
        deliveryAddress: deliveryAddress.trim() || undefined,
        requestedFor: when,
        vehicles: vehicles.map((v) => ({
          registration: v.registration.trim() || undefined,
          make: v.make.trim() || undefined,
          model: v.model.trim() || undefined,
          year: yearOf(v.year),
          notes: v.notes.trim() || undefined,
        })),
      };
    } else {
      const v = vehicles[0];
      if (!servicePostcode.trim()) return setError('Enter the postcode where the vehicle can be inspected.');
      if (!hasVehicle(v)) return setError('Enter the registration, or the vehicle make and model.');
      input = {
        serviceType: 'INSPECTION',
        title: title.trim() || 'Vehicle inspection',
        description: description.trim() || undefined,
        servicePostcode: servicePostcode.trim(),
        serviceAddress: serviceAddress.trim() || undefined,
        requestedFor: when,
        vehicles: [{
          registration: v.registration.trim().toUpperCase().replace(/\s+/g, '') || undefined,
          make: v.make.trim() || undefined,
          model: v.model.trim() || undefined,
          year: yearOf(v.year),
          notes: description.trim() || undefined,
        }],
      };
    }

    setBusy(true);
    try {
      const job = await createServiceJob(input);
      // replace, not navigate: back from the job should not return to a filled form.
      navigation.replace('CustomerServiceJobDetail', { jobId: job.id });
    } catch (err: any) {
      setError(err?.message || 'Could not post the job. Please try again.');
      setBusy(false);
    }
  };

  return (
    <ServiceFormShell
      title={isDelivery ? 'Post a delivery job' : 'Request an inspection'}
      subtitle={isDelivery ? 'Delivery, collection & recovery' : 'One request, one vehicle'}
      onBack={() => navigation.goBack()}
    >
      <FormError message={error} />

      {isDelivery ? (
        <>
          <FormSection title="What kind of move">
            <ChoiceRow
              value={isRecovery}
              onChange={setIsRecovery}
              options={[
                { value: false, label: 'Delivery / Collection', hint: 'The car runs and drives.' },
                { value: true, label: 'Recovery', hint: 'Non-runner, damaged or no keys. Needs a flatbed.' },
              ]}
            />
            <Field label="Job title" value={title} onChangeText={setTitle} maxLength={120} placeholder="BMW 3 Series, Leeds to Bristol" />
          </FormSection>

          <FormSection title="Route">
            <Field label="Pickup postcode" mono value={pickupPostcode} onChangeText={setPickupPostcode} maxLength={10} autoCapitalize="characters" placeholder="LS1 4AP" />
            <Field label="Pickup address (optional)" hint="Shown only to the provider you choose." value={pickupAddress} onChangeText={setPickupAddress} maxLength={300} />
            <Field label="Delivery postcode" mono value={deliveryPostcode} onChangeText={setDeliveryPostcode} maxLength={10} autoCapitalize="characters" placeholder="BS1 4DJ" />
            <Field label="Delivery address (optional)" value={deliveryAddress} onChangeText={setDeliveryAddress} maxLength={300} />
          </FormSection>
        </>
      ) : (
        <FormSection title="Where">
          <Field label="Job title (optional)" value={title} onChangeText={setTitle} maxLength={120} placeholder="Vehicle inspection" />
          <Field label="Inspection postcode" mono value={servicePostcode} onChangeText={setServicePostcode} maxLength={10} autoCapitalize="characters" placeholder="B19 1ES" />
          <Field label="Address / location details (optional)" value={serviceAddress} onChangeText={setServiceAddress} maxLength={300} placeholder="Dealer name, street or collection point" />
        </FormSection>
      )}

      <FormSection title="When">
        <Field
          label="On or after (optional)"
          value={requestedFor}
          onChangeText={setRequestedFor}
          maxLength={10}
          keyboardType="numbers-and-punctuation"
          placeholder="YYYY-MM-DD — blank means as soon as possible"
        />
      </FormSection>

      <FormSection title={isDelivery ? `Vehicles (${vehicles.length})` : 'Vehicle'}>
        {vehicles.map((v, i) => (
          <View key={i} style={styles.vehicle}>
            <Field label="Registration" mono value={v.registration} onChangeText={(t) => setVehicle(i, { registration: t })} maxLength={10} autoCapitalize="characters" placeholder="AB12 CDE" />
            <View style={styles.row}>
              <View style={styles.half}><Field label="Make" value={v.make} onChangeText={(t) => setVehicle(i, { make: t })} maxLength={60} /></View>
              <View style={styles.half}><Field label="Model" value={v.model} onChangeText={(t) => setVehicle(i, { model: t })} maxLength={60} /></View>
            </View>
            <Field label="Year" value={v.year} onChangeText={(t) => setVehicle(i, { year: t.replace(/\D/g, '') })} keyboardType="number-pad" maxLength={4} />
            {isDelivery ? (
              <Field label="Notes" value={v.notes} onChangeText={(t) => setVehicle(i, { notes: t })} maxLength={300} placeholder='"no keys", "low clearance", "flat tyre"' />
            ) : null}
            {isDelivery && vehicles.length > 1 ? (
              <TouchableOpacity style={styles.removeBtn} onPress={() => setVehicles((vs) => vs.filter((_, idx) => idx !== i))} accessibilityRole="button">
                <Ionicons name="trash-outline" size={15} color={Colors.textMuted} />
                <Text style={styles.removeText}>Remove vehicle</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ))}
        {isDelivery && vehicles.length < MAX_VEHICLES ? (
          <TouchableOpacity style={styles.addBtn} onPress={() => setVehicles((vs) => [...vs, { ...EMPTY_VEHICLE }])} accessibilityRole="button">
            <Ionicons name="add" size={16} color={Colors.accent} />
            <Text style={styles.addText}>Add another vehicle</Text>
          </TouchableOpacity>
        ) : null}
      </FormSection>

      <FormSection title={isDelivery ? 'Anything else (optional)' : 'What do you want checked?'}>
        <Field
          label={isDelivery ? 'Notes for the provider' : 'Inspection notes'}
          value={description}
          onChangeText={setDescription}
          maxLength={2000}
          multiline
          placeholder={isDelivery
            ? 'Access restrictions, contact windows, whether the V5 travels with the car…'
            : 'Known faults, areas of concern, diagnostic scan, underside check, road test…'}
        />
      </FormSection>

      <InfoNote>
        {isDelivery
          ? 'Your job stays open for 7 days. Approved providers see the route and vehicles and compete with quotes — not your name, phone or full address.'
          : 'The provider quotes a fixed price. If you accept, payment is made through CarMazium and the provider share is released after completion.'}
      </InfoNote>

      <SubmitButton label={isDelivery ? 'POST JOB' : 'POST INSPECTION REQUEST'} busy={busy} onPress={submit} />
    </ServiceFormShell>
  );
};

const styles = StyleSheet.create({
  vehicle: { gap: 12, paddingBottom: 6 },
  row: { flexDirection: 'row', gap: 10 },
  half: { flex: 1 },
  addBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start' },
  addText: { fontFamily: FontFamily.bold, fontSize: FontSize.sm, color: Colors.accent },
  removeBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start' },
  removeText: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.textMuted },
});
