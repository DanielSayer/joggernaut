// store/onboardingStore.ts
import { create } from 'zustand';

export interface OnboardingState {
  experience: string | null;
  goals: string[];
  injuries: string[];
  preferredTimes: string[];
  preferredTerrain: string[];
  distanceRange: string | null;
  garminConnected: boolean;
  setExperience: (experience: string) => void;
  setGoals: (goals: string[]) => void;
  setInjuries: (injuries: string[]) => void;
  setPreferredTimes: (times: string[]) => void;
  setPreferredTerrain: (terrain: string[]) => void;
  setDistanceRange: (range: string) => void;
  setGarminConnected: (connected: boolean) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  experience: null,
  goals: [],
  injuries: [],
  preferredTimes: [],
  preferredTerrain: [],
  distanceRange: null,
  garminConnected: false,
  setExperience: (experience) => set({ experience }),
  setGoals: (goals) => set({ goals }),
  setInjuries: (injuries) => set({ injuries }),
  setPreferredTimes: (times) => set({ preferredTimes: times }),
  setPreferredTerrain: (terrain) => set({ preferredTerrain: terrain }),
  setDistanceRange: (range) => set({ distanceRange: range }),
  setGarminConnected: (connected) => set({ garminConnected: connected }),
  reset: () =>
    set({
      experience: null,
      goals: [],
      injuries: [],
      preferredTimes: [],
      preferredTerrain: [],
      distanceRange: null,
      garminConnected: false,
    }),
}));
