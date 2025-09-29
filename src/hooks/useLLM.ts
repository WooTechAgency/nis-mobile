import { showSuccess } from '@lib/toast';
import { downloadModel } from '@utils/llm.utils';
import { useLLMContext } from '@zustand/useLLMContext';
import { NativeCompletionResult, initLlama, releaseAllLlama } from 'llama.rn';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import RNFS from 'react-native-fs'; // File system module

const stopWords = [
  '</s>',
  '<|end|>',
  'user:',
  'assistant:',
  '<|im_end|>',
  '<|eot_id|>',
  '<|end▁of▁sentence|>',
  '<｜end▁of▁sentence｜>',
];
const modelUrl = 'https://huggingface.co/medmekk/Qwen2.5-0.5B-Instruct.GGUF/resolve/main/Qwen2.5-0.5B-Instruct-Q3_K_L.gguf'
const fileName = 'Qwen2.5-0.5B-Instruct-Q3_K_L.gguf'
export interface DownloadLLMRequest {
  downloadUrl: string;
  fileName: string;
  onCallbackSuccess: () => void;
}

export const useLLM = () => {
  const [fileSize, setFileSize] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const { llmContext, setLLMContext } = useLLMContext();

  const loadModel = async () => {
    try {
      const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`
      const fileExists = await RNFS.exists(destPath);

      if (!fileExists) {
        return await handleDownloadModel();
      }

      if (llmContext) {
        await releaseAllLlama();
      }
      const llamaContext = await initLlama({
        model: destPath,
        use_mlock: true,
        n_ctx: 2048,
        n_gpu_layers: 1,
      });
      setLLMContext(llamaContext);
      console.log(`Load model ${fileName} successfully`);
      // showSuccess({title: 'The AI model was successfully loaded'})
      return true;
    } catch (error) {
      Alert.alert('Error Loading Model', error instanceof Error ? error.message : 'An unknown error occurred.');
      return false;
    }
  };

  const handleDownloadModel = async () => {
    setIsDownloading(true);
    setProgress(0);
    try {
      const destPath = await downloadModel(
        fileName,
         modelUrl,
        (progress) => setProgress(progress),
        (fileSize) => setFileSize(Number(fileSize).toFixed(0))
      );
      if (destPath) {
        await loadModel();
      } else {
        throw new Error('Model download path is invalid.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Download failed due to an unknown error.';
      Alert.alert('Error', errorMessage);
    } finally {
      setIsDownloading(false);
    }
  };

  const askModel = async (prompt: string): Promise<string | undefined> => {
    const promptStructure =`
    <|im_start|>system
You are an AI that edits text. Your job is to add punctuation, capitalization, and proper sentence boundaries. Do not change the meaning or add new words.<|im_end|>
<|im_start|>user
${prompt}<|im_end|>
<|im_start|>assistant
    `
    console.log('askModel() prompt ', prompt);
    // Check if context is loaded and user input is valid
    if (!llmContext) {
      Alert.alert('Model Not Loaded', 'Please load the model first.');
      return undefined;
    }
    const result = await  llmContext.completion({
      prompt: promptStructure,
      n_predict: 200,
      temperature: 0.7,
      stop: stopWords,
    });
    return result.text
  };

  return {
    handleDownloadModel,
    llmContext,
    loadModel,
    askModel,
    isDownloading,
    progress,
    fileSize,
    setProgress,
    setIsDownloading,
  };
};
