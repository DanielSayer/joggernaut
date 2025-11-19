import { OnboardingHeader } from '@/components/onboarding/header';
import { OnboardingPageWrapper } from '@/components/onboarding/onboarding-page-wrapper';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { saveOnboardingData } from '@/utils/onboarding-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, View } from 'react-native';

function GarminConnectScreen() {
  const router = useRouter();
  const { setGarminConnected } = useOnboardingStore();

  const handleGarminSync = () => {
    // TODO: Implement actual Garmin sync logic
    Alert.alert('Garmin Sync', 'This would open Garmin authentication flow');
    setGarminConnected(true);
    saveOnboardingData({ garminConnected: true });
  };

  const handleSkip = () => {
    // TODO: Show skip button when ready
    setGarminConnected(false);
    router.navigate('/onboarding/account');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <OnboardingPageWrapper
      navButtons={
        <View className="w-full flex-row gap-3">
          <Button variant="secondary" onPress={handleBack} className="flex-1" text="Back" />
          <Button onPress={handleSkip} className="flex-1" text="Next" />
        </View>
      }>
      <OnboardingHeader
        mascot="point"
        title="Connect your Garmin"
        subtitle="Step 4 of 5"
        progress={80}
      />

      <Text variant="muted">
        Connect your Garmin account to automatically sync your workouts and get AI-powered insights
        on your performance.
      </Text>

      <Button onPress={handleGarminSync} className="my-4 w-full" text="Connect to Garmin" />
    </OnboardingPageWrapper>
  );
}

export default GarminConnectScreen;
