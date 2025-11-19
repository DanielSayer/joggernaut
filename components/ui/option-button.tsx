import { Text } from '@/components/ui/text';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { Pressable, PressableProps } from 'react-native';

interface OptionButtonProps extends PressableProps {
  label: string;
  selected?: boolean;
  icon?: LucideIcon;
}

export function OptionButton({
  label,
  selected = false,
  className,
  icon: Icon,
  ...props
}: OptionButtonProps) {
  const { primary } = useTheme();

  return (
    <Pressable
      className={cn(
        'min-h-20 flex-1 items-center justify-center rounded-lg border-2 px-4 py-3',
        {
          'border-primary bg-accent': selected,
          'border-border bg-card': !selected,
        },
        className
      )}
      {...props}>
      {Icon && <Icon color={primary} size={24} />}
      <Text
        variant="small"
        className={cn('mt-1 font-medium', {
          'text-accent-foreground': selected,
          'text-card-foreground': !selected,
        })}>
        {label}
      </Text>
    </Pressable>
  );
}
