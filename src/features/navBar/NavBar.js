import React from 'react';

import './navBar.css';
import SearchBar from '../searchBar/SearchBar';
import Switch from '../switch/Switch';

const NavBar = () => {
  return (
    <nav>
      <div className="logo-container">
        <img src={process.env.PUBLIC_URL + '/media/logo_64.svg'} id="mini-reddit-logo" alt=""/>
        <h1 id="logo-title" >Mini-<p style={{color: "var(--primary-light)"}} >Reddit</p></h1>
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