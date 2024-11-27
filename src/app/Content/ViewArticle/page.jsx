'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { apiFetch } from '../../../core/auth';

import './ViewArticle.css';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';

function ViewArticle() {
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
    const router = useRouter();

    useEffect(() => {
        fetchData(articleID);
    }, [])

    async function fetchData(article_id) {
        let url = `https://sid-api-yrbb.onrender.com/articles/${article_id}`;
        let res = await apiFetch(url);
        let apiData = await res.json();
        setArticleData(apiData);
        console.log(apiData);
    }


    return (
        <div className='article-text-content'>
            {ArticleText(articleData)}
        </div>
    );
}

function ArticleText(article_data) {
    if(!article_data) {
        return <div></div>
    }

    const title = article_data['title']
    const section = article_data['section']
    const content = article_data['content']
    const updated_at = article_data['updated_at']
    const html_content = '<h1>Artigo</h1><p>conteúdo do artigo</p>'
    
    return (
        <div className='article-text-div'>
            <p>title: {title}</p>
            <p>section: {section}</p>
            <p>content: {content}</p>
            <p>updated_at: {updated_at}</p>
            <div dangerouslySetInnerHTML={{ __html: html_content }} />
        </div>
    );
}

export default ViewArticle