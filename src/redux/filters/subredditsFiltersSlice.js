import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeFilter: "hot",
  storedEndpoint: ""
}

const subredditsFilterSlice = createSlice({
  name: "subredditsFilters",
  initialState: initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.activeFilter = action.payload
    },
    storeEndpoint:(state, action) => {
      state.storedEndpoint = action.payload
    }
  }
})

export const { changeFilter, storeEndpoint } = subredditsFilterSlice.actions;

export const selectFilter = state => state.subredditsFilters.activeFilter;
export const selectStoredEndpoint = state => state.subredditsFilters.storedEndpoint;

export default subredditsFilterSlice.reducer