import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  const isDarkMode = localStorage.getItem('theme') === 'dark';
  const currentYear = new Date().getFullYear();

  const footerStyles = {
    background: isDarkMode 
      ? 'linear-gradient(to right, #1a1a1a, #2d3436)'
      : 'linear-gradient(to right, #74b9ff, #0984e3)',
    color: isDarkMode ? '#ffffff' : '#ffffff',
    transition: 'all 0.3s ease',
    borderTop: isDarkMode 
      ? '1px solid #2d3436'
      : '1px solid #74b9ff',
  };

  const linkStyle = {
    color: 'inherit',
    transition: 'all 0.3s ease',
    opacity: 0.9
  };

  return (
    <footer className="pt-5 pb-2 position-relative mt-auto shadow-lg" style={footerStyles}>
      <div className="container">
        <div className="row g-4">
          {/* Coluna da Logo e Descrição */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="mb-4">
              <h5 className="mb-4 d-flex align-items-center">
                <i className="fas fa-store-alt fs-4 me-2"></i>
                PapelMais
              </h5>
              <p style={{ opacity: 0.8 }}>
                Materiais escolares, de escritório e arte. Aqui você encontra tudo 
                para transformar suas ideias em realidade. Qualidade e variedade 
                para todos os momentos criativos.
              </p>
            </div>
            <div className="d-flex gap-3">
              <a href="#" className="social-btn" style={linkStyle}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-btn" style={linkStyle}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-btn" style={linkStyle}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-btn" style={linkStyle}>
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Coluna de Links Rápidos */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="mb-4">Navegação Rápida</h5>
            <div className="row">
              <div className="col-6">
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <Link to="/vendas" className="footer-link d-flex align-items-center" style={linkStyle}>
                      <i className="fas fa-shopping-cart me-2"></i>
                      Vendas
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link to="/produtos" className="footer-link d-flex align-items-center" style={linkStyle}>
                      <i className="fas fa-box me-2"></i>
                      Produtos
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link to="/fornecedores" className="footer-link d-flex align-items-center" style={linkStyle}>
                      <i className="fas fa-truck me-2"></i>
                      Fornecedores
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-6">
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <Link to="/clientes" className="footer-link d-flex align-items-center" style={linkStyle}>
                      <i className="fas fa-users me-2"></i>
                      Clientes
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link to="/relatorio" className="footer-link d-flex align-items-center" style={linkStyle}>
                      <i className="fas fa-chart-bar me-2"></i>
                      Relatórios
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link to="/suporte" className="footer-link d-flex align-items-center" style={linkStyle}>
                      <i className="fas fa-headset me-2"></i>
                      Suporte
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Coluna de Contato */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="mb-4">Informações de Contato</h5>
            <div className="contact-info">
              <div className="mb-3">
                <div className="d-flex align-items-center contact-item">
                  <i className="fas fa-map-marker-alt me-3"></i>
                  <div>
                    <p className="mb-0" style={{ opacity: 0.8 }}>Av. Principal, 1234</p>
                    <p className="mb-0" style={{ opacity: 0.8 }}>São Paulo - SP, 01234-567</p>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex align-items-center contact-item">
                  <i className="fas fa-phone me-3"></i>
                  <div>
                    <p className="mb-0" style={{ opacity: 0.8 }}>(11) 1234-5678</p>
                    <p className="mb-0" style={{ opacity: 0.8 }}>Whatsapp: (11) 98765-4321</p>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex align-items-center contact-item">
                  <i className="fas fa-envelope me-3"></i>
                  <div>
                    <p className="mb-0" style={{ opacity: 0.8 }}>contato@papelmais.com</p>
                    <p className="mb-0" style={{ opacity: 0.8 }}>vendas@papelmais.com</p>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex align-items-center contact-item">
                  <i className="fas fa-clock me-3"></i>
                  <div>
                    <p className="mb-0" style={{ opacity: 0.8 }}>Segunda - Sexta: 8h às 18h</p>
                    <p className="mb-0" style={{ opacity: 0.8 }}>Sábado: 9h às 13h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="row justify-content-center py-4">
          <div className="col-md-8">
            <div className="card" style={{
              background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.15)',
              border: 'none'
            }}>
              <div className="card-body text-center py-4">
                <h5 className="card-title mb-3">Newsletter</h5>
                <p className="card-text" style={{ opacity: 0.8 }}>
                  Receba novidades e promoções exclusivas!
                </p>
                <div className="input-group">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Seu melhor e-mail"
                    style={{
                      background: isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      color: 'inherit'
                    }}
                  />
                  <button 
                    className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'}`}
                    type="button"
                  >
                    <i className="fas fa-paper-plane me-2"></i>
                    Inscrever
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div 
        className="text-center p-3 mt-4" 
        style={{
          borderTop: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)',
          opacity: 0.8
        }}
      >
        <small>
          © {currentYear} PapelMais - Todos os direitos reservados
          <span className="mx-2">|</span>
          Feito com <i className="fas fa-heart text-danger mx-1"></i> por Felipe Salmazo
        </small>
      </div>
    </footer>
  );
};

export default Footer;