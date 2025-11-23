import { ScrollView, View } from 'react-native';
import { Text } from '@/components/ui/text';

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

const LAPS_DATA = [
  { id: 1, time: '5:36.8', distance: '1.00', pace: '5:37' },
  { id: 2, time: '5:37.8', distance: '1.00', pace: '5:38' },
  { id: 3, time: '5:38.8', distance: '1.00', pace: '5:39' },
  { id: 4, time: '5:40.0', distance: '1.00', pace: '5:40' },
  { id: 5, time: '5:24.5', distance: '1.00', pace: '5:25' },
  { id: 6, time: '0:09.7', distance: '0.03', pace: '4:41' },
];

function LapsTab() {
  return (
    <View className="pb-12">
      {/* Table Header */}
      <View className="flex-row border-y border-border bg-secondary px-6 py-3">
        <Text className="w-12 text-center text-xs font-bold uppercase">Lap</Text>
        <Text className="flex-1 text-right text-xs font-bold uppercase">Time</Text>
        <View className="flex-1">
          <Text className="text-right text-xs font-bold uppercase">Distance</Text>
          <Text className="text-right text-xs text-muted-foreground">km</Text>
        </View>
        <View className="flex-1">
          <Text className="text-right text-xs font-bold uppercase">Pace</Text>
          <Text className="text-right text-xs text-muted-foreground">min/km</Text>
        </View>
      </View>

      {/* Table Rows */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {LAPS_DATA.map((lap, index) => {
          const isEven = index % 2 === 0;
          return (
            <View key={lap.id} className="flex-row border-b border-border px-6 py-4">
              <View className="w-12 items-center justify-center">
                <View className="h-6 w-6 items-center justify-center">
                  <Text className="text-xs font-bold">{lap.id}</Text>
                </View>
              </View>
              <Text className="flex-1 self-center text-right font-medium">{lap.time}</Text>
              <Text className="flex-1 self-center text-right font-medium">{lap.distance}</Text>
              <Text className="flex-1 self-center text-right font-bold">{lap.pace}</Text>
            </View>
          );
        })}

        {/* Total Row */}
        <View className="mt-2 flex-row border-t border-border bg-secondary px-6 py-4">
          <Text className="w-12 text-center text-sm font-bold">Total</Text>
          <Text className="flex-1 text-right font-bold">{WORKOUT_DATA.time}</Text>
          <Text className="flex-1 text-right font-bold">{WORKOUT_DATA.distance}</Text>
          <Text className="flex-1 text-right font-bold">{WORKOUT_DATA.avgPace}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

export { LapsTab };
