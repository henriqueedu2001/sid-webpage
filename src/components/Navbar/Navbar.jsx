import React from 'react'
import './Navbar.css'

function Navbar({ section }) {

  return (
    <nav className="navbar">
      <div className="container">
        <div className='sid-container'>
          <a href='/'>SID</a>
        </div>
        <ul>
          <li className={section === 'articles' ? 'active' : ''} ><a href='/Content/Articles'>Artigos</a></li>
          <li className={section === 'data' ? 'active' : ''} ><a href='/Content/Data'>Dados</a></li>
          <li className={section === 'contribute' ? 'active' : ''} ><a href='/Content/Contribute'>Contribua</a></li>
          <li className={section === 'login' ? 'active' : ''} ><a href='/Content/Login'>Acesso</a></li>
        </ul>
        <div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
