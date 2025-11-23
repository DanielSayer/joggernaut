import { Text } from '@/components/ui/text';
import { useTheme } from '@/hooks/use-theme';
import { endOfWeek, format, isSameMonth, parse, startOfWeek } from 'date-fns';
import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { Separator } from './ui/separator';

type MileageData = {
  date: string;
  distance: number;
};

const MOCK_DATA: MileageData[] = [
  { date: '2023-06-12', distance: 15.2 },
  { date: '2023-06-19', distance: 10.2 },
  { date: '2023-06-26', distance: 15.2 },
  { date: '2023-07-03', distance: 28.5 },
  { date: '2023-07-10', distance: 31.2 },
  { date: '2023-07-17', distance: 50.5 },
  { date: '2023-07-24', distance: 42.0 },
  { date: '2023-07-31', distance: 38.5 },
  { date: '2023-08-07', distance: 25.4 },
  { date: '2023-08-14', distance: 16.8 },
  { date: '2023-08-21', distance: 24.1 },
  { date: '2023-08-28', distance: 10.5 },
];

function formatDate(date: string) {
  const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
  return `${format(startOfWeek(parsedDate), 'MMM d')} - ${format(endOfWeek(parsedDate), 'MMM d')}`;
}

export default function StravaProgressChart() {
  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const [selectedIndex, setSelectedIndex] = useState(MOCK_DATA.length - 1);

  // --- Chart Data Preparation ---
  const chartData = MOCK_DATA.map((item, index) => {
    const currentDate = parse(item.date, 'yyyy-MM-dd', new Date());
    const previousDate =
      index > 0 ? parse(MOCK_DATA[index - 1].date, 'yyyy-MM-dd', new Date()) : null;

    // Logic: Only show label if it's the first item OR the month has changed from previous item
    const showLabel = index === 0 || (previousDate && !isSameMonth(currentDate, previousDate));

    return {
      value: item.distance,
      label: showLabel ? format(currentDate, 'MMM') : '', // 'Jul', 'Aug'
      dateOriginal: item.date, // Passing through for event handling
    };
  });

  const selectedData = MOCK_DATA[selectedIndex];

  return (
    <View>
      <View className="mb-2">
        <Text className="mb-2 font-semibold">Week of {formatDate(selectedData.date)}</Text>

        <View className="flex-row gap-4">
          <View>
            <Text className="text-xs text-muted-foreground">Distance</Text>
            <Text>{selectedData.distance} km</Text>
          </View>
          <Separator orientation="vertical" className="my-auto h-1/2" />
          <View>
            <Text className="text-xs text-muted-foreground">Time</Text>
            <Text>{Math.floor(selectedData.distance * 0.6)}h 30m</Text>
          </View>
        </View>
      </View>
      <LineChart
        data={chartData}
        // Dimensions
        height={100}
        width={screenWidth - 85} // Width minus padding
        adjustToWidth // Ensures points are spread evenly without scrolling
        // Appearance - Lines and Area
        areaChart
        curved={false}
        color={theme.primary}
        thickness={2}
        startFillColor={theme.primary}
        startOpacity={0.2}
        endFillColor={theme.card}
        endOpacity={0.0}
        // Appearance - Axis
        hideRules
        yAxisColor="transparent"
        showVerticalLines
        verticalLinesColor={theme.border}
        xAxisColor={theme.border}
        xAxisThickness={1} // Hiding the actual line, keeping labels
        yAxisTextStyle={{ color: theme.mutedForeground, fontSize: 10 }}
        xAxisLabelTextStyle={{ color: theme.mutedForeground, fontSize: 12 }}
        yAxisLabelSuffix="km"
        maxValue={60} // Setting a ceiling slightly higher than max data
        noOfSections={2}
        // Appearance - Data Points
        hideDataPoints={false}
        dataPointsColor={theme.primary}
        // Interaction - Pointer (The vertical line logic)
        pointerConfig={{
          pointerStripColor: theme.primary,
          pointerStripWidth: 2,
          pointerColor: theme.primary,
          radius: 6,
          activatePointersOnLongPress: false, // Instant touch
          autoAdjustPointerLabelPosition: true,
        }}
        getPointerProps={({ pointerIndex }: { pointerIndex: number }) => {
          if (pointerIndex === selectedIndex || pointerIndex === -1) return;
          setSelectedIndex(pointerIndex);
        }}
      />
    </View>
  );
}
