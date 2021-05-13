import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeFilter: "hot",
  storedSubreddit: {title: "", icon: ""}
}

const subredditsFilterSlice = createSlice({
  name: "subredditsFilters",
  initialState: initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.activeFilter = action.payload
    },
    storeSubreddit:(state, action) => {
      state.storedSubreddit = action.payload
    }
  }
})

export const { changeFilter, storeSubreddit } = subredditsFilterSlice.actions;

export const selectFilter = state => state.subredditsFilters.activeFilter;
export const selectStoredSubreddit = state => state.subredditsFilters.storedSubreddit;

export default subredditsFilterSlice.reducer