import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const BooksTable = ({ books }) => {
  const { t } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>{t('isbn')}</th>
            <th>{t('title')}</th>
            <th>{t('author')}</th>
            <th>{t('publisher')}</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <React.Fragment key={`${book.isbn}-${index}`}>
              <tr onClick={() => toggleExpand(index)} style={{ cursor: 'pointer' }}>
                <td>{expandedIndex === index ? '▾' : '▶'} {index + 1}</td>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.author || '—'}</td>
                <td>{book.publisher}</td>
              </tr>

              {expandedIndex === index && (
                <tr className="table-secondary">
                  <td colSpan="5">
                    <div className="d-flex align-items-start gap-3">
                      {book.cover && (
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="img-thumbnail"
                          style={{ width: '120px', height: 'auto' }}
                        />
                      )}
                      <div>
                        {book.description && (
                          <p className="mb-1">
                            <strong>{t('description')}:</strong> {book.description}
                          </p>
                        )}
                        <p className="mb-1">
                          <strong>{t('likes')}:</strong> {book.likes}
                        </p>
                        <p className="mb-0">
                          <strong>{t('reviews')}:</strong> {book.reviews}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;


















