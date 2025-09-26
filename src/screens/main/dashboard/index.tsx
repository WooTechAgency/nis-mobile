import Header from '@components/header';
import { SafeAreaView } from '@components/ui';
import { useLLM } from '@hooks/useLLM';
import React, { useState } from 'react';
import { Image } from 'react-native';

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
    </SafeAreaView>
  );
}
