import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import getRedditDataRequest from '../../helpers/API_requests/getRedditDataRequest';

export const loadPopularSubreddits = createAsyncThunk(
  'popularSubreddits/loadPopularSubreddits',
  async () => {
    const jsonResponse = await getRedditDataRequest(`/subreddits/popular`, "limit=10");
    const topSubredditsArray = jsonResponse.data.children;
    return topSubredditsArray;
  }
)

const initialState = {
  popularSubreddits: [],
  isLoading: false,
  failedToLoad: false
}

const popularSubredditsSlice = createSlice({
  name: 'popularSubreddits',
  initialState: initialState,
  extraReducers: {
    [loadPopularSubreddits.pending]: (state) => { state.isLoading = true },
    [loadPopularSubreddits.rejected]: (state) => { state.failedToLoad = true },
    [loadPopularSubreddits.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.failedToLoad = false;
      state.popularSubreddits = action.payload;
    },
  }
})

export const isLoadingPopularSubreddits = (state) => state.popularSubreddits.isLoading;
export const selectPopularSubreddits = (state) => state.popularSubreddits.popularSubreddits;

export default popularSubredditsSlice.reducer