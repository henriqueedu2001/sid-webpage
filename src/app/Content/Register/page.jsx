import React from 'react'
import Navbar from '@/components/Navbar/Navbar';

import './Register.css';

function Register() {

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
        
        {/* Name input */}
        <div className="input-group">
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" name="name" />
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
          <button className="register-button">Cadastrar</button>
          <button className="register-button">Já tenho conta</button>
        </div>
      </div>
    </div>
  );
}

export default Register