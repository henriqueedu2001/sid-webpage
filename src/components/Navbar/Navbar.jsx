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
          <li><a href='/articles'>artigos</a></li>
          <li><a href='/data'>dados</a></li>
          <li><a href='/contribute'>contribua</a></li>
          <li><a href='/acess'>acesso</a></li>
        </ul>
        <div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar