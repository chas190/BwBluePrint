import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Property, useStageData } from '@/context/StageDataContext';
import { getPropertyImage } from '@/lib/images';
import { useColors } from '@/hooks/useColors';

const filters = ['All', 'Upcoming', 'Active', 'Staged'];

function PropertyRow({ property }: { property: Property }) {
  const colors = useColors();
  const router = useRouter();
  const remaining = property.tasks.filter((task) => !task.done).length;
  return <Pressable onPress={() => router.push(`/property/${property.id}`)} style={({ pressed }) => [styles.row, { borderColor: colors.border, backgroundColor: colors.card }, pressed && { opacity: 0.86 }]}>
    <Image source={getPropertyImage(property.image)} style={styles.rowImage} />
    <View style={styles.rowCopy}>
      <View style={styles.rowTop}><Text style={[styles.rowTitle, { color: colors.foreground }]}>{property.address}</Text><Feather name="chevron-right" size={17} color={colors.mutedForeground} /></View>
      <Text style={[styles.rowMeta, { color: colors.mutedForeground }]}>{property.type} · {property.stagingDate.replace(', 2025', '')}</Text>
      <View style={styles.rowBottom}><Text style={[styles.agent, { color: colors.mutedForeground }]}><Feather name="user" size={11} color={colors.mutedForeground} /> {property.agent}</Text><View style={[styles.statusPill, { backgroundColor: property.status === 'Staged' ? colors.accent : colors.secondary }]}><Text style={[styles.statusText, { color: colors.primary }]}>{property.status}</Text></View></View>
      <Text style={[styles.openTasks, { color: colors.primary }]}>{remaining} open tasks</Text>
    </View>
  </Pressable>;
}

export default function PropertiesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { properties } = useStageData();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const filtered = useMemo(() => properties.filter((property) => (filter === 'All' || property.status === filter) && `${property.address} ${property.agent}`.toLowerCase().includes(query.toLowerCase())), [filter, properties, query]);
  return <View style={[styles.screen, { backgroundColor: colors.background, paddingTop: insets.top + 18 }]}>
    <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 110 }} showsVerticalScrollIndicator={false}>
      <View style={styles.header}><View><Text style={[styles.kicker, { color: colors.primary }]}>YOUR PIPELINE</Text><Text style={[styles.title, { color: colors.foreground }]}>Properties</Text><Text style={[styles.subtitle, { color: colors.mutedForeground }]}>{properties.length} homes in your staging calendar</Text></View><Pressable onPress={() => router.push('/property/new')} style={[styles.addButton, { backgroundColor: colors.primary }]}><Feather name="plus" size={20} color={colors.primaryForeground} /></Pressable></View>
      <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.border }]}><Feather name="search" size={17} color={colors.mutedForeground} /><TextInput value={query} onChangeText={setQuery} placeholder="Search properties, agents..." placeholderTextColor={colors.mutedForeground} style={[styles.searchInput, { color: colors.foreground }]} /></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>{filters.map((item) => <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filter, { backgroundColor: filter === item ? colors.primary : colors.card, borderColor: filter === item ? colors.primary : colors.border }]}><Text style={[styles.filterText, { color: filter === item ? colors.primaryForeground : colors.mutedForeground }]}>{item}</Text></Pressable>)}</ScrollView>
      <View style={styles.list}>{filtered.map((property) => <PropertyRow key={property.id} property={property} />)}</View>
      {!filtered.length && <View style={styles.empty}><Feather name="home" size={28} color={colors.mutedForeground} /><Text style={[styles.emptyTitle, { color: colors.foreground }]}>No properties found</Text><Text style={[styles.emptyText, { color: colors.mutedForeground }]}>Try a different search or add a new property.</Text></View>}
    </ScrollView>
    <Pressable testID="add-property" onPress={() => router.push('/property/new')} style={({ pressed }) => [styles.fab, { backgroundColor: colors.primary }, pressed && { transform: [{ scale: 0.94 }] }]}><Feather name="plus" size={24} color={colors.primaryForeground} /></Pressable>
  </View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 22 },
  kicker: { fontSize: 11, letterSpacing: 1.8, fontWeight: '700', marginBottom: 8 },
  title: { fontSize: 30, fontWeight: '700', letterSpacing: -0.7 },
  subtitle: { fontSize: 13, marginTop: 5 },
  addButton: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  searchBox: { height: 48, borderWidth: 1, borderRadius: 14, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 9 },
  searchInput: { flex: 1, fontSize: 13 },
  filters: { gap: 8, paddingVertical: 16 },
  filter: { borderWidth: 1, paddingHorizontal: 15, paddingVertical: 8, borderRadius: 99 },
  filterText: { fontSize: 12, fontWeight: '700' },
  list: { gap: 10 },
  row: { padding: 10, borderWidth: 1, borderRadius: 18, flexDirection: 'row', gap: 12 },
  rowImage: { width: 84, height: 100, borderRadius: 13 },
  rowCopy: { flex: 1, paddingVertical: 2, gap: 5 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowTitle: { fontSize: 15, fontWeight: '700', flex: 1 },
  rowMeta: { fontSize: 11 },
  rowBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 3 },
  agent: { fontSize: 11 },
  statusPill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 7 },
  statusText: { fontSize: 10, fontWeight: '700' },
  openTasks: { fontSize: 11, fontWeight: '600', marginTop: 3 },
  fab: { position: 'absolute', right: 22, bottom: 95, width: 56, height: 56, borderRadius: 20, alignItems: 'center', justifyContent: 'center', elevation: 4 },
  empty: { alignItems: 'center', paddingTop: 70, gap: 8 },
  emptyTitle: { fontSize: 17, fontWeight: '700' },
  emptyText: { fontSize: 13, textAlign: 'center' },
});
