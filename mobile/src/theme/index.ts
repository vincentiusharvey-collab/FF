import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const lightColors = {
  primary: '#10B981', // Emerald green
  secondary: '#3B82F6', // Blue
  tertiary: '#F59E0B', // Amber
  error: '#EF4444', // Red
  background: '#F9FAFB', // Light gray
  surface: '#FFFFFF',
  surfaceVariant: '#F3F4F6',
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  onBackground: '#1F2937',
  onSurface: '#1F2937',
  outline: '#D1D5DB',
};

const darkColors = {
  primary: '#10B981',
  secondary: '#3B82F6',
  tertiary: '#F59E0B',
  error: '#EF4444',
  background: '#111827', // Dark gray
  surface: '#1F2937',
  surfaceVariant: '#374151',
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  onBackground: '#F9FAFB',
  onSurface: '#F9FAFB',
  outline: '#4B5563',
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...lightColors,
  },
  roundness: 12,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...darkColors,
  },
  roundness: 12,
};
