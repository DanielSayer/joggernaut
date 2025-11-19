import { OnboardingHeader } from '@/components/onboarding/header';
import { OnboardingPageWrapper } from '@/components/onboarding/onboarding-page-wrapper';
import { Button } from '@/components/ui/button';
import { OptionButton } from '@/components/ui/option-button';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { saveOnboardingData } from '@/utils/onboarding-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';

const INJURY_OPTIONS = ['Knee', 'Ankle', 'Shin Splints', 'Hip', 'Lower Back', 'Other'];

function InjuryHistoryScreen() {
  const router = useRouter();
  const { injuries, injuryDetails, setInjuries, setInjuryDetails } = useOnboardingStore();
  const [localInjuries, setLocalInjuries] = useState(injuries);
  const [localDetails, setLocalDetails] = useState(injuryDetails);

  const toggleInjury = (injury: string) => {
    setLocalInjuries((prev) => {
      return prev.includes(injury) ? prev.filter((i) => i !== injury) : [...prev, injury];
    });
  };

  const handleNext = async () => {
    // TODO: Add validation if needed
    setInjuries(localInjuries);
    setInjuryDetails(localDetails);
    await saveOnboardingData({ injuries: localInjuries, injuryDetails: localDetails });
    router.navigate('/onboarding/preferences');
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
        mascot="stern"
        title="Any injuries or pain?"
        subtitle="Step 2 of 5"
        progress={40}
      />

      <View className="mb-8 gap-3">
        <Text variant="large">Let us know about past injuries</Text>
        <View className="flex-row flex-wrap gap-3">
          {INJURY_OPTIONS.map((opt) => (
            <View key={opt} style={{ width: '48%' }}>
              <OptionButton
                label={opt}
                selected={localInjuries.includes(opt)}
                onPress={() => toggleInjury(opt)}
              />
            </View>
          ))}
        </View>
        <Text variant="muted" className="text-center">
          If none, great! Leave it blank.
        </Text>
      </View>

      <View>
        <Text variant="large">Other important information</Text>
        <Text variant="muted" className="mb-3">
          Add any additional information or relelant dates, to assist with your running journey.
        </Text>
        <Textarea
          className="bg-card"
          placeholder="Start typing..."
          value={localDetails}
          onChangeText={setLocalDetails}
        />
      </View>
    </OnboardingPageWrapper>
  );
}

export default InjuryHistoryScreen;
