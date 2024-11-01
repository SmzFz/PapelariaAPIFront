import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Spinner, Alert, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCliente, setCurrentCliente] = useState({
    id: '',
    nome: '',
    cpfCnpj: '',
    endereco: '',
    telefone: '',
    email: ''
  });

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('https://localhost:5000/api/Clientes');
        setClientes(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    resetCurrentCliente();
  };

  const handleModalShow = (cliente = null) => {
    setIsEditing(!!cliente);
    setCurrentCliente(cliente || resetCurrentCliente());
    setShowModal(true);
  };

  const resetCurrentCliente = () => ({
    id: '',
    nome: '',
    cpfCnpj: '',
    endereco: '',
    telefone: '',
    email: ''
  });

  const handleSave = async () => {
    try {
      const clienteData = {
        id: isEditing ? currentCliente.id : undefined,
        nome: currentCliente.nome,
        cpfCnpj: currentCliente.cpfCnpj,
        endereco: currentCliente.endereco,
        telefone: currentCliente.telefone,
        email: currentCliente.email
      };

      if (!clienteData.nome || !clienteData.cpfCnpj || !clienteData.endereco || !clienteData.telefone || !clienteData.email) {
        alert("Todos os campos são obrigatórios.");
        return;
      }

      if (!/^\d{11}$|^\d{14}$/.test(clienteData.cpfCnpj)) {
        alert("CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos.");
        return;
      }

      if (isEditing) {
        await axios.put(`https://localhost:5000/api/Clientes/${currentCliente.id}`, clienteData);
      } else {
        await axios.post('https://localhost:5000/api/Clientes', clienteData);
      }

      const response = await axios.get('https://localhost:5000/api/Clientes');
      setClientes(response.data);
      handleModalClose();
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
      alert("Erro ao salvar cliente: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        await axios.delete(`https://localhost:5000/api/Clientes/${id}`);
        const response = await axios.get('https://localhost:5000/api/Clientes');
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao excluir cliente:", error);
        alert("Erro ao excluir cliente: " + (error.response?.data?.message || error.message));
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
      <h2 className="text-center mb-4">CLIENTES🙋‍♂️</h2>
      <div className="text-center mb-3">
        <Button 
          style={{ 
            backgroundColor: '#ffcccb', // Tom pastel rosa
            color: '#333',
            border: 'none'
          }} 
          onClick={() => handleModalShow()}
        >
          📦 Criar Cliente
        </Button>
      </div>
      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.cpfCnpj}</td>
              <td>{cliente.endereco}</td>
              <td>{cliente.telefone}</td>
              <td>{cliente.email}</td>
              <td>
                <Button 
                  style={{ 
                    backgroundColor: '#ffe4b5', // Tom pastel amarelo
                    color: '#333',
                    border: 'none' 
                  }} 
                  className="me-2" 
                  onClick={() => handleModalShow(cliente)}
                >
                  ✏️ Editar
                </Button>
                <Button 
                  style={{ 
                    backgroundColor: '#ffb3b3', // Tom pastel vermelho
                    color: '#333',
                    border: 'none' 
                  }} 
                  onClick={() => handleDelete(cliente.id)}
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
          <Modal.Title>{isEditing ? 'Editar Cliente' : 'Criar Cliente'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input
                type="text"
                id="nome"
                className="form-control"
                value={currentCliente.nome}
                onChange={e => setCurrentCliente({ ...currentCliente, nome: e.target.value })}
                required
                maxLength="100"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cpfCnpj" className="form-label">CPF/CNPJ</label>
              <input
                type="text"
                id="cpfCnpj"
                className="form-control"
                value={currentCliente.cpfCnpj}
                onChange={e => setCurrentCliente({ ...currentCliente, cpfCnpj: e.target.value })}
                required
                placeholder="Digite 11 ou 14 dígitos"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endereco" className="form-label">Endereço</label>
              <input
                type="text"
                id="endereco"
                className="form-control"
                value={currentCliente.endereco}
                onChange={e => setCurrentCliente({ ...currentCliente, endereco: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telefone" className="form-label">Telefone</label>
              <input
                type="text"
                id="telefone"
                className="form-control"
                value={currentCliente.telefone}
                onChange={e => setCurrentCliente({ ...currentCliente, telefone: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={currentCliente.email}
                onChange={e => setCurrentCliente({ ...currentCliente, email: e.target.value })}
                required
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
            {isEditing ? 'Salvar Alterações' : 'Criar Cliente'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Clientes;
