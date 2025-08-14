import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

export const mmkv = {
  getString: (key: string) => storage.getString(key),
  set: (key: string, value: string) => storage.set(key, value),
  getBoolean: (key: string) => storage.getBoolean(key),
  setBoolean: (key: string, value: boolean) => storage.set(key, value),
  getNumber: (key: string) => storage.getNumber(key),
  setNumber: (key: string, value: number) => storage.set(key, value),
  delete: (key: string) => storage.delete(key),
  clearAll: () => storage.clearAll(),
};