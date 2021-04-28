import React, { useState, useEffect } from 'react';
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
    setTerm('')
  }

  useEffect(() => {
    const screenWidth = document.documentElement.clientWidth;

    if (screenWidth < 420) {
      const modal = document.getElementById('modal_mobile');
      const buttonFireModal = document.getElementById('button--input-small');
      const span = document.getElementById("modal_close_button");
      
      buttonFireModal.onclick = () => {modal.style.display = "block"};
      span.onclick = () => {modal.style.display = "none"};
      window.onclick = (e) => {
        if (e.target === modal) {
          modal.style.display = "none"
        }
      };
    }
  },[])

  return (
    <>
      <div className={switchStatus ? "dark-theme" : ""}>
        <input 
          id="search_term"
          type="text" 
          value={term}
          onChange={onSearchHandler}/>

          <div className='modal_container' id='modal_mobile'>
            <div className="modal-content">
              <input 
                className="input_light--secondary-medium"
                type="text" 
                value={term}
                onChange={onSearchHandler}/>
              <button id="modal_close_button" className="button--secondary-medium"><img src={process.env.PUBLIC_URL + 'media/magnifying_icon.svg'} alt=""/></button>
            </div>
          </div>
       
          <button 
            onClick={onClearHandler}
            className="button--primary-small"
            id="button--input-small">
            <img src={process.env.PUBLIC_URL + 'media/magnifying_icon.svg'}  alt=""/>
          </button>
      </div>
    </>
  )
}

export default SearchBar