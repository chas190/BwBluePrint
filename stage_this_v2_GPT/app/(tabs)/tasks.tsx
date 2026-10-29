import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useStageData } from '@/context/StageDataContext';

export default function TasksScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { properties, toggleTask } = useStageData();
  const openTasks = properties.flatMap((property) => property.tasks.map((task) => ({ ...task, property }))).filter(({ done }) => !done).slice(0, 8);
  return <ScrollView style={[styles.screen, { backgroundColor: colors.background }]} contentContainerStyle={{ paddingTop: insets.top + 18, paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
    <Text style={[styles.kicker, { color: colors.primary }]}>KEEP MOVING</Text>
    <Text style={[styles.title, { color: colors.foreground }]}>Open tasks</Text>
    <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>The small steps that make staging day smooth.</Text>
    <View style={[styles.progressCard, { backgroundColor: colors.primary }]}><View style={styles.progressTop}><View><Text style={styles.progressLabel}>This week</Text><Text style={styles.progressNumber}>{properties.reduce((sum, property) => sum + property.tasks.filter((task) => task.done).length, 0)} complete</Text></View><View style={styles.progressCircle}><Text style={styles.progressCircleText}>68%</Text></View></View><View style={styles.progressTrack}><View style={[styles.progressFill, { width: '68%' }]} /></View><Text style={styles.progressFoot}>{openTasks.length} items still on your radar</Text></View>
    <View style={styles.sectionHeader}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Next up</Text><Text style={[styles.sectionMeta, { color: colors.mutedForeground }]}>{openTasks.length} tasks</Text></View>
    {openTasks.map(({ property, ...task }) => <Pressable key={`${property.id}-${task.id}`} onPress={() => toggleTask(property.id, task.id)} style={[styles.taskRow, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.checkbox, { borderColor: colors.border }]}><View /></View><View style={styles.taskCopy}><Text style={[styles.taskTitle, { color: colors.foreground }]}>{task.title}</Text><Text style={[styles.taskProperty, { color: colors.mutedForeground }]}>{property.address} · {task.section}</Text></View><Feather name="chevron-right" size={17} color={colors.mutedForeground} /></Pressable>)}
  </ScrollView>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 20 },
  kicker: { fontSize: 11, letterSpacing: 1.8, fontWeight: '700', marginBottom: 8 },
  title: { fontSize: 30, fontWeight: '700', letterSpacing: -0.7 },
  subtitle: { fontSize: 13, marginTop: 5, marginBottom: 22 },
  progressCard: { borderRadius: 20, padding: 18, marginBottom: 26 },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressLabel: { color: '#B7D3C3', fontSize: 12, fontWeight: '600' },
  progressNumber: { color: '#FFFFFF', fontSize: 24, fontWeight: '700', marginTop: 4 },
  progressCircle: { width: 54, height: 54, borderRadius: 27, borderWidth: 3, borderColor: '#B7D3C3', alignItems: 'center', justifyContent: 'center' },
  progressCircleText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  progressTrack: { height: 7, backgroundColor: '#3B755F', borderRadius: 99, overflow: 'hidden', marginTop: 20 },
  progressFill: { height: '100%', backgroundColor: '#E7C37B', borderRadius: 99 },
  progressFoot: { color: '#B7D3C3', fontSize: 11, marginTop: 10 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  sectionMeta: { fontSize: 12 },
  taskRow: { borderWidth: 1, borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 9 },
  checkbox: { width: 22, height: 22, borderRadius: 7, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  taskCopy: { flex: 1 },
  taskTitle: { fontSize: 13, fontWeight: '600' },
  taskProperty: { fontSize: 11, marginTop: 4 },
});
