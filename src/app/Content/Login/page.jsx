import React from 'react'

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
          <input type="email" id="email" name="email" />
        </div>
        
        {/* Password input */}
        <div className="input-group">
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" name="password" />
        </div>
        
        {/* Buttons */}
        <div className="button-group">
          <button className="login-button">Entrar</button>
          <button className="login-button">Não tenho conta</button>
        </div>
      </div>
    </div>
  );
}

export default Login