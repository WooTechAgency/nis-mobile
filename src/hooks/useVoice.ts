import Voice from '@react-native-voice/voice';
import { useEffect, useRef, useState } from 'react';
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { PERMISSIONS, RESULTS, check, openSettings } from 'react-native-permissions';

// Global voice manager để đảm bảo chỉ có 1 voice instance active tại một thời điểm
let globalVoiceManager = {
  currentInstanceId: null as string | null,
  callbacks: new Map<string, {
    onSpeechStart: () => void;
    onSpeechEnd: () => void;
    onSpeechResults: (e: any) => void;
  }>(),
  // Global listeners để notify tất cả TextInput về voice state
  globalListeners: new Set<() => void>()
};

// Function để notify tất cả TextInput về voice state change
const notifyGlobalListeners = () => {
  globalVoiceManager.globalListeners.forEach(listener => listener());
};

// Function để check xem có voice nào đang active không
export const isAnyVoiceActive = () => {
  return globalVoiceManager.currentInstanceId !== null;
};

// Function để get current active instance ID
export const getCurrentActiveInstanceId = () => {
  return globalVoiceManager.currentInstanceId;
};

export function useVoice(instanceId?: string) {
  const id = instanceId || 'default';
  const [recognizedText, setRecognizedText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isStopped, setIsStopped] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [isAnyVoiceActive, setIsAnyVoiceActive] = useState(false);
  
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
    // Register global listener để nhận thông báo về voice state changes
    const globalListener = () => {
      setIsAnyVoiceActive(globalVoiceManager.currentInstanceId !== null);
    };
    
    globalVoiceManager.globalListeners.add(globalListener);
    
    // Set initial state
    setIsAnyVoiceActive(globalVoiceManager.currentInstanceId !== null);
    
    return () => {
      stopTimer();
      // Clean up this instance from global manager
      if (globalVoiceManager.currentInstanceId === id) {
        globalVoiceManager.currentInstanceId = null;
        notifyGlobalListeners(); // Notify other instances
      }
      globalVoiceManager.callbacks.delete(id);
      globalVoiceManager.globalListeners.delete(globalListener);
      Voice.removeAllListeners();
    };
  }, [id]);

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
    console.log('Speech started for instance:', id);
    setIsListening(true);
  };

  const onSpeechEnd = () => {
    console.log('Speech ended for instance:', id);
    setIsListening(false);
    stopTimer();
  };

  const onSpeechResults = (e: any) => {
    console.log('Speech results for instance:', id, e.value[0]);
    setRecognizedText(e.value[0]);
  };

  const startVoice = async (resetText: boolean = true) => {
    shouldResetOnSpeechStartRef.current = resetText;
    const hasPermission = await requestPermission();
    if (hasPermission) {
      try {
        // Stop any other active voice instance
        if (globalVoiceManager.currentInstanceId && globalVoiceManager.currentInstanceId !== id) {
          await stopVoice()
          // Reset the previous instance's state by calling its callbacks
          const previousCallbacks = globalVoiceManager.callbacks.get(globalVoiceManager.currentInstanceId);
          if (previousCallbacks) {
            // Trigger onSpeechEnd to reset the previous instance's state
            previousCallbacks.onSpeechEnd();
          }
        }
        
        // Register this instance's callbacks
        globalVoiceManager.callbacks.set(id, {
          onSpeechStart,
          onSpeechEnd,
          onSpeechResults
        });
        
        // Set current instance as active
        globalVoiceManager.currentInstanceId = id;
        
        // proactively update UI and start timer immediately for both platforms
        setIsStopped(false);
        setIsListening(true);
        // Always reset recognizedText immediately when starting voice
        setRecognizedText('');
        
        // Notify all instances about voice state change
        notifyGlobalListeners();
        
        startTimer(resetText);
        
        // Set up global voice listeners that will route to the current instance
        Voice.onSpeechStart = () => {
          const currentCallbacks = globalVoiceManager.callbacks.get(globalVoiceManager.currentInstanceId!);
          if (currentCallbacks) {
            currentCallbacks.onSpeechStart();
          }
        };
        
        Voice.onSpeechEnd = () => {
          const currentCallbacks = globalVoiceManager.callbacks.get(globalVoiceManager.currentInstanceId!);
          if (currentCallbacks) {
            currentCallbacks.onSpeechEnd();
          }
        };
        
        Voice.onSpeechResults = (e: any) => {
          const currentCallbacks = globalVoiceManager.callbacks.get(globalVoiceManager.currentInstanceId!);
          if (currentCallbacks) {
            currentCallbacks.onSpeechResults(e);
          }
        };
        
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
      setIsStopped(true);
      // Clear recognizedText when stopping voice
      setRecognizedText('');
      
      // Clear current instance if it's this one
      if (globalVoiceManager.currentInstanceId === id) {
        globalVoiceManager.currentInstanceId = null;
        globalVoiceManager.callbacks.delete(id);
        // Notify all instances about voice state change
        notifyGlobalListeners();
      }
      
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
      // Clear recognizedText when pausing voice
      setRecognizedText('');
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

  return { startVoice, stopVoice, pauseVoice, resumeVoice, recognizedText, isListening, seconds, isStopped, isAnyVoiceActive };
}
