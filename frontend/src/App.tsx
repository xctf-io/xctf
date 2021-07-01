import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { useAuthContext } from "./context/AuthContext";
import { TestForm } from "./TestForm";

function App() {
  const authContext = useAuthContext();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {authContext ? (
          <p>
            Hello, <code>{authContext?.name}</code>
          </p>
        ) : (
          <p>You are anonymous.</p>
        )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <TestForm />
    </div>
  );
}

export default App;
