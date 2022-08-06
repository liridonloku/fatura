import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = Record<string, unknown>;

const Home: React.FC<Props> = () => {
  const navigate = useNavigate();
  return (
    <div className="container text-center">
      <h1>Home</h1>
      <button
        className="btn btn-primary me-2"
        type="button"
        onClick={() => navigate('/company-info')}
      >
        Company Info
      </button>
      <button
        className="btn btn-secondary"
        type="button"
        onClick={() => navigate('/new-invoice')}
      >
        New Invoice
      </button>
    </div>
  );
};

export default Home;
