import React from 'react'

import './Contribute.css';''
import Navbar from '@/components/Navbar/Navbar';

function Contribute() {

  return (
    <div>
      <Navbar section="contribute"/>
      {Content()}
    </div>
  )
}

function Content(){
  return(
    <div className="contribute-container">
        <section className='info-section'></section>
        <h1 className='section-title'>Por que se cadastrar?</h1>
        <p className='section-text'>
          <strong>Torne-se um editor!</strong> <br /> <br />

          Tendo um cadastro <strong>aprovado</strong> na plataforma, você pode editar e criar artigos, agregando também com seu conhecimento!
        </p>

        <section className='info-section'></section>
        <h2 className='section-title'>Como ter meu cadastro aprovado?</h2>
        <p className='section-text'>
        Assim que os dados de cadastro são enviados, os administradores da plataforma terão acesso à sua solicitação e poderão aceitá-la ou recusá-la. 
        <br /> <br />
        Enquanto isso, você permanecerá logado na plataforma, porém sem acesso às ferramentas de edição ou criação de conteúdo.
        </p>

        <ContributeFooter />
      </div>
  )
}

function ContributeFooter(){
    return (
        <div>
        <h1>Footer</h1>
        </div>
            )
}

export default Contribute