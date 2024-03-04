import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "materialBottomTabs",
  initialState: {
    showBottomTabsBar: true,
  },
  reducers: {
    hideBottomTab: (state) => {
      state.showBottomTabsBar = false;
    },
    showBottomTab: (state) => {
      state.showBottomTabsBar = true;
    },
  },
});

export default slice.reducer;

export const { actions } = slice;
