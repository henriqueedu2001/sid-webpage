'use client';

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import './Versions.css';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { apiFetch } from '../../../core/auth';

function Versions() {
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
    const [versionsData, setVersionsData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [articleIdFromUrl, setArticleIdFromUrl] = useState('');

    const searchParams = useSearchParams();
  
    useEffect(() => {
      const idFromUrl = searchParams.get('article_id');
      setArticleIdFromUrl(idFromUrl);
      fetchData(idFromUrl);
    }, [searchParams]);

    async function fetchData(articleId) {
        setIsLoading(true);
        let url = `https://sid-api-yrbb.onrender.com/versions?article_id=${articleId}`;
        let res = await apiFetch(url);
        let apiData = await res.json();
        setVersionsData(apiData);

        url = `https://sid-api-yrbb.onrender.com/articles/${articleId}?full_content=False`;
        res = await apiFetch(url);
        apiData = await res.json();
        setCurrentData(apiData);
        setIsLoading(false);
    }

    return (
        <div className="versions-container">
            {isLoading ? (
                <div className="latest-versions">
                    <div className="loading-spinner"></div>
                </div>
            ) :
            <div>
                <div className="current-version">
                <h1 className="current-title">{currentData.title}</h1>
                </div>

                <div className="divider">Versões antigas</div>
                <div className="latest-versions">
                    <div className="cards">
                        {versionsData.length > 0 ? (
                        versionsData.map((item) => (
                            <div key={item.id} className="card">
                            <div className="title-wrapper">
                                <h2 className="card-title">Versão {item.version_number}</h2>
                                <Link href={{ pathname: `/Content/Version`, query: { version_id: item.id , article_id:  articleIdFromUrl} }}>Comparar com atual</Link>
                            </div>
                            <p className="card-description">Editado em {format(new Date(item.created_at), "dd 'de' MMMM 'de' yyyy, HH:mm:ss", { locale: ptBR })}</p>
                            <p className="card-author">Editado por {item.editor_name}</p>
                            </div>
                        ))
                        ) : (
                        <p className="no-results-message">A versão atual é a única existente.</p>
                        )}
                    </div>
                </div>
            </div>
            }
        </div>
    );
  
}

export default Versions;
