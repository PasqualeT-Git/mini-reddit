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
        },2000)
      }
    })()
  })

  return (
    <>
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
          <BrowserRouter>
            <Switch>
              <Route path="/application">
                <NavBar />
                <SideBar />
                <div className="main_container">
                  <Filters />
                  <Cards />
                </div>
              </Route>
              <Route path="/goodbye">
                <NavBar login={true} />
                <div className={switchState ? "login_container--dark" : "login_container"}>
                  <div className="login_header">
                    <img src={process.env.PUBLIC_URL + '/media/reddit_robot.png'} alt="" />
                    <h1>Mini <span style={{color: "var(--primary-light)"}}>Reddit</span></h1>
                  </div>
                  <p>Thank you for viisiting me! 🎉
                    <br/><br/>If you have any suggestion, any report to do about this web app, if you like the project or you want just leave me a message.
                    <br/><br/> Use the form below to drop an email and I will be in touch with you as soon as I can!
                  </p>
                  <form action="" style={{margin: "22px 0"}} id="logout_form">
                    <input type="text" name="name" placeholder="Name" style={{gridArea: "inputN"}} required/>
                    <input type="email" name="email" placeholder="Email" style={{gridArea: "inputE"}} required/>  
                    <textarea rows="4" cols="40" placeholder="Your message here..." style={{gridArea: "textArea"}}></textarea>
                    <button style={{marginTop: 12, gridArea: "submit"}}>submit</button>
                  </form>
                  <br/><br/> Thanks net surfer! 🙏🏻
                  <button onClick={handleLogin} style={{width: "40%"}}>Login back</button>
                </div>
              </Route >
              <Route path="/refresh">
                <NavBar login={true} />
                <div className="loading_app">
                  <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                  <p id="loading">Please wait...</p>
                </div>
                {setTimeout(window.location.href.includes('refresh') && handleLogin)}
              </Route >
              <Route path="/">
                <NavBar login={true} />
                <div className={switchState ? "login_container--dark" : "login_container"}>
                  <div className="login_header">
                    <img src={process.env.PUBLIC_URL + '/media/reddit_robot.png'} alt="" />
                    <h1>Mini <span style={{color: "var(--primary-light)"}}>Reddit</span></h1>
                  </div>
                  <p>Hello, net surfer! 
                    <br/><br/>Mini-Reddit is a ligther version of the more famous Reddit, and it has been builded as portfolio project, it doesn't have any commercial purpose.
                    <br/><br/>It is a completely open project, and you can find the source code <a href="https://github.com/PasqualeT-Git/mini-reddit">here</a> .
                    <br/><br/>In order to work, this web app has to comunicate with your Reddit’s account (Don’t worry, I can’t access to your password).
                    <br/><br/>If you wish to continue, please click login and follow the steps in the next page.</p>
                  <button onClick={handleLogin}>Login</button>
                </div>
              </Route>
            </Switch>
          </BrowserRouter>
      </div>
      )}
    </>
  );
}

export default App;
