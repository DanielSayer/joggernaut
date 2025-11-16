import React from 'react';
import { Pressable, Text, PressableProps } from 'react-native';

interface OptionButtonProps extends PressableProps {
  label: string;
  selected?: boolean;
}

export function OptionButton({ label, selected = false, ...props }: OptionButtonProps) {
  return (
    <Pressable
      className={`rounded-lg border-2 px-4 py-3 ${
        selected
          ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900'
          : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
      }`}
      {...props}>
      <Text
        className={`font-medium ${
          selected ? 'text-blue-600 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
        }`}>
        {label}
      </Text>
    </Pressable>
  );
}
