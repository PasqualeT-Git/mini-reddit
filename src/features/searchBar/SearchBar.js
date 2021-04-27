import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSearchTerm, clearSearchTerm } from '../../redux/searchBar/searchBarSlice';
import { getSwitchState } from '../../redux/switch/switchSlice';
import './searchBar.css';

const SearchBar = () => {
  const [ term, setTerm ] = useState("");
  const dispatch = useDispatch();
  const switchStatus = useSelector(getSwitchState);

  const onSearchHandler = (e) => {
    setTerm(e.target.value)
    dispatch(setSearchTerm(term))
  }

  const onClearHandler = () => {
    dispatch(clearSearchTerm()) 
  }

  return (
    <>
      <div className={switchStatus && "dark-theme"}>
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