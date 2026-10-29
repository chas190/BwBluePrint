import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

const items = [
  { icon: 'users' as const, title: 'Team & agents', detail: 'Keep everyone in sync' },
  { icon: 'truck' as const, title: 'Inventory', detail: 'Furniture, supplies, and trucks' },
  { icon: 'settings' as const, title: 'Preferences', detail: 'Dates, notifications, and account' },
];

export default function MoreScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  return <View style={[styles.screen, { backgroundColor: colors.background, paddingTop: insets.top + 18 }]}>
    <Text style={[styles.kicker, { color: colors.primary }]}>YOUR WORKSPACE</Text>
    <Text style={[styles.title, { color: colors.foreground }]}>More</Text>
    <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Everything behind the scenes of a beautiful result.</Text>
    <View style={[styles.profile, { backgroundColor: colors.primary }]}><View style={styles.profileAvatar}><Text style={[styles.profileAvatarText, { color: colors.primary }]}>JS</Text></View><View><Text style={styles.profileName}>Jordan Smith</Text><Text style={styles.profileRole}>Stage This team</Text></View><Feather name="chevron-right" size={18} color="#B7D3C3" /></View>
    <View style={styles.menu}>{items.map((item) => <Pressable key={item.title} style={[styles.menuRow, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.menuIcon, { backgroundColor: colors.secondary }]}><Feather name={item.icon} size={18} color={colors.primary} /></View><View style={styles.menuCopy}><Text style={[styles.menuTitle, { color: colors.foreground }]}>{item.title}</Text><Text style={[styles.menuDetail, { color: colors.mutedForeground }]}>{item.detail}</Text></View><Feather name="chevron-right" size={17} color={colors.mutedForeground} /></Pressable>)}</View>
    <View style={[styles.quote, { backgroundColor: colors.secondary }]}><Text style={[styles.quoteText, { color: colors.secondaryForeground }]}>“More homes. Brighter futures.”</Text><Text style={[styles.quoteSub, { color: colors.mutedForeground }]}>The Stage This way</Text></View>
  </View>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 20 },
  kicker: { fontSize: 11, letterSpacing: 1.8, fontWeight: '700', marginBottom: 8 },
  title: { fontSize: 30, fontWeight: '700', letterSpacing: -0.7 },
  subtitle: { fontSize: 13, marginTop: 5, marginBottom: 24 },
  profile: { borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  profileAvatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#F7F4ED', alignItems: 'center', justifyContent: 'center' },
  profileAvatarText: { fontWeight: '700', fontSize: 13 },
  profileName: { fontSize: 15, color: '#FFFFFF', fontWeight: '700' },
  profileRole: { fontSize: 12, color: '#B7D3C3', marginTop: 3 },
  menu: { gap: 10, marginTop: 24 },
  menuRow: { borderWidth: 1, borderRadius: 17, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  menuCopy: { flex: 1 },
  menuTitle: { fontSize: 14, fontWeight: '700' },
  menuDetail: { fontSize: 11, marginTop: 3 },
  quote: { marginTop: 22, borderRadius: 18, padding: 18 },
  quoteText: { fontSize: 17, fontWeight: '600', fontStyle: 'italic' },
  quoteSub: { fontSize: 11, marginTop: 8 },
});
