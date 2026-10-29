import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { useColors } from '@/hooks/useColors';
import { useStageData } from '@/context/StageDataContext';

export default function NewPropertyScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { addProperty } = useStageData();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [agent, setAgent] = useState('');
  const [date, setDate] = useState('Apr 21, 2025');
  const [type, setType] = useState('Single Family Home');
  const [sqft, setSqft] = useState('');
  const [beds, setBeds] = useState('3');
  const [baths, setBaths] = useState('2');
  const valid = address.trim().length > 3 && city.trim().length > 2 && agent.trim().length > 2;
  const field = (label: string, value: string, setter: (text: string) => void, placeholder: string) => <View style={styles.field}><Text style={[styles.label, { color: colors.foreground }]}>{label}</Text><TextInput value={value} onChangeText={setter} placeholder={placeholder} placeholderTextColor={colors.mutedForeground} style={[styles.input, { borderColor: colors.border, backgroundColor: colors.card, color: colors.foreground }]} /></View>;
  return <View style={[styles.screen, { backgroundColor: colors.background }]}>
    <View style={[styles.topBar, { paddingTop: insets.top + 10, borderBottomColor: colors.border }]}><Pressable onPress={() => router.back()}><Text style={[styles.cancel, { color: colors.mutedForeground }]}>Cancel</Text></Pressable><Text style={[styles.topTitle, { color: colors.foreground }]}>Add property</Text><Pressable disabled={!valid} onPress={() => { const id = addProperty({ address, city, agent, stagingDate: date, type, sqft: sqft || 'Not set', beds, baths }); router.replace(`/property/${id}`); }}><Text style={[styles.save, { color: valid ? colors.primary : colors.mutedForeground }]}>Save</Text></Pressable></View>
    <KeyboardAwareScrollViewCompat contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 32 }} bottomOffset={24} keyboardShouldPersistTaps="handled">
      <View style={styles.intro}><View style={[styles.introIcon, { backgroundColor: colors.secondary }]}><Feather name="home" size={23} color={colors.primary} /></View><Text style={[styles.title, { color: colors.foreground }]}>A new home to stage</Text><Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Capture the essentials now. You can fill in the details as the project comes together.</Text></View>
      <Text style={[styles.groupTitle, { color: colors.foreground }]}>Basic information</Text>
      {field('Property address', address, setAddress, '123 Main St')}
      {field('City, state, ZIP', city, setCity, 'Phoenix, AZ 85016')}
      {field('Real estate agent', agent, setAgent, 'Agent name')}
      {field('Staging date', date, setDate, 'Apr 21, 2025')}
      <Text style={[styles.groupTitle, { color: colors.foreground, marginTop: 18 }]}>Property details</Text>
      <Text style={[styles.label, { color: colors.foreground }]}>Property type</Text><View style={styles.chips}>{['Single Family Home', 'Townhouse', 'Condo'].map((item) => <Pressable key={item} onPress={() => setType(item)} style={[styles.chip, { backgroundColor: type === item ? colors.primary : colors.card, borderColor: type === item ? colors.primary : colors.border }]}><Text style={[styles.chipText, { color: type === item ? colors.primaryForeground : colors.mutedForeground }]}>{item}</Text></Pressable>)}</View>
      <View style={styles.twoColumns}>{field('Bedrooms', beds, setBeds, '3')}{field('Bathrooms', baths, setBaths, '2')}</View>
      {field('Square footage', sqft, setSqft, 'e.g. 2,450')}
      <Pressable disabled={!valid} onPress={() => { const id = addProperty({ address, city, agent, stagingDate: date, type, sqft: sqft || 'Not set', beds, baths }); router.replace(`/property/${id}`); }} style={[styles.primaryButton, { backgroundColor: valid ? colors.primary : colors.border }]}><Text style={[styles.primaryButtonText, { color: valid ? colors.primaryForeground : colors.mutedForeground }]}>Create property</Text><Feather name="arrow-right" size={17} color={valid ? colors.primaryForeground : colors.mutedForeground} /></Pressable>
    </KeyboardAwareScrollViewCompat>
  </View>;
}
const styles = StyleSheet.create({
  screen: { flex: 1 },
  topBar: { minHeight: 66, borderBottomWidth: 1, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cancel: { fontSize: 13, fontWeight: '600' },
  topTitle: { fontSize: 15, fontWeight: '700' },
  save: { fontSize: 13, fontWeight: '700' },
  intro: { alignItems: 'center', paddingVertical: 8, paddingBottom: 26 },
  introIcon: { width: 54, height: 54, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  title: { fontSize: 24, fontWeight: '700', letterSpacing: -0.4 },
  subtitle: { fontSize: 13, lineHeight: 19, textAlign: 'center', marginTop: 7 },
  groupTitle: { fontSize: 17, fontWeight: '700', marginBottom: 13 },
  field: { flex: 1, marginBottom: 14 },
  label: { fontSize: 12, fontWeight: '600', marginBottom: 7 },
  input: { height: 48, borderWidth: 1, borderRadius: 13, paddingHorizontal: 13, fontSize: 13 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 16 },
  chip: { borderWidth: 1, borderRadius: 99, paddingHorizontal: 11, paddingVertical: 8 },
  chipText: { fontSize: 11, fontWeight: '700' },
  twoColumns: { flexDirection: 'row', gap: 10 },
  primaryButton: { height: 52, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 13 },
  primaryButtonText: { fontSize: 14, fontWeight: '700' },
});
