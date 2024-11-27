'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';

import './EditArticle.css';
import 'quill/dist/quill.snow.css'; // Importa o tema padrão do Quill
import dynamic from 'next/dynamic';

// Importa o Quill dinamicamente, desativando o SSR
const Quill = dynamic(() => import('quill'), { ssr: false });

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
    return (
        <div className='text-editor-container'>
            <TextEditor/>
        </div>
    );
}

const TextEditor = () => {
    return (
        <div className='text-editor-div'>
            <QuillTextEditor className='quill-text-editor'/>
        </div>
    );
}

const QuillTextEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && editorRef.current) {
      import('quill').then((QuillModule) => {
        const Quill = QuillModule.default;
        new Quill(editorRef.current, {
          theme: 'snow',
        });
      });
    }
  }, []);

  return <div ref={editorRef} style={{ height: '400px' }} />;
};

export default EditArticle;
