import { View, Image, Pressable, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import {
  ActivityIcon,
  FlameIcon,
  GaugeIcon,
  ImageIcon,
  LucideIcon,
  Share2Icon,
  TimerIcon,
} from 'lucide-react-native';

const WORKOUT_DATA = {
  title: 'Brisbane Running',
  date: '22 Nov @ 7:00 am',
  distance: '5.03',
  time: '28:08',
  calories: '404',
  avgPace: '5:35',
  avgHeartRate: '194',
  maxHeartRate: '209',
  elevationGain: '45m',
};

type StatBoxProps = {
  label: string;
  value: string;
  icon?: LucideIcon;
};

const StatBox = ({ label, value, icon: Icon }: StatBoxProps) => (
  <View className="flex-1 rounded-2xl border border-border bg-card p-4">
    <View className="flex-row items-center gap-2">
      {Icon && <Icon size={14} />}
      <Text className="text-xs font-semibold uppercase text-muted-foreground">{label}</Text>
    </View>
    <Text variant="large">{value}</Text>
  </View>
);

function OverviewTab() {
  return (
    <View className="px-6 pb-12">
      {/* Map Section */}
      <View className="relative mb-6 h-64 w-full overflow-hidden rounded-3xl border border-border bg-secondary">
        {/* Map Placeholder Image */}
        <Image
          source={{ uri: 'https://i.imgur.com/map-placeholder.png' }} // Replace with actual map lib
          className="h-full w-full opacity-80"
          resizeMode="cover"
        />
        <View className="bg-background/90 border-border/50 absolute right-4 top-4 flex-row items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-md">
          <Text className="text-xs font-bold text-foreground">24°C</Text>
          <View className="h-3 w-[1px] bg-border" />
          <Text className="text-xs font-bold text-foreground">Cloudy</Text>
        </View>
      </View>

      {/* Header Info */}
      <View className="mb-4 flex-row items-start justify-between">
        <View>
          <View className="mb-1 flex-row items-center gap-2">
            <ActivityIcon size={14} className="text-primary" />
            <Text className="text-xs font-medium text-muted-foreground">{WORKOUT_DATA.date}</Text>
          </View>
          <Text className="mb-1 text-3xl font-bold text-foreground">{WORKOUT_DATA.title}</Text>
          <TouchableOpacity>
            <Text className="text-sm font-bold text-primary">Add Notes</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Primary Hero Metric */}
      <View className="mb-8">
        <Text className="text-5xl font-extrabold leading-tight text-foreground">
          {WORKOUT_DATA.distance}
          <Text className="text-xl font-medium text-muted-foreground"> km</Text>
        </Text>
      </View>

      {/* Secondary Metrics Grid */}
      <View className="mb-6 flex-row flex-wrap">
        <View className="mb-2 w-1/2 pr-2">
          <StatBox label="Avg Pace" value={`${WORKOUT_DATA.avgPace} /km`} icon={GaugeIcon} />
        </View>
        <View className="mb-2 w-1/2 pl-2">
          <StatBox
            label="Heart Rate"
            value={`${WORKOUT_DATA.avgHeartRate} bpm`}
            icon={ActivityIcon}
          />
        </View>
        <View className="w-1/2 pr-2">
          <StatBox label="Time" value={WORKOUT_DATA.time} icon={TimerIcon} />
        </View>
        <View className="w-1/2 pl-2">
          <StatBox label="Calories" value={WORKOUT_DATA.calories} icon={FlameIcon} />
        </View>
      </View>

      {/* Action Buttons */}
      <View className="mt-2 flex-row gap-4">
        <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-border bg-secondary py-4 active:bg-secondary">
          <ImageIcon size={18} className="text-foreground" />
          <Text className="font-bold text-foreground">Photo</Text>
        </Pressable>
        <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-border bg-secondary py-4 active:bg-secondary">
          <Share2Icon size={18} className="text-foreground" />
          <Text className="font-bold text-foreground">Share</Text>
        </Pressable>
      </View>

      {/* Evaluation Input */}
      <View className="mt-8 border-t border-border pt-6">
        <Text className="mb-4 text-lg font-bold">Evaluation</Text>
        <Pressable className="flex-row items-center justify-between rounded-2xl border border-border bg-card p-4 active:bg-secondary">
          <Text className="font-medium text-muted-foreground">How did it feel?</Text>
          <View className="h-8 w-8 items-center justify-center rounded-full bg-secondary">
            <Text className="text-lg">+</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export { OverviewTab };
