import React from 'react'

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import './HomePage.css';

function HomePage() {

  return (
    <div>
      <Navbar></Navbar>
      <h1>Home Page</h1>
      <Footer></Footer>
    </div>
  )
}

export default HomePage