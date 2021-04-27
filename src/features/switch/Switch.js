import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './switch.css';
import { toggleSwitch } from '../../redux/switch/switchSlice';

const Switch = () => {
  const [state, setState] = useState(true);
  const dispatch = useDispatch();

  const handleSwitch = () => {
    setState(!state)
    dispatch(toggleSwitch(state));
  }

  return (
    <label className={!state ? "switch-dark" : "switch"}>
      <input type="checkbox" onClick={handleSwitch}/>
      <span></span> 
    </label>
  )
}

export default Switch