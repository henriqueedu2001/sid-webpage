'use client';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { apiFetch, getCurrentUser } from '../../../core/auth';
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
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserRole();
        fetchData(articleID);
    }, []);

    async function fetchData(article_id) {
        let url = `${apiBaseUrl}/articles/${article_id}?full_content=True`;
        let res = await apiFetch(url);
        let apiData = await res.json();
        setArticleData(apiData);
    }

    async function fetchUserRole() {
        try {
            const currentUser = await getCurrentUser();
            setUserRole(currentUser?.role || null);
        } catch (error) {
            console.error("Erro ao buscar o papel do usuário:", error);
            setUserRole(null);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="article-text-content">
            <ArticleText
                article_data={articleData}
                articleID={articleID}
                userRole={userRole}
                loading={loading}
            />
        </div>
    );
}

function ArticleText({ article_data, articleID, userRole, loading }) {
    const router = useRouter();
    const [showConfirmation, setShowConfirmation] = useState(false);

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

    const handleDelete = async () => {
        try {
            const res = await apiFetch(`${apiBaseUrl}/articles/${articleID}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error("Erro ao deletar o artigo.");
            }

            alert("Artigo deletado com sucesso!");
            router.push('/Content/Articles');
        } catch (error) {
            console.error("Erro ao deletar o artigo:", error.message);
            alert("Erro ao deletar o artigo.");
        } finally {
            setShowConfirmation(false);
        }
    };

    const { title, section, content, updated_at } = article_data;

    return (
        <div className='article-text-div'>
            <p className='article-title'>{title}</p>
            <hr className="custom-line" />
            <p className='article-section'>Seção: {section}</p>
            <p>Última atualização: {updated_at}</p>
            <div className='content'>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            {!loading && (
                <div className='button-group-view'>
                    <button className='edit-button' onClick={redirectToEdit}>
                        Editar artigo
                    </button>
                    <button className='versions-button' onClick={redirectToVersions}>
                        Versões
                    </button>
                    {userRole === 'admin' && (
                        <button
                            className='delete-button'
                            onClick={() => setShowConfirmation(true)}
                        >
                            Deletar artigo
                        </button>
                    )}
                </div>
            )}
            {showConfirmation && (
                <div className="confirmation-modal">
                    <div className="confirmation-box">
                        <p>Tem certeza que deseja deletar este artigo?</p>
                        <div className="confirmation-buttons">
                            <button
                                className="confirm-button"
                                onClick={handleDelete}
                            >
                                Confirmar
                            </button>
                            <button
                                className="cancel-button"
                                onClick={() => setShowConfirmation(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewArticle;
