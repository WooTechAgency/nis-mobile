import { images } from '@assets/images';
import Header from '@components/header';
import { Button, Image, SafeAreaView, Text, View } from '@components/ui';
import { useLLM } from '@hooks/useLLM';
import { useVoice } from '@hooks/useVoice';
import { formatSecondsToMMSS } from '@utils/date.util';
import { useLLMContext } from '@zustand/useLLMContext';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';

export default function Dashboard() {
  const { askModel } = useLLM()
  // const { startVoice, stopVoice, recognizedText, isListening, seconds, pauseVoice, resumeVoice, isStopped } = useVoice()
  const [promptLoading, setPromptLoading] = useState(false);

  const onUseVoice = () => {
    // startVoice()
  }

  return (
    <SafeAreaView>
      <Header title='Dashboard' />

      {/* <View className='flex-row mt-2 gap-x-4  right-4 bottom-4 z-50 bg-white'>
        {isStopped
          ?
          <Button
            className='flex-row  w-[135] h-[36] border border-primary center  gap-x-2 rounded-[8px] '
            onPress={onUseVoice}
          >
            <Image source={images.voice} className='w-8 h-8' />
            <Text className='text-[12px] font-medium '>Use Voice</Text>
          </Button>
          :
          <View className='row-center border border-primary rounded-[8px] p-2 h-[36px]'>
            <Image source={images.voice} className='w-8 h-8' />
            <Text className='text-sm font-medium'>{formatSecondsToMMSS(seconds)}</Text>
            <View className='w-[125px] h-[1px] bg-neutral40 mx-[10px]' />
            <Image source={images.trash}
              className='w-8 h-8'
              onPress={() => {
                stopVoice()
              }}
            />
            <View className='w-[1px] h-4 bg-neutral40 mx-1' />
            <Image
              source={isListening ? images.pauseActive : images.pauseInactive}
              className='w-8 h-8'
              onPress={isListening ? pauseVoice : resumeVoice}
            />
            <Image source={images.done} className='w-8 h-8' onPress={stopVoice} />
          </View>
        }
        <Button
          className='flex-row w-[135] h-[36] border border-primary center  gap-x-2 rounded-[8px] disabled:opacity-50'
          onPress={() => { }}
          disabled={!isStopped}
        >
          {promptLoading ? <ActivityIndicator size={'small'} /> : <Image source={images.ai} className='w-8 h-8' />}
          <Text className='text-[12px] font-medium '>AI enhance</Text>
        </Button>
      </View> */}

    </SafeAreaView>
  );
}
