import React from 'react'
import Login from './components/Login'
import { BrowserRouter } from 'react-router-dom';
import "./index.css";
import CheckInternetConnection from './components/CheckInternetConnection';

const isStandalone = !window.__POWERED_BY_HOST__; 

const App = () => {
  const content = (
    <CheckInternetConnection>
       <Login/>
    </CheckInternetConnection>
  );

  return isStandalone ? <BrowserRouter>{content}</BrowserRouter> : content;
};

export default App;