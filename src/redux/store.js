import { configureStore } from '@reduxjs/toolkit';

import searchBarReducer from './searchBar/searchBarSlice';
import switchReducer from './switch/switchSlice';
import popularSubredditsReducer from './getRedditData/popularSubredditsSlice';
import postsReducer from './getRedditData/postsSlice';

export const store = configureStore({
  reducer: {
    searchBar: searchBarReducer,
    switch: switchReducer,
    popularSubreddits: popularSubredditsReducer,
    posts: postsReducer
  }
});