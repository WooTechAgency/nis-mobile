import { Button, SafeAreaView, Text, View } from '@components/ui';
import { useRoute } from '@react-navigation/native';
import { goBack } from '@routes/navigationRef';
import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { WebView } from 'react-native-webview';

export default function ShowDocument() {
  const url = useRoute().params?.url as string

  const handleClose = () => {
    goBack()
  };

  return (
    <SafeAreaView className=''>
      <View className='flex-1'>
        <WebView
          source={{ uri: url }}
          style={{ flex: 1 }}
          startInLoadingState={true}
          renderLoading={() => (
            <View className='absolute inset-0 items-center justify-center bg-white'>
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text className='mt-4 text-gray-600'>Loading document...</Text>
            </View>
          )}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
        />
        <Button label="Close" onPress={handleClose} className='w-[120px] absolute bottom-4 right-4 ' />
      </View>
    </SafeAreaView>
  )
}