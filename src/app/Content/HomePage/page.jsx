'use client';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import './HomePage.css';

import {apiBaseUrl} from '../../../utils/api';

function HomePage() {
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
    <div className="page-content">
      <br></br>
      {Header()}
      <div className="grid-container">
        <div className="grid">
          <Card
            icon="/icons/patogeno.png"
            label="pathogen"
            title="Patógeno"
            customClass="patogeno"
            section="patogeno"
          />
          <Card
            icon="/icons/transmissor.png"
            label="vector"
            title="Transmissor"
            customClass="transmissor"
            section="transmissor"
          />
          <Card
            icon="/icons/prevencao.png"
            label="prevention"
            title="Prevenção"
            customClass="prevencao"
            section="prevencao"
          />
          <Card
            icon="/icons/dados.png"
            label="data"
            title="Dados"
            customClass="dados"
            section="dados"
          />
          <Card
            icon="/icons/tratamento.png"
            label="treatment"
            title="Tratamento"
            customClass="tratamento"
            section="tratamento"
          />
        </div>
      </div>
    </div>
  );
}

function Card({ icon, label, title, customClass, section }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/Content/Articles?section=${section}`);
  };

  return (
    <div className={`homepage-card ${customClass}`} onClick={handleClick}>
      <Image src={icon} alt={label} width={50} height={50} className="icon" />
      <h2>{title}</h2>
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1 className="title">Sistema de Informações sobre Dengue</h1>
      <hr className="custom-line"></hr>
    </div>
  );
}

export default HomePage;
