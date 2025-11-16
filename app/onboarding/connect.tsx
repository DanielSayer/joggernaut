import { OnboardingHeader } from '@/components/onboarding/header';
import { Button } from '@/components/ui/button';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { saveOnboardingData } from '@/utils/onboarding-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function GarminConnectScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
    router.navigate('/onboarding/complete');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900" bounces={false}>
      <View className="px-6 py-8" style={{ paddingTop: Math.max(insets.top, 16) }}>
        <OnboardingHeader
          mascot="point"
          title="Connect your Garmin"
          subtitle="Step 4 of 5"
          progress={80}
        />

        <Text className="mb-6 text-base leading-6 text-gray-600 dark:text-gray-400">
          Connect your Garmin account to automatically sync your workouts and get AI-powered
          insights on your performance.
        </Text>

        <View className="mb-8 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-700 dark:bg-blue-900">
          <Text className="text-sm text-blue-900 dark:text-blue-200">
            💡 Your data is secure. We only access workout data to provide coaching insights.
          </Text>
        </View>

        <Button onPress={handleGarminSync} className="mb-4 w-full" text="Connect to Garmin" />

        <View className="mb-8 flex-row gap-3">
          <Button variant="secondary" onPress={handleBack} className="flex-1" text="Back" />
          <Button onPress={handleSkip} className="flex-1" text="Skip" />
        </View>
      </View>
    </ScrollView>
  );
}

export default GarminConnectScreen;
