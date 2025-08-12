import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@services/authentication.service';

export interface LoginState {
  userInfo?: IUser;
}

const initialState: LoginState = {
  userInfo: undefined
};

export const authentication = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
  },
});

export const {  setUserInfo } = authentication.actions;

export default authentication.reducer;
