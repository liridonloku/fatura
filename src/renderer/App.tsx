import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CompanyInfo from './components/CompanyInfo';
import Header from './components/Header';
import Home from './components/Home';
import NewInvoice from './components/NewInvoice';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company-info" element={<CompanyInfo />} />
        <Route path="/new-invoice" element={<NewInvoice />} />
      </Routes>
    </Router>
  );
}
