import { configureStore } from '@reduxjs/toolkit';

import searchBarReducer from './searchBar/searchBarSlice';
import switchReducer from './switch/switchSlice';

export const store = configureStore({
  reducer: {
    searchBar: searchBarReducer,
    switch: switchReducer,
  }
});