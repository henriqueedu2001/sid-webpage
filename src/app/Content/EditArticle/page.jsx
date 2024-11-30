'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';

import './EditArticle.css';
import 'quill/dist/quill.snow.css'; // Import Quill them
import QuillTextEditor from './QuillTextEditor';

function EditArticle() {
  return (
    <div className="page-container">
      <Navbar section="articles" />
      <Content />
      <Footer />
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
    let url = `https://sid-api-yrbb.onrender.com/articles/${article_id}`;
    let res = await fetch(url);
    let apiData = await res.json();
    setArticleData(apiData);
    setTitle(apiData.title);
    setSection(apiData.section);
    setContent(apiData.content);
  }

  const handleSave = async () => {
    const updatedArticle = {
      title,
      section,
      content,
    };

    const response = await fetch(`https://sid-api-yrbb.onrender.com/articles/${articleID}`, {
      method: 'PUT', // Adjust method according to your API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedArticle),
    });

    if (response.ok) {
      alert('Article saved successfully!');
      // Optionally redirect or update UI
    } else {
      alert('Failed to save the article.');
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

    <button onClick={handleSave}>Save</button>
  </div>
  );
}

export default EditArticle;
