import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CompanyInfoType } from './companyInfo/companyInfo.types';

type Props = {
  company: CompanyInfoType;
  logo: string;
};

const SideBar: React.FC<Props> = ({ company, logo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="bg-dark text-light h-100">
      <div className="container-fluid p-0">
        <div className="mb-5">
          <img src={logo} alt="" className="img-fluid" />
          <h1 className="fs-4 text-center">{company.name}</h1>
        </div>
        <div>
          <button
            type="button"
            className={`btn ${
              location.pathname === '/' ? 'btn-secondary' : 'btn-dark'
            } rounded-0 w-100 border-0 py-2`}
            onClick={(e) => {
              e.currentTarget.blur();
              navigate('/');
            }}
          >
            Dashboard
          </button>
          <button
            type="button"
            className={`btn ${
              location.pathname === '/company-info'
                ? 'btn-secondary'
                : 'btn-dark'
            } rounded-0 w-100 py-2`}
            onClick={(e) => {
              e.currentTarget.blur();
              navigate('/company-info', { replace: false });
            }}
          >
            Company
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
