import React, { useState, useEffect, useRef, useCallback } from 'react';
import { unparse } from 'papaparse';

import { useTranslation } from 'react-i18next';
import BooksGallery from './components/BooksGallery';
import BooksTable from './components/BooksTable';
import FilterPanel from './components/FilterPanel';

import axios from 'axios';

const App = () => {
  const { t, i18n } = useTranslation();

  const [view, setView] = useState('table');
  const [language, setLanguage] = useState('en');
  const [seed, setSeed] = useState(0);
  const [likesRatio, setLikesRatio] = useState(1.0);
  const [reviewsRatio, setReviewsRatio] = useState(1.0);

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const resetRef = useRef(false);
  const loaderRef = useRef();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  useEffect(() => {
    resetRef.current = true;
    setPage(0);
    setBooks([]);
    setHasMore(true);
  }, [language, seed, likesRatio, reviewsRatio]);

  useEffect(() => {
    const loadBooks = async () => {
      if (!hasMore || loading) return;
      setLoading(true);

      try {
        const res = await axios.get('http://localhost:3001/api/books', {
          params: {
            locale: language,
            seed,
            likes: likesRatio,      
            reviews: reviewsRatio, 
            start: page * 20,
          },
        });

        const newBooks = res.data;

        if (newBooks.length === 0) {
          setHasMore(false);
        } else {
          setBooks((prevBooks) => {
            if (resetRef.current) {
              resetRef.current = false;
              return newBooks;
            }
            return [...prevBooks, ...newBooks];
          });
        }
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [page, language, seed, likesRatio, reviewsRatio]);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  const handleExportCSV = () => {
    if (!books || books.length === 0) return;
  
    const data = books.map(book => ({
      ISBN: book.isbn,
      Title: book.title,
      Authors: (book.authors || []).join(', '),
      Publisher: book.publisher,
      Language: book.language,
      Likes: book.likes,
      Reviews: book.reviews,
      Description: book.description,
    }));
  
    const csv = unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'books.csv';
    link.click();
  
    URL.revokeObjectURL(url);
  };
  

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">{t('appTitle')}</h1>

      <FilterPanel
        language={language}
        seed={seed}
        likesRatio={likesRatio}
        reviewsRatio={reviewsRatio}
        viewMode={view}
        onLanguageChange={setLanguage}
        onSeedChange={setSeed}
        onLikesChange={setLikesRatio}
        onReviewsChange={setReviewsRatio}
        onViewChange={setView}
        onExport={handleExportCSV}

      />

      {view === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksGallery books={books} />
      )}

      {loading && <p className="text-center">{t('loading')}</p>}
      {!loading && !hasMore && books.length > 0 && (
        <p className="text-center">{t('noMoreBooks')}</p>
      )}
      {!loading && books.length === 0 && (
        <p className="text-center">{t('noBooksFound')}</p>
      )}

      <div ref={loaderRef} style={{ height: '1px' }}></div>
    </div>
  );
};

export default App;



