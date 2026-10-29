import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPropertyImage } from '@/lib/images';
import { useColors } from '@/hooks/useColors';
import { Property, useStageData } from '@/context/StageDataContext';

const PREVIOUS_CALENDAR_DAYS = 10;
const UPCOMING_CALENDAR_DAYS = 14;
const DATE_CARD_STEP = 62;

function dateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function createCalendarDates(today: Date) {
  return Array.from({ length: PREVIOUS_CALENDAR_DAYS + UPCOMING_CALENDAR_DAYS }, (_, index) => {
    const offset = index - PREVIOUS_CALENDAR_DAYS;
    const date = new Date(today);
    date.setDate(today.getDate() + offset);
    return {
      key: dateKey(date),
      date,
      day: offset === 0 ? 'Today' : date.toLocaleDateString(undefined, { weekday: 'short' }),
      count: offset === 0 ? 2 : offset > 0 && offset < 6 ? 1 : 0,
    };
  });
}

type ProfilePage = 'My Profile' | 'Corp. Pg' | 'Settings' | 'Design Page' | 'Sections';

const pageDetails: Record<ProfilePage, { icon: React.ComponentProps<typeof Feather>['name']; description: string; rows: string[] }> = {
  'My Profile': { icon: 'user', description: 'Manage your personal Stage This profile.', rows: ['Name and photo', 'Contact details', 'Notification preferences'] },
  'Corp. Pg': { icon: 'briefcase', description: 'View and update your company presence.', rows: ['Company details', 'Team members', 'Brand information'] },
  Settings: { icon: 'settings', description: 'Control how Stage This works for you.', rows: ['Calendar preferences', 'Alerts and reminders', 'App appearance'] },
  'Design Page': { icon: 'edit-3', description: 'Manage the design tools available to your team.', rows: ['Design templates', 'Style library', 'Default room plans'] },
  Sections: { icon: 'grid', description: 'Organize the sections used across your workspace.', rows: ['Property sections', 'Task sections', 'Photo categories'] },
};

function ProfileNavigation({ topInset }: { topInset: number }) {
  const colors = useColors();
  const [menuVisible, setMenuVisible] = useState(false);
  const [activePage, setActivePage] = useState<ProfilePage | null>(null);
  const menuProgress = useRef(new Animated.Value(0)).current;
  const drawerProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(menuProgress, {
      toValue: menuVisible ? 1 : 0,
      duration: menuVisible ? 240 : 190,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [menuProgress, menuVisible]);

  useEffect(() => {
    if (!activePage) return;
    drawerProgress.setValue(0);
    Animated.timing(drawerProgress, {
      toValue: 1,
      duration: 340,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [activePage, drawerProgress]);

  const closeDrawer = () => {
    Animated.timing(drawerProgress, {
      toValue: 0,
      duration: 280,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setActivePage(null);
    });
  };

  const openPage = (page: ProfilePage) => {
    setMenuVisible(false);
    setActivePage(page);
  };

  const renderLink = (page: ProfilePage) => (
    <Pressable key={page} onPress={() => openPage(page)} style={({ pressed }) => [styles.menuLink, pressed && { backgroundColor: colors.muted }]}>
      <Feather name={pageDetails[page].icon} size={17} color={colors.primary} />
      <Text style={[styles.menuLinkText, { color: colors.foreground }]}>{page}</Text>
      <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
    </Pressable>
  );

  const details = activePage ? pageDetails[activePage] : null;

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open profile menu"
        onPress={() => setMenuVisible(true)}
        style={[styles.avatar, { backgroundColor: colors.primary }]}
      >
        <Text style={styles.avatarText}>JS</Text>
      </Pressable>

      <Modal transparent visible={menuVisible} animationType="none" onRequestClose={() => setMenuVisible(false)}>
        <Pressable style={styles.menuBackdrop} onPress={() => setMenuVisible(false)}>
          <Animated.View
            style={[
              styles.profileMenu,
              {
                top: topInset + 58,
                backgroundColor: colors.card,
                borderColor: colors.border,
                opacity: menuProgress,
                transform: [
                  { translateY: menuProgress.interpolate({ inputRange: [0, 1], outputRange: [-10, 0] }) },
                  { scale: menuProgress.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] }) },
                ],
              },
            ]}
          >
            <Pressable>
              <View style={styles.menuIdentity}>
                <View style={[styles.menuAvatar, { backgroundColor: colors.primary }]}><Text style={styles.avatarText}>JS</Text></View>
                <View>
                  <Text style={[styles.menuName, { color: colors.foreground }]}>Jordan Smith</Text>
                  <Text style={[styles.menuRole, { color: colors.mutedForeground }]}>Stage This workspace</Text>
                </View>
              </View>
              <View style={[styles.menuDivider, { backgroundColor: colors.border }]} />
              {(['My Profile', 'Corp. Pg', 'Settings'] as ProfilePage[]).map(renderLink)}
              <View style={styles.adminDividerRow}>
                <View style={[styles.adminLine, { backgroundColor: colors.border }]} />
                <View style={[styles.adminBadge, { backgroundColor: colors.accent }]}>
                  <Text style={[styles.adminBadgeText, { color: colors.primary }]}>ADMIN</Text>
                </View>
                <View style={[styles.adminLine, { backgroundColor: colors.border }]} />
              </View>
              {(['Design Page', 'Sections'] as ProfilePage[]).map(renderLink)}
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>

      <Modal transparent visible={!!activePage} animationType="none" onRequestClose={closeDrawer}>
        <View style={styles.drawerLayer}>
          <Animated.View style={[styles.drawerShade, { opacity: drawerProgress }]}>
            <Pressable style={StyleSheet.absoluteFill} onPress={closeDrawer} />
          </Animated.View>
          <Animated.View
            style={[
              styles.drawer,
              {
                backgroundColor: colors.background,
                paddingTop: topInset + 18,
                transform: [{ translateX: drawerProgress.interpolate({ inputRange: [0, 1], outputRange: [430, 0] }) }],
              },
            ]}
          >
            {activePage && details && (
              <>
                <View style={styles.drawerHeader}>
                  <View style={[styles.drawerIcon, { backgroundColor: colors.accent }]}>
                    <Feather name={details.icon} size={20} color={colors.primary} />
                  </View>
                  <Pressable accessibilityLabel="Close drawer" onPress={closeDrawer} style={[styles.drawerClose, { borderColor: colors.border }]}>
                    <Feather name="x" size={20} color={colors.foreground} />
                  </Pressable>
                </View>
                <Text style={[styles.drawerTitle, { color: colors.foreground }]}>{activePage}</Text>
                <Text style={[styles.drawerDescription, { color: colors.mutedForeground }]}>{details.description}</Text>
                <View style={[styles.drawerDivider, { backgroundColor: colors.border }]} />
                {details.rows.map((row) => (
                  <Pressable key={row} style={[styles.drawerRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <Text style={[styles.drawerRowText, { color: colors.foreground }]}>{row}</Text>
                    <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
                  </Pressable>
                ))}
              </>
            )}
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

function PropertyAgendaCard({ property }: { property: Property }) {
  const colors = useColors();
  const router = useRouter();
  const taskCount = property.tasks.filter((task) => !task.done).length;
  return (
    <Pressable testID={`property-${property.id}`} onPress={() => router.push(`/property/${property.id}`)} style={({ pressed }) => [styles.agendaCard, { borderColor: colors.border }, pressed && { opacity: 0.88 }]}>
      <View style={styles.agendaImageWrap}>
        <Image source={getPropertyImage(property.image)} style={styles.agendaImage} />
      </View>
      <View style={styles.agendaCopy}>
        <View style={styles.rowBetween}>
          <Text style={[styles.eyebrow, { color: colors.mutedForeground }]}>STAGING</Text>
          <View style={[styles.statusPill, { backgroundColor: colors.accent }]}><Text style={[styles.statusText, { color: colors.primary }]}>{property.status}</Text></View>
        </View>
        <Text style={[styles.agendaTitle, { color: colors.foreground }]}>{property.address}</Text>
        <Text style={[styles.agendaMeta, { color: colors.mutedForeground }]}>{property.agent} · {property.brokerage}</Text>
        <View style={styles.rowBetween}>
          <Text style={[styles.timeText, { color: colors.foreground }]}>{property.id === 'maple' ? '9:00 AM' : '2:00 PM'}</Text>
          <Text style={[styles.taskText, { color: colors.primary }]}>{taskCount} tasks open</Text>
        </View>
      </View>
      <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
    </Pressable>
  );
}

export default function CalendarScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { properties } = useStageData();
  const dateRailRef = useRef<ScrollView>(null);
  const didSetInitialDatePosition = useRef(false);
  const today = useMemo(() => {
    const current = new Date();
    current.setHours(0, 0, 0, 0);
    return current;
  }, []);
  const dates = useMemo(() => createCalendarDates(today), [today]);
  const [selectedDateKey, setSelectedDateKey] = useState(() => dateKey(today));
  const selectedDate = dates.find((date) => date.key === selectedDateKey) ?? dates[0];
  const isToday = selectedDate.key === dateKey(today);
  const scheduled = useMemo(() => isToday ? properties.slice(0, 2) : properties.slice(1, 2), [properties, isToday]);
  const monthYear = today.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  const weekOf = today.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const selectedDateLabel = selectedDate.date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.background }]} contentContainerStyle={{ paddingTop: insets.top + 18, paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.brandKicker, { color: colors.primary }]}>STAGE THIS</Text>
          <Text style={[styles.title, { color: colors.foreground }]}>Your staging days</Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Plan. Prepare. Stage. Repeat.</Text>
        </View>
        <ProfileNavigation topInset={insets.top} />
      </View>

      <View style={styles.dateHeader}>
        <View><Text style={[styles.sectionTitle, { color: colors.foreground }]}>{monthYear}</Text><Text style={[styles.sectionSubtitle, { color: colors.mutedForeground }]}>Starting today · {weekOf}</Text></View>
        <Pressable style={[styles.iconButton, { borderColor: colors.border }]}><Feather name="calendar" size={18} color={colors.primary} /></Pressable>
      </View>
      <ScrollView
        ref={dateRailRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateRail}
        onContentSizeChange={() => {
          if (didSetInitialDatePosition.current) return;
          didSetInitialDatePosition.current = true;
          dateRailRef.current?.scrollTo({ x: PREVIOUS_CALENDAR_DAYS * DATE_CARD_STEP, animated: false });
        }}
      >
        {dates.map((date) => {
          const active = date.key === selectedDate.key;
          return <Pressable key={date.key} onPress={() => setSelectedDateKey(date.key)} style={[styles.dateCard, { backgroundColor: active ? colors.primary : colors.card, borderColor: active ? colors.primary : colors.border }]}>
            <Text style={[styles.dateDay, { color: active ? colors.primaryForeground : colors.mutedForeground }]}>{date.day}</Text>
            <Text style={[styles.dateNumber, { color: active ? colors.primaryForeground : colors.foreground }]}>{date.date.getDate()}</Text>
            <View style={[styles.dateDot, { backgroundColor: active ? colors.primaryForeground : date.count ? colors.primary : colors.border }]} />
          </Pressable>;
        })}
      </ScrollView>

      <View style={styles.sectionHeader}><View><Text style={[styles.sectionTitle, { color: colors.foreground }]}>{isToday ? 'Today' : selectedDate.day}</Text><Text style={[styles.sectionSubtitle, { color: colors.mutedForeground }]}>{selectedDateLabel}</Text></View><View style={[styles.countPill, { backgroundColor: colors.accent }]}><Text style={[styles.countText, { color: colors.primary }]}>{scheduled.length} jobs</Text></View></View>
      {scheduled.map((property) => <PropertyAgendaCard key={property.id} property={property} />)}
      <View style={[styles.tip, { backgroundColor: colors.secondary }]}><Feather name="sun" size={18} color={colors.primary} /><Text style={[styles.tipText, { color: colors.secondaryForeground }]}>A clear plan makes every home feel brighter.</Text></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 },
  brandKicker: { fontSize: 12, letterSpacing: 2.1, fontWeight: '700', marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '700', letterSpacing: -0.7 },
  subtitle: { fontSize: 14, marginTop: 7 },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  menuBackdrop: { flex: 1 },
  profileMenu: { position: 'absolute', right: 20, width: 272, borderRadius: 20, borderWidth: 1, padding: 12, shadowColor: '#193A32', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.16, shadowRadius: 24, elevation: 12 },
  menuIdentity: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 6 },
  menuAvatar: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  menuName: { fontSize: 14, fontWeight: '700' },
  menuRole: { fontSize: 11, marginTop: 2 },
  menuDivider: { height: 1, marginVertical: 10 },
  menuLink: { minHeight: 44, borderRadius: 12, paddingHorizontal: 9, flexDirection: 'row', alignItems: 'center', gap: 10 },
  menuLinkText: { flex: 1, fontSize: 14, fontWeight: '600' },
  adminDividerRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 10 },
  adminLine: { height: 1, flex: 1 },
  adminBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 99 },
  adminBadgeText: { fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  drawerLayer: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end' },
  drawerShade: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(25, 58, 50, 0.34)' },
  drawer: { width: '88%', height: '100%', paddingHorizontal: 22, shadowColor: '#193A32', shadowOffset: { width: -8, height: 0 }, shadowOpacity: 0.18, shadowRadius: 24, elevation: 18 },
  drawerHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 26 },
  drawerIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  drawerClose: { width: 40, height: 40, borderRadius: 13, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  drawerTitle: { fontSize: 28, fontWeight: '700', letterSpacing: -0.6 },
  drawerDescription: { fontSize: 14, lineHeight: 21, marginTop: 8 },
  drawerDivider: { height: 1, marginVertical: 24 },
  drawerRow: { minHeight: 58, borderRadius: 16, borderWidth: 1, paddingHorizontal: 16, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  drawerRowText: { fontSize: 15, fontWeight: '600' },
  dateHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  sectionSubtitle: { fontSize: 13, marginTop: 4 },
  iconButton: { width: 38, height: 38, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  dateRail: { gap: 8, paddingBottom: 28 },
  dateCard: { width: 54, height: 72, borderRadius: 16, borderWidth: 1, alignItems: 'center', justifyContent: 'center', gap: 4 },
  dateDay: { fontSize: 11, fontWeight: '600' },
  dateNumber: { fontSize: 18, fontWeight: '700' },
  dateDot: { width: 5, height: 5, borderRadius: 3, marginTop: 2 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  countPill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 99 },
  countText: { fontSize: 12, fontWeight: '700' },
  agendaCard: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderWidth: 1, borderRadius: 18, backgroundColor: '#FFFCF6', marginBottom: 10 },
  agendaImageWrap: { width: 72, height: 84, borderRadius: 13, overflow: 'hidden' },
  agendaImage: { width: '100%', height: '100%' },
  agendaCopy: { flex: 1, gap: 4 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  eyebrow: { fontSize: 9, letterSpacing: 1.4, fontWeight: '700' },
  statusPill: { paddingHorizontal: 7, paddingVertical: 4, borderRadius: 7 },
  statusText: { fontSize: 10, fontWeight: '700' },
  agendaTitle: { fontSize: 16, fontWeight: '700', marginTop: 2 },
  agendaMeta: { fontSize: 11 },
  timeText: { fontSize: 12, fontWeight: '700', marginTop: 4 },
  taskText: { fontSize: 11, fontWeight: '600' },
  tip: { flexDirection: 'row', gap: 10, alignItems: 'center', padding: 15, borderRadius: 16, marginTop: 8 },
  tipText: { fontSize: 13, fontWeight: '600', flex: 1 },
});
