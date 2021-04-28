import React from 'react';
import { useSelector } from 'react-redux';

import './navBar.css';
import SearchBar from '../searchBar/SearchBar';
import Switch from '../switch/Switch';
import { getSwitchState } from '../../redux/switch/switchSlice';

const NavBar = (props) => {
  const switchStatus = useSelector(getSwitchState);

  return (
    <nav className={switchStatus ? "nav-dark" : ""}>
      <div className="logo-container">
        <img src={process.env.PUBLIC_URL + '/media/logo_64.svg'} id="mini-reddit-logo" alt=""/>
        <h1 id="logo-title" >Mini-<p>Reddit</p></h1>
      </div>
      <SearchBar switchStatus={props.switchStatus}/>
      <div className="switch-container">
        <img src={process.env.PUBLIC_URL + 'media/sun_light.svg'} className="icon-switch" alt=""/>
        <Switch switchStatus={props.switchStatus}/>
        <img src={process.env.PUBLIC_URL + 'media/moon_light.svg'} className="icon-switch" alt=""/>
      </div>
    </nav>
  )
}

export default NavBar;