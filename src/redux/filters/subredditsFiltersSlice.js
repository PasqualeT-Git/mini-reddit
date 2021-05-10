import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeFilter: "best"
}

const subredditsFilterSlice = createSlice({
  name: "subredditsFilters",
  initialState: initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.activeFilter = action.payload
    }
  }
})

export const { changeFilter } = subredditsFilterSlice.actions
export const selectFilter = state => state.subredditsFilters.activeFilter

export default subredditsFilterSlice.reducer