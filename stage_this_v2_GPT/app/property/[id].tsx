import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useStageData } from '@/context/StageDataContext';
import { getPropertyImage } from '@/lib/images';

const tabs = ['Details', 'Rooms', 'Tasks', 'Photos'];

export default function PropertyDetailScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { properties, toggleTask, toggleRoom, addPhoto } = useStageData();
  const property = properties.find((item) => item.id === id);
  const [tab, setTab] = useState('Details');
  if (!property) return <View style={[styles.center, { backgroundColor: colors.background }]}><Text style={[styles.notFound, { color: colors.foreground }]}>Property not found</Text><Pressable onPress={() => router.back()}><Text style={[styles.backText, { color: colors.primary }]}>Go back</Text></Pressable></View>;
  const completedTasks = property.tasks.filter((task) => task.done).length;
  const completedRooms = property.rooms.filter((room) => room.done).length;
  return <View style={[styles.screen, { backgroundColor: colors.background }]}>
    <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 35 }} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}><Image source={getPropertyImage(property.image)} style={styles.heroImage} /><View style={styles.heroOverlay} /><Pressable onPress={() => router.back()} style={[styles.backButton, { top: insets.top + 12 }]}><Feather name="arrow-left" size={19} color={colors.foreground} /></Pressable><Pressable style={[styles.editButton, { top: insets.top + 12, backgroundColor: colors.card }]}><Feather name="edit-2" size={14} color={colors.primary} /><Text style={[styles.editText, { color: colors.primary }]}>Edit</Text></Pressable></View>
      <View style={styles.body}><View style={styles.propertyHeading}><View style={{ flex: 1 }}><View style={[styles.statusPill, { backgroundColor: colors.accent }]}><Text style={[styles.statusText, { color: colors.primary }]}>{property.status}</Text></View><Text style={[styles.title, { color: colors.foreground }]}>{property.address}</Text><Text style={[styles.location, { color: colors.mutedForeground }]}><Feather name="map-pin" size={12} color={colors.mutedForeground} /> {property.city}</Text></View><View style={styles.quickActions}><Pressable style={[styles.quickButton, { backgroundColor: colors.secondary }]}><Feather name="phone" size={17} color={colors.primary} /></Pressable><Pressable style={[styles.quickButton, { backgroundColor: colors.secondary }]}><Feather name="mail" size={17} color={colors.primary} /></Pressable></View></View>
        <View style={[styles.agentCard, { borderColor: colors.border, backgroundColor: colors.card }]}><View style={[styles.agentAvatar, { backgroundColor: colors.primary }]}><Text style={styles.agentInitials}>SJ</Text></View><View style={{ flex: 1 }}><Text style={[styles.agentName, { color: colors.foreground }]}>{property.agent}</Text><Text style={[styles.agentMeta, { color: colors.mutedForeground }]}>{property.brokerage}</Text></View><Feather name="calendar" size={18} color={colors.primary} /></View>
        <View style={[styles.tabRail, { borderBottomColor: colors.border }]}>{tabs.map((item) => <Pressable key={item} onPress={() => setTab(item)} style={[styles.tab, tab === item && { borderBottomColor: colors.primary }]}><Text style={[styles.tabText, { color: tab === item ? colors.primary : colors.mutedForeground }]}>{item}</Text></Pressable>)}</View>
        {tab === 'Details' && <View style={styles.details}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Property details</Text><View style={styles.detailGrid}>{[['Property type', property.type], ['Square footage', property.sqft], ['Bedrooms', property.beds], ['Bathrooms', property.baths], ['Staging date', property.stagingDate], ['Stairs', property.stairs ? 'Yes' : 'No']].map(([label, value]) => <View key={label} style={[styles.detailCell, { borderBottomColor: colors.border }]}><Text style={[styles.detailLabel, { color: colors.mutedForeground }]}>{label}</Text><Text style={[styles.detailValue, { color: colors.foreground }]}>{value}</Text></View>)}</View><Text style={[styles.sectionTitle, { color: colors.foreground, marginTop: 25 }]}>Notes</Text><Text style={[styles.notes, { color: colors.mutedForeground }]}>{property.notes || 'No notes added yet.'}</Text></View>}
        {tab === 'Rooms' && <View style={styles.details}><View style={styles.sectionHeader}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Rooms to stage</Text><Text style={[styles.progress, { color: colors.primary }]}>{completedRooms}/{property.rooms.length}</Text></View>{property.rooms.map((room) => <Pressable key={room.id} onPress={() => toggleRoom(property.id, room.id)} style={[styles.checkRow, { borderBottomColor: colors.border }]}><View style={[styles.checkbox, { backgroundColor: room.done ? colors.primary : colors.card, borderColor: room.done ? colors.primary : colors.border }]}>{room.done && <Feather name="check" size={14} color="#FFFFFF" />}</View><Text style={[styles.checkText, { color: room.done ? colors.mutedForeground : colors.foreground }, room.done && styles.strike]}>{room.name}</Text></Pressable>)}</View>}
        {tab === 'Tasks' && <View style={styles.details}><View style={styles.sectionHeader}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Staging checklist</Text><Text style={[styles.progress, { color: colors.primary }]}>{completedTasks}/{property.tasks.length}</Text></View>{property.tasks.map((task) => <Pressable key={task.id} onPress={() => toggleTask(property.id, task.id)} style={[styles.checkRow, { borderBottomColor: colors.border }]}><View style={[styles.checkbox, { backgroundColor: task.done ? colors.primary : colors.card, borderColor: task.done ? colors.primary : colors.border }]}>{task.done && <Feather name="check" size={14} color="#FFFFFF" />}</View><View><Text style={[styles.checkText, { color: task.done ? colors.mutedForeground : colors.foreground }, task.done && styles.strike]}>{task.title}</Text><Text style={[styles.taskSection, { color: colors.mutedForeground }]}>{task.section}</Text></View></Pressable>)}</View>}
        {tab === 'Photos' && <View style={styles.details}><View style={styles.sectionHeader}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Property photos</Text><Text style={[styles.progress, { color: colors.primary }]}>{property.photos} photos</Text></View><View style={styles.photoGrid}>{Array.from({ length: Math.max(property.photos, 3) }).map((_, index) => <Image key={index} source={getPropertyImage(index % 3 === 0 ? property.image : 'living')} style={styles.photo} />)}</View><Pressable onPress={() => addPhoto(property.id)} style={[styles.addPhoto, { borderColor: colors.primary }]}><Feather name="camera" size={17} color={colors.primary} /><Text style={[styles.addPhotoText, { color: colors.primary }]}>Add photos</Text></Pressable></View>}
      </View>
    </ScrollView>
  </View>;
}
const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  notFound: { fontSize: 18, fontWeight: '700' },
  backText: { fontSize: 14, fontWeight: '600' },
  hero: { height: 285, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.12)' },
  backButton: { position: 'absolute', left: 20, width: 38, height: 38, borderRadius: 13, backgroundColor: '#FFFCF6', alignItems: 'center', justifyContent: 'center' },
  editButton: { position: 'absolute', right: 20, borderRadius: 13, paddingHorizontal: 11, height: 38, flexDirection: 'row', alignItems: 'center', gap: 6 },
  editText: { fontSize: 12, fontWeight: '700' },
  body: { paddingHorizontal: 20, marginTop: -8 },
  propertyHeading: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  statusPill: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 7, marginBottom: 9 },
  statusText: { fontSize: 10, fontWeight: '700' },
  title: { fontSize: 25, fontWeight: '700', letterSpacing: -0.5 },
  location: { fontSize: 12, marginTop: 7 },
  quickActions: { flexDirection: 'row', gap: 8, paddingBottom: 2 },
  quickButton: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  agentCard: { marginTop: 18, borderWidth: 1, borderRadius: 16, padding: 11, flexDirection: 'row', alignItems: 'center', gap: 10 },
  agentAvatar: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  agentInitials: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  agentName: { fontSize: 13, fontWeight: '700' },
  agentMeta: { fontSize: 11, marginTop: 2 },
  tabRail: { flexDirection: 'row', borderBottomWidth: 1, marginTop: 24 },
  tab: { flex: 1, alignItems: 'center', paddingBottom: 12, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabText: { fontSize: 12, fontWeight: '700' },
  details: { paddingTop: 22 },
  sectionTitle: { fontSize: 17, fontWeight: '700' },
  detailGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 9 },
  detailCell: { width: '50%', paddingVertical: 13, borderBottomWidth: 1 },
  detailLabel: { fontSize: 10 },
  detailValue: { fontSize: 13, fontWeight: '600', marginTop: 4 },
  notes: { fontSize: 13, lineHeight: 20, marginTop: 9 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  progress: { fontSize: 12, fontWeight: '700' },
  checkRow: { flexDirection: 'row', gap: 11, alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1 },
  checkbox: { width: 22, height: 22, borderWidth: 1.5, borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  checkText: { fontSize: 13, fontWeight: '600' },
  strike: { textDecorationLine: 'line-through' },
  taskSection: { fontSize: 10, marginTop: 4 },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  photo: { width: '31.8%', height: 106, borderRadius: 12 },
  addPhoto: { height: 48, borderRadius: 13, borderWidth: 1, borderStyle: 'dashed', marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  addPhotoText: { fontSize: 13, fontWeight: '700' },
});
