import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import React from 'react';
import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function WelcomeScreen() {
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

      <View className="gap-3 px-6 pb-12">
        <View className="gap-3">
          <Link href="/onboarding/introduction" asChild>
            <Button size="lg" className="w-full" text="Get Started" />
          </Link>
          <Link href="/onboarding/profile" asChild>
            <Button size="lg" variant="secondary" className="w-full" text="I have an account" />
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen;
