import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import NavBar from '../features/navBar/NavBar';
import SideBar from '../features/sideBar/SideBar';
import Cards from '../features/cards/Cards';
import Filters from '../features/filters/Filters';

import { getSwitchState } from '../redux/switch/switchSlice';
import getRedditDataRequest from '../helpers/API_requests/getRedditDataRequest';

function App() {
  const switchState = useSelector(getSwitchState);
  const loadingApp = window.location.search.includes(`state=request_`) ? true : false;

  if (switchState) {
    document.body.style = "background: var(--secondary-dark)"
  } else {
    document.body.style = "background: #fff"
  }

  const handleLogin = async () => {
    await getRedditDataRequest();
  }

  useEffect(() => {
    (async () => {
      if(window.location.search.includes(`state=request_`)) {
        await getRedditDataRequest();
        setTimeout(() => {
          window.location.assign("http://localhost:3000/application")
        },2500)
      }
    })()
  })

  return (
    <div>
      {loadingApp ? (
        <>
          <NavBar login={true} />
          <div className="loading_app">
            <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <p id="loading">Please wait...</p>
          </div>
        </>
      ) : (
        <div className="wrapper">
        {!window.location.href.match("/application") ? (
            <>
              <NavBar login={true} />
              <div className={switchState ? "login_container--dark" : "login_container"}>
                <div className="login_header">
                  <img src={process.env.PUBLIC_URL + '/media/reddit_robot.png'} alt="" />
                  <h1>Mini <span style={{color: "var(--primary-light)"}}>Reddit</span></h1>
                </div>
                <p>Hello, net surfer! <br/><br/>Mini-Reddit is a ligther version of the more famous Reddit and it has been builded as portfolio project.<br/><br/>In order to work, this web app has to comunicate with your Reddit’s account (Don’t worry, I can’t access to your password).<br/><br/>If you wish to continue, please click login and follow the steps in the next page.</p>
                <button onClick={handleLogin}>Login</button>
              </div>
            </>
          )
         : undefined}
        <BrowserRouter>
          <Switch>
            <Route path="/application">
              <NavBar />
              <SideBar />
              <Filters />
              <Cards />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
      )}
      
    </div>
  );
}

export default App;
