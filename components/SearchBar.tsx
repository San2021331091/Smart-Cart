import React from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
  onFocus: () => void;
  onMicPress: () => void;
};

const SearchBar: React.FC<Props> = ({ value, onChange, onSubmit, onFocus, onMicPress }) => {
  return (
    <View
      className="bg-[rgba(255,255,255,0.9)] rounded-xl px-4 flex-row items-center justify-between mb-2 h-[48]"
  >
      <View className="flex-row items-center flex-1">
        <MaterialIcons name="search" size={24} color="#333" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search for products..."
          placeholderTextColor="#888"
          value={value}
          onChangeText={onChange}
          onSubmitEditing={onSubmit}
          onFocus={onFocus}
          returnKeyType="search"
          className="flex-1 text-lg text-blue-900"
          style={{ height: '100%' }}
        />
      </View>
      <TouchableOpacity onPress={onMicPress}>
        <MaterialIcons name="mic" size={24} color="#333" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
