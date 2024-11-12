"use client";

import React from 'react'
import { useState } from 'react';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';


import './Register.css';

function Register() {

  return (

    <div className='page-container'>
      <Navbar />
      {Content()}
      <Footer />
    </div>
  );
}

function Content() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [motivation, setmotivation] = useState('');

  const register = () => {
    console.log('Initiating register');
    console.log('Username: ', username, 'email:', email, 'password: ', password, 'motivation: ', motivation);
    registerCredentials(username, email, password, motivation);

  }

  async function registerCredentials(username, email, password, motivation) {
    const apiUrl = 'https://sid-api-yrbb.onrender.com/users/';
    // const formData = new URLSearchParams();
    // formData.append('full_name', username);
    // formData.append('email', email);
    // formData.append('password', password);
    // formData.append('motivation', motivation);

    const registerData = {
      'full_name': username,
      'email': email,
      'password': password,
      'motivation': motivation,
    } 

    try {
      const dataSent = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData)
      };
      const response = await fetch(apiUrl, dataSent);

      if (!response.ok) {
        throw new Error('Erro ao cadastrar usuário');
      }

      const data = await response.json();

      console.log('cadastro bem-sucedido:', data);
      return { success: true, message: 'cadastro bem-sucedido!' };

    } catch (error) {
      console.error('Erro ao fazer o cadastro:', error);
      return { success: false, message: error.message };
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        {/* Profile icon */}
        <div className="profile-image">
          <img src="/icons/profile.png" alt="Profile Icon" />
        </div>

        {/* Name input */}
        <div className="input-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setUsername(e.target.value)} />
        </div>

        {/* Email input */}
        <div className="input-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)} />
        </div>

        {/* Password input */}
        <div className="input-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)} />
        </div>

        {/* Motivation input */}
        <div className="input-group">
          <label htmlFor="text">Moticação:</label>
          <textarea
            type="text"
            id="motivation"
            name="motivation"
            onChange={(e) => setmotivation(e.target.value)} />
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button onClick={register} className="register-button">Cadastrar</button>
          <button className="register-button">Já tenho conta</button>
        </div>
      </div>
    </div>
  );
}

export default Register