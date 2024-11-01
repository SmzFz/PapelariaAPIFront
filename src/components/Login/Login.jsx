import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const USUARIO_CORRETO = 'adm'; // Substitua pelo usuário correto
  const SENHA_CORRETA = 'adm'; // Substitua pela senha correta

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === USUARIO_CORRETO && password === SENHA_CORRETA) {
      const token = 'seu_token_aqui'; // Token simulado
      localStorage.setItem('token', token); // Armazena o token
      onLogin(token); // Notifica o App sobre o login
      navigate('/'); // Redireciona para a página Home
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">LOGIN</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuário</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>
          <button 
            type="submit" 
            style={{ backgroundColor: '#90ee90', border: 'none', color: '#333' }} 
            className="btn w-100"
          >
            Entrar
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="/esqueci-senha" style={{ color: '#ffb3b3' }}>Esqueci minha senha</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
