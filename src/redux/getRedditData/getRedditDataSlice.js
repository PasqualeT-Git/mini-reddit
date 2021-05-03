import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import getRedditDataRequest from '../../helpers/API_requests/getRedditDataRequest'

export const loadPopularSubreddits = createAsyncThunk(
  'getRedditData/loadPopularSubreddits',
  async () => {
    const jsonResponse = await getRedditDataRequest(`/subreddits/popular`, {limit: 10});
    const topSubredditsArray = jsonResponse.data.children;
    return topSubredditsArray;
  }
)

const initialState = {
  popularSubreddits: [],
  isLoadingPopularSubreddits: false,
  failedToLoadPopularSubreddits: false
}

const getRedditDataSlice = createSlice({
  name: 'getRedditData',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
    .addCase(loadPopularSubreddits.pending, (state) => {
      state.isLoadingPopularSubreddits = true;
      state.failedToLoadPopularSubreddits = false;
    })
    .addCase(loadPopularSubreddits.fulfilled, (state, action) => {
      state.isLoadingPopularSubreddits = false;
      state.failedToLoadPopularSubreddits = false;
      state.popularSubreddits = action.payload;
    })
    .addCase(loadPopularSubreddits.rejected, (state) => {
      state.isLoadingPopularSubreddits = false;
      state.failedToLoadPopularSubreddits = true;
    })
  }
})

export const isLoadingPopularSubreddits = (state) => state.getRedditData.isLoadingPopularSubreddits;
export const selectPopularSubreddits = (state) => state.getRedditData.popularSubreddits;
export default getRedditDataSlice.reducer