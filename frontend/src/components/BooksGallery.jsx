import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Button, Collapse } from "react-bootstrap";
import { FaHeart, FaCommentDots, FaChevronDown, FaChevronUp } from "react-icons/fa";

const BooksGallery = ({ books }) => {
  const { t } = useTranslation();
  const [openCard, setOpenCard] = useState(null);

  const toggleDetails = (index) => {
    setOpenCard(openCard === index ? null : index);
  };

  return (
    <div className="row g-4 mt-4">
      {books.map((book, index) => (
        <div className="col-12 col-sm-6 col-md-4" key={`${book.isbn}-${index}`}>
          <Card className="h-100 shadow-sm">
            {book.cover && (
              <Card.Img
                variant="top"
                src={book.cover}
                alt={book.title}
                style={{ height: "300px", objectFit: "cover" }}
              />
            )}
            <Card.Body className="d-flex flex-column">
              <Card.Title className="fs-6">{book.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{book.authors?.join(", ")}</Card.Subtitle>
              <div className="mb-2 small text-muted">{book.publisher}</div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span><FaHeart className="text-danger me-1" />{book.likes}</span>
                <span><FaCommentDots className="text-primary me-1" />{book.reviews}</span>
              </div>
              <Button
                variant="outline-primary"
                size="sm"
                className="mt-auto"
                onClick={() => toggleDetails(index)}
                aria-expanded={openCard === index}
              >
                {t("details")} {openCard === index ? <FaChevronUp /> : <FaChevronDown />}
              </Button>
              <Collapse in={openCard === index}>
                <div className="mt-2">
                  <div><strong>{t("isbn")}:</strong> {book.isbn}</div>
                  <div><strong>{t("publisher")}:</strong> {book.publisher}</div>
                  {/* Убрали language и year */}
                </div>
              </Collapse>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default BooksGallery;







