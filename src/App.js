import React from 'react';
import './App.css';
import routes from './routes'
import Nav from './Components/Nav'

function App() {
  return (
    <div>
      <div className='App'></div>
      <Nav/>
      {routes}
    </div>
  )
};

export default App;
