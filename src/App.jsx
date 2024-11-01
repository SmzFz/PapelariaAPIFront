import React, { useEffect, useState } from 'react'; // Importando useEffect e useState
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Home from './components/Home/Home';
import Header from './components/Header/Header'; // Ajuste o caminho conforme a estrutura do seu projeto
import Footer from './components/Footer/Footer'; // Ajuste o caminho conforme a estrutura do seu projeto
import Vendas from './components/Vendas/Vendas'; // Ajuste o caminho conforme a estrutura do seu projeto
import Produtos from './components/Produtos/Produtos'; // Ajuste o caminho conforme a estrutura do seu projeto
import Fornecedores from './components/Fornecedores/Fornecedores'; // Ajuste o caminho conforme a estrutura do seu projeto
import Clientes from './components/Clientes/Clientes'; // Ajuste o caminho conforme a estrutura do seu projeto
import Login from './components/Login/Login'; // Importando o componente de Login
import RelatorioV from './components/Relatorio/RelatorioV';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token); // Armazenando o token no login
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token no logout
    setIsAuthenticated(false);
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Header onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/vendas" element={<PrivateRoute element={<Vendas />} />} />
        <Route path="/produtos" element={<PrivateRoute element={<Produtos />} />} />
        <Route path="/fornecedores" element={<PrivateRoute element={<Fornecedores />} />} />
        <Route path="/clientes" element={<PrivateRoute element={<Clientes />} />} />
        <Route path="/relatorio" element={<PrivateRoute element={<RelatorioV />} />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
