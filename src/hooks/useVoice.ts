import { isIOS } from '@constants/app.constants';
import Voice from '@react-native-voice/voice';
import { useEffect, useRef, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

export function useVoice() {
  const [recognizedText, setRecognizedText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isStopped, setIsStopped] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const shouldResetOnSpeechStartRef = useRef(true);
  const timerRef = useRef<any>(null);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = (shouldReset: boolean) => {
    stopTimer();
    if (shouldReset) {
      setSeconds(0);
    }
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    return () => {
      stopTimer();
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const onSpeechStart = () => {
    console.log('Speech started');
    setIsListening(true);
    // Timer is started in startVoice to ensure immediate UI updates
  };

  const onSpeechEnd = () => {
    console.log('Speech ended');
    setIsListening(false);
    stopTimer();
  };

  const onSpeechPartialResults = (e: any) => {
    // console.log('onSpeechPartialResults:', e.value);
  };

  const onSpeechResults = (e: any) => {
    console.log('Speech results:', e.value[0]);
    setRecognizedText(e.value[0]);
  };

  const startVoice = async (resetText: boolean = true) => {
    console.log('startVoice() resetText: ', resetText);
    shouldResetOnSpeechStartRef.current = resetText;
    const hasPermission = await requestPermission();
    if (hasPermission) {
      try {
        // proactively update UI and start timer immediately for both platforms
        setIsStopped(false);
        setIsListening(true);
        if (resetText) {
          setRecognizedText('');
        }
        startTimer(resetText);

        await Voice.start('en-US');
      } catch (e) {
        console.error(e);
      }
    }
  };

  const stopVoice = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
      stopTimer();
      setSeconds(0);
      setIsStopped(true)
    } catch (e) {
      console.error('Stop error: ', e);
    }
  };

  const pauseVoice = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
      stopTimer();
    } catch (e) {
      console.error('Pause error: ', e);
    }
  };

  const resumeVoice = async () => {
    try {
      await startVoice(false);
    } catch (e) {
      console.error('Resume error: ', e);
    }
  };

  return { startVoice, stopVoice, pauseVoice, resumeVoice, recognizedText, isListening, seconds, isStopped };
}
