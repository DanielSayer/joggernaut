import { ActivityIcon, FootprintsIcon, GaugeIcon, TrendingUpIcon } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

const STATS_GROUPS = [
  {
    title: 'Pace',
    icon: GaugeIcon,
    data: [
      { label: 'Avg Pace', value: '5:35 /km' },
      { label: 'Avg Moving Pace', value: '5:35 /km' },
      { label: 'Best Pace', value: '4:42 /km' },
    ],
  },
  {
    title: 'Speed',
    icon: TrendingUpIcon,
    data: [
      { label: 'Avg Speed', value: '10.7 km/h' },
      { label: 'Avg Moving Speed', value: '10.7 km/h' },
      { label: 'Max Speed', value: '12.8 km/h' },
    ],
  },
  {
    title: 'Heart Rate',
    icon: ActivityIcon,
    data: [
      { label: 'Avg Heart Rate', value: '194 bpm' },
      { label: 'Max Heart Rate', value: '209 bpm' },
    ],
  },
  {
    title: 'Run Dynamics',
    icon: FootprintsIcon,
    data: [
      { label: 'Avg Cadence', value: '159 spm' },
      { label: 'Avg Stride Length', value: '1.13 m' },
    ],
  },
];

const DetailRow = ({
  label,
  value,
  isLast,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) => (
  <View className={`flex-row justify-between py-4 ${!isLast ? 'border-b border-border' : ''}`}>
    <Text className="text-sm font-medium text-muted-foreground">{label}</Text>
    <Text className="font-semibold text-foreground">{value}</Text>
  </View>
);

function StatsTab() {
  return (
    <View className="px-6 pb-12">
      {STATS_GROUPS.map((group) => {
        const Icon = group.icon;
        return (
          <View
            key={group.title}
            className="mb-8 overflow-hidden rounded-2xl border border-border bg-card">
            {/* Section Header */}
            <View className="flex-row items-center gap-2 border-b border-border bg-secondary px-4 py-3">
              <Icon size={16} className="text-primary" />
              <Text className="text-xs font-bold uppercase tracking-wider text-primary">
                {group.title}
              </Text>
            </View>

            {/* Rows */}
            <View className="px-4">
              {group.data.map((stat, index) => (
                <DetailRow
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  isLast={index === group.data.length - 1}
                />
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}

export { StatsTab };
