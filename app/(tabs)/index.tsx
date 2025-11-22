import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MapPinIcon,
  PlayIcon,
  RefreshCwIcon,
  TargetIcon,
  TrendingUpIcon,
  TrophyIcon,
  ZapIcon,
} from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Re-using your existing UI primitives or mocking standard ones
import StravaProgressChart from '@/components/progress-graph';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/hooks/use-theme';

type Goal = {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string;
};

const LAST_WORKOUT = {
  title: 'Morning Tempo Run',
  date: 'Today, 6:30 AM',
  distance: '8.5 km',
  time: '45:20',
  pace: '5:20 /km',
  aiInsight:
    'Great consistency! Your pace on the uphill segment improved by 5% compared to last week.',
};

const UPCOMING_WORKOUTS = [
  { id: 1, title: 'Speed Intervals', date: 'Tomorrow, 5:00 PM', duration: '45 min' },
  { id: 2, title: 'Long Slow Distance', date: 'Sat, 7:00 AM', duration: '90 min' },
];

const MOCK_GOALS: Goal[] = [
  {
    id: 'goal-1',
    label: 'Weekly distance',
    current: 24.3,
    target: 40,
    unit: 'km',
  },
  {
    id: 'goal-2',
    label: 'Workouts per week',
    current: 3,
    target: 4,
    unit: 'sessions',
  },
  {
    id: 'goal-3',
    label: 'Monthly consistency',
    current: 9,
    target: 12,
    unit: 'planned weeks',
  },
];

// --- SUB-COMPONENTS ---

// A simple progress bar component matching the theme
const ProgressBar = ({
  current,
  total,
  colorClass = 'bg-primary',
}: {
  current: number;
  total: number;
  colorClass?: string;
}) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));
  return (
    <View className="h-2 w-full overflow-hidden rounded-full bg-secondary">
      <View className={`h-full ${colorClass}`} style={{ width: `${percentage}%` }} />
    </View>
  );
};

// --- MAIN SCREEN ---

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <View className="flex-1 bg-background">
      {/* Custom Header */}
      <View
        className="flex-row items-center justify-between border-b border-muted-foreground bg-background px-6 pb-4"
        style={{ paddingTop: Math.max(insets.top, 16) }}>
        <View>
          <Text className="text-sm font-medium text-muted-foreground">Welcome back,</Text>
          <Text className="text-2xl font-bold text-foreground">Hugh Mongus</Text>
        </View>
        <TouchableOpacity className="rounded-full bg-secondary p-3 shadow-sm active:scale-95">
          <RefreshCwIcon size={20} className="text-primary" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingInline: 24, paddingBottom: 100, paddingTop: 12 }}
        showsVerticalScrollIndicator={false}>
        <View className="mb-8">
          <StravaProgressChart />
        </View>

        {/* Last Workout Card (Hero) */}
        <View className="mb-8">
          <View className="mb-3 flex-row items-end justify-between">
            <Text variant="large" className="font-bold">
              Last Run
            </Text>
            <TouchableOpacity>
              <Text className="text-sm font-medium text-primary">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
            {/* Top Section: Stats & Map Placeholder */}
            <View className="p-5 pb-6">
              <View className="mb-4 flex-row items-start justify-between">
                <View>
                  <Text className="text-lg font-bold text-foreground">{LAST_WORKOUT.title}</Text>
                  <Text className="text-sm text-muted-foreground">{LAST_WORKOUT.date}</Text>
                </View>
                <View className="bg-primary/10 rounded-full px-3 py-1">
                  <Text className="text-xs font-bold text-primary">LOGGED</Text>
                </View>
              </View>

              <View className="mt-2 flex-row items-center justify-between">
                <View>
                  <Text className="text-3xl font-extrabold text-foreground">
                    {LAST_WORKOUT.distance}
                  </Text>
                  <Text className="text-xs uppercase tracking-wider text-muted-foreground">
                    Distance
                  </Text>
                </View>
                <View className="h-8 w-[1px] bg-border" />
                <View>
                  <Text className="text-xl font-bold text-foreground">{LAST_WORKOUT.time}</Text>
                  <Text className="text-xs uppercase tracking-wider text-muted-foreground">
                    Time
                  </Text>
                </View>
                <View className="h-8 w-[1px] bg-border" />
                <View>
                  <Text className="text-xl font-bold text-foreground">{LAST_WORKOUT.pace}</Text>
                  <Text className="text-xs uppercase tracking-wider text-muted-foreground">
                    Pace
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row items-start gap-4 border-t border-border bg-muted p-5">
              <View className="h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-border bg-red-300 shadow-sm">
                <Image
                  source={{ uri: 'https://i.imgur.com/placeholder-rabbit.png' }}
                  className="h-10 w-10"
                  resizeMode="contain"
                />
              </View>

              <View className="flex-1">
                <View className="mb-1 flex-row items-center gap-2">
                  <ZapIcon size={14} color={theme.primary} />
                  <Text className="text-xs font-bold uppercase text-primary">Coach Dash Says</Text>
                </View>
                <Text className="text-foreground/80 text-sm italic leading-5">
                  "{LAST_WORKOUT.aiInsight}"
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Upcoming Workouts */}
        <View className="mb-8">
          <View className="mb-3 flex-row items-end justify-between">
            <Text variant="large" className="font-bold">
              Up Next
            </Text>
            <TouchableOpacity>
              <Text className="text-sm font-medium text-primary">View Schedule</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-3">
            {UPCOMING_WORKOUTS.map((workout) => (
              <View
                key={workout.id}
                className="flex-row items-center rounded-2xl border border-border bg-card p-4 shadow-sm">
                <View className="mr-4 h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                  <CalendarIcon size={20} className="text-foreground" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-bold text-foreground">{workout.title}</Text>
                  <View className="mt-1 flex-row gap-3">
                    <Text className="text-xs text-muted-foreground">{workout.date}</Text>
                    <Text className="text-xs text-muted-foreground">•</Text>
                    <Text className="text-xs text-muted-foreground">{workout.duration}</Text>
                  </View>
                </View>
                <TouchableOpacity className="bg-primary/10 h-10 w-10 items-center justify-center rounded-full">
                  <PlayIcon size={18} className="ml-0.5 text-primary" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Expandable Goals Section */}
        <GoalProgressSection />
      </ScrollView>
    </View>
  );
}

function GoalProgressSection() {
  const [expanded, setExpanded] = useState(true);

  const goalsWithProgress = useMemo(
    () =>
      MOCK_GOALS.map((goal) => {
        const ratio = goal.target === 0 ? 0 : goal.current / goal.target;
        const progress = Math.min(100, Math.round(ratio * 100));

        return { ...goal, progress };
      }),
    []
  );

  const hasGoals = goalsWithProgress.length > 0;

  return (
    <View className="mb-4 rounded-3xl border border-border bg-card p-4 shadow-sm">
      <TouchableOpacity
        activeOpacity={0.8}
        className="mb-2 flex-row items-center justify-between"
        onPress={() => setExpanded((prev) => !prev)}>
        <View className="flex-row items-center gap-2">
          <TargetIcon className="h-4 w-4 text-primary" />
          <Text
            variant="small"
            className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Goal progress
          </Text>
        </View>
        {expanded ? (
          <ChevronUpIcon className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
        )}
      </TouchableOpacity>

      {hasGoals ? (
        <>
          <Text variant="small" className="mb-3 text-xs text-muted-foreground">
            Stay on top of your weekly and long-term targets. These update automatically as your
            Garmin data syncs.
          </Text>

          {expanded ? (
            <View className="gap-3">
              {goalsWithProgress.map((goal) => (
                <View key={goal.id} className="gap-1.5">
                  <View className="flex-row items-center justify-between">
                    <Text variant="small" className="text-sm text-foreground">
                      {goal.label}
                    </Text>
                    <Text variant="small" className="text-xs text-muted-foreground">
                      {goal.current.toFixed(1)} / {goal.target} {goal.unit}
                    </Text>
                  </View>

                  <View className="bg-secondary/40 h-2 w-full overflow-hidden rounded-full">
                    <View
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </View>

                  <View className="flex-row items-center justify-between">
                    <Text variant="small" className="text-[11px] text-muted-foreground">
                      {goal.progress}% complete
                    </Text>
                    <Text variant="small" className="text-[11px] text-muted-foreground">
                      Auto-adjusts with your plan
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : null}
        </>
      ) : (
        <View className="mt-1 rounded-2xl bg-muted px-3 py-3">
          <Text variant="small" className="text-xs text-muted-foreground">
            You don&apos;t have any active goals yet. Create your first target and we&apos;ll track
            your progress here.
          </Text>
        </View>
      )}
    </View>
  );
}
