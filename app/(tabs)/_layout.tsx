import { useTheme } from '@/hooks/use-theme';
import { Tabs } from 'expo-router';
import { HomeIcon } from 'lucide-react-native';
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
    </Tabs>
  );
}
