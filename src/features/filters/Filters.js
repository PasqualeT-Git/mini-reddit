import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './filters.css';
import { getSwitchState } from '../../redux/switch/switchSlice';
import { changeFilter } from '../../redux/filters/subredditsFiltersSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const switchStatus = useSelector(getSwitchState);

  const handleClick = (e) => {
    let target = e.target;
    const arrayFilters = document.querySelectorAll('.filter');

    if(e.target.nodeName === 'IMG') {
      target = e.target.parentElement
    }

    arrayFilters.forEach(filter => {
      if(filter.dataset.active === 'true'){
        filter.classList.remove('filter-active');
        filter.dataset.active = "false";
      }
    })

    if(target.dataset.active === 'false') {
      target.classList.add('filter-active');
      target.dataset.active = "true";
    }
    
    dispatch(changeFilter(target.id));
  }

  return (
    <div className={ switchStatus ? "filters_container--dark" : "filters_container" }>
      <div className="filter" onClick={handleClick} data-active="true" id="best">
        <img src={process.env.PUBLIC_URL + '/media/best_icon.svg'} alt="" id="filter_icon"/>
      </div>
      <div className="filter" onClick={handleClick} data-active="false" id="top">
        <img src={process.env.PUBLIC_URL + '/media/top_icon.svg'} alt="" id="filter_icon"/>
      </div>
      <div className="filter" onClick={handleClick} data-active="false" id="new">
        <img src={process.env.PUBLIC_URL + '/media/new_icon.svg'} alt="" id="filter_icon"/>
      </div>
    </div>
  )
}

export default Filter