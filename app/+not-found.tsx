import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-extrabold tracking-tighter text-primary">404</Text>
        <Text variant="h1" className="px-12">
          This screen doesn't exist.
        </Text>

        <Link href="/" className="mt-4" asChild>
          <Button text="Go to home screen!" />
        </Link>
      </View>
    </>
  );
}
