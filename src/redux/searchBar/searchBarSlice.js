import { createSlice } from '@reduxjs/toolkit';

const searchBar = createSlice({
  name: 'searchBar',
  initialState: "",
  reducers:{
    setSearchTerm: (state, action) => {
      return action.payload
    },
    clearSearchTerm: (state, action) => {
      return ""
    }
  }
})

export const { setSearchTerm, clearSearchTerm } = searchBar.actions;
export default searchBar.reducer;