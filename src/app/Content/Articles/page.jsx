'use client'
 

import React from 'react'

import { useState, useEffect } from 'react'

import './Articles.css';''

function Articles() {
  const [data, setData] = useState([])
  const [dataCards, setDataCards] = useState(null)

  async function handleClick() {
    let res = await fetch('https://vigent.saude.sp.gov.br/sisaweb_api/lista.php?')
    let apiData = await res.json()
    setData(apiData)
    console.log(data)
  }
  
  return (
    <div className="container">
      <button onClick={handleClick}>API FETCH</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <strong>ID:</strong> {item.id} - <strong>Nome:</strong> {item.nome}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Articles