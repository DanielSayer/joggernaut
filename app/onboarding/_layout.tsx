import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="introduction" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="injuryHistory" options={{ headerShown: false }} />
      <Stack.Screen name="preferences" options={{ headerShown: false }} />
      <Stack.Screen name="connect" options={{ headerShown: false }} />
      <Stack.Screen name="complete" options={{ headerShown: false }} />
    </Stack>
  );
}
