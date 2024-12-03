'use client';

import { useEffect, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';

import './CreateArticle.css';
import 'quill/dist/quill.snow.css'; // Import Quill theme
import QuillTextEditor from './QuillTextEditor';
import { apiFetch } from '@/core/auth';

import apiBaseUrl from '@/utils/api';

function CreateArticle() {
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
  const [title, setTitle] = useState('');
  const [section, setSection] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const [waiting, setWaiting] = useState(false) ;

  const handleSave = async () => {
    const newArticle = {
      title,
      section,
      content,
    };

    if(waiting == false){
      setWaiting(true);
      try {
      const response = await apiFetch(`${apiBaseUrl}/articles`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json', // Include 'Accept' header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArticle),
      });
  
      if (response.ok) {
        alert('Article created successfully!');
        setWaiting(false);
        // Optionally redirect or update UI
        
      } else {
        // Handle server errors
        const errorData = await response.json();
        alert(`Failed to create the article: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      // Handle network errors
      console.error('Error:', error);
      alert(`An error occurred while creating the article. ${error}` );
      setWaiting(false);
    }
  };
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
    <button className='button'  onClick={handleSave}>Criar</button>
    {waiting && <p>salvando artigo</p>}
    </div>
  </div>
  );
}


export default CreateArticle;
