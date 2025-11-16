import { MascotImage } from '@/components/mascot-image';
import { Button } from '@/components/ui/button';
import { markOnboardingComplete } from '@/utils/onboarding-storage';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function OnboardingCompleteScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const completeOnboarding = async () => {
      await markOnboardingComplete();
    };
    completeOnboarding();
  }, []);

  const handleGoHome = () => {
    router.navigate('/');
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900" bounces={false}>
      <View
        className="flex-1 items-center justify-center px-6 py-12"
        style={{ paddingTop: insets.top + 20 }}>
        <View className="mb-8 flex items-center">
          <MascotImage type="proud" className="h-96 w-64" />
        </View>

        <Text className="mb-4 text-center text-4xl text-gray-900 dark:text-white">✓</Text>

        <Text className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white">
          You're all set!
        </Text>

        <Text className="mb-8 text-center text-lg leading-6 text-gray-600 dark:text-gray-400">
          Your AI coach is ready to guide you on your running journey.
        </Text>

        <Button onPress={handleGoHome} className="w-full" size="lg" text="Go to running home" />
      </View>
    </ScrollView>
  );
}

export default OnboardingCompleteScreen;
