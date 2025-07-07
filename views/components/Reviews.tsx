import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import useReviewsByProductId from '../../view-models/hooks/useReviewsByProductId.ts';
import {EXPO_GENDERIZE_BASE_URL} from '@env';
import {EXPO_DICE_BEAR_BASE_URL} from '@env';
import {EXPO_RANDOM_USER_BASE_URL} from '@env';
import ProgressBar from './ProgressBar.tsx';

type ReviewProps = {
  productId: number;
};

type GenderCache = {
  [name: string]: 'male' | 'female' | 'unknown';
};

const Review: React.FC<ReviewProps> = ({ productId }:ReviewProps):React.JSX.Element => {
  const { reviews, loading, error } = useReviewsByProductId(productId);
  const [genders, setGenders] = useState<GenderCache>({});

  useEffect(() => {
    if (reviews.length === 0) return;

    // Extract first names, unique
    const uniqueNames = Array.from(
      new Set(
        reviews.map(r => r.reviewerName.split(' ')[0].toLowerCase())
      )
    );

    // Fetch genders from Genderize API for all names
    async function fetchGenders() {
      const newGenders: GenderCache = { ...genders };
      for (const name of uniqueNames) {
        if (newGenders[name]) continue;

        try {
          const res = await fetch(`${EXPO_GENDERIZE_BASE_URL}?name=${name}`);
          const data = await res.json();
          newGenders[name] = data.gender || 'unknown';
        } catch {
          newGenders[name] = 'unknown';
        }
      }
      setGenders(newGenders);
    }

    fetchGenders().then();
  }, [reviews]);

  if (loading) {
    return <ProgressBar/>;
  }

  if (error) {
    return <Text className="text-red-500 text-center mt-2">{error}</Text>;
  }

  if (reviews.length === 0) {
    return <Text className="text-white mt-2">No reviews yet.</Text>;
  }

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

          // Choose avatar style based on gender (or fallback)
          const avatarGender = gender === 'male' ? 'men' : gender === 'female' ? 'women' : 'lego';
          const avatarIndex = index % 100; // RandomUser or dice bear index

          // Use dice bear lego style for unknown
          const avatarUrl =
            avatarGender === 'lego'
              ? `${EXPO_DICE_BEAR_BASE_URL}/6.x/lego/svg?seed=${encodeURIComponent(item.reviewerName)}`
              : `${EXPO_RANDOM_USER_BASE_URL}/api/portraits/${avatarGender}/${avatarIndex}.jpg`;

          return (
            <View
              key={`review-view-${index}`}
              className="rounded-xl p-4 mb-3 flex-row items-center"
            >
              <Image
                source={{ uri: avatarUrl }}
                style={{ width: 70, height: 70, borderRadius:40 , marginRight: 12 }}
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
