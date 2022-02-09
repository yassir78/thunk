import './App.css';

import React from 'react';

import { Todos } from './features/todo/Todos';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Todos/>
      </header>
    </div>
  );
}

export default App;
