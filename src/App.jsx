import React from 'react'
import Login from './components/Login'
import { BrowserRouter } from 'react-router-dom';

const isStandalone = !window.__POWERED_BY_HOST__; 

const App = () => {
  const content = (
    <div>
       <Login/>
    </div>
  );

  return isStandalone ? <BrowserRouter>{content}</BrowserRouter> : content;
};

export default App;