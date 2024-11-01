import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home = () => {
  const [indicadores, setIndicadores] = useState({
    totalClientes: 0,
    produtosEmEstoque: 0,
    vendasTotais: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIndicadores = async () => {
      try {
        const [clientesResponse, produtosResponse, vendasResponse] = await Promise.all([
          axios.get('https://localhost:5000/api/Clientes'),
          axios.get('https://localhost:5000/api/Produtos'),
          axios.get('https://localhost:5000/api/Vendas'),
        ]);

        const totalClientes = clientesResponse.data.length;
        const produtosEmEstoque = produtosResponse.data.filter(produto => produto.quantidadeEstoque).length;
        const vendasTotais = vendasResponse.data.length;

        setIndicadores({ totalClientes, produtosEmEstoque, vendasTotais });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIndicadores();
  }, []);

  const data = {
    labels: ['Clientes', 'Produtos', 'Vendas'],
    datasets: [
      {
        label: 'Total',
        data: [indicadores.totalClientes, indicadores.produtosEmEstoque, indicadores.vendasTotais],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(153, 102, 255, 0.6)'],
      },
    ],
  };

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="row mb-4">
          <div className="col">
            <h2 className="display-6 text-primary border-bottom pb-2">
              <i className="bi bi-shop me-2"></i>
              BEM-VINDO!
            </h2>
          </div>
        </div>

        <div className="row g-4">
          {/* Card de Clientes */}
          <div className="col-12 col-md-4">
            {loading ? (
              <div className="card h-100 border-0 shadow-sm animate__animated animate__fadeIn">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-primary">Carregando...</h6>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card h-100 border-0 shadow-sm animate__animated animate__fadeIn">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="card-subtitle mb-2 text-primary">
                        <i className="bi bi-people-fill me-2"></i>
                        Total de Clientes
                      </h6>
                      <h2 className="card-title mb-0 display-6">{indicadores.totalClientes}</h2>
                    </div>
                    <span className="badge bg-primary-subtle text-primary rounded-pill fs-6">Ativos</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card de Produtos */}
          <div className="col-12 col-md-4">
            {loading ? (
              <div className="card h-100 border-0 shadow-sm animate__animated animate__fadeIn">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-success">Carregando...</h6>
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card h-100 border-0 shadow-sm animate__animated animate__fadeIn">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="card-subtitle mb-2 text-success">
                        <i className="bi bi-box-seam-fill me-2"></i>
                        Produtos em Estoque
                      </h6>
                      <h2 className="card-title mb-0 display-6">{indicadores.produtosEmEstoque}</h2>
                    </div>
                    <span className="badge bg-success-subtle text-success rounded-pill fs-6">Disponíveis</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card de Vendas */}
          <div className="col-12 col-md-4">
            {loading ? (
              <div className="card h-100 border-0 shadow-sm animate__animated animate__fadeIn">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-info">Carregando...</h6>
                  <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card h-100 border-0 shadow-sm animate__animated animate__fadeIn">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="card-subtitle mb-2 text-info">
                        <i className="bi bi-receipt me-2"></i>
                        Vendas Totais
                      </h6>
                      <h2 className="card-title mb-0 display-6">{indicadores.vendasTotais}</h2>
                    </div>
                    <span className="badge bg-info-subtle text-info rounded-pill fs-6">Realizadas</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Gráfico de Indicadores */}
        <div className="row mt-4">
          <div className="col">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-center">Visão Geral dos Indicadores</h5>
                <div style={{ height: '300px' }}>
                  <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="row mt-4">
          <div className="col">
            <div className="card border-0 bg-white shadow-sm">
              <div className="card-body text-center text-muted small">
                <i className="bi bi-clock-history me-2"></i>
                Dashboard atualizado em tempo real
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
