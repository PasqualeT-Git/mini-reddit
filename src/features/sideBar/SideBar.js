import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './sideBar.css';
import { getSwitchState } from'../../redux/switch/switchSlice';
import { loadPopularSubreddits, selectPopularSubreddits } from '../../redux/getRedditData/popularSubredditsSlice';
import { loadPosts } from '../../redux/getRedditData/postsSlice';
import { storeSubreddit, selectFilter } from '../../redux/filters/subredditsFiltersSlice';


const SideBar = () => {
  const dispatch = useDispatch();
  const topSubreddits = useSelector(selectPopularSubreddits);
  const switchStatus = useSelector(getSwitchState);
  const filter = useSelector(selectFilter);
  
  const toggleSideBar = () => {
    const sidebar = document.querySelector('#sidebar');
    const logOff = document.querySelector('#log_off_button');

    if (!sidebar.classList.contains('sidebar_open')) {
      logOff.style.display = 'block'
    } else {
      logOff.style.display = 'none'
    }

    sidebar.classList.toggle('sidebar_open');
  }

  const handleClick = (e) => {
    let target = e.target;

    if(target.nodeName === 'IMG' || target.nodeName === 'P') {
      target = target.parentNode;
    }

    const subreddit = target.dataset.subreddit;
    const icon = target.dataset.icon;
    const values = { name: subreddit, filter: filter };
    const sidebar = document.querySelector('#sidebar');

    dispatch(loadPosts(values));
    dispatch(storeSubreddit({title: values.name, icon: icon}));

    sidebar.classList.remove('sidebar_open');
  }

  const handleLogOut = () => {
    sessionStorage.clear();
  }
  
  useEffect(() =>{
    dispatch(loadPopularSubreddits());
  },[dispatch])
  

  return (
    <div className={switchStatus ? "sidebar_container-dark--closed" : "sidebar_container--closed"} id='sidebar'>
      <div className="top_sidebar">
        <button onClick={toggleSideBar}><img src={process.env.PUBLIC_URL + '/media/burger-button.svg'} alt="" id="burger_menu"/></button>
        <a href="/goodbye" id="log_off_button" onClick={handleLogOut}><i className="fa fa-power-off"></i></a>
      </div>
      {topSubreddits.map(topSubreddit => {
        const subredditData = {
          id: topSubreddit.data.id,
          name: topSubreddit.data.display_name_prefixed,
          icon: topSubreddit.data.icon_img === "" || topSubreddit.data.icon_img === null ? process.env.PUBLIC_URL + 'media/reddit_icon.png' : topSubreddit.data.icon_img,
          keyColor: topSubreddit.data.key_color,
          subFullName: topSubreddit.data.name
        }
        const {id, name, icon, keyColor} = subredditData;

        return (
          <li key={id} onClick={handleClick} data-subreddit={topSubreddit.data.display_name} data-icon={icon}>
            <img src={icon} style={{borderColor: keyColor}} id="subreddit_icon" alt=""/>
            <p>{name}</p>
          </li>
        )
      })}
    </div>
  )
}

export default SideBar;