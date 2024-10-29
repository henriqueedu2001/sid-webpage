import React from 'react'
import Image from 'next/image';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import './HomePage.css';

function HomePage() {

  return (
    <div className="container">
      <h1 className="title">Sistema de Informações sobre Dengue</h1>
      <div className="grid">
        <Card
          icon="/icons/patogeno.png"
          label="pathogen"
          title="Patógeno"
          customClass="patogeno"
        />
        <Card
          icon="/icons/transmissor.png"
          label="vector"
          title="Transmissor"
          customClass="transmissor"
        />
        <Card
          icon="/icons/prevencao.png"
          label="prevention"
          title="Prevenção"
          customClass="prevencao"
        />
        <Card
          icon="/icons/dados.png"
          label="data"
          title="Dados"
          customClass="dados"
        />
        <Card
          icon="/icons/tratamento.png"
          label="treatment"
          title="Tratamento"
          customClass="tratamento"
        />
      </div>
    </div>
  );
}

function Card({ icon, label, title, customClass }) {
  return (
    <div className={`card ${customClass}`}>
      <Image src={icon} alt={label} width={50} height={50} className="icon" />
      <h2>{title}</h2>
    </div>
  );
}
export default HomePage