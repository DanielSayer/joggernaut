import { OnboardingHeader } from '@/components/onboarding/header';
import { Button } from '@/components/ui/button';
import { OptionButton } from '@/components/ui/option-button';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { saveOnboardingData } from '@/utils/onboarding-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TIME_OPTIONS = ['Morning', 'Afternoon', 'Evening'];
const TERRAIN_OPTIONS = ['Road', 'Trail', 'Track', 'Treadmill'];
const DISTANCE_OPTIONS = ['1-5 km', '5-10 km', '10+ km'];

function PreferencesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    preferredTimes,
    preferredTerrain,
    distanceRange,
    setPreferredTimes,
    setPreferredTerrain,
    setDistanceRange,
  } = useOnboardingStore();
  const [localTimes, setLocalTimes] = useState(preferredTimes);
  const [localTerrain, setLocalTerrain] = useState(preferredTerrain);
  const [localDistance, setLocalDistance] = useState(distanceRange);

  const toggleTime = (time: string) => {
    setLocalTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const toggleTerrain = (terrain: string) => {
    setLocalTerrain((prev) =>
      prev.includes(terrain) ? prev.filter((t) => t !== terrain) : [...prev, terrain]
    );
  };

  const handleNext = async () => {
    // TODO: Add validation - require at least one time and terrain
    setPreferredTimes(localTimes);
    setPreferredTerrain(localTerrain);
    setDistanceRange(localDistance || '');
    await saveOnboardingData({
      preferredTimes: localTimes,
      preferredTerrain: localTerrain,
      distanceRange: localDistance,
    });
    router.navigate('/onboarding/connect');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900" bounces={false}>
      <View className="px-6 py-8" style={{ paddingTop: Math.max(insets.top, 16) }}>
        <OnboardingHeader
          mascot="happy"
          title="Your preferences"
          subtitle="Step 3 of 5"
          progress={60}
        />

        <Text className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          When do you prefer to run?
        </Text>
        <View className="mb-8 gap-3">
          {TIME_OPTIONS.map((time) => (
            <OptionButton
              key={time}
              label={time}
              selected={localTimes.includes(time)}
              onPress={() => toggleTime(time)}
            />
          ))}
        </View>

        <Text className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Preferred terrain
        </Text>
        <View className="mb-8 gap-3">
          {TERRAIN_OPTIONS.map((terrain) => (
            <OptionButton
              key={terrain}
              label={terrain}
              selected={localTerrain.includes(terrain)}
              onPress={() => toggleTerrain(terrain)}
            />
          ))}
        </View>

        <Text className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Typical running distance
        </Text>
        <View className="mb-8 gap-3">
          {DISTANCE_OPTIONS.map((distance) => (
            <OptionButton
              key={distance}
              label={distance}
              selected={localDistance === distance}
              onPress={() => setLocalDistance(distance)}
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

export default PreferencesScreen;
