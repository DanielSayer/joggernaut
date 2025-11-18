import { Button } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@/components/ui/text';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center">
        <View className="mt-20 items-center gap-2">
          <View className="flex-row items-center">
            <Image source={require('../../assets/logo.png')} className="h-20 w-20" />
            <Text variant="h1" className="text-5xl tracking-normal" style={{ lineHeight: 70 }}>
              Joggernaut
            </Text>
          </View>
          <Text className="text-2xl text-muted-foreground">Run relentlessly, with confidence.</Text>
        </View>
      </View>

      <View className="flex-1 items-center justify-end px-6 py-12">
        <View className="w-full gap-3">
          <Button
            onPress={() => router.navigate('/onboarding/introduction')}
            size="lg"
            className="w-full"
            text="Get Started"
          />
          <Button
            onPress={() => router.navigate('/onboarding/profile')}
            size="lg"
            variant="secondary"
            className="w-full"
            text="I have an account"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen;
