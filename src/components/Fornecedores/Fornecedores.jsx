import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Spinner, Alert, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFornecedor, setCurrentFornecedor] = useState({
    id: '',
    nomeEmpresa: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    email: ''
  });

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await axios.get('https://localhost:5000/api/Fornecedores');
        setFornecedores(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFornecedores();
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    resetCurrentFornecedor();
  };

  const handleModalShow = (fornecedor = null) => {
    setIsEditing(!!fornecedor);
    setCurrentFornecedor(fornecedor || resetCurrentFornecedor());
    setShowModal(true);
  };

  const resetCurrentFornecedor = () => ({
    id: '',
    nomeEmpresa: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    email: ''
  });

  const handleSave = async () => {
    try {
      const fornecedorData = {
        id: currentFornecedor.id,
        nomeEmpresa: currentFornecedor.nomeEmpresa,
        cnpj: currentFornecedor.cnpj,
        endereco: currentFornecedor.endereco,
        telefone: currentFornecedor.telefone,
        email: currentFornecedor.email
      };

      if (!/^\d{14}$/.test(fornecedorData.cnpj)) {
        alert("CNPJ deve ter 14 dígitos.");
        return;
      }

      if (isEditing) {
        await axios.put(`https://localhost:5000/api/Fornecedores/${fornecedorData.id}`, fornecedorData);
      } else {
        await axios.post('https://localhost:5000/api/Fornecedores', fornecedorData);
      }

      const response = await axios.get('https://localhost:5000/api/Fornecedores');
      setFornecedores(response.data);
      handleModalClose();
    } catch (error) {
      console.error("Erro ao salvar fornecedor:", error);
      alert("Erro ao salvar fornecedor: " + error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este fornecedor?")) {
      try {
        await axios.delete(`https://localhost:5000/api/Fornecedores/${id}`);
        const response = await axios.get('https://localhost:5000/api/Fornecedores');
        setFornecedores(response.data);
      } catch (error) {
        console.error("Erro ao excluir fornecedor:", error);
        alert("Erro ao excluir fornecedor: " + error.message);
      }
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

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">FORNECEDORES📬</h2>
      <div className="text-center mb-3">
        <Button 
          style={{ 
            backgroundColor: '#ffcccb', // Tom pastel rosa
            color: '#333',
            border: 'none'
          }} 
          onClick={() => handleModalShow()}
        >
          📦 Criar Fornecedor
        </Button>
      </div>
      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nome da Empresa</th>
            <th>CNPJ</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map(fornecedor => (
            <tr key={fornecedor.id}>
              <td>{fornecedor.id}</td>
              <td>{fornecedor.nomeEmpresa}</td>
              <td>{fornecedor.cnpj}</td>
              <td>{fornecedor.endereco}</td>
              <td>{fornecedor.telefone}</td>
              <td>{fornecedor.email}</td>
              <td>
                <Button 
                  style={{ 
                    backgroundColor: '#ffe4b5', // Tom pastel amarelo
                    color: '#333',
                    border: 'none' 
                  }} 
                  className="me-2" 
                  onClick={() => handleModalShow(fornecedor)}
                >
                  ✏️ Editar
                </Button>
                <Button 
                  style={{ 
                    backgroundColor: '#ffb3b3', // Tom pastel vermelho
                    color: '#333',
                    border: 'none' 
                  }} 
                  onClick={() => handleDelete(fornecedor.id)}
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
          <Modal.Title>{isEditing ? 'Editar Fornecedor' : 'Criar Fornecedor'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="nomeEmpresa" className="form-label">Nome da Empresa</label>
              <input
                type="text"
                id="nomeEmpresa"
                className="form-control"
                value={currentFornecedor.nomeEmpresa}
                onChange={e => setCurrentFornecedor({ ...currentFornecedor, nomeEmpresa: e.target.value })}
                required
                maxLength="100"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cnpj" className="form-label">CNPJ</label>
              <input
                type="text"
                id="cnpj"
                className="form-control"
                value={currentFornecedor.cnpj}
                onChange={e => setCurrentFornecedor({ ...currentFornecedor, cnpj: e.target.value })}
                required
                pattern="^\d{14}$"
                minLength="14"
                maxLength="14"
                placeholder="Digite 14 dígitos"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endereco" className="form-label">Endereço</label>
              <input
                type="text"
                id="endereco"
                className="form-control"
                value={currentFornecedor.endereco}
                onChange={e => setCurrentFornecedor({ ...currentFornecedor, endereco: e.target.value })}
                required
                minLength="1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telefone" className="form-label">Telefone</label>
              <input
                type="text"
                id="telefone"
                className="form-control"
                value={currentFornecedor.telefone}
                onChange={e => setCurrentFornecedor({ ...currentFornecedor, telefone: e.target.value })}
                required
                minLength="1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={currentFornecedor.email}
                onChange={e => setCurrentFornecedor({ ...currentFornecedor, email: e.target.value })}
                required
                minLength="1"
              />
            </div>
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
            {isEditing ? 'Salvar Alterações' : 'Criar Fornecedor'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Fornecedores;
