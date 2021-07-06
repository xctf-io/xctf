import React from "react";
import { useAuthContext } from "./context/AuthContext";
import logo from "./logo.svg";

function App() {
  const authContext = useAuthContext();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {authContext?.current_user?.id ? (
          <p>
            Hello, <code>{authContext?.current_user?.name}</code>
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
    </div>
  );
}

export default App;
