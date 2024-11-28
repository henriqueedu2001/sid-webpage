import React from 'react'

import './DataInfo.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

function Contribute() {

  return (
    <div>
      <Navbar section="data"/>
      {Content()}
      <Footer/>
    </div>
  )
}

function Content(){
  return(
    <div className="sections-container">
        <section className='info-section'></section>
        <h1 className='section-title'>Por que somente São José do Rio Preto?</h1>
        <p className='section-text'>
          A plataforma ainda está em fase de testes e, por isso, estamos limitando a coleta de dados a uma única cidade.
          Além disso, a escolha por São José do Rio Preto se deu por ser a cidade onde a nossa equipe de pesquisa está localizada, o que
          facilita na obtenção de dados, na validação de informações e na análise de dados pela equipe.
        </p>

        <section className='info-section'></section>
        <h2 className='section-title'>Quais os tipos de dados disponíveis?</h2>
        <p className='section-text'>
          O primeiro tipo ("Casos confirmados de dengue") é referente às notificações registradas de casos positivos da arbovirose.
          Já o segundo tipo ("Imóveis trabalhados") se refere a imóveis onde fiscais foram capazes de identificar focos do mosquito Aedes aegypti.
        </p>

        <section className='info-section'></section>
        <h2 className='section-title'>De onde vêm as informações de casos confirmados?</h2>
        <p className='section-text'>
          A nossa equipe foi capaz de obter dados brutos quanto ao número de casos confirmados de dengue em São José do Rio Preto, divididos por setor censitário, em 2022 e 2023.
        </p>

        <section className='info-section'></section>
        <h2 className='section-title'>De onde vêm as informações de imóveis trabalhados?</h2>
        <p className='section-text'>
          As informações sobre imóveis trabalhados foram obtidas a partir de dados fornecidos pela Secretaria de Saúde de São José do Rio Preto, acessíveis publicamente por
          meio do sistema sisaweb. As informações são limitadas a partir de 2017, onde mais imóveis começaram a serem tratados.
        </p>
        
        <section className='info-section'></section>
        <h2 className='section-title'>O que é um setor censitário?</h2>
        <p className='section-text'>
          O setor censitário é uma divisão territorial utilizada pelo Instituto Brasileiro de Geografia e Estatística (IBGE) para a realização de censos demográficos
          e outros tipos de estudo, sendo também uma maneira de padronizar a coleta geográfica de informações entre diferentes estudos.
          <br /> <br />
          <a href='https://g1.globo.com/economia/censo/noticia/2024/03/21/o-que-e-o-setor-censitario-medida-usada-pelo-ibge-para-fazer-o-censo.ghtml'>Clique para saber mais</a>
          <br /> <br />
        </p>
      </div>
  )
}

export default Contribute
