import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CompanyInfo from './components/companyInfo/CompanyInfo';
import Header from './components/Header';
import Home from './components/Home';
import NewInvoice from './components/NewInvoice';
import { CompanyInfoType } from './components/companyInfo/companyInfo.types';

export default function App() {
  const [companyInfo, setcompanyInfo] = useState<CompanyInfoType>({
    name: 'Company',
    id: '600000000',
  });

  const updateCompanyInfo = (info: CompanyInfoType) => {
    setcompanyInfo(info);
  };

  return (
    <Router>
      <Header company={companyInfo} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/company-info"
          element={
            <CompanyInfo update={updateCompanyInfo} company={companyInfo} />
          }
        />
        <Route path="/new-invoice" element={<NewInvoice />} />
      </Routes>
    </Router>
  );
}
