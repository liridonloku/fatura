import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyInfoType } from './companyInfo.types';

type Props = {
  update: (info: CompanyInfoType) => void;
  company: CompanyInfoType;
};

const CompanyInfo: React.FC<Props> = ({ company, update }) => {
  const navigate = useNavigate();
  const [info, setinfo] = useState(company);

  const updateInfo = () => {
    update(info);
  };

  return (
    <>
      <h1>Company Info</h1>
      <button
        className="btn btn-primary mb-3"
        type="button"
        onClick={() => navigate('/')}
      >
        Home
      </button>
      <form>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control mb-2"
          placeholder="Company Name"
          value={info.name}
          onChange={(e) => {
            setinfo({ ...info, name: e.currentTarget.value });
          }}
        />
        <input
          type="text"
          name="id"
          id="id"
          className="form-control mb-2"
          placeholder="Company Id"
          value={info.id}
          onChange={(e) => {
            setinfo({ ...info, id: e.currentTarget.value });
          }}
        />
        <input
          type="text"
          name="address"
          id="address"
          className="form-control mb-2"
          placeholder="Company address"
          value={info.address}
          onChange={(e) => {
            setinfo({ ...info, address: e.currentTarget.value });
          }}
        />
        <input
          type="tel"
          name="phone"
          id="phone"
          className="form-control mb-2"
          placeholder="Company phone no"
          value={info.phone}
          onChange={(e) => {
            setinfo({ ...info, phone: e.currentTarget.value });
          }}
        />
        <div className="input-group mb-3">
          <span className="input-group-text">Bank name</span>
          <input
            type="text"
            id="bankName"
            className="form-control"
            placeholder="Bank name"
          />
          <span className="input-group-text">Account no</span>
          <input
            type="text"
            id="accountNo"
            className="form-control"
            placeholder="Account no"
          />
        </div>
        <div className="text-center">
          <button
            type="button"
            onClick={updateInfo}
            className="btn btn-success"
          >
            Update Info
          </button>
        </div>
      </form>
    </>
  );
};

export default CompanyInfo;
