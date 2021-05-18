import './App.css';
import React from 'react';
import Navbar from './components/navbar/navbar';
import UserHome from './components/userHome/userHome';
import Home from './components/home/home';
import Shows from './components/shows/shows';
import Main from './components/main/main';
import Seatpick from './components/seatpick/seatpick';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Home/>
    </div>
  );
}

export default App;
