import { EXPO_GENIE_LINK } from '@env';
import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

const CXGenieWidget: React.FC = () => {
  return (
    <View className='flex-1'>
      <WebView
        source={{ uri: EXPO_GENIE_LINK }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default CXGenieWidget;
