import { create } from 'zustand';

export interface OnboardingState {
  experience: string | null;
  goals: string[];
  injuries: string[];
  injuryDetails: string;
  preferredTimes: string[];
  preferredTerrain: string[];
  distanceRange: string | null;
  garminConnected: boolean;
  setExperience: (experience: string) => void;
  setGoals: (goals: string[]) => void;
  setInjuries: (injuries: string[]) => void;
  setInjuryDetails: (details: string) => void;
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
  injuryDetails: '',
  preferredTimes: [],
  preferredTerrain: [],
  distanceRange: null,
  garminConnected: false,
  setExperience: (experience) => set({ experience }),
  setGoals: (goals) => set({ goals }),
  setInjuries: (injuries) => set({ injuries }),
  setInjuryDetails: (details) => set({ injuryDetails: details }),
  setPreferredTimes: (times) => set({ preferredTimes: times }),
  setPreferredTerrain: (terrain) => set({ preferredTerrain: terrain }),
  setDistanceRange: (range) => set({ distanceRange: range }),
  setGarminConnected: (connected) => set({ garminConnected: connected }),
  reset: () =>
    set({
      experience: null,
      goals: [],
      injuries: [],
      injuryDetails: '',
      preferredTimes: [],
      preferredTerrain: [],
      distanceRange: null,
      garminConnected: false,
    }),
}));
