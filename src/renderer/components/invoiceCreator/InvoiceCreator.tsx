import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = Record<string, unknown>;

const InvoiceCreator: React.FC<Props> = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>New Invoice</h1>
      <button type="button" onClick={() => navigate('/')}>
        Home
      </button>
    </>
  );
};

export default InvoiceCreator;
