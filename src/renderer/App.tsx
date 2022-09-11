import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './App.css';
import CompanyInfo from './components/companyInfo/CompanyInfo';
import Home from './components/Home';
import { CompanyInfoType } from './components/companyInfo/companyInfo.types';
import InvoiceCreator from './components/invoiceCreator/InvoiceCreator';
import InvoiceViewer from './components/invoiceViewer/InvoiceViewer';
import { InvoiceType } from './components/invoiceCreator/invoice.types';
import SideBar from './components/SideBar';
import Settings from './components/Settings';

export default function App() {
  const [companyInfo, setcompanyInfo] = useState<CompanyInfoType>({
    name: 'Company',
    id: '600000000',
  });
  const [logo, setlogo] = useState('');
  const [invoice, setinvoice] = useState<InvoiceType | null>(null);

  const { i18n } = useTranslation();

  const updateCompanyInfo = (info: CompanyInfoType) => {
    setcompanyInfo(info);
    localStorage.setItem('companyInfo', JSON.stringify(info));
  };

  const updateLogo = (path: string) => {
    setlogo(path);
    localStorage.setItem('logo', JSON.stringify(path));
  };

  const updateInvoice = (newInvoice: InvoiceType) => {
    setinvoice(newInvoice);
  };

  // Load information from localStorage on startup
  useEffect(() => {
    const info = localStorage.getItem('companyInfo');
    const logoFromLocalStorage = localStorage.getItem('logo');
    if (info) {
      const parsed: CompanyInfoType = JSON.parse(info);
      setcompanyInfo(parsed);
    }
    if (logoFromLocalStorage) {
      const parsed: string = JSON.parse(logoFromLocalStorage);
      setlogo(parsed);
    }
    const language = localStorage.getItem('language');
    if (language) i18n.changeLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="container-fluid p-0 m-0 d-flex min-vh-100">
        <div className="container-fluid col-sm-3 col-lg-2 p-0 m-0 d-print-none">
          <SideBar company={companyInfo} logo={logo} />
        </div>
        <div className="container-fluid col-sm-9 col-lg-10 p-0 m-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/company-info"
              element={
                <CompanyInfo
                  update={updateCompanyInfo}
                  company={companyInfo}
                  updateLogo={updateLogo}
                  logo={logo}
                />
              }
            />
            <Route
              path="/new-invoice"
              element={<InvoiceCreator updateInvoice={updateInvoice} />}
            />
            <Route
              path="/invoice-viewer"
              element={
                <InvoiceViewer
                  company={companyInfo}
                  invoice={invoice}
                  logo={logo}
                />
              }
            />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
