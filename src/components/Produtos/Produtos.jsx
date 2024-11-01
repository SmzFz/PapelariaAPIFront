import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Spinner, Alert, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Produtos.module.css'; // CSS externo para customizações

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduto, setCurrentProduto] = useState({
    id: '',
    nome: '',
    descricao: '',
    preco: 0,
    quantidadeEstoque: 0,
    fornecedorId: ''
  });

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await axios.get('https://localhost:5000/api/Fornecedores');
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error.message);
        return [];
      }
    };

    const fetchProdutos = async () => {
      try {
        const [produtosResponse, fornecedoresResponse] = await Promise.all([
          axios.get('https://localhost:5000/api/Produtos'),
          fetchFornecedores()
        ]);

        setProdutos(produtosResponse.data);
        setFornecedores(fornecedoresResponse);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    resetCurrentProduto();
  };

  const handleModalShow = (produto = null) => {
    setIsEditing(!!produto);
    setCurrentProduto(produto || resetCurrentProduto());
    setShowModal(true);
  };

  const resetCurrentProduto = () => ({
    id: '',
    nome: '',
    descricao: '',
    preco: 0,
    quantidadeEstoque: 0,
    fornecedorId: ''
  });

  const handleSave = async () => {
    try {
      const produtoData = {
        nome: currentProduto.nome,
        descricao: currentProduto.descricao,
        preco: parseFloat(currentProduto.preco).toFixed(2),
        quantidadeEstoque: currentProduto.quantidadeEstoque,
        fornecedorId: currentProduto.fornecedorId
      };

      if (isEditing) {
        await axios.put(`https://localhost:5000/api/Produtos/${currentProduto.id}`, produtoData);
      } else {
        await axios.post('https://localhost:5000/api/Produtos', produtoData);
      }

      const response = await axios.get('https://localhost:5000/api/Produtos');
      setProdutos(response.data);
      handleModalClose();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
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

  const fornecedoresMap = fornecedores.reduce((map, fornecedor) => {
    map[fornecedor.id] = fornecedor.nomeEmpresa;
    return map;
  }, {});

  return (
    <div className="container mt-5 produtos-theme">
      <h2 className="text-center mb-4">PRODUTOS📦</h2>
      <div className="text-center mb-3">
        <Button 
          style={{ 
            backgroundColor: '#ffcccb', // Tom pastel rosa
            color: '#333',
            border: 'none'
          }} 
          onClick={() => handleModalShow()}
        >
          📦 Criar Produto
        </Button>
      </div>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Quantidade em Estoque</th>
            <th>Fornecedor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.descricao}</td>
              <td>R$ {produto.preco.toFixed(2)}</td>
              <td>{produto.quantidadeEstoque}</td>
              <td>{fornecedoresMap[produto.fornecedorId] || 'Desconhecido'}</td>
              <td>
                <Button 
                  style={{ 
                    backgroundColor: '#ffe4b5', // Tom pastel amarelo
                    color: '#333',
                    border: 'none' 
                  }} 
                  className="me-2" 
                  onClick={() => handleModalShow(produto)}
                >
                  ✏️ Editar
                </Button>
                <Button 
                  style={{ 
                    backgroundColor: '#ffb3b3', // Tom pastel vermelho
                    color: '#333',
                    border: 'none' 
                  }} 
                  onClick={() => handleDelete(produto.id)}
                >
                  🗑️ Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Produto' : 'Criar Produto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {/* Formulário permanece inalterado */}
          </form>
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
            {isEditing ? 'Salvar Alterações' : 'Criar Produto'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Produtos;