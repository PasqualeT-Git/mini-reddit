import { configureStore } from '@reduxjs/toolkit';


import searchBarReducer from './searchBar/searchBarSlice';
import switchReducer from './switch/switchSlice';
import popularSubredditsReducer from './getRedditData/popularSubredditsSlice';
import postsReducer from './getRedditData/postsSlice';
import autocompleteSubredditsListReducer from './getRedditData/autocompleteSubredditsListSlice';
import subredditsFilterReducer from './filters/subredditsFiltersSlice';


export const store = configureStore({
  reducer: {
    searchBar: searchBarReducer,
    switch: switchReducer,
    popularSubreddits: popularSubredditsReducer,
    posts: postsReducer,
    autocompleteSubredditsList: autocompleteSubredditsListReducer,
    subredditsFilters: subredditsFilterReducer
  }
});