import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './navBar.css';
import SearchBar from '../searchBar/SearchBar';
import Switch from '../switch/Switch';
import { getSwitchState } from '../../redux/switch/switchSlice';
import { loadPosts } from '../../redux/getRedditData/postsSlice';

const NavBar = ({login}) => {
  const dispatch = useDispatch();
  const switchStatus = useSelector(getSwitchState);

  const handleClickHomepage = () => {

    if(sessionStorage.getItem('auth_token')){
      window.location = "/";
    }

    window.location = '/application'

    dispatch(loadPosts({name: "", filter: "hot"}))
  }

  if (login) {
    return (
      <nav className={switchStatus ? "nav-dark" : ""}>
      <div className="logo-container">
        <img src={process.env.PUBLIC_URL + '/media/logo_64.svg'} id="mini-reddit-logo" alt=""/>
        <h1 id="logo-title" >Mini-<p>Reddit</p></h1>
      </div>
      <div className="switch-container">
        <img src={process.env.PUBLIC_URL + 'media/sun_light.svg'} className="icon-switch" alt=""/>
        <Switch />
        <img src={process.env.PUBLIC_URL + 'media/moon_light.svg'} className="icon-switch" alt=""/>
      </div>
    </nav>
    )
  }

  return (
    <nav className={switchStatus ? "nav-dark" : ""}>
      <div className="logo-container" onClick={handleClickHomepage}>
        <img src={process.env.PUBLIC_URL + '/media/logo_64.svg'} id="mini-reddit-logo" alt=""/>
        <h1 id="logo-title" >Mini-<p>Reddit</p></h1>
      </div>
      <SearchBar />
      <div className="switch-container">
        <img src={process.env.PUBLIC_URL + 'media/sun_light.svg'} className="icon-switch" alt=""/>
        <Switch />
        <img src={process.env.PUBLIC_URL + 'media/moon_light.svg'} className="icon-switch" alt=""/>
      </div>
    </nav>
  )
}

export default NavBar;