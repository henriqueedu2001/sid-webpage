'use client';

import { useEffect, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';

import './EditArticle.css';
import 'quill/dist/quill.snow.css'; // Import Quill theme
import QuillTextEditor from './QuillTextEditor';
import { apiFetch } from '@/core/auth';

import apiBaseUrl from '@/utils/api';

function EditArticle() {
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
  const searchParams = useSearchParams();
  const articleID = searchParams.get('id');
  const [articleData, setArticleData] = useState(null);
  const [title, setTitle] = useState('');
  const [section, setSection] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchData(articleID);
  }, []);

  async function fetchData(article_id) {
    let url = `${apiBaseUrl}/articles/${article_id}?full_content=true`;
    let res = await fetch(url);
    let apiData = await res.json();
    
    setArticleData(apiData ?? '');    
    setTitle(apiData.title ?? '');
    setSection(apiData.section ?? '');
    setContent(apiData.content ?? '');

  }

  const redirectToView = () => {
    router.push(`/Content/ViewArticle?id=${articleID}`);
  }

  const handleSave = async () => {
    const updatedArticle = {
      id: articleID, // Include 'id' field
      title,
      section,
      content,
    };

    try {
      const response = await apiFetch(`${apiBaseUrl}/articles/${articleID}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json', // Include 'Accept' header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedArticle),
      });
  
      if (response.ok) {
        alert('Article saved successfully!');
        // Optionally redirect or update UI
      } else {
        // Handle server errors
        const errorData = await response.json();
        alert(`Failed to save the article: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      // Handle network errors
      console.error('Error:', error);
      alert(`An error occurred while saving the article. ${error}` );
    }
  };

  return (
  <div className="text-editor-container">
    <h2>Título</h2>
    <hr className="custom-line" />

    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Editar Título"
      className="title-input"
    />

    <h2>Seção</h2>
    <hr className="custom-line" />

    <input
      type="text"
      value={section}
      onChange={(e) => setSection(e.target.value)}
      placeholder="Editar Seção"
      className="section-input"
    />

    <h2>Conteúdo</h2>
    <hr className="custom-line" />

    <QuillTextEditor
      value={content}
      onChange={setContent}
      placeholder="Editar Conteúdo"
    />

    <div className='button-group'>
    <button className='button'  onClick={handleSave}>Save</button>
    <button className='button'  onClick={redirectToView}>Visualizar Artigo</button>
    </div>
  </div>
  );
}

export default EditArticle;
