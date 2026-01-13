import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import axios from 'axios';
import useReviewsByProductId from '../view-models/hooks/useReviewsByProductId';
import { EXPO_GENDERIZE_BASE_URL } from '@env';
import { EXPO_DICE_BEAR_BASE_URL } from '@env';
import ProgressBar from './ProgressBar.tsx';

type ReviewProps = {
  productId: number;
};

type GenderCache = {
  [name: string]: 'male' | 'female' | 'unknown';
};

const Review: React.FC<ReviewProps> = ({ productId }: ReviewProps): React.JSX.Element => {
  const { reviews, loading, error } = useReviewsByProductId(productId);
  const [genders, setGenders] = useState<GenderCache>({});

  useEffect(() => {
    if (reviews.length === 0) return;

    const uniqueNames = Array.from(
      new Set(reviews.map(r => r.reviewerName.split(' ')[0].toLowerCase()))
    );

    async function fetchGenders() {
      const newGenders: GenderCache = { ...genders };

      for (const name of uniqueNames) {
        if (newGenders[name]) continue;

        try {
          const res = await axios.get(`${EXPO_GENDERIZE_BASE_URL}/?name=${name}`);
          newGenders[name] = res.data.gender || 'unknown';
        } catch (err) {
          newGenders[name] = 'unknown';
        }
      }

      setGenders(newGenders);
    }

    fetchGenders();
  }, [reviews]);

  if (loading) return <ProgressBar />;

  if (error) return <Text className="text-red-500 text-center mt-2">{error}</Text>;

  if (reviews.length === 0) return <Text className="text-white mt-2">No reviews yet.</Text>;

  return (
    <View className="mt-6">
      <Text className="text-white text-2xl font-bold mb-2">Customer Reviews</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item, index) =>
          item?.id ? `${item.id}-${index}` : `review-${index}`
        }
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          const firstName = item.reviewerName.split(' ')[0].toLowerCase();
          const gender = genders[firstName] || 'unknown';

          // Avatar style based on gender
          let avatarStyle = 'lego'; // fallback for unknown
          if (gender === 'male') avatarStyle = 'adventurer';
          else if (gender === 'female') avatarStyle = 'adventurer-neutral';

          const avatarUrl = `${EXPO_DICE_BEAR_BASE_URL}/6.x/${avatarStyle}/png?seed=${encodeURIComponent(item.reviewerName)}`;

          return (
            <View
              key={`review-view-${index}`}
              className="rounded-xl p-4 mb-3 flex-row items-center"
            >
              <Image
                source={{ uri: avatarUrl }}
                style={{ width: 70, height: 70, borderRadius: 40, marginRight: 12 }}
              />

              <View style={{ flex: 1 }}>
                <Text className="text-white text-xl font-semibold">{item.reviewerName}</Text>
                <Text className="text-white text-xl font-bold mt-1">{item.comment}</Text>
                <Text className="text-white text-lg mt-2 ">
                  {new Date(item.date).toDateString()}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Review;
