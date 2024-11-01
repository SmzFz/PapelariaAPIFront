import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Vendas.module.css'; // Importar arquivo CSS personalizado

const Vendas = () => {
  const navigate = useNavigate();
  const [vendas, setVendas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVenda, setCurrentVenda] = useState({
    clienteId: '',
    produtoId: '',
    valorTotal: 0,
    dataEmissao: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vendasResponse, clientesResponse, produtosResponse] = await Promise.all([
          axios.get('https://localhost:5000/api/Vendas'),
          axios.get('https://localhost:5000/api/Clientes'),
          axios.get('https://localhost:5000/api/Produtos')
        ]);

        setVendas(vendasResponse.data);
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

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentVenda({ clienteId: '', produtoId: '', valorTotal: 0, dataEmissao: '' });
  };

  const handleModalShow = (venda = null) => {
    if (venda) {
      setIsEditing(true);
      setCurrentVenda(venda);
    } else {
      setIsEditing(false);
      setCurrentVenda({ clienteId: '', produtoId: '', valorTotal: 0, dataEmissao: '' });
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (!currentVenda.clienteId || !currentVenda.produtoId || currentVenda.valorTotal <= 0 || !currentVenda.dataEmissao) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
      }

      const vendaData = {
        clienteId: currentVenda.clienteId,
        produtoId: currentVenda.produtoId,
        valorTotal: parseFloat(currentVenda.valorTotal).toFixed(2),
        dataEmissao: currentVenda.dataEmissao
      };

      // Criar nova venda
      await axios.post('https://localhost:5000/api/Vendas', vendaData);

      // Atualizar quantidade do produto
      const produto = produtos.find(p => p.id === currentVenda.produtoId);
      if (produto) {
        if (produto.quantidade > 0) {
          const novaQuantidade = produto.quantidade - 1;
          await axios.put(`https://localhost:5000/api/Produtos/${produto.id}`, {
            ...produto,
            quantidade: novaQuantidade
          });
          alert(`Quantidade restante do produto "${produto.nome}": ${novaQuantidade}`);
        } else {
          alert("Produto sem estoque suficiente.");
        }
      }

      const response = await axios.get('https://localhost:5000/api/Vendas');
      setVendas(response.data);
      handleModalClose();
    } catch (error) {
      console.error("Erro ao salvar venda:", error);
      alert("Erro ao salvar venda: " + (error.response?.data?.message || error.message));
    }
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

  const clientesMap = Object.fromEntries(clientes.map(cliente => [cliente.id, cliente.nome]));
  const produtosMap = Object.fromEntries(produtos.map(produto => [produto.id, produto]));
  return (
    <div className="container mt-5 papelaria-theme">
      <h2 className="text-center mb-4">VENDAS🛒</h2>
      <div className="text-center mb-3">
        <Button 
          style={{ 
            backgroundColor: '#ffcccb', // Tom pastel rosa
            color: '#333',
            border: 'none'
          }} 
          onClick={() => handleModalShow()}
        >
          📦 Criar Venda
        </Button>
      </div>
      <table className="table table-striped table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Produto</th>
            <th>Valor Total</th>
            <th>Data de Emissão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map(venda => (
            <tr key={venda.id}>
              <td>{venda.id}</td>
              <td>{clientesMap[venda.clienteId] || 'Desconhecido'}</td>
              <td>{produtosMap[venda.produtoId]?.nome || 'Desconhecido'}</td>
              <td>R$ {venda.valorTotal.toFixed(2)}</td>
              <td>{new Date(venda.dataEmissao).toLocaleString()}</td>
              <td>
                <Button 
                  style={{ 
                    backgroundColor: '#ffe4b5', // Tom pastel amarelo
                    color: '#333',
                    border: 'none' 
                  }} 
                  className="me-2" 
                  onClick={() => handleModalShow(venda)}
                >
                  ✏️ Editar
                </Button>
                <Button 
                  style={{ 
                    backgroundColor: '#ffb3b3', // Tom pastel vermelho
                    color: '#333',
                    border: 'none' 
                  }}
                >
                  🗑️ Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Venda' : 'Criar Venda'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Formulário permanece inalterado */}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            style={{ 
              backgroundColor: '#d3d3d3', // Tom pastel cinza
              color: '#333',
              border: 'none' 
            }} 
            onClick={handleModalClose}
          >
            Cancelar
          </Button>
          <Button 
            style={{ 
              backgroundColor: '#90ee90', // Tom pastel verde
              color: '#333',
              border: 'none' 
            }} 
            onClick={handleSave}
          >
            {isEditing ? 'Salvar Alterações' : 'Criar Venda'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Vendas;