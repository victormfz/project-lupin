import React, { useState } from 'react';
import '../../styles/login.css';
import lupinLogo from '../../assets/img/Logo-LUPIN.png';

export default function Register({ onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não correspondem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    // Simulação de registro
    setTimeout(() => {
      console.log('Registrando com:', { username, email, password });
      setLoading(false);
      // Aqui você integrar o registro real
    }, 1000);
  };

  return (
    <div className="login-container login-page register-page">
      <img className="login-logo" src={lupinLogo} alt="Logo Lupin" />
      <div className="login-card register-card">
        <div className="centralize-header">
          <div className="login-header">
            <h1>Criar Conta</h1>
            <p>Se torne um <strong>Lupin!</strong></p>
          </div>
          <div style={{ paddingTop: '20px', color: '#b0b0b0', lineHeight: '1.6' }}>
            <p>Crie sua conta para acessar todos os recursos da plataforma. </p>
            <br></br>
            <h4>Rápido, simples e seguro.</h4>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="username">Usuário</label>
              <input
                id="username"
                type="text"
                placeholder="Seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Já tem uma conta?{' '}
              <button
                type="button"
                className="link-button"
                onClick={onSwitchToLogin}
                disabled={loading}
              >
                Faça login aqui
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
