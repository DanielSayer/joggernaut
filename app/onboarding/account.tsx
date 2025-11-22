import { OnboardingHeader } from '@/components/onboarding/header';
import { OnboardingPageWrapper } from '@/components/onboarding/onboarding-page-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

function AccountScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <OnboardingPageWrapper
      navButtons={
        <View className="w-full flex-row gap-3">
          <Button variant="secondary" onPress={handleBack} className="flex-1" text="Back" />
          <Link asChild href="/onboarding/complete">
            <Button className="flex-1" text="Next" />
          </Link>
        </View>
      }>
      <OnboardingHeader
        mascot="thumbsup"
        title="Your account"
        subtitle="Step 5 of 5"
        progress={100}
      />

      <View className="mb-6 gap-3">
        <Text variant="large">What should we call you?</Text>
        <Input placeholder="Hugh Mongus" />
      </View>

      <View className="mb-6 gap-3">
        <Text variant="large">How old are you?</Text>
        <Input placeholder="18" keyboardType="number-pad" />
      </View>

      <View className="gap-3">
        <Text variant="large">What is your email?</Text>
        <Input placeholder="mongus@example.com" />
      </View>
    </OnboardingPageWrapper>
  );
}

export default AccountScreen;
