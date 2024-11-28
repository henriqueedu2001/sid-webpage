import React from 'react'

import './Contribute.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

function Contribute() {

  return (
    <div>
      <Navbar section="contribute"/>
      {Content()}
      <Footer/>
    </div>
  )
}

function Content(){
  return (
    <div className="content-container">
      <div className="sections-container">
        <section className='info-section'></section>
        <h1 className='section-title'>Por que se cadastrar?</h1>
        <p className='section-text'>
          <strong>Torne-se um editor!</strong> <br /> <br />

          Tendo um cadastro <strong>aprovado</strong> na plataforma, você pode editar e criar artigos, agregando também com seu conhecimento!
        </p>

        <section className='info-section'></section>
        <h2 className='section-title'>Como ter meu cadastro aprovado?</h2>
        <p className='section-text'>
          No momento do seu cadastro, você deverá informar, além de seus dados pessoais como nome e e-mail, 
          o motivo pelo qual deseja se tornar um editor da plataforma. Já que a plataforma é voltada para a divulgação de informações confiáveis
          sobre arboviroses, é importante que você tenha conhecimento sobre o assunto e queira contribuir com a disseminação de informações corretas.
          <br /> <br />
          Assim que os dados de cadastro são enviados, os administradores da plataforma terão acesso à sua solicitação e poderão aceitá-la ou recusá-la. 
          Enquanto isso, você permanecerá logado na plataforma, porém sem acesso às ferramentas de edição ou criação de conteúdo.
        </p>

        <section className='info-section'></section>
        <h2 className='section-title'>E se eu não quiser me tornar um editor?</h2>
        <p className='section-text'>
          Não há problema! Você pode continuar acessando a plataforma e consultando informações sobre arboviroses normalmente. 
          Dessa forma, o cadastro é <strong>opcional</strong> e não interfere na sua experiência de usuário. 
        </p>
      </div>

      <a href='/Content/Login' className='contribute-container'>
        <div>
          <div className='message'>
            <img src="/sid-contribua.png" alt="Contribute Icon"/>
            <p>Contribua!</p>
          </div>
        </div>
      </a>
    </div>
  )
}

export default Contribute