import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = Record<string, unknown>;

const CompanyInfo: React.FC<Props> = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Company Info</h1>
      <button type="button" onClick={() => navigate('/')}>
        Home
      </button>
    </>
  );
};

export default CompanyInfo;
