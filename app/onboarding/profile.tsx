import { OnboardingHeader } from '@/components/onboarding/header';
import { OnboardingPageWrapper } from '@/components/onboarding/onboarding-page-wrapper';
import { Button } from '@/components/ui/button';
import { OptionButton } from '@/components/ui/option-button';
import { Text } from '@/components/ui/text';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { saveOnboardingData } from '@/utils/onboarding-storage';
import { useRouter } from 'expo-router';
import {
  ActivityIcon,
  BatteryIcon,
  CalendarDaysIcon,
  DumbbellIcon,
  HeartIcon,
  RabbitIcon,
  RulerIcon,
  TurtleIcon,
  ZapIcon,
} from 'lucide-react-native';
import React, { useState } from 'react';
import { View } from 'react-native';

const EXPERIENCE_OPTIONS = [
  { id: 'beginner', label: 'Beginner', icon: TurtleIcon },
  { id: 'intermediate', label: 'Intermediate', icon: ActivityIcon },
  { id: 'advanced', label: 'Advanced', icon: RabbitIcon },
];

const GOAL_OPTIONS = [
  { id: 'speed', label: 'Speed', icon: ZapIcon },
  { id: 'distance', label: 'Distance', icon: RulerIcon },
  { id: 'consistency', label: 'Consistency', icon: CalendarDaysIcon },
  { id: 'endurance', label: 'Endurance', icon: BatteryIcon },
  { id: 'strength', label: 'Strength', icon: DumbbellIcon },
  { id: 'health', label: 'Health', icon: HeartIcon },
];

function ProfileBasicsScreen() {
  const router = useRouter();
  const { experience, goals, setExperience, setGoals } = useOnboardingStore();
  const [localExperience, setLocalExperience] = useState(experience);
  const [localGoals, setLocalGoals] = useState(goals);

  const toggleGoal = (goal: string) => {
    setLocalGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleNext = async () => {
    // TODO: Add validation - require at least experience and 1 goal selected
    setExperience(localExperience || '');
    setGoals(localGoals);
    await saveOnboardingData({
      experience: localExperience,
      goals: localGoals,
    });
    router.navigate('/onboarding/injuryHistory');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <OnboardingPageWrapper
      navButtons={
        <View className="flex-row gap-3">
          <Button variant="secondary" onPress={handleBack} className="flex-1" text="Back" />
          <Button onPress={handleNext} className="flex-1" text="Next" />
        </View>
      }>
      <OnboardingHeader
        mascot="think"
        title="Tell us about yourself"
        subtitle="Step 1 of 5"
        progress={20}
      />

      <View className="mb-8 gap-3">
        <Text variant="large">Running Experience</Text>
        <View className="flex-row gap-3">
          {EXPERIENCE_OPTIONS.map((exp) => (
            <OptionButton
              key={exp.id}
              label={exp.label}
              icon={exp.icon}
              selected={localExperience === exp.id}
              onPress={() => setLocalExperience(exp.id)}
            />
          ))}
        </View>
      </View>

      <View className="gap-3">
        <Text variant="large">What are your goals?</Text>
        <View className="w-full flex-row flex-wrap gap-3">
          {GOAL_OPTIONS.map((exp) => (
            <View key={exp.id} style={{ width: '48%' }}>
              <OptionButton
                label={exp.label}
                icon={exp.icon}
                selected={localGoals.includes(exp.id)}
                onPress={() => toggleGoal(exp.id)}
              />
            </View>
          ))}
        </View>
      </View>
    </OnboardingPageWrapper>
  );
}

export default ProfileBasicsScreen;
