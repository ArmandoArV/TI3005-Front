import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from './pages/MainPage/main';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path='/'
            element={<MainPage />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
