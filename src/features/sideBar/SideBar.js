import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './sideBar.css';
import { getSwitchState } from'../../redux/switch/switchSlice';
import { loadPopularSubreddits, selectPopularSubreddits } from '../../redux/getRedditData/popularSubredditsSlice';
import { loadPosts } from '../../redux/getRedditData/postsSlice';
import { storeEndpoint } from '../../redux/filters/subredditsFiltersSlice';


const SideBar = () => {
  const dispatch = useDispatch();
  const topSubreddits = useSelector(selectPopularSubreddits);
  const switchStatus = useSelector(getSwitchState);

  
  const toggleSideBar = () => {
    const sidebar = document.querySelector('#sidebar');  
    sidebar.classList.toggle('sidebar_open');
  }

  const handleClick = (e) => {
    let target = e.target;

    if(target.nodeName === 'IMG' || target.nodeName === 'P') {
      target = target.parentNode;
    }

    const subreddit = target.dataset.subreddit;
    const values = { name: subreddit, filter: "hot" }
    const sidebar = document.querySelector('#sidebar');

    dispatch(loadPosts(values));
    dispatch(storeEndpoint(values.name));

    sidebar.classList.remove('sidebar_open');
  }
  
  useEffect(() =>{
    dispatch(loadPopularSubreddits());
  },[dispatch])
  

  return (
    <div className={switchStatus ? "sidebar_container-dark--closed" : "sidebar_container--closed"} id='sidebar'>
      <button onClick={toggleSideBar} ><img src={process.env.PUBLIC_URL + '/media/burger-button.svg'} alt="" id="burger_menu"/></button>
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
          <li key={id} onClick={handleClick} data-subreddit={topSubreddit.data.display_name}>
            <img src={icon} style={{borderColor: keyColor}} id="subreddit_icon" alt=""/>
            <p>{name}</p>
          </li>
        )
      })}
    </div>
  )
}

export default SideBar;