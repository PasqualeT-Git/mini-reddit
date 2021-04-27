import { createSlice } from '@reduxjs/toolkit';

const switchSlice = createSlice({
  name: 'switch',
  initialState: false,
  reducers: {
    toggleSwitch: (state, action) => {
      return action.payload
    }
  }
})

export const getSwitchState = state => state.switch;
export const { toggleSwitch } = switchSlice.actions;
export default switchSlice.reducer;