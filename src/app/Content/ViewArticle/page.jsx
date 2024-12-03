'use client';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { apiFetch } from '../../../core/auth';
import './ViewArticle.css';

import apiBaseUrl from '@/utils/api';

function ViewArticle() {
    return (
        <div className="page-container">
            <Navbar section="articles" />
            <Suspense>
                <Content />
            </Suspense>
            <Footer />
        </div>
    );
}

function Content() {
    const searchParams = useSearchParams();
    const articleID = searchParams.get('id');
    const [articleData, setArticleData] = useState(null);

    useEffect(() => {
        fetchData(articleID);
    }, []);

    async function fetchData(article_id) {
        let url = `${apiBaseUrl}/articles/${article_id}?full_content=False`;
        let res = await apiFetch(url);
        let apiData = await res.json();
        setArticleData(apiData);
    }

    return (
        <div className='article-text-content'>
            <ArticleText article_data={articleData} articleID={articleID} />
        </div>
    );
}

function ArticleText({ article_data, articleID }) {
    const router = useRouter();

    if (!article_data) {
        return <div></div>;
    }

    const redirectToEdit = () => {
        router.push(`/Content/EditArticle?id=${articleID}`);
        window.location.reload();
    };

    const redirectToVersions = () => {
        router.push(`/Content/Versions?article_id=${articleID}`);
    };

    const { title, section, content, updated_at } = article_data;

    return (
        <div className='article-text-div'>
            <p className='article-title'>{title}</p>
            <hr className="custom-line" />
            <p className='article-section'>Seção: {section}</p>
            <p>Última atualização: {updated_at}</p>

            <div className='button-group-view'>
                <button className='edit-button' onClick={redirectToEdit}>
                    Editar artigo
                </button>
                <button className='versions-button' onClick={redirectToVersions}>
                    Versões
                </button>
            </div>

            <div className='content'>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
}

export default ViewArticle;
