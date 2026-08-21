import React, { useState } from 'react';
import Titlebar from './components/Titlebar.jsx';
import LoginContainer from './pages/login/LoginContainer.jsx';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login.jsx';
import Home from './pages/Home/Home.jsx';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginContainer onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="app-shell">
      <Titlebar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home onLogout={() => setIsAuthenticated(false)} />} />
        </Routes>
      </div>
    </div>
  );
}
