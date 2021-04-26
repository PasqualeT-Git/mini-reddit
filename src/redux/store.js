import { createStore } from 'redux';

import { searchBarReducer } from './searchBar/searchBarSlice';

export const store = createStore({
  searchBar: searchBarReducer,
});