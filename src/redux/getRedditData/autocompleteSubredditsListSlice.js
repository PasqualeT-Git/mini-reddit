import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import getRedditDataRequest from '../../helpers/API_requests/getRedditDataRequest';

export const loadAutocompleteList = createAsyncThunk(
  'autocompleteSubredditsList/loadAutocompleteList',
  async (term) => {
    const jsonResponse = await getRedditDataRequest(`/api/subreddit_autocomplete_v2`, `query=${term}`);
    const suggestedSubredditsList = jsonResponse.data.children
    return suggestedSubredditsList
  }
)

const initialState = {
  list: [],
  isLoading: false,
  failedToLoad: false
}

const autocompleteSubredditsListSlice = createSlice({
  name: 'autocompleteSubredditsList',
  initialState: initialState,
  reducers: {
    clearList: state => {
      state.list = [];
    }
  },
  extraReducers: {
    [loadAutocompleteList.pending]: (state) => { state.isLoading = true },
    [loadAutocompleteList.rejected]: (state) => { state.failedToLoad = true },
    [loadAutocompleteList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.failedToLoad = false;
      state.list = action.payload;
    }
  }
})

export const { clearList } = autocompleteSubredditsListSlice.actions

export const selectAutocompleteList = state => state.autocompleteSubredditsList.list;
export const isLoading = state => state.autocompleteSubredditsList.isLoading;

export default autocompleteSubredditsListSlice.reducer