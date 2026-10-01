import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
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
import { SERVICE_LABELS, ServiceLead, getMyServiceLeadsPage } from '../../lib/servicesApi';
import { IconButton } from '../../components/IconButton';

type Props = NativeStackScreenProps<MainStackParamList, 'ServiceLeads'>;

export const leadVehicleText = (lead: ServiceLead) =>
  [lead.vehicleRegistration, lead.vehicleMake, lead.vehicleModel].filter(Boolean).join(' · ') || 'Vehicle enquiry';

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

export const ServiceLeadsScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [leads, setLeads] = useState<ServiceLead[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (mode: 'reset' | 'more' = 'reset') => {
    if (mode === 'more' && !nextCursor) return;
    mode === 'more' ? setLoadingMore(true) : setLoading(true);
    setError(null);
    try {
      const page = await getMyServiceLeadsPage(mode === 'more' ? nextCursor ?? undefined : undefined);
      setLeads((prev) => (mode === 'more' ? [...prev, ...page.items] : page.items));
      setNextCursor(page.nextCursor);
    } catch (err: any) {
      setError(err?.message || 'Could not load your enquiries.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  }, [nextCursor]);

  // Re-fetch on focus would be nicer, but replace() from the form lands on the
  // detail screen, not here — a mount load plus pull-to-refresh is enough.
  useEffect(() => { void load('reset'); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const refresh = useCallback(() => {
    setRefreshing(true);
    setNextCursor(null);
    void load('reset');
  }, [load]);

  const renderLead = useCallback(({ item }: { item: ServiceLead }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.82}
      onPress={() => navigation.navigate('ServiceLeadDetail', { leadId: item.id })}
    >
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.typeText}>{SERVICE_LABELS[item.serviceType]}</Text>
          <Text style={styles.title} numberOfLines={2}>{leadVehicleText(item)}</Text>
        </View>
        <View style={styles.pill}><Text style={styles.pillText}>{item.status}</Text></View>
      </View>
      <Text style={styles.meta}>
        Shared with {plural(item.recipientCount ?? 0, 'provider')} · {plural(item.responseCount ?? 0, 'response')} ·{' '}
        {new Date(item.createdAt).toLocaleDateString('en-GB')}
      </Text>
      <View style={styles.openRow}>
        <Text style={styles.openText}>VIEW ENQUIRY</Text>
        <Ionicons name="chevron-forward" size={15} color={Colors.accent} />
      </View>
    </TouchableOpacity>
  ), [navigation]);

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
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>My Enquiries</Text>
          <Text style={styles.headerSub}>Finance & warranty</Text>
        </View>
      </View>

      {loading && leads.length === 0 ? (
        <View style={styles.center}><ActivityIndicator color={Colors.accent} /></View>
      ) : error && leads.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="alert-circle-outline" size={32} color={Colors.accent} />
          <Text style={styles.emptyTitle}>Could not load enquiries</Text>
          <Text style={styles.emptyText}>{error}</Text>
          <TouchableOpacity style={styles.retry} onPress={() => void load('reset')}>
            <Text style={styles.retryText}>TRY AGAIN</Text>
          </TouchableOpacity>
        </View>
      ) : leads.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="chatbubbles-outline" size={34} color={Colors.textMuted} />
          <Text style={styles.emptyTitle}>No enquiries yet</Text>
          <Text style={styles.emptyText}>You have not submitted a finance or warranty enquiry yet.</Text>
        </View>
      ) : (
        <FlatList
          data={leads}
          keyExtractor={(item) => item.id}
          renderItem={renderLead}
          contentContainerStyle={styles.list}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={Colors.accent} />}
          onEndReached={() => nextCursor && !loadingMore && void load('more')}
          onEndReachedThreshold={0.35}
          ListFooterComponent={
            loadingMore
              ? <ActivityIndicator color={Colors.accent} style={{ marginVertical: 18 }} />
              : error
                ? <Text style={styles.inlineError}>{error}</Text>
                : null
          }
        />
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
  headerSub: { fontFamily: FontFamily.regular, fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 10 },
  list: { padding: 18, gap: 12, paddingBottom: 60 },
  card: {
    backgroundColor: Colors.bgSecondaryAlt,
    borderWidth: 1,
    borderColor: Colors.whiteAlpha08,
    borderRadius: Radius.card,
    padding: 16,
    gap: 10,
  },
  topRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  typeText: { fontFamily: FontFamily.bold, fontSize: FontSize.xs, color: Colors.accent, textTransform: 'uppercase' },
  title: { fontFamily: FontFamily.bold, fontSize: FontSize.md, color: Colors.white, marginTop: 3 },
  pill: { paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, backgroundColor: Colors.whiteAlpha06 },
  pillText: { fontFamily: FontFamily.bold, fontSize: 9, color: Colors.textSecondary },
  meta: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textMuted, lineHeight: 19 },
  openRow: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-end' },
  openText: { fontFamily: FontFamily.bold, fontSize: FontSize.xs, color: Colors.accent, letterSpacing: 0.6 },
  emptyTitle: { fontFamily: FontFamily.bold, fontSize: FontSize.md, color: Colors.white, textAlign: 'center' },
  emptyText: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textMuted, textAlign: 'center', lineHeight: 20 },
  retry: { marginTop: 6, paddingHorizontal: 18, paddingVertical: 11, borderRadius: Radius.inline, backgroundColor: Colors.accent },
  retryText: { fontFamily: FontFamily.bold, fontSize: FontSize.sm, color: Colors.white },
  inlineError: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.error, textAlign: 'center', marginVertical: 14 },
});
