import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
 
export default function TabLayout() {
  const colors = useColors();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 0,
          height: Platform.OS === 'web' ? 84 : 78,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'web' ? 34 : 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) =>
            <Feather name="calendar" size={21} color={color} />,
        }}
      />
      <Tabs.Screen name="properties" options={{ title: 'Properties', tabBarIcon: ({ color }) => <Feather name="home" size={21} color={color} /> }} />
      <Tabs.Screen name="tasks" options={{ title: 'Tasks', tabBarIcon: ({ color }) => <Feather name="check-circle" size={21} color={color} /> }} />
      <Tabs.Screen name="more" options={{ title: 'More', tabBarIcon: ({ color }) => <Feather name="more-horizontal" size={22} color={color} /> }} />
    </Tabs>
  );
}

