import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type OnboardingPageWrapperProps = {
  children: ReactNode;
  navButtons?: ReactNode;
};

function OnboardingPageWrapper({ children, navButtons }: OnboardingPageWrapperProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: Math.max(insets.top, 16),
        }}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>

      <View
        className="gap-3 px-6 pb-[env(safe-area-inset-bottom)]"
        style={{ paddingBottom: Math.max(insets.bottom, 48) }}>
        {navButtons}
      </View>
    </View>
  );
}

export { OnboardingPageWrapper };
