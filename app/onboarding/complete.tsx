import { MascotImage } from '@/components/mascot-image';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import confettiAnimation from '@/assets/animations/confetti.json';

function OnboardingCompleteScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const confettiRef = useRef<LottieView>(null);

  const handleGoHome = () => {
    router.navigate('/(tabs)');
  };

  return (
    <View className="flex-1 bg-background">
      <LottieView
        ref={confettiRef}
        source={confettiAnimation}
        autoPlay={true}
        loop={false}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      />

      <View
        className="flex-1 items-center justify-center px-6 py-12"
        style={{ paddingTop: insets.top + 20 }}>
        <View className="mb-8 flex items-center">
          <MascotImage type="proud" className="h-96 w-64" />
        </View>

        <Text variant="h1" className="mb-2">
          You're all set!
        </Text>
        <Text variant="lead" className="text-center">
          Get personalized running plans, real-time coaching, and track your progress.
        </Text>

        <Button onPress={handleGoHome} className="mt-4 w-full" size="lg" text="Start Running" />
      </View>
    </View>
  );
}

export default OnboardingCompleteScreen;
