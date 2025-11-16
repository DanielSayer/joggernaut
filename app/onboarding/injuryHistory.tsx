import { OnboardingHeader } from '@/components/onboarding/header';
import { Button } from '@/components/ui/button';
import { OptionButton } from '@/components/ui/option-button';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { saveOnboardingData } from '@/utils/onboarding-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const INJURY_OPTIONS = ['None', 'Knee', 'Ankle', 'Shin Splints', 'Hip', 'Lower Back', 'Other'];

function InjuryHistoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { injuries, setInjuries } = useOnboardingStore();
  const [localInjuries, setLocalInjuries] = useState(injuries);

  const toggleInjury = (injury: string) => {
    if (injury === 'None') {
      setLocalInjuries(localInjuries.includes('None') ? [] : ['None']);
    } else {
      setLocalInjuries((prev) => {
        const filtered = prev.filter((i) => i !== 'None');
        return filtered.includes(injury)
          ? filtered.filter((i) => i !== injury)
          : [...filtered, injury];
      });
    }
  };

  const handleNext = async () => {
    // TODO: Add validation if needed
    setInjuries(localInjuries);
    await saveOnboardingData({ injuries: localInjuries });
    router.navigate('/onboarding/preferences');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900" bounces={false}>
      <View className="px-6 py-8" style={{ paddingTop: Math.max(insets.top, 16) }}>
        <OnboardingHeader
          mascot="stern"
          title="Any injuries or pain?"
          subtitle="Step 2 of 5"
          progress={40}
        />

        <Text className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Let us know about past injuries
        </Text>
        <View className="mb-8 gap-3">
          {INJURY_OPTIONS.map((injury) => (
            <OptionButton
              key={injury}
              label={injury}
              selected={localInjuries.includes(injury)}
              onPress={() => toggleInjury(injury)}
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

export default InjuryHistoryScreen;
