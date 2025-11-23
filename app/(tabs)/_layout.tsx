import { useTheme } from '@/hooks/use-theme';
import { Tabs } from 'expo-router';
import { CalendarDaysIcon, HomeIcon } from 'lucide-react-native';
import React from 'react';

export default function TabsLayout() {
  const { primary } = useTheme();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: primary }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          headerShown: false,
          title: 'Schedule',
          tabBarIcon: ({ color }) => <CalendarDaysIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
