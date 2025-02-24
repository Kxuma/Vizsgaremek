import React from 'react';
import './App.css';
import Home from './Home';
import Feltetelek from './Feltetelek';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UjTema from './UjTema';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/UjTema" element={<UjTema/>}/>
          <Route path="/Feltetelek" element={<Feltetelek/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
