import { configureStore } from '@reduxjs/toolkit';

import searchBarReducer from './searchBar/searchBarSlice';
import switchReducer from './switch/switchSlice';
import getRedditDataReducer from './getRedditData/getRedditDataSlice';

export const store = configureStore({
  reducer: {
    searchBar: searchBarReducer,
    switch: switchReducer,
    getRedditData: getRedditDataReducer
  }
});