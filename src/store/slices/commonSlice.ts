import { createSlice } from '@reduxjs/toolkit';

export interface Common {
  collapsedDrawer: boolean;
}

const initialState: Common = {
  collapsedDrawer: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    toggleCollapseDrawer: (state) => {
      state.collapsedDrawer = !state.collapsedDrawer;
    },
  },
});

export const { toggleCollapseDrawer } = commonSlice.actions;

export default commonSlice.reducer;
