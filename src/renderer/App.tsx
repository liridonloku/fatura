import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CompanyInfo from './components/companyInfo/CompanyInfo';
import Header from './components/Header';
import Home from './components/Home';
import { CompanyInfoType } from './components/companyInfo/companyInfo.types';
import InvoiceCreator from './components/invoiceCreator/InvoiceCreator';
import InvoiceViewer from './components/invoiceViewer/InvoiceViewer';

export default function App() {
  const [companyInfo, setcompanyInfo] = useState<CompanyInfoType>({
    name: 'Company',
    id: '600000000',
  });

  const updateCompanyInfo = (info: CompanyInfoType) => {
    setcompanyInfo(info);
    localStorage.setItem('companyInfo', JSON.stringify(info));
  };

  // Load company info from localStorage on startup
  useEffect(() => {
    const info = localStorage.getItem('companyInfo');
    if (info) {
      const parsed: CompanyInfoType = JSON.parse(info);
      setcompanyInfo(parsed);
    }
  }, []);

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
        <Route path="/new-invoice" element={<InvoiceCreator />} />
        <Route path="/invoice-viewer" element={<InvoiceViewer />} />
      </Routes>
    </Router>
  );
}
