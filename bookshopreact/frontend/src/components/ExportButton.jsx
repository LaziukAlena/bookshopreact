import React from 'react';
import { useTranslation } from 'react-i18next';
import { unparse } from 'papaparse';

const ExportButton = ({ books }) => {
  const { t } = useTranslation();

  const handleExport = () => {
    if (!books || books.length === 0) return;

    const data = books.map(book => ({
      ISBN: book.isbn,
      Title: book.title,
      Authors: book.authors.join(', '),
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
    <button className="btn btn-outline-secondary" onClick={handleExport}>
      {t('export')}
    </button>
  );
};

export default ExportButton;

