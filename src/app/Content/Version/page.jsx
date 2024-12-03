'use client';

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import './Version.css';

import DiffChecker from '@/components/DiffChecker/DiffChecker';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { apiFetch } from '../../../core/auth';

import apiBaseUrl from '@/utils/api';

function Version() {
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
    const [versionData, setVersionData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [articleIdFromUrl, setArticleIdFromUrl] = useState('')

    const searchParams = useSearchParams();
    const router = useRouter();
  
    useEffect(() => {
      const versionId = searchParams.get('version_id');
      const articleId = searchParams.get('article_id');
      setArticleIdFromUrl(articleId);
      fetchData(versionId, articleId);
    }, [searchParams]);

    async function fetchData(versionId, articleId) {
        setIsLoading(true);
        let url = `${apiBaseUrl}/versions/${versionId}`;
        let res = await apiFetch(url);
        let apiData = await res.json();
        setVersionData(apiData);

        url = `${apiBaseUrl}/articles/${articleId}?full_content=False`;
        res = await apiFetch(url);
        apiData = await res.json();
        setCurrentData(apiData);
        setIsLoading(false);
    }

    function returnToVersions() {
        router.push(`/Content/Versions?article_id=${articleIdFromUrl}`);
    }

    return (
        <div className="version-container">
            {isLoading ? (
                <div className="loading-spinner"></div>
            ) :
            <div>
                <DiffChecker oldText={versionData.title} newText={currentData.title} classType='diffContainerTitle' />
                <div className="dates-container">
                    <div className="old-date">
                        Versão antiga criada em <b>{format(new Date(versionData.created_at), "dd 'de' MMMM 'de' yyyy, HH:mm:ss", { locale: ptBR })}</b>
                    </div>
                    <div className="new-date">
                        Versão atual vigente desde <b>{format(new Date(currentData.updated_at), "dd 'de' MMMM 'de' yyyy, HH:mm:ss", { locale: ptBR })}</b>
                    </div>
                </div>
                <DiffChecker oldText={versionData.content} newText={currentData.content} classType='diffContainer' />
                <div className="button-container">
                    <button className="old-button" onClick={returnToVersions}>
                        Voltar para listagem de versões
                    </button>
                    <button className="new-button">
                        Voltar para versão atualizada
                    </button>
                </div>

            </div>
            }
        </div>
    );
  
}

export default Version;
