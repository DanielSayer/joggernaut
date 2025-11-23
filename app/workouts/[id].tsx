import { Tabs, TabsList, TabsTrigger } from '@/components/tabs';
import { Text } from '@/components/ui/text';
import { LapsTab } from '@/components/workouts/completed-run/laps-tab';
import { OverviewTab } from '@/components/workouts/completed-run/overview-tab';
import { StatsTab } from '@/components/workouts/completed-run/stats-tab';
import { useRouter } from 'expo-router';
import { ChevronLeftIcon, MoreVerticalIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TabOption = 'Overview' | 'Stats' | 'Laps';

export default function WorkoutDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabOption>('Overview');

  return (
    <View className="flex-1 bg-background">
      <View
        className="z-10 flex-row items-center justify-between bg-background px-6 pb-2"
        style={{ paddingTop: Math.max(insets.top, 16) }}>
        <TouchableOpacity
          className="h-10 w-10 items-center justify-center rounded-full"
          onPress={() => router.back()}>
          <ChevronLeftIcon size={24} className="text-foreground" />
        </TouchableOpacity>

        <Text className="text-lg font-bold text-foreground">Workout Details</Text>

        <TouchableOpacity className="h-10 w-10 items-center justify-center">
          <MoreVerticalIcon size={24} className="text-foreground" />
        </TouchableOpacity>
      </View>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="Overview">Overview</TabsTrigger>
          <TabsTrigger value="Stats">Stats</TabsTrigger>
          <TabsTrigger value="Laps">Laps</TabsTrigger>
        </TabsList>
      </Tabs>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 8 }}
        showsVerticalScrollIndicator={false}>
        {activeTab === 'Overview' && <OverviewTab />}
        {activeTab === 'Stats' && <StatsTab />}
        {activeTab === 'Laps' && <LapsTab />}
      </ScrollView>
    </View>
  );
}
