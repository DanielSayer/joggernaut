import { OnboardingHeader } from '@/components/onboarding/header';
import { Button } from '@/components/ui/button';
import { OptionButton } from '@/components/ui/option-button';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { saveOnboardingData } from '@/utils/onboarding-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const EXPERIENCE_OPTIONS = ['Beginner', 'Intermediate', 'Advanced'];
const GOAL_OPTIONS = ['Speed', 'Distance', 'Consistency', 'Health'];

function ProfileBasicsScreen() {
  const insets = useSafeAreaInsets();
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
    <ScrollView className="flex-1 bg-white dark:bg-gray-900" bounces={false}>
      <View className="px-6 py-8" style={{ paddingTop: Math.max(insets.top, 16) }}>
        <OnboardingHeader
          mascot="think"
          title="Tell us about yourself"
          subtitle="Step 1 of 5"
          progress={20}
        />

        <Text className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Running Experience
        </Text>
        <View className="mb-8 gap-3">
          {EXPERIENCE_OPTIONS.map((exp) => (
            <OptionButton
              key={exp}
              label={exp}
              selected={localExperience === exp}
              onPress={() => setLocalExperience(exp)}
            />
          ))}
        </View>

        <Text className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          What are your goals?
        </Text>
        <View className="mb-8 gap-3">
          {GOAL_OPTIONS.map((goal) => (
            <OptionButton
              key={goal}
              label={goal}
              selected={localGoals.includes(goal)}
              onPress={() => toggleGoal(goal)}
            />
          ))}
        </View>

        <View className="mb-8 flex-row gap-3">
          <Button variant="secondary" onPress={handleBack} className="flex-1" text="Back" />
          <Button onPress={handleNext} className="flex-1" text="Next" />
        </View>
      </View>
    </ScrollView>
  );
}

export default ProfileBasicsScreen;
