import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './sideBar.css';
import { getSwitchState } from'../../redux/switch/switchSlice';
import { loadPopularSubreddits, selectPopularSubreddits } from '../../redux/getRedditData/popularSubredditsSlice';
import { loadPosts } from '../../redux/getRedditData/postsSlice';
import { storeSubreddit, selectFilter, selectStoredSubreddit } from '../../redux/filters/subredditsFiltersSlice';


const SideBar = () => {
  const dispatch = useDispatch();
  const topSubreddits = useSelector(selectPopularSubreddits);
  const switchStatus = useSelector(getSwitchState);
  const filter = useSelector(selectFilter);

  let subreddit = useSelector(selectStoredSubreddit);

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
    const backgroundImg = target.dataset.bckgimage;
    const values = { name: subreddit, filter: filter };
    const sidebar = document.querySelector('#sidebar');
  
    dispatch(loadPosts(values));
    dispatch(storeSubreddit({title: values.name, icon: icon, bckgImage: backgroundImg}));

    sidebar.classList.remove('sidebar_open');
  }

  const handleLogOut = () => {
    sessionStorage.clear();
  }
  
  useEffect(() => {
    if(window.innerWidth >= 1200){
      const sidebar = document.querySelector('#sidebar');
      const button = document.querySelector('#burger_menu').parentElement;
      const topSidebar = sidebar.children[0];

      let backgroundImg = subreddit.bckgImage?.split('?')[0] ?? process.env.PUBLIC_URL + 'media/reddit_bckimg.jpg';

      if ( backgroundImg === "" ) { 
        backgroundImg = process.env.PUBLIC_URL + 'media/reddit_bckimg.jpg';
      }

      button.style.display = "none";
      sidebar.style.animation = "none";
      sidebar.classList.add('sidebar_open');
      topSidebar.style.backgroundImage = `url(${backgroundImg})`
    }
  })

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
          <li key={id} 
              onClick={handleClick}
              className="subreddit_tile"
              data-subreddit={topSubreddit.data.display_name} 
              data-icon={icon} 
              data-bckgimage={topSubreddit.data.banner_background_image}
          >
            <img src={icon} style={{borderColor: keyColor}} id="subreddit_icon" alt=""/>
            <p>{name}</p>
          </li>
        )
      })}
    </div>
  )
}

export default SideBar;