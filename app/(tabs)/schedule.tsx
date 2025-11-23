import { MascotImage } from '@/components/mascot-image';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  FlameIcon,
  MapPinIcon,
  MoreHorizontalIcon,
  TrophyIcon,
  ZapIcon,
} from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- MOCK DATA TYPES ---
type WorkoutStatus = 'completed' | 'skipped' | 'upcoming';

type DayData = {
  date: number;
  dayName: string; // "M", "T", "W"
  fullDate: string; // "2025-01-23"
  hasWorkout: boolean;
  status?: WorkoutStatus;
};

type WorkoutDetails = {
  title: string;
  subtitle: string; // e.g., "Intervals • High Intensity"
  duration: string;
  distance?: string;
  calories?: string;
  time: string;
  tags: string[];
  description: string;
};

// --- MOCK DATA ---
const CURRENT_WEEK: DayData[] = [
  { date: 20, dayName: 'M', fullDate: '2025-01-20', hasWorkout: true, status: 'completed' },
  { date: 21, dayName: 'T', fullDate: '2025-01-21', hasWorkout: true, status: 'completed' },
  { date: 22, dayName: 'W', fullDate: '2025-01-22', hasWorkout: false }, // Rest
  { date: 23, dayName: 'T', fullDate: '2025-01-23', hasWorkout: true, status: 'upcoming' }, // Today
  { date: 24, dayName: 'F', fullDate: '2025-01-24', hasWorkout: true, status: 'upcoming' },
  { date: 25, dayName: 'S', fullDate: '2025-01-25', hasWorkout: true, status: 'upcoming' },
  { date: 26, dayName: 'S', fullDate: '2025-01-26', hasWorkout: false }, // Rest
];

const WORKOUTS: Record<string, WorkoutDetails> = {
  '2025-01-20': {
    title: 'Base Builder',
    subtitle: 'Zone 2 • Steady State',
    duration: '45 min',
    distance: '6.5 km',
    calories: '420 kcal',
    time: '07:00 AM',
    tags: ['Aerobic', 'Road'],
    description: 'Keep your heart rate steady. This run is about building endurance, not speed.',
  },
  '2025-01-21': {
    title: 'Leg Destroyer',
    subtitle: 'Strength • Lower Body',
    duration: '60 min',
    time: '06:00 PM',
    tags: ['Gym', 'Weights'],
    description: 'Focus on form for squats and deadlifts. Heavy sets of 5 reps.',
  },
  '2025-01-23': {
    title: 'Tempo Tuesday (on Thurs)',
    subtitle: 'Threshold • Speed',
    duration: '50 min',
    distance: '8.0 km',
    calories: '600 kcal',
    time: '05:30 PM',
    tags: ['Speed', 'Track'],
    description:
      'Warm up 10 min, then 30 min at threshold pace (unable to speak comfortably), cool down 10 min.',
  },
};

// --- COMPONENT: DAY PILL ---
const DayPill = ({
  item,
  isSelected,
  onPress,
}: {
  item: DayData;
  isSelected: boolean;
  onPress: () => void;
}) => {
  const isToday = item.fullDate === '2025-01-23'; // Mock "Today" logic

  let textColor = isSelected ? 'text-primary-foreground' : 'text-muted-foreground';
  let dateColor = isSelected ? 'text-primary-foreground' : 'text-foreground';

  // Tiny dot indicator logic
  const showDot = item.hasWorkout;
  const dotColor = item.status === 'completed' ? 'bg-primary' : 'bg-muted-foreground';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`mx-1 flex-1 items-center justify-center gap-1 rounded-2xl py-3 ${
        isSelected ? 'bg-foreground' : 'bg-transparent'
      }`}>
      <Text className={`text-xs font-medium ${textColor}`}>{item.dayName}</Text>
      <View
        className={`h-8 w-8 items-center justify-center ${
          isToday && !isSelected ? 'rounded-full bg-secondary' : ''
        }`}>
        <Text className={`text-lg font-bold ${dateColor}`}>{item.date}</Text>
      </View>

      {/* Workout Indicator Dot */}
      <View className="h-1.5 w-full items-center justify-center">
        {showDot && (
          <View className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-primary' : dotColor}`} />
        )}
      </View>
    </TouchableOpacity>
  );
};

// --- COMPONENT: HERO CARD ---
const WorkoutHeroCard = ({ date, data }: { date: string; data?: WorkoutDetails }) => {
  if (!data) {
    // REST DAY STATE
    return (
      <View className="min-h-[350px] items-center justify-center gap-4 rounded-[32px] border border-border bg-secondary p-8">
        <View className="mb-2 rounded-full bg-background p-6">
          <View className="relative h-16 w-16 items-center justify-center rounded-full">
            <MascotImage type="sleep" className="h-16 w-24 object-cover" />
          </View>
        </View>
        <Text className="text-center text-2xl font-bold text-foreground">Rest & Recover</Text>
        <Text className="text-center leading-6 text-muted-foreground">
          Your body gets stronger while you rest, not while you work. Take it easy today.
        </Text>
        <Button variant="outline" className="mt-4" text="Log Stretching" />
      </View>
    );
  }

  // ACTIVE WORKOUT STATE
  return (
    <View className="min-h-[400px] overflow-hidden rounded-[32px] border border-border bg-card p-4">
      <View className="flex-row gap-2">
        {data.tags.map((tag) => (
          <View key={tag} className="rounded-full bg-secondary px-3 py-1">
            <Text className="text-xs font-bold text-foreground">{tag}</Text>
          </View>
        ))}
      </View>

      {/* Content */}
      <View className="pb-6 pt-2">
        <View className="mb-2 flex-row items-start justify-between">
          <View>
            <Text className="mb-1 text-sm font-bold uppercase text-primary">{data.subtitle}</Text>
            <Text className="w-64 text-3xl font-extrabold leading-9 text-foreground">
              {data.title}
            </Text>
          </View>
          <View className="rounded-full bg-secondary p-2">
            <MoreHorizontalIcon className="text-foreground" size={20} />
          </View>
        </View>

        <View className="mb-6 mt-4 flex-row gap-4">
          <View className="flex-row items-center gap-2">
            <ClockIcon size={16} className="text-muted-foreground" />
            <Text className="font-medium text-foreground">{data.duration}</Text>
          </View>
          {data.distance && (
            <View className="flex-row items-center gap-2">
              <MapPinIcon size={16} className="text-muted-foreground" />
              <Text className="font-medium text-foreground">{data.distance}</Text>
            </View>
          )}
          {data.calories && (
            <View className="flex-row items-center gap-2">
              <FlameIcon size={16} color="#f97316" />
              <Text className="font-medium text-foreground">{data.calories}</Text>
            </View>
          )}
        </View>

        <View className="mb-6 rounded-xl bg-secondary p-4">
          <View className="mb-2 flex-row gap-2">
            <ZapIcon size={16} className="fill-primary text-foreground" />
            <Text className="text-sm font-bold text-foreground">Coach's Note</Text>
          </View>
          <Text className="text-sm leading-5 text-muted-foreground">{data.description}</Text>
        </View>

        <Button
          className="h-14 w-full rounded-2xl"
          text="Start Workout"
          // @ts-ignore
          icon={
            <View className="mr-2">
              <TrophyIcon className="text-primary-foreground" size={20} />
            </View>
          }
        />
      </View>
    </View>
  );
};

// --- MAIN SCREEN ---
export default function ScheduleScreen() {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState('2025-01-23');

  const selectedWorkout = WORKOUTS[selectedDate];

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingTop: Math.max(insets.top, 16),
        }}>
        {/* 1. Header & Week Switcher */}
        <View className="mb-6 flex-row items-end justify-between px-6">
          <View>
            <Text className="mb-1 font-medium text-muted-foreground">Schedule</Text>
            <Text className="text-2xl font-bold text-foreground">January 2025</Text>
          </View>
          <View className="flex-row gap-2">
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full border border-border bg-card">
              <ChevronLeftIcon size={20} className="text-foreground" />
            </TouchableOpacity>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full border border-border bg-card">
              <ChevronRightIcon size={20} className="text-foreground" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. The Week Strip (Static 7 Days) */}
        <View className="mb-8 px-4">
          <View className="bg-secondary/20 flex-row justify-between rounded-[20px] p-1.5">
            {CURRENT_WEEK.map((day) => (
              <DayPill
                key={day.fullDate}
                item={day}
                isSelected={selectedDate === day.fullDate}
                onPress={() => setSelectedDate(day.fullDate)}
              />
            ))}
          </View>
        </View>

        {/* 3. The Hero Content */}
        <View className="px-6">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-foreground">
              {selectedDate === '2025-01-23' ? "Today's Plan" : 'Workout Details'}
            </Text>
            <View className="bg-primary/10 rounded-full px-3 py-1">
              <Text className="text-xs font-bold uppercase text-primary">
                {selectedWorkout ? 'Scheduled' : 'Rest Day'}
              </Text>
            </View>
          </View>

          {/* Main Interactive Card */}
          <WorkoutHeroCard date={selectedDate} data={selectedWorkout} />
        </View>

        {/* 4. Weekly Summary / Stats Block */}
        <View className="mt-8 px-6">
          <Text className="mb-4 text-lg font-bold text-foreground">Weekly Progress</Text>
          <View className="flex-row gap-4">
            <View className="flex-1 rounded-2xl border border-border bg-card p-4">
              <Text className="mb-1 text-xs font-bold uppercase text-muted-foreground">
                Completed
              </Text>
              <View className="flex-row items-end gap-2">
                <Text className="text-3xl font-bold text-foreground">2</Text>
                <Text className="mb-1.5 text-sm text-muted-foreground">/ 5 workouts</Text>
              </View>
              <View className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                <View className="h-full w-[40%] bg-primary" />
              </View>
            </View>
            <View className="flex-1 rounded-2xl border border-border bg-card p-4">
              <Text className="mb-1 text-xs font-bold uppercase text-muted-foreground">
                Total Distance
              </Text>
              <View className="flex-row items-end gap-2">
                <Text className="text-3xl font-bold text-foreground">12.5</Text>
                <Text className="mb-1.5 text-sm text-muted-foreground">km</Text>
              </View>
              <View className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                <View className="h-full w-[65%] bg-orange-500" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
