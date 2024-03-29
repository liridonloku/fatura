import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { t } from 'i18next';

type Props = {
  /**
   * Source for the logo
   */
  logo: string;
};

/**
 * The home screen component
 */
const Home: React.FC<Props> = ({ logo }) => {
  const navigate = useNavigate();
  return (
    <div className="container text-center">
      <h1 className="my-3">
        <>{t('home')}</>
      </h1>
      <button
        className="btn btn-outline-success shadow"
        type="button"
        onClick={() => navigate('/new-invoice')}
      >
        <span className="d-flex align-items-center gap-2 fw-bold">
          <>
            <BsFileEarmarkPlus size={24} />
            {t('new-invoice')}
          </>
        </span>
      </button>
      {logo && (
        <div
          className="image-container mt-5 mx-auto"
          style={{ maxWidth: '600px', maxHeight: '600px' }}
        >
          <img src={logo} alt="Logo" className="img-fluid" />
        </div>
      )}
    </div>
  );
};

export default Home;
