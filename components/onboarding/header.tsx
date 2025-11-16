import React from 'react';
import { View, Text } from 'react-native';
import { MascotImage } from '../mascot-image';
import { Progress } from '../ui/progress';

interface OnboardingHeaderProps {
  mascot: React.ComponentProps<typeof MascotImage>['type'];
  title: string;
  subtitle?: string;
  progress: number;
}

export function OnboardingHeader({ mascot, title, subtitle, progress }: OnboardingHeaderProps) {
  return (
    <View className="mb-6">
      <View className="mb-6 flex items-center">
        <MascotImage type={mascot} className="h-72 w-48" />
      </View>

      <View className="mb-2">
        <Text className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{title}</Text>
        {subtitle && <Text className="text-base text-gray-600 dark:text-gray-400">{subtitle}</Text>}
      </View>

      <Progress value={progress} />
    </View>
  );
}
