import { OnboardingState } from '@/stores/onboarding-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = 'onboarding_data';
const ONBOARDING_COMPLETE_KEY = 'onboarding_complete';

export const saveOnboardingData = async (data: Partial<OnboardingState>) => {
  try {
    const existing = await AsyncStorage.getItem(ONBOARDING_KEY);
    const merged = { ...JSON.parse(existing || '{}'), ...data };
    await AsyncStorage.setItem(ONBOARDING_KEY, JSON.stringify(merged));
  } catch (error) {
    console.error('Error saving onboarding data:', error);
  }
};

export const getOnboardingData = async (): Promise<Partial<OnboardingState>> => {
  try {
    const data = await AsyncStorage.getItem(ONBOARDING_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error retrieving onboarding data:', error);
    return {};
  }
};

export const markOnboardingComplete = async () => {
  try {
    await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
  } catch (error) {
    console.error('Error marking onboarding complete:', error);
  }
};

export const isOnboardingComplete = async (): Promise<boolean> => {
  try {
    const complete = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
    return complete === 'true';
  } catch (error) {
    console.error('Error checking onboarding complete:', error);
    return false;
  }
};

export const clearOnboardingData = async () => {
  try {
    await AsyncStorage.removeItem(ONBOARDING_KEY);
    await AsyncStorage.removeItem(ONBOARDING_COMPLETE_KEY);
  } catch (error) {
    console.error('Error clearing onboarding data:', error);
  }
};
