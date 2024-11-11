"use client";

import React from 'react'

import { useState } from 'react';

import Navbar from '@/components/Navbar/Navbar';

import './Login.css';

function Login() {

  return (
    <div className='page-container'>
      <Navbar/>
      {Content()}
    </div>
  );
}

function Content() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    console.log('Initiating login');
    console.log('Username: ', username, 'password: ', password);
    validateCredentials(username, password);
  }

  async function validateCredentials(username, password) {
    const apiUrl = 'https://sid-api-yrbb.onrender.com/users/token/';
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
            throw new Error('Credenciais inválidas');
        }

        const data = await response.json();
        const token = data.access_token

        localStorage.setItem('authToken', token);

        console.log('Login bem-sucedido:', data);
        return { success: true, message: 'Login bem-sucedido!' };

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return { success: false, message: error.message };
    }
}

  return (
    <div className="login-container">
      <div className="login-form">
        {/* Profile icon */}
        <div className="profile-image">
          <img src="/icons/profile.png" alt="Profile Icon"/>
        </div>
        
        {/* Email input */}
        <div className="input-group">
          <label htmlFor="email">E-mail:</label>
          <input 
            type="email"
            id="email"
            name="email"
            onChange={(e) => setUsername(e.target.value)}/>
        </div>
        
        {/* Password input */}
        <div className="input-group">
          <label htmlFor="password">Senha:</label>
          <input 
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        
        {/* Buttons */}
        <div className="button-group">
          <button onClick={login} className="login-button">Entrar</button>
          <button className="login-button">Não tenho conta</button>
        </div>
      </div>
    </div>
  );
}

export default Login