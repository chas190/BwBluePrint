import { ImageSourcePropType } from 'react-native';

export function getPropertyImage(kind: 'home' | 'living'): ImageSourcePropType {
  return kind === 'living'
    ? require('@/assets/images/stage-this-living-room.jpg')
    : require('@/assets/images/stage-this-home.jpg');
}
