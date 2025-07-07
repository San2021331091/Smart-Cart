import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as Progress from 'react-native-progress';
import {
  useSharedValue,
  useAnimatedReaction,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const ProgressBar: React.FC = ():React.JSX.Element => {
  const progress = useSharedValue<number>(0);
  const [reactProgress, setReactProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      progress.value = withTiming(progress.value >= 1 ? 0 : progress.value + 0.1, {
        duration: 500,
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useAnimatedReaction(
    () => progress.value,
    (val) => {
      runOnJS(setReactProgress)(parseFloat(val.toFixed(2)));
    }
  );

  return (
    <View className="mt-12 items-center">
      <Progress.Circle
        progress={reactProgress}
        size={40}
        color="yellow"
        unfilledColor="#ddd"
        borderWidth={4}
        thickness={6}
        showsText={false}
      />
    </View>
  );
};

export default ProgressBar;
