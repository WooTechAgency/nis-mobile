import { isIOS } from '@constants/app.constants';
import Voice from '@react-native-voice/voice';
import { useEffect, useRef, useState } from 'react';
import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

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
    return () => {
      stopTimer();
      Voice.removeAllListeners();
    };
  }, []);

  const showPermissionDeniedAlert = (permissionType: string) => {
    Alert.alert(
      'Permission Denied',
      `This app needs ${permissionType} permission to use voice recording. Please go to Settings to enable this permission.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: () => {
            if (Platform.OS === 'ios') {
              openSettings();
            } else {
              Linking.openSettings();
            }
          },
        },
      ]
    );
  };

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        showPermissionDeniedAlert('microphone');
        return false;
      }
      return true;
    } else if (Platform.OS === 'ios') {
      // Check microphone permission
      const microphoneStatus = await check(PERMISSIONS.IOS.MICROPHONE);
      if (microphoneStatus === RESULTS.BLOCKED) {
        showPermissionDeniedAlert('microphone');
        return false;
      }
      // Check speech recognition permission
      const speechStatus = await check(PERMISSIONS.IOS.SPEECH_RECOGNITION);
      if (speechStatus === RESULTS.BLOCKED) {
        showPermissionDeniedAlert('speech recognition');
        return false;
      }

      return true;
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
    stopTimer();
  };

  const onSpeechResults = (e: any) => {
    console.log('Speech results:', e.value[0]);
    setRecognizedText(e.value[0]);
  };

  const startVoice = async (resetText: boolean = true) => {
    shouldResetOnSpeechStartRef.current = resetText;
    const hasPermission = await requestPermission();
    console.log('hasPermission: ', hasPermission);
    if (hasPermission) {
      try {
        // proactively update UI and start timer immediately for both platforms
        setIsStopped(false);
        setIsListening(true);
        if (resetText) {
          setRecognizedText('');
        }
        startTimer(resetText);
        // Assign listeners specifically for this start session
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechResults = onSpeechResults;
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
      Voice.removeAllListeners();
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
