import { MascotImage } from '@/components/mascot-image';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';

function IntroductionScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center">
        <View className="items-center">
          <MascotImage type="wave" className="h-96 w-64" />
          <Text variant="lead" className="text-center">
            Hi! I am Dash, {'\n'} your personal running coach.
          </Text>
        </View>
      </View>
      <View className="px-6 py-12">
        <View className="w-full gap-3">
          <Button
            onPress={() => router.navigate('/onboarding/profile')}
            size="lg"
            className="w-full"
            text="Let's go"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default IntroductionScreen;
