import React from 'react';
import urlJoin from 'url-join';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={`${urlJoin((window as any).__webpack_public_path__, logo)}`}
          className="App-logo"
          alt="logo"
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          micro-app2
        </a>
      </header>
    </div>
  );
}

export default App;
