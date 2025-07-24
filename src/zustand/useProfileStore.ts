// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware'

// interface Props {
//   profile: any | null;
//   setProfile: (profile: any) => void;
// }

// export const useProfileStore = create<Props>()(
//   persist(
//     (set, get) => ({
//       profile: get()?.profile || null,
//       setProfile: (profile) => set({ profile: JSON.stringify(profile) }),
//     }),
//     {
//       name: 'profile-test',
//       storage: createJSONStorage(() => AsyncStorage), 
//     }
//   )
// );
