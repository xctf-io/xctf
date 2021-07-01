import React from 'react';
import logo from './logo.svg';
import './App.css';

import {AuthContext, useAuthContext} from "./context/AuthContext";

function App() {
  const authContext = useAuthContext();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello, <code>{authContext?.current_user[0]?.name}</code>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
