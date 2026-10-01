import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@/components/BrandIcon';
import { MainStackParamList } from '../../navigation/MainStackNavigator';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize } from '../../constants/typography';
import { Radius } from '../../constants/spacing';
import { PurchaseDeliverySource, createJobFromPurchase } from '../../lib/servicesApi';

type NavProp = NativeStackNavigationProp<MainStackParamList>;

/**
 * "Get delivery quotes" for a car the user has bought — a won auction or an
 * accepted retail offer. Posts a TradeXchange delivery job pre-filled by the
 * backend (pickup = seller postcode, vehicle = the listing) and opens it.
 * Mirrors web's ArrangeDelivery: the only thing asked for is the destination.
 *
 * Eligibility (accepted offer, right buyer, sold state, service switched on) is
 * decided by POST /services/jobs/from-purchase, not here — a refusal comes back
 * as a readable message and is shown in the sheet.
 *
 * This is the TradeXchange open-market path and sits alongside, not instead of,
 * the legacy ask-the-seller delivery request.
 */
export const ArrangeDeliveryButton: React.FC<PurchaseDeliverySource & { label?: string }> = ({
  label = 'Get delivery quotes',
  ...source
}) => {
  const navigation = useNavigation<NavProp>();
  const [open, setOpen] = useState(false);
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const close = () => {
    if (busy) return;
    setOpen(false);
    setError(null);
  };

  const submit = async () => {
    if (!postcode.trim()) return setError('Enter the delivery postcode.');
    setBusy(true);
    setError(null);
    try {
      const job = await createJobFromPurchase({
        ...source,
        deliveryPostcode: postcode.trim(),
        deliveryAddress: address.trim() || undefined,
      } as PurchaseDeliverySource & { deliveryPostcode: string; deliveryAddress?: string });
      setOpen(false);
      navigation.navigate('CustomerServiceJobDetail', { jobId: job.id });
    } catch (err: any) {
      setError(err?.message || 'Could not create the delivery job.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.trigger}
        activeOpacity={0.85}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        <Ionicons name="car-outline" size={16} color={Colors.infoBlueLight} />
        <Text style={styles.triggerText}>{label}</Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="slide" onRequestClose={close} statusBarTranslucent>
        <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <TouchableWithoutFeedback onPress={close}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
          <View style={styles.sheet}>
            <Text style={styles.title}>Arrange delivery</Text>
            <Text style={styles.sub}>
              Approved transporters quote the route. You pay CarMazium, and the driver is paid after delivery.
            </Text>

            <Text style={styles.label}>Deliver to postcode</Text>
            <TextInput
              style={[styles.input, styles.mono]}
              value={postcode}
              onChangeText={setPostcode}
              placeholder="BS1 4DJ"
              placeholderTextColor={Colors.textMuted}
              autoCapitalize="characters"
              autoCorrect={false}
              maxLength={10}
              accessibilityLabel="Delivery postcode"
            />

            <Text style={styles.label}>Delivery address (optional)</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholderTextColor={Colors.textMuted}
              maxLength={300}
              accessibilityLabel="Delivery address"
            />

            {error ? <Text style={styles.error} accessibilityRole="alert">{error}</Text> : null}

            <TouchableOpacity style={[styles.submit, busy && { opacity: 0.6 }]} onPress={submit} disabled={busy} activeOpacity={0.85}>
              {busy ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.submitText}>POST DELIVERY JOB</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={close} disabled={busy} style={styles.cancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: Radius.inline,
    borderWidth: 1,
    borderColor: Colors.infoBlueAlpha10,
    backgroundColor: Colors.infoBlueAlpha10,
  },
  triggerText: { fontFamily: FontFamily.bold, fontSize: FontSize.sm, color: Colors.infoBlueLight },
  fill: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: Colors.blackAlpha75 },
  sheet: {
    backgroundColor: Colors.bgSecondaryAlt,
    borderTopLeftRadius: Radius.sheet,
    borderTopRightRadius: Radius.sheet,
    padding: 20,
    paddingBottom: 32,
    gap: 8,
  },
  title: { fontFamily: FontFamily.bold, fontSize: FontSize.lg, color: Colors.white },
  sub: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textMuted, lineHeight: 19, marginBottom: 6 },
  label: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 6,
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
  mono: { fontFamily: FontFamily.monoRegular, textTransform: 'uppercase' },
  error: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.error, marginTop: 4 },
  submit: {
    marginTop: 10,
    backgroundColor: Colors.accent,
    borderRadius: Radius.inline,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitText: { fontFamily: FontFamily.bold, fontSize: FontSize.base, color: Colors.white, letterSpacing: 0.6 },
  cancel: { alignItems: 'center', paddingVertical: 10 },
  cancelText: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.textMuted },
});
