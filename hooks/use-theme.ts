import { THEME } from '@/lib/theme';
import { useColorScheme } from './use-color-scheme';

const useTheme = () => {
  const colorScheme = useColorScheme();
  return THEME[colorScheme ?? 'light'];
};

export { useTheme };
