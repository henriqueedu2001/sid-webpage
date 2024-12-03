"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

import { apiFetch } from '../../../../core/auth';

import './User.css';

import apiBaseUrl from '@/utils/api';

function ViewUserPage() {
  return (
    <div className="user-page">
      <Navbar />
      <UserDetail />
      <Footer />
    </div>
  );
}

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    profession: '',
    role: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/users/${id}`);
        if (!res.ok) {
          throw new Error("Erro ao buscar o usuário");
        }
        const data = await res.json();
        setUser(data);
        setFormData({
          bio: data.bio || '',
          profession: data.profession || '',
          role: data.role || '',
        });
      } catch (error) {
        console.error("Erro:", error.message);
        setUser(null);
      }
    };

    const fetchCurrentUserId = async () => {
      try {
        const res = await apiFetch(`${apiBaseUrl}/users/me`);
        if (!res.ok) {
          throw new Error("Erro ao buscar o usuário atual");
        }
        const data = await res.json();
        setCurrentUserId(data.id);
      } catch (error) {
        console.error("Erro ao buscar usuário atual:", error.message);
        setCurrentUserId(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchCurrentUserId();
  }, [id]);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await apiFetch(`${apiBaseUrl}/users/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Erro ao salvar alterações.");
      }

      const updatedUser = await res.json();
      setUser(updatedUser);
      setEditing(false);
      alert("Alterações salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar alterações:", error.message);
      alert("Erro ao salvar alterações.");
    }
  };

  const handleCancel = () => {
    setFormData({
      bio: user.bio || '',
      profession: user.profession || '',
      role: user.role || '',
    });
    setEditing(false);
  };

  if (loading) {
    return <p>Carregando os dados do usuário...</p>;
  }

  if (!user) {
    return <p>Usuário não encontrado.</p>;
  }

  const isCurrentUser = currentUserId === user.id;

  return (
    <div className="user-detail-container">
      <div className="user-detail-card">
        <div className={`user-image-wrapper ${isCurrentUser ? "clickable" : ""}`}>
          <img
            src={user.profile_picture || "/icons/profile.png"}
            alt="Foto de Perfil"
            className={`user-profile-picture ${isCurrentUser ? "" : "disabled"}`}
            onClick={() => isCurrentUser && document.getElementById("fileInput").click()}
          />
          {isCurrentUser && (
            <input
              id="fileInput"
              type="file"
              accept="image/jpeg, image/png"
              style={{ display: "none" }}
            />
          )}
        </div>
        <p><strong>Nome Completo:</strong> {user.full_name}</p>
        {!editing ? (
          <>
            <p><strong>Descrição:</strong> {user.bio}</p>
            <p><strong>Profissão:</strong> {user.profession}</p>
            <p><strong>Papel na plataforma:</strong> {user.role}</p>
          </>
        ) : (
          <>
            <p>
              <strong>Bio:</strong>
              <input
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="editable-input"
              />
            </p>
            <p>
              <strong>Profissão:</strong>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleInputChange}
                className="editable-input"
              />
            </p>
            <p>
              <strong>Role:</strong>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="editable-input"
              />
            </p>
          </>
        )}
        {isCurrentUser && (
          <div className="edit-buttons">
            {!editing ? (
              <button onClick={handleEditToggle} className="edit-button">Editar</button>
            ) : (
              <>
                <button onClick={handleSave} className="save-button">Salvar</button>
                <button onClick={handleCancel} className="cancel-button">Cancelar</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUserPage;
