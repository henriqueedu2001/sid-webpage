'use client'
 

import React from 'react'

import { useState, useEffect } from 'react'

import './Articles.css';

import {apiFetch} from '../../../core/auth'

function Articles() {
  const [data, setData] = useState([])
  const [dataCards, setDataCards] = useState(null)

  async function handleClick() {
    let res = await apiFetch('https://sid-api-yrbb.onrender.com/articles')
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
            <strong>ID:</strong> {item.id} - <strong>Nome:</strong> {item.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Articles