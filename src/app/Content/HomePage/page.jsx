import Image from 'next/image';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import './HomePage.css';

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
    <div className='page-content'>
      <br></br>
      {Header()}
      <div className='grid-container'>
        <div className="grid">
          <a href='/Content/Articles'>
            <Card
              icon="/icons/patogeno.png"
              label="pathogen"
              title="Patógeno"
              customClass="patogeno"
            />
          </a>
          
          <a href='/Content/Articles'>
            <Card
              icon="/icons/transmissor.png"
              label="vector"
              title="Transmissor"
              customClass="transmissor"
            />
          </a>

          <a href='/Content/Articles'>
            <Card
              icon="/icons/prevencao.png"
              label="prevention"
              title="Prevenção"
              customClass="prevencao"
            />
          </a>

          <a href='/Content/Articles'>
            <Card
              icon="/icons/dados.png"
              label="data"
              title="Dados"
              customClass="dados"
            />
          </a>
          
          <a href='/Content/Articles'>
            <Card
              icon="/icons/tratamento.png"
              label="treatment"
              title="Tratamento"
              customClass="tratamento"
            />
          </a>
        </div>
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

function Header() {
  return (
    <div>
      <h1 className="title">Sistema de Informações sobre Dengue</h1>
      <hr className='custom-line'></hr>
    </div>
  );
}

export default HomePage