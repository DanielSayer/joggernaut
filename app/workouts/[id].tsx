import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import {
  ActivityIcon,
  ChevronLeftIcon,
  ClockIcon,
  DumbbellIcon,
  MapPinIcon,
  MoreHorizontalIcon,
  PenLineIcon,
  PlayIcon,
  TimerIcon,
  TrendingUpIcon,
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- TYPES ---
type WorkoutType = 'run' | 'strength';
type WorkoutStatus = 'planned' | 'completed' | 'in_progress';

// --- MOCK DATA ---
const SCREEN_WIDTH = Dimensions.get('window').width;

const HEART_RATE_DATA = [
  { value: 120, label: '0m' },
  { value: 135, label: '5m' },
  { value: 142, label: '10m' },
  { value: 145, label: '15m' },
  { value: 158, label: '20m' },
  { value: 165, label: '25m' }, // Peak during interval
  { value: 162, label: '30m' },
  { value: 140, label: '35m' }, // Cooldown
];

const PACE_DATA = [
  { value: 6.5, label: '1km' }, // min/km
  { value: 6.2, label: '2km' },
  { value: 5.8, label: '3km' },
  { value: 5.5, label: '4km' },
  { value: 5.9, label: '5km' },
];

// --- SUB-COMPONENTS ---

const MetricCard = ({ label, value, unit, icon: Icon }: any) => (
  <View className="min-w-[45%] flex-1 rounded-2xl border border-border bg-card p-4">
    <View className="mb-2 flex-row items-center gap-2 opacity-70">
      <Icon size={16} className="text-primary" />
      <Text className="text-xs font-bold uppercase text-muted-foreground">{label}</Text>
    </View>
    <View className="flex-row items-baseline gap-1">
      <Text className="text-2xl font-bold text-foreground">{value}</Text>
      <Text className="text-sm font-medium text-muted-foreground">{unit}</Text>
    </View>
  </View>
);

const SectionHeader = ({ title, action }: { title: string; action?: string }) => (
  <View className="mb-4 mt-6 flex-row items-center justify-between">
    <Text className="text-lg font-bold text-foreground">{title}</Text>
    {action && (
      <TouchableOpacity>
        <Text className="text-sm font-bold text-primary">{action}</Text>
      </TouchableOpacity>
    )}
  </View>
);

// --- MAIN SCREEN ---

export default function WorkoutDetailScreen() {
  const insets = useSafeAreaInsets();

  // --- STATE FOR DEMO PURPOSES ---
  // Toggle these to see different views
  const [type, setType] = useState<WorkoutType>('run');
  const [status, setStatus] = useState<WorkoutStatus>('completed');
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis'>('overview');

  // If currently running, simplistic view
  if (status === 'in_progress') {
    return (
      <View className="flex-1 items-center justify-center gap-6 bg-background p-6">
        <View className="bg-primary/10 h-24 w-24 animate-pulse items-center justify-center rounded-full">
          <ActivityIcon size={48} className="text-primary" />
        </View>
        <Text className="text-2xl font-bold text-foreground">Workout In Progress</Text>
        <Text className="text-center text-muted-foreground">
          Focus on your form. Finish your workout to view analytics.
        </Text>
        <Button
          className="w-full"
          variant="destructive"
          text="End Workout"
          onPress={() => setStatus('completed')}
        />
      </View>
    );
  }

  const isRun = type === 'run';
  const isPlanned = status === 'planned';

  return (
    <View className="flex-1 bg-background">
      {/* 1. HEADER */}
      <View
        className="flex-row items-center justify-between border-b border-border bg-background px-6 pb-4"
        style={{ paddingTop: Math.max(insets.top, 16) }}>
        <TouchableOpacity className="-ml-2 rounded-full p-2 active:bg-secondary">
          <ChevronLeftIcon size={24} className="text-foreground" />
        </TouchableOpacity>

        <View className="flex-row gap-2">
          {/* DEV CONTROLS: Remove in production */}
          <TouchableOpacity
            onPress={() => setType((t) => (t === 'run' ? 'strength' : 'run'))}
            className="rounded bg-secondary px-2 py-1">
            <Text className="text-[10px]">{type.toUpperCase()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStatus((s) => (s === 'planned' ? 'completed' : 'planned'))}
            className="rounded bg-secondary px-2 py-1">
            <Text className="text-[10px]">{status.toUpperCase()}</Text>
          </TouchableOpacity>
          {/* END DEV CONTROLS */}

          <TouchableOpacity className="rounded-full p-2 active:bg-secondary">
            <PenLineIcon size={20} className="text-foreground" />
          </TouchableOpacity>
          <TouchableOpacity className="-mr-2 rounded-full p-2 active:bg-secondary">
            <MoreHorizontalIcon size={24} className="text-foreground" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}>
        {/* 2. TITLE BLOCK */}
        <View className="mb-6">
          <View className="mb-2 flex-row items-center gap-2">
            <View
              className={`rounded-md border border-border px-2 py-1 ${
                isPlanned ? 'bg-secondary' : 'bg-primary/10 border-primary/20'
              }`}>
              <Text
                className={`text-xs font-bold uppercase ${
                  isPlanned ? 'text-muted-foreground' : 'text-primary'
                }`}>
                {status}
              </Text>
            </View>
            <Text className="text-sm text-muted-foreground">Jan 23, 2025 • 6:30 AM</Text>
          </View>
          <Text className="mb-1 text-3xl font-extrabold text-foreground">
            {isRun ? 'Tempo Run' : 'Upper Body Power'}
          </Text>
          <Text className="text-muted-foreground">
            {isRun
              ? 'Building lactate threshold on the river trail.'
              : 'Focus on heavy compound movements.'}
          </Text>
        </View>

        {/* 3. TOP LEVEL METRICS (Adaptive) */}
        <View className="mb-8 flex-row flex-wrap gap-3">
          <MetricCard
            label="Duration"
            value={isPlanned ? '45' : '47:20'}
            unit="min"
            icon={ClockIcon}
          />
          {isRun ? (
            <MetricCard
              label="Distance"
              value={isPlanned ? '8.0' : '8.24'}
              unit="km"
              icon={MapPinIcon}
            />
          ) : (
            <MetricCard
              label="Volume"
              value={isPlanned ? '4.2' : '4.5'}
              unit="tons"
              icon={DumbbellIcon}
            />
          )}
          {!isPlanned && (
            <>
              <MetricCard label="Avg HR" value="145" unit="bpm" icon={ActivityIcon} />
              <MetricCard label="Calories" value="450" unit="kcal" icon={TrendingUpIcon} />
            </>
          )}
        </View>

        {/* 4. COMPLETED RUN: ANALYTICS (Graphs) */}
        {!isPlanned && isRun && (
          <View className="mb-8">
            {/* Custom Segmented Control */}
            <View className="bg-secondary/50 mb-6 flex-row rounded-xl border border-border p-1">
              <TouchableOpacity
                onPress={() => setActiveTab('overview')}
                className={`flex-1 items-center rounded-lg py-2 ${activeTab === 'overview' ? 'border border-border bg-background' : ''}`}>
                <Text
                  className={`text-sm font-bold ${activeTab === 'overview' ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Splits
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveTab('analysis')}
                className={`flex-1 items-center rounded-lg py-2 ${activeTab === 'analysis' ? 'border border-border bg-background' : ''}`}>
                <Text
                  className={`text-sm font-bold ${activeTab === 'analysis' ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Analysis
                </Text>
              </TouchableOpacity>
            </View>

            {activeTab === 'analysis' ? (
              <View className="gap-6">
                {/* HEART RATE GRAPH */}
                <View className="overflow-hidden rounded-3xl border border-border bg-card p-4">
                  <Text className="mb-4 ml-2 font-bold text-foreground">Heart Rate</Text>
                  <LineChart
                    data={HEART_RATE_DATA}
                    areaChart
                    color="#22c55e" // Primary Green
                    startFillColor="rgba(34, 197, 94, 0.2)"
                    endFillColor="rgba(34, 197, 94, 0.01)"
                    thickness={3}
                    curved
                    hideDataPoints
                    hideRules
                    yAxisTextStyle={{ color: '#A0A0A0', fontSize: 10 }}
                    xAxisLabelTextStyle={{ color: '#A0A0A0', fontSize: 10 }}
                    height={180}
                    width={SCREEN_WIDTH - 80}
                    initialSpacing={10}
                  />
                </View>

                {/* PACE GRAPH */}
                <View className="overflow-hidden rounded-3xl border border-border bg-card p-4">
                  <Text className="mb-4 ml-2 font-bold text-foreground">Pace (min/km)</Text>
                  <LineChart
                    data={PACE_DATA}
                    color="#3b82f6" // Blue Accent
                    thickness={3}
                    curved
                    hideDataPoints
                    hideRules
                    yAxisTextStyle={{ color: '#A0A0A0', fontSize: 10 }}
                    xAxisLabelTextStyle={{ color: '#A0A0A0', fontSize: 10 }}
                    height={180}
                    width={SCREEN_WIDTH - 80}
                    initialSpacing={10}
                  />
                </View>
              </View>
            ) : (
              /* SPLITS VIEW */
              <View className="overflow-hidden rounded-2xl border border-border bg-card">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((km, idx) => (
                  <View
                    key={km}
                    className={`flex-row justify-between p-4 ${idx !== 7 ? 'border-b border-border' : ''}`}>
                    <Text className="font-medium text-foreground">{km} km</Text>
                    <View className="flex-row gap-6">
                      <Text className="text-muted-foreground">5:2{idx}</Text>
                      <Text className="font-bold text-foreground">14{idx} bpm</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* 5. PLANNED RUN: STRUCTURE */}
        {isPlanned && isRun && (
          <View>
            <SectionHeader title="Workout Structure" action="Edit" />
            <View className="gap-3">
              <View className="flex-row items-center rounded-xl border border-border bg-card p-4">
                <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                  <TimerIcon size={18} className="text-blue-500" />
                </View>
                <View>
                  <Text className="font-bold text-foreground">Warm Up</Text>
                  <Text className="text-sm text-muted-foreground">10:00 • Easy Pace (Zone 2)</Text>
                </View>
              </View>
              <View className="flex-row items-center rounded-xl border-y border-l-4 border-r border-border border-l-primary bg-card p-4">
                <View className="bg-primary/10 mr-4 h-10 w-10 items-center justify-center rounded-full">
                  <TrendingUpIcon size={18} className="text-primary" />
                </View>
                <View>
                  <Text className="font-bold text-foreground">Tempo Interval</Text>
                  <Text className="text-sm text-muted-foreground">
                    30:00 • Threshold Pace (Zone 4)
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center rounded-xl border border-border bg-card p-4">
                <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                  <TimerIcon size={18} className="text-blue-500" />
                </View>
                <View>
                  <Text className="font-bold text-foreground">Cool Down</Text>
                  <Text className="text-sm text-muted-foreground">10:00 • Recovery Pace</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* 6. STRENGTH: EXERCISES LIST */}
        {!isRun && (
          <View>
            <SectionHeader
              title={isPlanned ? 'Planned Exercises' : 'Completed Log'}
              action={isPlanned ? 'Edit' : undefined}
            />
            <View className="gap-4">
              {[
                { name: 'Barbell Bench Press', sets: '3 sets', reps: '8-10 reps', load: '80kg' },
                {
                  name: 'Incline Dumbbell Press',
                  sets: '3 sets',
                  reps: '10-12 reps',
                  load: '30kg',
                },
                { name: 'Tricep Pushdowns', sets: '4 sets', reps: '12-15 reps', load: '25kg' },
              ].map((ex, i) => (
                <View key={i} className="rounded-2xl border border-border bg-card p-4">
                  <View className="mb-3 flex-row justify-between">
                    <Text className="text-lg font-bold text-foreground">{ex.name}</Text>
                    <MoreHorizontalIcon className="text-muted-foreground" size={20} />
                  </View>

                  {/* Inner Grid for Sets */}
                  <View className="gap-2">
                    {[1, 2, 3].map((set) => (
                      <View
                        key={set}
                        className="bg-secondary/30 flex-row items-center justify-between rounded-lg p-2">
                        <View className="flex-row items-center gap-2">
                          <View className="bg-muted-foreground/20 h-5 w-5 items-center justify-center rounded">
                            <Text className="text-[10px] font-bold text-muted-foreground">
                              {set}
                            </Text>
                          </View>
                          <Text className="text-sm text-foreground">
                            {isPlanned ? ex.load : `${ex.load} x ${ex.reps.split(' ')[0]}`}
                          </Text>
                        </View>
                        {isPlanned ? (
                          <Text className="text-xs text-muted-foreground">{ex.reps}</Text>
                        ) : (
                          <CheckIcon size={14} className="text-primary" />
                        )}
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* FOOTER ACTION BUTTON */}
      {isPlanned && (
        <View
          className="absolute bottom-0 w-full border-t border-border bg-background px-6 pt-4"
          style={{ paddingBottom: Math.max(insets.bottom, 24) }}>
          <Button
            className="w-full shadow-none"
            size="lg"
            text="Start Workout"
            // @ts-ignore
            icon={
              <PlayIcon className="mr-2 text-primary-foreground" fill="currentColor" size={20} />
            }
          />
        </View>
      )}
    </View>
  );
}

// Simple check icon helper
const CheckIcon = ({ size, className }: any) => (
  <View className="bg-primary/20 rounded-full p-1">
    <TrendingUpIcon size={size} className={className} />
  </View>
);
