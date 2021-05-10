import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import getRedditDataRequest from '../../helpers/API_requests/getRedditDataRequest';

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async(name) => {
    const jsonResponse = await getRedditDataRequest(`/r/${name}.json`, 'limit=10');
    const posts = jsonResponse.data.children;
    return posts
  }
)

const initialState = {
  posts: [],
  isLoadingPosts: false,
  failedToLoadPosts: false
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  extraReducers: {
    [loadPosts.pending]: (state) => { state.isLoadingPosts = true;},
    [loadPosts.rejected]: (state) => { state.failedToLoadPosts = true;},
    [loadPosts.fulfilled]: (state, action) => {
      state.isLoadingPosts = false;
      state.failedToLoadPosts = false;
      state.posts = action.payload;
    },
  }
})

export const isLoadingPosts = (state) => state.posts.isLoadingPosts;
export const selectPosts = (state) => state.posts.posts;

export default postsSlice.reducer