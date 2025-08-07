import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { FaRandom, FaTable, FaBook } from 'react-icons/fa';

const languageOptions = [
  { value: 'en', label: 'English (US)', flag: '/flags/US.png' },
  { value: 'de', label: 'Deutsch (DE)', flag: '/flags/DE.png' },
  { value: 'ja', label: '日本語 (JP)', flag: '/flags/JP.png' },
];

const customSingleValue = ({ data }) => (
  <div className="d-flex align-items-center">
    <img src={data.flag} alt={data.label} style={{ width: 20, marginRight: 8 }} />
    {data.label}
  </div>
);

const customOption = (props) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div ref={innerRef} {...innerProps} className="d-flex align-items-center p-2">
      <img src={data.flag} alt={data.label} style={{ width: 20, marginRight: 8 }} />
      {data.label}
    </div>
  );
};

const FilterPanel = ({
  language,
  seed,
  likesRatio,
  reviewsRatio,
  viewMode,
  onLanguageChange,
  onSeedChange,
  onLikesChange,
  onReviewsChange,
  onExport,
  onViewChange,
}) => {
  const { t } = useTranslation();

  const generateRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 1_000_000_000);
    onSeedChange(randomSeed);
  };

  const selectedLanguage = languageOptions.find((lang) => lang.value === language);

  return (
    <div className="mb-4">
      <div className="row g-3 align-items-end">


        <div className="col-md-3">
          <label className="form-label">{t('language')}</label>
          <Select
            options={languageOptions}
            value={selectedLanguage}
            onChange={(option) => onLanguageChange(option.value)}
            components={{ SingleValue: customSingleValue, Option: customOption }}
            isSearchable={false}
          />
        </div>

       
        <div className="col-md-3">
          <label className="form-label">{t('seed')}</label>
          <div className="input-group">
            <input
              type="number"
              value={seed}
              onChange={(e) => onSeedChange(Number(e.target.value))}
              className="form-control"
            />
            <button className="btn btn-outline-secondary" onClick={generateRandomSeed}>
              <FaRandom />
            </button>
          </div>
        </div>

       
        <div className="col-md-3">
          <label className="form-label">
            {t('avgLikes')}: {likesRatio.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={likesRatio}
            onChange={(e) => onLikesChange(parseFloat(e.target.value))}
            className="form-range"
          />
        </div>

        
        <div className="col-md-3">
          <label className="form-label">{t('avgReviews')}</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={reviewsRatio}
            onChange={(e) => onReviewsChange(parseFloat(e.target.value))}
            className="form-control"
          />
        </div>
      </div>

     
      <div className="mt-3">
        <button onClick={onExport} className="btn btn-primary">
          {t('exportCSV')}
        </button>
      </div>

    
      <div className="mt-4 d-flex justify-content-center gap-3">
        <button
          className={`btn d-flex align-items-center gap-2 px-4 py-2 rounded-pill shadow-sm fw-semibold ${
            viewMode === 'table' ? 'btn-primary' : 'btn-outline-secondary'
          }`}
          onClick={() => onViewChange('table')}
        >
          <FaTable />
          {t('tableView')}
        </button>
        <button
          className={`btn d-flex align-items-center gap-2 px-4 py-2 rounded-pill shadow-sm fw-semibold ${
            viewMode === 'gallery' ? 'btn-primary' : 'btn-outline-secondary'
          }`}
          onClick={() => onViewChange('gallery')}
        >
          <FaBook />
          {t('galleryView')}
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
