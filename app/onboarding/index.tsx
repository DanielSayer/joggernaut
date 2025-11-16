import { MascotImage } from '@/components/mascot-image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900" bounces={false}>
      <View
        className="flex-1 items-center justify-center px-6 py-12"
        style={{ paddingTop: insets.top + 20 }}>
        <View className="mb-8 flex items-center">
          <MascotImage type="cheer" className="h-96 w-64" />
        </View>

        <Text className="mb-4 text-center text-4xl font-bold text-gray-900 dark:text-white">
          Welcome to CoachAI
        </Text>

        <Text className="mb-8 text-center text-lg leading-6 text-gray-600 dark:text-gray-400">
          Your personal running coach is ready to help you reach your goals. Let's get started!
        </Text>

        <Button
          onPress={() => router.navigate('/onboarding/profile')}
          size="lg"
          className="w-full"
          text="Get Started"
        />
      </View>
    </ScrollView>
  );
}

export default WelcomeScreen;
