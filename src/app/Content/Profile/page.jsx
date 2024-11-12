import React from 'react'
import Image from 'next/image';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import './Profile.css';

function Profile() {

  return (
    <div className="page-container">
      <Navbar></Navbar>
      {Content()}
      <Footer></Footer>
    </div>
  );
}

function Content() {
  return (
    <div className='page-content'>
      <h1 className="title">Meu Perfil</h1>
      <hr></hr>
    </div>
  );
}

export default Profile