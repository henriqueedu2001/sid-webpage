"use client";

import React, {useState, useEffect} from 'react'

import './Users.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { apiFetch } from '../../../core/auth';

function Contribute() {

  return (
    <div>
      <Navbar/>
      {Content()}
      <Footer/>
    </div>
  )
}

function Content() {
  const [data, setData] = useState([]);
  const [role, setRole] = useState("any");
  const [totalItems, setTotalItems] = useState(0);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [limit] = useState(24);

  const [modalVisible, setModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [newRole, setNewRole] = useState("");

  const totalPages = Math.ceil(totalItems / limit);

  useEffect(() => {
    fetchData();
  }, [currentPage, role]);

  async function fetchData() {
    setIsLoading(true);
    const skip = (currentPage - 1) * limit;

    let url = `https://sid-api-yrbb.onrender.com/users?search=${encodeURIComponent(
      query
    )}&limit=${limit}&skip=${skip}`;

    if (role !== "any") {
      url += `&filter_by_role=${role}`;
    }

    try {
      const res = await apiFetch(url);
      const apiData = await res.json();
      setData(apiData.users || []);
      setTotalItems(apiData.total || 0);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      fetchData();
    }
  }

  function openModal(user) {
    setUserToDelete(user);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setUserToDelete(null);
  }

  function openEditModal(user) {
    setUserToEdit(user);

    const initialRole =
        user.role === "esperando aprovacao"
            ? "editor"
            : "esperando aprovacao";

    setNewRole(initialRole);
    setEditModalVisible(true);
}

  function closeEditModal() {
    setEditModalVisible(false);
    setUserToEdit(null);
    setNewRole("");
  }

  async function confirmDelete() {
    if (!userToDelete) return;

    try {
      const response = await apiFetch(
        `https://sid-api-yrbb.onrender.com/users/${userToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert(`Usuário ${userToDelete.full_name} foi excluído com sucesso.`);
        fetchData();
      } else {
        alert(`Erro ao excluir o usuário ${userToDelete.full_name}.`);
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert(`Erro ao excluir o usuário ${userToDelete.full_name}.`);
    } finally {
      closeModal();
    }
  }

  async function confirmEditRole() {
    if (!userToEdit || !newRole) return;

    try {
      const response = await apiFetch(
        `https://sid-api-yrbb.onrender.com/users/${userToEdit.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (response.ok) {
        alert(`Cargo do usuário ${userToEdit.full_name} atualizado com sucesso.`);
        fetchData();
      } else {
        alert(`Erro ao atualizar o cargo do usuário ${userToEdit.full_name}.`);
      }
    } catch (error) {
      console.error("Erro ao atualizar cargo:", error);
      alert(`Erro ao atualizar o cargo do usuário ${userToEdit.full_name}.`);
    } finally {
      closeEditModal();
    }
  }

  return (
    <div className="content">
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Digite o nome do usuário..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="search-select"
        >
          <option value="any">Qualquer cargo</option>
          <option value="esperando aprovacao">Aguardando Aprovação</option>
          <option value="editor">Editor</option>
          <option value="admin">Administrador</option>
        </select>
        <button onClick={() => fetchData()} className="search-button">
          🔍
        </button>
      </div>
      <div className="user-list">
        {data.map((user, index) => (
          <div className="user-card" key={user.id || index}>
            <div className="user-avatar">
              <img src="/path-to-placeholder-avatar.png" alt="Avatar" />
            </div>
            <div className="user-info">
              <h3>{user.full_name}</h3>
              <p>{user.email}</p>
              <p className="status">{user.role}</p>
            </div>
            <div className="actions">
              <button
                className="view-btn"
                onClick={() => (window.location.href = `/Content/User/${user.id}`)}
              >
                Ver perfil
              </button>
              <button
                className={`edit-btn ${user.role === "admin" ? "disabled" : ""}`}
                disabled={user.role === "admin"}
                onClick={() => openEditModal(user)}
              >
                Editar cargo
              </button>
              <button
                className={`delete-btn ${
                  user.role === "admin" ? "disabled" : ""
                }`}
                disabled={user.role === "admin"}
                onClick={() => openModal(user)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {!isLoading && data.length > 0 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            &lt;&lt;
          </button>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            &lt;
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            &gt;
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            &gt;&gt;
          </button>
        </div>
      )}

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirmar Exclusão</h3>
            <p>Tem certeza de que deseja excluir o usuário?</p>
            <p>
              <strong>Nome:</strong> {userToDelete?.full_name}
            </p>
            <p>
              <strong>Email:</strong> {userToDelete?.email}
            </p>
            <div className="modal-actions">
              <button onClick={closeModal} className="cancel-btn">
                Cancelar
              </button>
              <button onClick={confirmDelete} className="confirm-btn">
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {editModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Cargo</h3>
            <p>Selecione o novo cargo para o usuário:</p>
            <p>
              <strong>Nome:</strong> {userToEdit?.full_name}
            </p>
            <p>
              <strong>Motivação:</strong> {userToEdit?.motivation}
            </p>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="role-select"
            >
              {userToEdit?.role === "esperando aprovacao" && (
                <>
                  <option value="editor">Editor</option>
                  <option value="admin">Administrador</option>
                </>
              )}
              {userToEdit?.role === "editor" && (
                <>
                  <option value="esperando aprovacao">esperando aprovacao</option>
                  <option value="admin">admin</option>
                </>
              )}
            </select>
            <div className="modal-actions">
              <button onClick={closeEditModal} className="cancel-btn">
                Cancelar
              </button>
              <button onClick={confirmEditRole} className="confirm-btn">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contribute;
