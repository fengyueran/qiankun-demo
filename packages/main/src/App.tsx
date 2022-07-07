import React from 'react';
import { loadMicroApp } from 'qiankun';

function App() {
  return (
    <button
      className="App"
      onClick={() => {
        loadMicroApp({
          name: 'app',
          entry: '//localhost:8080',
          container: '#root',
        });
      }}
    >
      loadMicroApp
    </button>
  );
}

export default App;
