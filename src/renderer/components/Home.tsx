import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = Record<string, unknown>;

const Home: React.FC<Props> = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home</h1>
      <button type="button" onClick={() => navigate('/company-info')}>
        Company Info
      </button>
      <button type="button" onClick={() => navigate('/new-invoice')}>
        New Invoice
      </button>
    </div>
  );
};

export default Home;
