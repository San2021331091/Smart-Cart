import { EXPO_DICE_BEAR_BASE_URL } from '@env';

export const getAvatarUrl = (identifier: string): string => {
  return `${EXPO_DICE_BEAR_BASE_URL}/8.x/micah/png?seed=${encodeURIComponent(identifier)}&size=96`;
};
