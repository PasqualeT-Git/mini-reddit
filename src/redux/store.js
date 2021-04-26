import { configureStore } from '@reduxjs/toolkit';

import searchBarReducer from './searchBar/searchBarSlice';

export const store = configureStore({
  reducer: {
    searchBar: searchBarReducer,
  }
});