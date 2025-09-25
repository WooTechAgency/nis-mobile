import { LlamaContext } from 'llama.rn';
import { create } from 'zustand';

interface Props {
  llmContext: LlamaContext | undefined;
  setLLMContext: (context: LlamaContext) => void;
}

export const useLLMContext = create<Props>((set) => ({
  llmContext: undefined,
  setLLMContext: (context: LlamaContext) => set({ llmContext: context }),
}))
