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
          id="search_term"
          type="text" 
          value={term}
          onChange={onSearchHandler}/>
       
          <button 
            onClick={onClearHandler}
            id="search_term-button">
            <img src={process.env.PUBLIC_URL + 'media/magnifying_icon.svg'}  alt=""/>
          </button>
      </div>
    </>
  )
}

export default SearchBar