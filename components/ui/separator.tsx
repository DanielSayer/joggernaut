import * as React from 'react';
import { View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const separatorVariants = cva('shrink-0 bg-primary', {
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof separatorVariants> {
  decorative?: boolean;
}

const Separator = ({ className, orientation, decorative = true, ...props }: SeparatorProps) => (
  <View
    role={decorative ? undefined : 'separator'}
    className={cn(
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className
    )}
    {...props}
  />
);

export { Separator, separatorVariants };
