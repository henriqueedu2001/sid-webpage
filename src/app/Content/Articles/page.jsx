'use client'
 


import { useEffect, useState } from 'react';

import './Articles.css';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { apiFetch } from '../../../core/auth';


function Articles() {

  return (
    <div className="page-container">
      <Navbar className="navbar" />
      <div className="content">{Content()}</div>
      <Footer className="footer" />
    </div>
  );
  
}

function Content() {
  const [data, setData] = useState([])
  const [searchType, setSearchType] = useState("content")
  const [query, setQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      fetchData(); 
    }
  }

  async function fetchData() {
    const skip = (currentPage - 1) * limit;

    //let totalRes = await apiFetch(`https://sid-api-yrbb.onrender.com/articles?search_type=${searchType}&search=${encodeURIComponent(query)}`);
    //setTotalItems(totalRes.length);

    let res = await apiFetch(`https://sid-api-yrbb.onrender.com/articles?search_type=${searchType}&search=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`);
    let apiData = await res.json();
    await setData(apiData);
    await console.log(data);
  }
  
  return (
    <div className="container">
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Digite para buscar artigos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="search-select"
        >
          <option value="content">CONTEÚDO</option>
          <option value="author name">AUTOR</option>
        </select>
        <button onClick={fetchData} className="search-button">
          🔍
        </button>
      </div>
      <div className="cards">
        {data.map((item) => (
          <div key={item.id} className="card">
            <h2 className="card-title">{item.title}</h2>
            <p className="card-description">{item.preview}</p>
            <p className="card-author">Autor: {item.author_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
}

function Card() {
  return 
}

export default Articles