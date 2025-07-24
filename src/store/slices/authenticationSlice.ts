import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginState {
  userInfo: any;
}

const initialState: LoginState = {
  userInfo: undefined
};

export const authentication = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any>) => {
      console.log('action ',action.payload)
      state.userInfo = action.payload;
    },
  },
});

export const {  setUserInfo } = authentication.actions;

export default authentication.reducer;
