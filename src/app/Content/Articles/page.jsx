'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import './Articles.css';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { apiFetch, getCurrentUser } from '../../../core/auth';

import apiBaseUrl from '@/utils/api';

function Articles() {
  return (
    <div className="page-container">
      <Navbar section="articles"/>
      <Suspense>
        <Content/>
      </Suspense>
      <Footer/>
    </div>
  );
  
}

function Content() {
  const [data, setData] = useState([]);
  const [searchType, setSearchType] = useState('content');
  const [query, setQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(24);
  const [totalItems, setTotalItems] = useState(0);

  const [userRole, setUserRole] = useState(null);


  const [isLoading, setIsLoading] = useState(true);
  const sections = ['Patógeno', 'Transmissor', 'Prevenção', 'Tratamento', 'Dados'];
  const [selectedSection, setSelectedSection] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const sectionFromUrl = searchParams.get('section') || '';
    setSelectedSection(sectionFromUrl);
    fetchData(sectionFromUrl);
    fetchUserRole();
  }, [searchParams, currentPage]);

  async function fetchUserRole() {
    try {
        const currentUser = await getCurrentUser();
        setUserRole(currentUser?.role || null);
    } catch (error) {
        console.error("Erro ao buscar o papel do usuário:", error);
        setUserRole(null);
    }
}

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      fetchData(selectedSection); 
    }
  }

  async function fetchData(section = '') {
    setIsLoading(true);
    const skip = (currentPage - 1) * limit;

    let url = `${apiBaseUrl}/articles?search_type=${searchType}&search=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`;
    if (section) {
      url += `&section=${section}`;
    }

    let res = await apiFetch(url);
    let apiData = await res.json();
    setData(apiData.articles);
    setTotalItems(apiData.total);
    setIsLoading(false);
  }

  const totalPages = Math.ceil(totalItems / limit);

  function handleSectionClick(section) {
    const normalizedSection = section
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ç/g, 'c');

    router.push(`/Content/Articles?section=${normalizedSection}`);
    setCurrentPage(1);
  }

  function clearSection() {
    router.push(`/Content/Articles`);
    setSelectedSection('');
    setCurrentPage(1);
  }

  function handleCardClick(article_id) {
    router.push(`/Content/ViewArticle?id=${article_id}`);
  }

  function redirectToCreateArticle() {
    router.push(`/Content/CreateArticle`);
    window.location.reload();
  }

  return (
    <div className="articles-container">
      <div>
        <div className="sections">
          {sections.map((section) => (
            <button
              key={section}
              className={`section-button ${
                selectedSection ===
                section
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/ç/g, 'c')
                  ? 'selected'
                  : ''
              }`}
              onClick={() => handleSectionClick(section)}
            >
              {section}
            </button>
          ))}
          <button
            className="clear-button"
            onClick={clearSection}
            aria-label="Clear section"
          >
            ✖
          </button>
        </div>
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
          <button onClick={() => fetchData(selectedSection)} className="search-button">
            🔍
          </button>
        </div>
      </div>
      <div className="cards">
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className="card" onClick={()  => handleCardClick(item.id)}>
              <h2 className="card-title">{item.title}</h2>
              <p className="card-description">{item.preview}</p>
              <p className="card-author">Autor: {item.author_name}</p>
            </div>
          ))
        ) : (
          <p className="no-results-message">Nenhum artigo correspondente encontrado.</p>
        )}
      </div>
      {!isLoading && data.length > 0 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            &lt;&lt;
          </button>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            &lt;
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            &gt;
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            &gt;&gt;
          </button>
        </div>
      )}

      {(userRole == 'editor' || userRole == 'admin') && (<button className='redirect-button' onClick={redirectToCreateArticle}>Criar Artigo</button>)}
    </div>
  );
}

export default Articles;
