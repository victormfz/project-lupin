import React, { useState } from 'react';
import Titlebar from '../../components/Titlebar.jsx';
import Login from './Login';
import Register from './Register';

export default function LoginContainer({ onAuthenticated }) {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="auth-shell">
      <Titlebar />
      <div className="auth-container">
        {isRegistering ? (
          <Register onSwitchToLogin={() => setIsRegistering(false)} />
        ) : (
          <Login onSwitchToRegister={() => setIsRegistering(true)} onLoginSuccess={onAuthenticated} />
        )}
      </div>
    </div>
  );
}
