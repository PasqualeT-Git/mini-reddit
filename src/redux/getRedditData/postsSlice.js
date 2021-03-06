import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import getRedditDataRequest from '../../helpers/API_requests/getRedditDataRequest';

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async({name, filter}) => {
    const jsonResponse = await getRedditDataRequest(`/r/${name}`, filter, 'limit=10');
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
  reducers: {
    addNextPosts: (state, action) => {
      state.posts = state.posts.concat(action.payload);
    }
  },
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

export const { addNextPosts } = postsSlice.actions;

export const isLoadingPosts = (state) => state.posts.isLoadingPosts;
export const selectPosts = (state) => state.posts.posts;

export default postsSlice.reducer