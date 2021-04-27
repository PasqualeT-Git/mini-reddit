import React from 'react';
import { useSelector } from 'react-redux';

import './App.css';
import NavBar from '../features/navBar/NavBar';
import { getSwitchState } from '../redux/switch/switchSlice';

function App() {
  const switchState = useSelector(getSwitchState);

  if (switchState) {
    document.body.style = "background: var(--secondary-dark)"
  } else {
    document.body.style = "background: #fff"
  }

  return (
    <div>
      <NavBar />
    </div>
  );
}

export default App;
