"use client";

import React from 'react'

import { useState } from 'react';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

import './Login.css';

// NOTE: E-mail here is reffered as Username because of OAuth2 login form format

function Login() {

  return (
    <div className='page-container'>
      <Navbar section="login"/>
      {Content()}
      <Footer/>
    </div>
  );
}

async function fetchUserDetails(token) {
  const apiUrl = 'https://sid-api-yrbb.onrender.com/users/me';

  try {
      const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      if (!response.ok) {
          throw new Error('Erro ao obter informações do usuário');
      }

      const user = await response.json();
      return user;
  } catch (error) {
      console.error('Erro ao buscar detalhes do usuário:', error);
      throw error;
  }
}



function Content() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('no error');

  const login = () => {
    console.log('Initiating login');
    console.log('E-mail: ', username);
    validateCredentials(username, password);
  }

  async function validateCredentials(username, password) {
    const apiUrl = 'https://sid-api-yrbb.onrender.com/users/token';
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
        const dataSent = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        };
        const response = await fetch(apiUrl, dataSent);

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.detail;
            setError(errorMessage);
            throw new Error('Credenciais inválidas');
        }

        const data = await response.json();
        const token = data.access_token;

        localStorage.setItem('authToken', token);

        console.log('Login bem-sucedido:', data);

        const user = await fetchUserDetails(token);

        window.location.href = `/Content/User/${user.id}`;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        setError(error.message);
    }
}


  return (
    <div className="login-container">
      <div className="login-form">
        <div className="profile-image">
          <img src="/icons/profile.png" alt="Profile Icon"/>
        </div>
        
        <div className="input-group">
          <label htmlFor="email">E-mail:</label>
          <input 
            type="email"
            id="email"
            name="email"
            onChange={(e) => setUsername(e.target.value)}/>
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
        
        <div>
          {errorLabel(error)}
        </div>

        <div className="button-group">
          <button onClick={login} className="login-button">Entrar</button>
          <a className="login-button" href='/Content/Register'>Não tenho conta</a>
        </div>

      </div>
    </div>
  );
}

function errorLabel(error) {
  if(error == 'no error') {
    return (
      <></>
    );    
  }
  return (
    <div className='error-box'>
      <p>{error}</p>
    </div>
  );
}

export default Login