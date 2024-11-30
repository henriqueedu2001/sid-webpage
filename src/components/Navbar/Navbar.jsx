"use client";

import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { getCurrentUser } from '../../core/auth';

function Navbar({ section }) {
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        const firstName = currentUser.full_name?.split(' ')[0] || 'Usuário';
        setUserName(firstName);
        setUserRole(currentUser.role);
      }
    }

    fetchData();
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <div className='sid-container'>
          <a href='/'>SID</a>
        </div>
        <ul>
          <li className={section === 'articles' ? 'active' : ''}><a href='/Content/Articles'>Artigos</a></li>
          <li className={section === 'data' ? 'active' : ''}><a href='/Content/Data'>Dados</a></li>
          <li className={section === 'contribute' ? 'active' : ''}><a href='/Content/Contribute'>Contribua</a></li>
          <li className={section === 'login' ? 'active' : ''}>
            {userName ? (
              <div className="user-info">
                <a href='/profile'>{userName}</a>
                {userRole === 'admin' && (
                  <a href='/Admin/Users' className='admin-icon'>⚙️</a>
                )}
              </div>
            ) : (
              <a href='/Content/Login'>Acesso</a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
