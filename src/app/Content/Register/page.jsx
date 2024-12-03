"use client";

import React, { useState } from 'react';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

import './Register.css';

import apiBaseUrl from '@/utils/api';

function Register() {
  return (
    <div className='page-container'>
      <Navbar section="login" />
      <Content />
      <Footer />
    </div>
  );
}

function Content() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [profession, setProfession] = useState('');
  const [motivation, setMotivation] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const register = async () => {
    console.log('Creating account');
    console.log('E-mail: ', username, 'name: ', fullName);

    const apiUrl = `${apiBaseUrl}/users`;
    const registerData = {
      full_name: fullName,
      email: username,
      password,
      motivation,
      profession,
      bio,
    };

    try {
      const dataSent = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      };
      const response = await fetch(apiUrl, dataSent);
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.detail || 'Erro ao cadastrar usuário.';
        throw new Error(errorMessage);
      }
      const data = await response.json();
      console.log('Cadastro bem-sucedido:', data);
      setSuccessModalVisible(true);
    } catch (error) {
      console.error('Erro ao fazer o cadastro:', error.message);
      setError(error.message);
    }
  };

  const closeModal = () => {
    setSuccessModalVisible(false);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="profile-image">
          <img src="/icons/profile.png" alt="Profile Icon" />
        </div>
        <div className="input-group">
          <label htmlFor="name">Nome completo:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="profession">Sua profissão ou atividade:</label>
          <input
            id="profession"
            name="profession"
            onChange={(e) => setProfession(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="motivation">Motivação:</label>
          <textarea
            id="motivation"
            name="motivation"
            onChange={(e) => setMotivation(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="bio">Descrição do perfil:</label>
          <textarea
            id="bio"
            name="bio"
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        {error && <div className="error-box">{error}</div>}
        <div className="button-group">
          <button onClick={register} className="login-button">Criar conta</button>
          <a className="login-button" href="/Content/Login">Já tenho conta</a>
        </div>
      </div>

      {successModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h3>Conta criada com sucesso!</h3>
            <p>Você pode acessar sua conta na página de login.</p>
            <div className="modal-actions">
              <button
                className="confirm-btn"
                onClick={() => (window.location.href = '/Content/Login')}
              >
                Ir para login
              </button>
              <button className="cancel-btn" onClick={closeModal}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
