import React from 'react'
import './Navbar.css'

function Navbar() {

  return (
    <nav className="navbar">
      <div className="container">
        <div className='sid-container'>
          <a to='/'>SID</a>
        </div>
        <ul>
          <li><a href='/Content/Articles'>artigos</a></li>
          <li><a href='/Content/Data'>dados</a></li>
          <li><a href='/Content/Contribute'>contribua</a></li>
          <li><a href='/Content/Login'>acesso</a></li>
        </ul>
        <div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar