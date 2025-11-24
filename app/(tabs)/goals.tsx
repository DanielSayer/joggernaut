import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChevronLeftIcon,
  TrophyIcon,
  TargetIcon,
  FlameIcon,
  FootprintsIcon,
  CalendarDaysIcon,
  ClockIcon,
  PlusIcon,
  MinusIcon,
  XIcon,
  Trash2Icon,
  type LucideIcon,
} from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

// --- TYPES ---
type GoalType = 'distance' | 'frequency' | 'time' | 'calories';
type Period = 'weekly' | 'monthly';

interface GoalConfig {
  id: string;
  type: GoalType;
  title: string;
  targetValue: number;
  period: Period;
  unit: string;
  icon: LucideIcon;
  currentValue?: number; // For active goals
}

// --- PRESETS ---
const GOAL_PRESETS: GoalConfig[] = [
  {
    id: 'p1',
    type: 'distance',
    title: 'Distance Builder',
    targetValue: 20,
    period: 'weekly',
    unit: 'km',
    icon: FootprintsIcon,
  },
  {
    id: 'p2',
    type: 'frequency',
    title: 'Consistency',
    targetValue: 3,
    period: 'weekly',
    unit: 'runs',
    icon: CalendarDaysIcon,
  },
  {
    id: 'p3',
    type: 'time',
    title: 'Time on Feet',
    targetValue: 120,
    period: 'weekly',
    unit: 'min',
    icon: ClockIcon,
  },
  {
    id: 'p4',
    type: 'calories',
    title: 'Calorie Burn',
    targetValue: 2000,
    period: 'weekly',
    unit: 'kcal',
    icon: FlameIcon,
  },
];

// --- MOCK ACTIVE GOALS ---
const INITIAL_ACTIVE_GOALS: GoalConfig[] = [
  {
    id: 'a1',
    type: 'distance',
    title: 'Weekly Distance',
    targetValue: 25,
    currentValue: 18.5,
    period: 'weekly',
    unit: 'km',
    icon: FootprintsIcon,
  },
];

const ActiveGoalCard = ({ goal, onDelete }: { goal: GoalConfig; onDelete: () => void }) => {
  const theme = useTheme();
  const progress = Math.min(100, ((goal.currentValue || 0) / goal.targetValue) * 100);
  const Icon = goal.icon;

  return (
    <View className="mb-4 rounded-2xl border border-border bg-card p-5">
      <View className="mb-3 flex-row items-start justify-between">
        <View className="flex-row items-center gap-3">
          <View className={`rounded-xl bg-secondary p-2`}>
            <Icon size={20} />
          </View>
          <View>
            <Text className="text-lg font-bold text-foreground">{goal.title}</Text>
            <Text className="text-xs uppercase text-muted-foreground">{goal.period} Goal</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onDelete} className="-mr-2 p-2 opacity-50">
          <Trash2Icon size={18} color={theme.destructive} />
        </TouchableOpacity>
      </View>

      <View className="mb-3 flex-row items-end gap-1">
        <Text className="text-3xl font-extrabold text-foreground">{goal.currentValue}</Text>
        <Text className="mb-1 text-lg font-medium text-muted-foreground">
          / {goal.targetValue} {goal.unit}
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="h-3 w-full overflow-hidden rounded-full bg-secondary">
        <View className="h-full bg-primary" style={{ width: `${progress}%` }} />
      </View>
    </View>
  );
};

const PresetCard = ({ preset, onPress }: { preset: GoalConfig; onPress: () => void }) => {
  const Icon = preset.icon;
  return (
    <TouchableOpacity
      onPress={onPress}
      className="min-w-[45%] flex-1 rounded-2xl border border-border bg-card p-4 transition-colors active:bg-secondary">
      <View className="mb-3 h-10 w-10 items-center justify-center rounded-full bg-secondary">
        <Icon size={20} />
      </View>
      <Text className="mb-1 text-base font-bold text-foreground">{preset.title}</Text>
      <Text className="text-sm text-muted-foreground">
        Target: {preset.targetValue} {preset.unit}/{preset.period === 'weekly' ? 'wk' : 'mo'}
      </Text>
    </TouchableOpacity>
  );
};

// --- EDITOR SHEET ---
const GoalEditor = ({
  visible,
  goal,
  onClose,
  onSave,
}: {
  visible: boolean;
  goal: GoalConfig | null;
  onClose: () => void;
  onSave: (goal: GoalConfig) => void;
}) => {
  const insets = useSafeAreaInsets();
  const [localTarget, setLocalTarget] = useState(goal?.targetValue || 0);
  const [localPeriod, setLocalPeriod] = useState<Period>(goal?.period || 'weekly');

  // Sync state when goal opens
  React.useEffect(() => {
    if (goal) {
      setLocalTarget(goal.targetValue);
      setLocalPeriod(goal.period);
    }
  }, [goal]);

  if (!visible || !goal) return null;

  const Icon = goal.icon;
  const step = goal.type === 'distance' ? 5 : goal.type === 'frequency' ? 1 : 10;

  const increment = () => setLocalTarget((prev) => prev + step);
  const decrement = () => setLocalTarget((prev) => Math.max(step, prev - step));

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View className="flex-1 justify-end bg-black/60">
        {/* Click backdrop to close */}
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />

        {/* Sheet Content */}
        <View
          className="overflow-hidden rounded-t-[32px] border-t border-border bg-background"
          style={{ paddingBottom: Math.max(insets.bottom, 24) }}>
          {/* Handle Bar */}
          <View className="items-center pb-2 pt-3">
            <View className="h-1.5 w-12 rounded-full bg-border" />
          </View>

          <View className="px-6 py-4">
            <View className="mb-6 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="rounded-xl bg-secondary p-3">
                  <Icon size={24} />
                </View>
                <View>
                  <Text className="text-xl font-bold text-foreground">Set Target</Text>
                  <Text className="text-muted-foreground">{goal.title}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={onClose} className="rounded-full bg-secondary p-2">
                <XIcon size={20} className="text-foreground" />
              </TouchableOpacity>
            </View>

            {/* Value Stepper */}
            <View className="mb-6 flex-row items-center justify-between rounded-2xl border border-border bg-card p-2">
              <TouchableOpacity
                onPress={decrement}
                className="h-16 w-16 items-center justify-center rounded-xl bg-secondary active:scale-95">
                <MinusIcon size={24} className="text-foreground" />
              </TouchableOpacity>

              <View className="items-center">
                <Text className="text-4xl font-extrabold text-foreground">{localTarget}</Text>
                <Text className="font-medium uppercase text-muted-foreground">{goal.unit}</Text>
              </View>

              <TouchableOpacity
                onPress={increment}
                className="h-16 w-16 items-center justify-center rounded-xl bg-primary active:scale-95">
                <PlusIcon size={24} className="text-primary-foreground" />
              </TouchableOpacity>
            </View>

            {/* Period Toggle */}
            <View className="mb-8 flex-row rounded-xl bg-secondary p-1">
              <TouchableOpacity
                onPress={() => setLocalPeriod('weekly')}
                className={`flex-1 items-center rounded-lg py-3 ${localPeriod === 'weekly' ? 'bg-background' : ''}`}>
                <Text
                  className={`font-bold ${localPeriod === 'weekly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Weekly
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLocalPeriod('monthly')}
                className={`flex-1 items-center rounded-lg py-3 ${localPeriod === 'monthly' ? 'bg-background' : ''}`}>
                <Text
                  className={`font-bold ${localPeriod === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Monthly
                </Text>
              </TouchableOpacity>
            </View>

            <Button
              text="Save Goal"
              size="lg"
              onPress={() => onSave({ ...goal, targetValue: localTarget, period: localPeriod })}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

// --- MAIN SCREEN ---

export default function GoalsScreen() {
  const insets = useSafeAreaInsets();
  const [activeGoals, setActiveGoals] = useState<GoalConfig[]>(INITIAL_ACTIVE_GOALS);
  const [editingPreset, setEditingPreset] = useState<GoalConfig | null>(null);

  const handleSaveGoal = (newGoal: GoalConfig) => {
    // Check if goal already exists, update it, otherwise add new
    setActiveGoals((prev) => {
      const exists = prev.find((g) => g.type === newGoal.type);
      if (exists) {
        return prev.map((g) =>
          g.type === newGoal.type ? { ...newGoal, currentValue: g.currentValue } : g
        );
      }
      return [...prev, { ...newGoal, currentValue: 0 }];
    });
    setEditingPreset(null);
  };

  const handleDeleteGoal = (id: string) => {
    setActiveGoals((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View
        className="border-b border-border bg-background px-6 pb-4"
        style={{ paddingTop: Math.max(insets.top, 16) }}>
        <View className="mb-1 flex-row items-center gap-4">
          <Text className="text-2xl font-bold text-foreground">Your Goals</Text>
        </View>
        <Text className="text-muted-foreground">Set targets to keep your streak alive.</Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        {/* Active Goals Section */}
        <View className="mb-8">
          <View className="mb-4 flex-row items-center gap-2">
            <TargetIcon size={18} className="text-primary" />
            <Text className="text-lg font-bold text-foreground">Active Targets</Text>
          </View>

          {activeGoals.length === 0 ? (
            <View className="items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card p-8">
              <TrophyIcon size={32} className="text-muted-foreground/30" />
              <Text className="text-center text-muted-foreground">
                No active goals. Select a preset below to get started!
              </Text>
            </View>
          ) : (
            activeGoals.map((goal) => (
              <ActiveGoalCard
                key={goal.id}
                goal={goal}
                onDelete={() => handleDeleteGoal(goal.id)}
              />
            ))
          )}
        </View>

        {/* Presets Section */}
        <View>
          <Text className="mb-4 text-lg font-bold text-foreground">Add New Goal</Text>
          <View className="flex-row flex-wrap gap-3">
            {GOAL_PRESETS.map((preset) => (
              <PresetCard
                key={preset.id}
                preset={preset}
                onPress={() => setEditingPreset(preset)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Configuration Modal */}
      <GoalEditor
        visible={!!editingPreset}
        goal={editingPreset}
        onClose={() => setEditingPreset(null)}
        onSave={handleSaveGoal}
      />
    </View>
  );
}
