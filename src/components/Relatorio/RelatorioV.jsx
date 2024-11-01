import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Spinner, Alert, Table, Button } from 'react-bootstrap';

const RelatorioV = () => {
  const [vendas, setVendas] = useState([]);
  const [filteredVendas, setFilteredVendas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vendasResponse, clientesResponse, produtosResponse] = await Promise.all([
          axios.get('https://localhost:5000/api/Vendas'),
          axios.get('https://localhost:5000/api/Clientes'),
          axios.get('https://localhost:5000/api/Produtos'),
        ]);

        setVendas(vendasResponse.data);
        setFilteredVendas(vendasResponse.data); // Inicialmente, todas as vendas são mostradas
        setClientes(clientesResponse.data);
        setProdutos(produtosResponse.data);
      } catch (error) {
        setError("Erro ao carregar os dados.");
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    if (!startDate || !endDate) {
      alert("Por favor, selecione ambas as datas.");
      return;
    }

    const filtered = vendas.filter(venda => {
      const dataEmissao = new Date(venda.dataEmissao);
      return dataEmissao >= startDate && dataEmissao <= endDate;
    });

    setFilteredVendas(filtered);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        {error}
      </Alert>
    );
  }

  if (!filteredVendas.length) {
    return <div>Nenhuma venda encontrada.</div>;
  }

  const clientesMap = Object.fromEntries(clientes.map(cliente => [cliente.id, cliente.nome]));
  const produtosMap = Object.fromEntries(produtos.map(produto => [produto.id, produto.nome]));

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">RELATÓRIO DE VENDAS💵</h2>
      <div className="mb-3">
        <label htmlFor="startDate" className="form-label">Data Inicial</label>
        <DatePicker
          id="startDate"
          selected={startDate}
          onChange={date => setStartDate(date)}
          dateFormat="dd/MM/yyyy"
          className="form-control"
          placeholderText="Selecione uma data"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="endDate" className="form-label">Data Final</label>
        <DatePicker
          id="endDate"
          selected={endDate}
          onChange={date => setEndDate(date)}
          dateFormat="dd/MM/yyyy"
          className="form-control"
          placeholderText="Selecione uma data"
        />
      </div>
      <Button 
        style={{ 
          backgroundColor: '#ffcccb', // Tom pastel rosa
          color: '#333',
          border: 'none'
        }} 
        className="mb-3" 
        onClick={handleFilter}
      >
        🔍 Filtrar
      </Button>
      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Produto</th>
            <th>Valor Total</th>
            <th>Data de Emissão</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendas.map(venda => (
            <tr key={venda.id}>
              <td>{venda.id}</td>
              <td>{clientesMap[venda.clienteId] || 'Desconhecido'}</td>
              <td>{produtosMap[venda.produtoId] || 'Desconhecido'}</td>
              <td>R$ {venda.valorTotal.toFixed(2)}</td>
              <td>{new Date(venda.dataEmissao).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RelatorioV;
