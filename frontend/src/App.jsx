// frontend/src/App.jsx
import React from 'react';
import Header from './components/Header';
import SupplierManagement from './pages/SupplierManagement';
import './styles/supplier.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <SupplierManagement />
    </div>
  );
}

export default App;