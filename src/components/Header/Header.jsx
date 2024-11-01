import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = ({ onLogout }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
      setIsDarkMode(savedMode === 'dark');
      updateBodyClasses(savedMode === 'dark');
    }
  }, []);

  const updateBodyClasses = (isDark) => {
    document.body.classList.toggle('bg-dark', isDark);
    document.body.classList.toggle('text-white', isDark);
    document.body.classList.toggle('bg-light', !isDark);
    document.body.classList.toggle('text-dark', !isDark);
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      updateBodyClasses(newMode);
      return newMode;
    });
  };

  const navStyles = {
    background: isDarkMode 
      ? 'linear-gradient(to right, #1a1a1a, #2d3436)'
      : 'linear-gradient(to right, #74b9ff, #0984e3)',
    borderBottom: isDarkMode 
      ? '1px solid #2d3436'
      : '1px solid #74b9ff',
    transition: 'all 0.3s ease'
  };

  const linkHoverStyle = {
    transform: 'translateY(-2px)',
    transition: 'transform 0.3s ease'
  };

  const handleLogout = () => {
    onLogout(); // Chama a função de logout
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark' : 'navbar-light'} shadow-lg py-3`} style={navStyles}>
      <div className="container">
        <Link 
          className="navbar-brand fw-bold d-flex align-items-center" 
          to="/"
        >
          <i className="fas fa-store-alt me-2 fs-4"></i>
          <span className="fs-4">PapelMais</span>
        </Link>

        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {token && (
              <>
                <li className="nav-item mx-2">
                  <Link 
                    className="nav-link d-flex align-items-center" 
                    to="/vendas"
                    style={{ cursor: 'pointer' }}
                    onMouseOver={e => Object.assign(e.currentTarget.style, linkHoverStyle)}
                    onMouseOut={e => e.currentTarget.style.transform = 'none'}
                  >
                    <i className="fas fa-shopping-cart me-2"></i>
                    Vendas
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link 
                    className="nav-link d-flex align-items-center" 
                    to="/produtos"
                    style={{ cursor: 'pointer' }}
                    onMouseOver={e => Object.assign(e.currentTarget.style, linkHoverStyle)}
                    onMouseOut={e => e.currentTarget.style.transform = 'none'}
                  >
                    <i className="fas fa-box me-2"></i>
                    Produtos
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link 
                    className="nav-link d-flex align-items-center" 
                    to="/fornecedores"
                    style={{ cursor: 'pointer' }}
                    onMouseOver={e => Object.assign(e.currentTarget.style, linkHoverStyle)}
                    onMouseOut={e => e.currentTarget.style.transform = 'none'}
                  >
                    <i className="fas fa-truck me-2"></i>
                    Fornecedores
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link 
                    className="nav-link d-flex align-items-center" 
                    to="/clientes"
                    style={{ cursor: 'pointer' }}
                    onMouseOver={e => Object.assign(e.currentTarget.style, linkHoverStyle)}
                    onMouseOut={e => e.currentTarget.style.transform = 'none'}
                  >
                    <i className="fas fa-users me-2"></i>
                    Clientes
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link 
                    className="nav-link d-flex align-items-center" 
                    to="/relatorio"
                    style={{ cursor: 'pointer' }}
                    onMouseOver={e => Object.assign(e.currentTarget.style, linkHoverStyle)}
                    onMouseOut={e => e.currentTarget.style.transform = 'none'}
                  >
                    <i className="fas fa-chart-bar me-2"></i>
                    Relatório
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex align-items-center">
            {token ? (
              <button 
                className="btn" 
                style={{ backgroundColor: '#ffb3b3', color: '#333', border: 'none' }} 
                onClick={handleLogout} // Chama a função handleLogout
              >
                <i className="fas fa-sign-out-alt me-2"></i>
                Sair
              </button>
            ) : (
              <Link 
                
              >
                
                Entrar
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
