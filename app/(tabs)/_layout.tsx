import { useTheme } from '@/hooks/use-theme';
import { Redirect, Tabs } from 'expo-router';
import { CalendarDaysIcon, GoalIcon, HomeIcon } from 'lucide-react-native';
import React from 'react';

const isLoggedIn = true;

export default function TabsLayout() {
  const { primary } = useTheme();

  if (!isLoggedIn) {
    return <Redirect href="/onboarding" />;
  }

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
      <Tabs.Screen
        name="goals"
        options={{
          headerShown: false,
          title: 'Goals',
          tabBarIcon: ({ color }) => <GoalIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
