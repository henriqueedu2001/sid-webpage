'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { apiFetch } from '../../../core/auth';

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
        <div>
            <p> article_id: {articleID}</p>
        </div>
    );
}

export default ViewArticle