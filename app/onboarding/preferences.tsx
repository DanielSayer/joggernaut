import { OnboardingHeader } from '@/components/onboarding/header';
import { OnboardingPageWrapper } from '@/components/onboarding/onboarding-page-wrapper';
import { Button } from '@/components/ui/button';
import { OptionButton } from '@/components/ui/option-button';
import { Text } from '@/components/ui/text';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { saveOnboardingData } from '@/utils/onboarding-storage';
import { useRouter } from 'expo-router';
import {
  CarIcon,
  DumbbellIcon,
  SunIcon,
  SunriseIcon,
  SunsetIcon,
  TrainTrackIcon,
  TreesIcon,
} from 'lucide-react-native';
import React, { useState } from 'react';
import { View } from 'react-native';

const TIME_OPTIONS = [
  { id: 'morning', label: 'Morning', icon: SunriseIcon },
  { id: 'afternoon', label: 'Afternoon', icon: SunIcon },
  { id: 'evening', label: 'Evening', icon: SunsetIcon },
];
const TERRAIN_OPTIONS = [
  { id: 'road', label: 'Road', icon: CarIcon },
  { id: 'trail', label: 'Trail', icon: TreesIcon },
  { id: 'track', label: 'Track', icon: TrainTrackIcon },
  { id: 'treadmill', label: 'Treadmill', icon: DumbbellIcon },
];
const DISTANCE_OPTIONS = ['1-5 km', '5-10 km', '10+ km'];

function PreferencesScreen() {
  const router = useRouter();
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
    <OnboardingPageWrapper
      navButtons={
        <View className="flex-row gap-3">
          <Button variant="secondary" onPress={handleBack} className="flex-1" text="Back" />
          <Button onPress={handleNext} className="flex-1" text="Next" />
        </View>
      }>
      <OnboardingHeader
        mascot="happy"
        title="Your preferences"
        subtitle="Step 3 of 5"
        progress={60}
      />

      <View className="mb-8 gap-3">
        <Text variant="large">When do you prefer to run?</Text>
        <View className="flex-row gap-3">
          {TIME_OPTIONS.map((exp) => (
            <OptionButton
              key={exp.id}
              label={exp.label}
              icon={exp.icon}
              selected={localTimes.includes(exp.id)}
              onPress={() => toggleTime(exp.id)}
            />
          ))}
        </View>
      </View>

      <View className="mb-8 gap-3">
        <Text variant="large">Preferred terrain</Text>
        <View className="w-full flex-row flex-wrap gap-3">
          {TERRAIN_OPTIONS.map((exp) => (
            <View key={exp.id} style={{ width: '48%' }}>
              <OptionButton
                label={exp.label}
                icon={exp.icon}
                selected={localTerrain.includes(exp.id)}
                onPress={() => toggleTerrain(exp.id)}
              />
            </View>
          ))}
        </View>
      </View>

      <View className="gap-3">
        <Text variant="large">Typical running distance</Text>
        <View className="flex-row gap-3">
          {DISTANCE_OPTIONS.map((distance) => (
            <OptionButton
              key={distance}
              label={distance}
              selected={localDistance === distance}
              onPress={() => setLocalDistance(distance)}
            />
          ))}
        </View>
      </View>
    </OnboardingPageWrapper>
  );
}

export default PreferencesScreen;
