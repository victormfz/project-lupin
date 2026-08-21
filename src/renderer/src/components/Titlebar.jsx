import React, { useEffect, useState } from 'react';
import lupinIcon from '../assets/img/logo-pqn.png';

export default function Titlebar() {
  const [version, setVersion] = useState('');

  useEffect(() => {
    window.api.app.getVersion().then(setVersion);
  }, []);

  return (
    <div className="titlebar">
      <div className="titlebar-brand">
        <img className="titlebar-logo" src={lupinIcon} alt="" />
        <span className="titlebar-title">Project Lupin {version && `v${version}`}</span>
      </div>
      <div className="titlebar-controls">
        <button onClick={() => window.api.window.minimize()} aria-label="Minimizar">
          &#8211;
        </button>
        <button onClick={() => window.api.window.maximize()} aria-label="Maximizar">
          &#9633;
        </button>
        <button onClick={() => window.api.window.close()} aria-label="Fechar" className="close">
          &#10005;
        </button>
      </div>
    </div>
  );
}
