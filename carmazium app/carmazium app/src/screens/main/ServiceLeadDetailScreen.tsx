import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@/components/BrandIcon';
import { MainStackParamList } from '../../navigation/MainStackNavigator';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize } from '../../constants/typography';
import { Radius } from '../../constants/spacing';
import {
  SERVICE_LABELS,
  ServiceLead,
  closeServiceLead,
  formatPence,
  getCustomerServiceLead,
} from '../../lib/servicesApi';
import { IconButton } from '../../components/IconButton';
import { leadVehicleText } from './ServiceLeadsScreen';
import { useAutoRefresh } from '../../hooks/useAutoRefresh';

type Props = NativeStackScreenProps<MainStackParamList, 'ServiceLeadDetail'>;

const Info: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

export const ServiceLeadDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { leadId } = route.params;
  const insets = useSafeAreaInsets();
  const [lead, setLead] = useState<ServiceLead | null>(null);
  const [loading, setLoading] = useState(true);
  const [closing, setClosing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) {
      setLoading(true);
      setError(null);
    }
    try {
      setLead(await getCustomerServiceLead(leadId));
    } catch (err: any) {
      if (!silent) setError(err?.message || 'Could not load this enquiry.');
    } finally {
      if (!silent) setLoading(false);
    }
  }, [leadId]);

  useEffect(() => { void load(); }, [load]);

  // Providers reply over time; keep an OPEN enquiry current without a manual pull.
  useAutoRefresh(() => load(true), { intervalMs: lead?.status === 'OPEN' ? 30_000 : null });

  const doClose = async () => {
    setClosing(true);
    setError(null);
    try {
      await closeServiceLead(leadId);
      await load(true);
    } catch (err: any) {
      setError(err?.message || 'Could not close this enquiry.');
    } finally {
      setClosing(false);
    }
  };

  const confirmClose = () =>
    Alert.alert('Close enquiry?', 'Matched providers will no longer be able to respond.', [
      { text: 'Keep open', style: 'cancel' },
      { text: 'Close enquiry', style: 'destructive', onPress: () => void doClose() },
    ]);

  const recipients = lead?.recipientCount ?? 0;
  const responses = lead?.responses ?? [];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.header}>
        <IconButton
          style={styles.headerButton}
          icon={<Ionicons name="chevron-back" size={19} color={Colors.white} />}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        />
        <Text style={styles.headerTitle}>Enquiry</Text>
      </View>

      {loading && !lead ? (
        <View style={styles.center}><ActivityIndicator color={Colors.accent} /></View>
      ) : !lead ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error || 'Enquiry not found'}</Text>
          <TouchableOpacity style={styles.primary} onPress={() => void load()}>
            <Text style={styles.primaryText}>TRY AGAIN</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={[styles.body, { paddingBottom: insets.bottom + 40 }]} showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.eyebrow}>{SERVICE_LABELS[lead.serviceType]}</Text>
            <Text style={styles.title}>{leadVehicleText(lead)}</Text>
            <Text style={styles.meta}>
              Status: {lead.status} · Shared with {recipients} matched provider{recipients === 1 ? '' : 's'} ·{' '}
              {responses.length || lead.responseCount || 0} response{(responses.length || lead.responseCount || 0) === 1 ? '' : 's'}
            </Text>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {lead.status === 'OPEN' ? (
            <TouchableOpacity style={styles.outline} onPress={confirmClose} disabled={closing} accessibilityRole="button">
              {closing ? <ActivityIndicator color={Colors.accent} /> : <Text style={styles.outlineText}>CLOSE ENQUIRY</Text>}
            </TouchableOpacity>
          ) : null}

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your request</Text>
            {lead.vehicleMileage != null && <Info label="Mileage" value={`${lead.vehicleMileage.toLocaleString('en-GB')} miles`} />}
            {lead.vehicleValuePence != null && <Info label="Vehicle value" value={formatPence(lead.vehicleValuePence)} />}
            {lead.depositPence != null && <Info label="Deposit" value={formatPence(lead.depositPence)} />}
            {lead.monthlyBudgetPence != null && <Info label="Monthly budget" value={formatPence(lead.monthlyBudgetPence)} />}
            {lead.termMonths != null && <Info label="Finance term" value={`${lead.termMonths} months`} />}
            {lead.warrantyMonths != null && <Info label="Warranty term" value={`${lead.warrantyMonths} months`} />}
            {lead.warrantyLevel ? <Info label="Warranty level" value={lead.warrantyLevel} /> : null}
            {lead.summary ? <Text style={styles.summary}>{lead.summary}</Text> : null}
          </View>

          <Text style={styles.sectionTitle}>Provider responses</Text>
          {responses.length === 0 ? (
            <View style={styles.card}>
              <Text style={styles.summary}>
                {recipients === 0
                  ? 'No approved provider is matched yet. CarMazium keeps checking for newly approved matching providers while this enquiry stays open.'
                  : 'No provider has replied yet. Your matched providers can respond while this enquiry stays open.'}
              </Text>
            </View>
          ) : (
            responses.map((r, i) => (
              <View key={r.id ?? String(i)} style={styles.card}>
                <View style={styles.respHead}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>{r.businessName || 'Approved provider'}</Text>
                    {r.rating != null ? (
                      <Text style={styles.meta}>★ {r.rating.toFixed(1)} ({r.totalReviews ?? 0})</Text>
                    ) : null}
                  </View>
                  {r.indicativePricePence != null ? (
                    <Text style={styles.price}>{formatPence(r.indicativePricePence)}</Text>
                  ) : null}
                </View>
                {r.headline ? <Text style={styles.headline}>{r.headline}</Text> : null}
                {r.productName ? <Text style={styles.summary}>Product: {r.productName}</Text> : null}
                {r.message ? <Text style={styles.summary}>{r.message}</Text> : null}
                <View style={styles.chips}>
                  {r.representativeApr != null ? <Text style={styles.chip}>Representative APR {r.representativeApr}%</Text> : null}
                  {r.termMonths != null ? <Text style={styles.chip}>{r.termMonths} months</Text> : null}
                  {r.serviceArea ? <Text style={styles.chip}>{r.serviceArea}</Text> : null}
                </View>
              </View>
            ))
          )}

          <Text style={styles.disclaimer}>
            Provider responses are supplied by the provider. For finance, any eligibility assessment, credit check and regulated
            disclosure is the provider's responsibility. For warranty, read the full policy wording, exclusions and claim limits
            before buying.
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

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
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 },
  body: { padding: 18, gap: 16 },
  eyebrow: { fontFamily: FontFamily.bold, fontSize: FontSize.xs, color: Colors.accent, textTransform: 'uppercase', letterSpacing: 0.8 },
  title: { fontFamily: FontFamily.bold, fontSize: FontSize.xl, color: Colors.white, marginTop: 4 },
  meta: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textMuted, marginTop: 6, lineHeight: 19 },
  card: {
    backgroundColor: Colors.bgSecondaryAlt,
    borderWidth: 1,
    borderColor: Colors.whiteAlpha08,
    borderRadius: Radius.card,
    padding: 16,
    gap: 10,
  },
  cardTitle: { fontFamily: FontFamily.bold, fontSize: FontSize.md, color: Colors.white },
  sectionTitle: { fontFamily: FontFamily.bold, fontSize: FontSize.lg, color: Colors.white, marginTop: 6 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.whiteAlpha08,
  },
  infoLabel: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textMuted },
  infoValue: { fontFamily: FontFamily.semiBold, fontSize: FontSize.sm, color: Colors.white, textAlign: 'right', flexShrink: 1 },
  summary: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20 },
  respHead: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  price: { fontFamily: FontFamily.mono, fontSize: FontSize.lg, color: Colors.accent },
  headline: { fontFamily: FontFamily.bold, fontSize: FontSize.base, color: Colors.white },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    backgroundColor: Colors.whiteAlpha06,
    borderRadius: Radius.chip,
    paddingHorizontal: 9,
    paddingVertical: 5,
    overflow: 'hidden',
  },
  disclaimer: { fontFamily: FontFamily.regular, fontSize: FontSize.xs, color: Colors.textMuted, lineHeight: 17 },
  errorText: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.error, textAlign: 'center' },
  primary: { paddingHorizontal: 18, paddingVertical: 11, borderRadius: Radius.inline, backgroundColor: Colors.accent },
  primaryText: { fontFamily: FontFamily.bold, fontSize: FontSize.sm, color: Colors.white },
  outline: {
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: Radius.inline,
    paddingVertical: 13,
    alignItems: 'center',
  },
  outlineText: { fontFamily: FontFamily.bold, fontSize: FontSize.sm, color: Colors.accent, letterSpacing: 0.6 },
});
