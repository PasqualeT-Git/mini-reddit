import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setSearchTerm, clearSearchTerm } from '../../redux/searchBar/searchBarSlice';
import './searchBar.css';


const SearchBar = () => {
  const [ term, setTerm ] = useState("");
  const dispatch = useDispatch();

  const onSearchHandler = (e) => {
    setTerm(e.target.value)
    dispatch(setSearchTerm(term))
  }

  const onClearHandler = () => {
    dispatch(clearSearchTerm()) 
  }

  return (
    <>
      <div id="search-container">
        <input 
          id="searchTerm"
          type="text" 
          value={term} 
          onChange={onSearchHandler}/>
        <input 
          type="submit" 
          onClick={onClearHandler}
          id="searchTerm-submit"/>
      </div>
    </>
  )
}

export default SearchBar