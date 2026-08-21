import React, { useState } from 'react';
import '../../styles/main.css';
import { useNavigate } from 'react-router-dom';

export default function Home({ onLogout }) {
  const [activeSection, setActiveSection] = useState('overview');
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <main className="main-content">
          <h1>oiiiiiiiiiiiiii</h1>
          <button onClick={handleLogout}>Voltar ao Login</button>
        </main>
      </div>
    </div>
  );
}
