import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import getRedditDataRequest from '../../helpers/API_requests/getRedditDataRequest';

export const loadPopularSubreddits = createAsyncThunk(
  'getRedditData/loadPopularSubreddits',
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
    [loadPopularSubreddits.pending]: (state) => {
      state.isLoading = true;
      state.failedToLoad = false;
    },
    [loadPopularSubreddits.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.failedToLoad = false;
      state.popularSubreddits = action.payload;
      console.log(loadPopularSubreddits)
    },
    [loadPopularSubreddits.rejected]: (state) => {
      state.isLoading = false;
      state.failedToLoad = true;
    },
  }
})

export const isLoadingPopularSubreddits = (state) => state.popularSubreddits.isLoading;
export const selectPopularSubreddits = (state) => state.popularSubreddits.popularSubreddits;

export default popularSubredditsSlice.reducer