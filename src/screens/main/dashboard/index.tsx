import React, { useEffect, useState } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import Voice from '@react-native-voice/voice';
import { SafeAreaView } from '@components/ui';
import Title from '@components/title';
import Header from '@components/header';

export default function Dashboard() {
  const [result, setResult] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const onSpeechStart = () => {
    console.log('Speech started');
    setIsListening(true);
  };

  const onSpeechEnd = () => {
    console.log('Speech ended');
    setIsListening(false);
  };

  const onSpeechResults = (e: any) => {
    console.log('Speech results:', e.value);
    setResult(e.value[0]); // lấy câu đầu tiên
  };

  const startListening = async () => {
    const hasPermission = await requestPermission();
    if (hasPermission) {
      try {
        await Voice.start('en-US'); // đổi thành 'vi-VN' nếu dùng tiếng Việt
      } catch (e) {
        console.error(e);
      }
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView>
      <Header title='Dashboard' />
    </SafeAreaView>
  );
}
