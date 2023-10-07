import { createSlice } from "@reduxjs/toolkit";

const darkmodeSlice = createSlice({
  name: 'darkmode',
  initialState: false,
  reducers: {
      toggleDarkmode: (state) => {
        return !state;
      }
  }
});

export const {
    toggleDarkmode
} = darkmodeSlice.actions;
export default darkmodeSlice.reducer;