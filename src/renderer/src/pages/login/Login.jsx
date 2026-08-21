import React, { useEffect, useRef, useState } from 'react';
import '../../styles/login.css';
import { useNavigate } from 'react-router-dom';
import lupinLogo from '../../assets/img/Logo-LUPIN.png';
import animatedSprite from '../../assets/gif/sprite-animado-gato.gif';
import animatedLetters from '../../assets/gif/sprite-animado-letras.gif';
import loadingDots from '../../assets/gif/bolinhas-carregamento.gif';

export default function Login({ onSwitchToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginSucceeded, setLoginSucceeded] = useState(false);
  const [showAnimatedLetters, setShowAnimatedLetters] = useState(true);
  const loginTimerRef = useRef(null);
  const transitionTimerRef = useRef(null);
  const lettersTimerRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      clearTimeout(loginTimerRef.current);
      clearTimeout(transitionTimerRef.current);
      clearTimeout(lettersTimerRef.current);
    };
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Por favor, insira um email válido');
      return;
    }

    setLoading(true);
    loginTimerRef.current = setTimeout(() => {
      console.log('Login com:', { email, password });
      setLoginSucceeded(true);

      lettersTimerRef.current = setTimeout(() => {
        setShowAnimatedLetters(false);
      }, 780);

      transitionTimerRef.current = setTimeout(() => {
        navigate('/home');
        onLoginSuccess();
      }, 4000);
    }, 1000);
  };

  if (loginSucceeded) {
    return (
      <div className="login-container login-page">
        <div className="login-animation-stage">
          <img className="login-sprite" src={animatedSprite} alt="Carregando" />
          {showAnimatedLetters && (
            <img
              className="login-letters-sprite"
              src={animatedLetters}
              alt="Lupin"
            />
          )}
          {!showAnimatedLetters && (
            <img
              className="login-loading-dots"
              src={loadingDots}
              alt="Carregando"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="login-container login-page">
      <img className="login-logo" src={lupinLogo} alt="Logo Lupin" />
      <div className="login-card">
        <div className="centralize-header">
          <div className="login-header">
            <h1>Bem-vindo ao Lupin!</h1>
            <p>Faça login para continuar</p>
          </div>
          <div style={{ paddingTop: '20px', color: '#b0b0b0', lineHeight: '1.6' }}>
            <p>Acesse sua conta para continuar usando nossa plataforma.</p>
            <br></br>
            <p>Fazer ligações de <strong>voz e vídeo</strong> nunca foi tão fácil!</p>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="login-form" noValidate>
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email ou Usuário</label>
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

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Não tem uma conta?{' '}
              <button
                type="button"
                className="link-button"
                onClick={onSwitchToRegister}
                disabled={loading}
              >
                Registre-se aqui
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
