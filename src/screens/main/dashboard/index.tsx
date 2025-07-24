import React, { useEffect, useState } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import Voice from '@react-native-voice/voice';

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
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        {isListening ? 'Listening...' : 'Press to Start'}
      </Text>

      <Button title="Start Voice Recognition" onPress={startListening} />
      <Button title="Stop" onPress={stopListening} color="red" />

      <Text style={{ marginTop: 20, fontSize: 16 }}>Kết quả:</Text>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{result}</Text>
    </View>
  );
}
