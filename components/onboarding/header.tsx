import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';
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
    <View className="w-full flex-row items-center">
      <View className="flex-1 items-center">
        <View className="-mt-4 mb-2 gap-2">
          <Text variant="h1" className="whitespace-normal text-left">
            {title}
          </Text>
          {subtitle && <Text className="text-base text-muted-foreground">{subtitle}</Text>}
        </View>

        <Progress value={progress} />
      </View>
      <MascotImage type={mascot} className="h-56 w-36" />
    </View>
  );
}
