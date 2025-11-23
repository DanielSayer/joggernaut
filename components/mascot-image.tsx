import React from 'react';
import { Image, ImageProps } from 'react-native';

type MascotVariants =
  | 'cheer'
  | 'happy'
  | 'idle'
  | 'point'
  | 'proud'
  | 'sleep'
  | 'stern'
  | 'think'
  | 'thumbsup'
  | 'wave';

interface MascotImageProps extends Omit<ImageProps, 'source'> {
  type: MascotVariants;
}

const mascotMap = {
  cheer: require('../assets/mascot-images/mascot-cheer.png'),
  happy: require('../assets/mascot-images/mascot-happy.png'),
  idle: require('../assets/mascot-images/mascot-idle.png'),
  point: require('../assets/mascot-images/mascot-point.png'),
  proud: require('../assets/mascot-images/mascot-proud.png'),
  sleep: require('../assets/mascot-images/mascot-sleep.png'),
  stern: require('../assets/mascot-images/mascot-stern.png'),
  think: require('../assets/mascot-images/mascot-think.png'),
  thumbsup: require('../assets/mascot-images/mascot-thumbsup.png'),
  wave: require('../assets/mascot-images/mascot-wave.png'),
};

export function MascotImage({ type, ...props }: MascotImageProps) {
  return <Image source={mascotMap[type]} {...props} />;
}
