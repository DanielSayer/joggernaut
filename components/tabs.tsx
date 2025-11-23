import React, { createContext, type ReactNode, useContext } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { PressableProps, ViewProps } from 'react-native';

type TabsContextValue<T extends string> = {
  value: T;
  onValueChange: (value: T) => void;
};

const TabsContext = createContext<TabsContextValue<string> | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (context === null) {
    throw new Error('Tabs components must be used within a Tabs component');
  }
  return context;
};

interface TabsProps<T extends string> extends ViewProps {
  value: T;
  onValueChange: (value: T) => void;
  className?: string;
  children: ReactNode;
}

const Tabs = <T extends string>({
  value,
  onValueChange,
  className = '',
  children,
  ...props
}: TabsProps<T>) => (
  <TabsContext.Provider value={{ value, onValueChange: onValueChange as (value: string) => void }}>
    <View className={className} {...props}>
      {children}
    </View>
  </TabsContext.Provider>
);

interface TabsListProps extends ViewProps {
  className?: string;
  children: ReactNode;
}

const TabsList: React.FC<TabsListProps> = ({ className = '', children, ...props }) => {
  useTabsContext();
  return (
    <View className={`mb-4 flex-row border-b border-border px-2 ${className}`} {...props}>
      {children}
    </View>
  );
};

interface TabsTriggerProps<T extends string> extends PressableProps {
  value: T;
  className?: string;
  children: ReactNode;
}

const TabsTrigger = <T extends string>({
  value,
  className = '',
  children,
  ...props
}: TabsTriggerProps<T>) => {
  const { value: activeValue, onValueChange } = useTabsContext();
  const isActive = activeValue === value;

  return (
    <Pressable
      className={`relative flex-1 items-center py-4 ${className}`}
      onPress={() => onValueChange(value)}
      {...props}>
      <Text className={`text-sm font-bold ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
        {children}
      </Text>
      {isActive && <View className="absolute bottom-0 h-[2px] w-full rounded-t-full bg-primary" />}
    </Pressable>
  );
};

export { Tabs, TabsList, TabsTrigger };
