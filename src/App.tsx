import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from './pages/MainPage/main';
import { DocumentosProveedor } from './pages/AdminPanelHome/ValidateDocsProvider/ValidateDocs';
import { DocumentosCliente } from './pages/AdminPanelHome/ValidateDocsCustomer/ValidateDocsCustomer';
import { HomeAdmin } from './pages/AdminPanelHome/Home/HomeAdmin';
import { RejectedDocuments } from './pages/AdminPanelHome/RejectedDocuments/RejectedDocuments';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path='/'
            element={<MainPage />}
          />
          <Route
            path='/documentosProveedor'
            element={<DocumentosProveedor />}
          />
          <Route
            path='/documentosCliente'
            element={<DocumentosCliente />}
          />
          <Route
            path='/homeAdmin'
            element={<HomeAdmin />}
          />

          <Route
            path='/rejectedDocuments'
            element={<RejectedDocuments />}
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
