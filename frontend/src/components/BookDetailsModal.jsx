import React from 'react';
import { useTranslation } from 'react-i18next';

const BookDetailsModal = ({ book, onClose }) => {
  const { t } = useTranslation();

  if (!book) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{book.title}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-4">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-md-8">
                <p><strong>{t('isbn')}:</strong> {book.isbn}</p>
                <p><strong>{t('authors')}:</strong> {book.authors?.join(', ')}</p>
                <p><strong>{t('publisher')}:</strong> {book.publisher}</p>
                <p><strong>{t('avgLikesPerBook')}:</strong> {book.likes}</p>
                <p><strong>{t('avgReviewsPerBook')}:</strong> {book.reviews}</p>
                <p><strong>{t('description')}:</strong> {book.description}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              {t('close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal;

