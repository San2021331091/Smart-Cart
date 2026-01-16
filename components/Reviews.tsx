import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import axios from 'axios';
import useReviewsByProductId from '../view-models/hooks/useReviewsByProductId';
import { EXPO_GENDERIZE_BASE_URL, EXPO_RANDOM_USER_BASE_URL } from '@env';
import ProgressBar from './ProgressBar';

type GenderCache = {
  [name: string]: { gender: 'male' | 'female' | 'unknown'; probability: number };
};

type ReviewProps = {
  productId: number;
};

const Review: React.FC<ReviewProps> = ({ productId }: ReviewProps) => {
  const { reviews, loading, error } = useReviewsByProductId(productId);
  const [genders, setGenders] = useState<GenderCache>({});

  // Fetch genders from Genderize
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
          newGenders[name] = {
            gender: res.data.gender || 'unknown',
            probability: res.data.probability || 0,
          };
        } catch {
          newGenders[name] = { gender: 'unknown', probability: 0 };
        }
      }
      setGenders(newGenders);
    }

    fetchGenders();
  }, [reviews]);

  if (loading) return <ProgressBar />;
  if (error) return <Text className="text-red-500 text-center mt-2">{error}</Text>;
  if (reviews.length === 0) return <Text className="text-white mt-2">No reviews yet.</Text>;

  // Deterministic hash for selecting avatar
  const getAvatarIndex = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    return Math.abs(hash) % 100;
  };

  // Deterministic random pick for unknown/low-probability names
  const pickRandomGender = (name: string) => (getAvatarIndex(name) % 2 === 0 ? 'male' : 'female');

  return (
    <View className="mt-6">
      <Text className="text-white text-2xl font-bold mb-2">Customer Reviews</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item, index) => (item?.id ? `${item.id}-${index}` : `review-${index}`)}
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          const firstName = item.reviewerName.split(' ')[0].toLowerCase();
          const genderData = genders[firstName];

          if (!genderData) {
            // Placeholder while fetching gender
            return (
              <View key={`review-view-${index}`} className="rounded-xl p-4 mb-3 flex-row items-center">
                <View
                  style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#555', marginRight: 12 }}
                />
                <View style={{ flex: 1 }}>
                  <Text className="text-white text-xl font-semibold">{item.reviewerName}</Text>
                  <Text className="text-white text-xl font-bold mt-1">{item.comment}</Text>
                  <Text className="text-white text-lg mt-2">{new Date(item.date).toDateString()}</Text>
                </View>
              </View>
            );
          }

          // Decide gender for avatar
          let avatarGender: 'male' | 'female';
          if (genderData.gender === 'male' && genderData.probability >= 0.8) avatarGender = 'male';
          else if (genderData.gender === 'female' && genderData.probability >= 0.8) avatarGender = 'female';
          else avatarGender = pickRandomGender(firstName); // low confidence → pick random deterministically

          const avatarIndex = getAvatarIndex(firstName);
          const avatarUrl = `${EXPO_RANDOM_USER_BASE_URL}/api/portraits/${
            avatarGender === 'male' ? 'men' : 'women'
          }/${avatarIndex}.jpg`;

          return (
            <View key={`review-view-${index}`} className="rounded-xl p-4 mb-3 flex-row items-center">
              <Image source={{ uri: avatarUrl }} style={{ width: 70, height: 70, borderRadius: 35, marginRight: 12 }} />

              <View style={{ flex: 1 }}>
                <Text className="text-white text-xl font-semibold">{item.reviewerName}</Text>
                <Text className="text-white text-xl font-bold mt-1">{item.comment}</Text>
                <Text className="text-white text-lg mt-2">{new Date(item.date).toDateString()}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Review;
