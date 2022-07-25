import React from 'react';
import { CompanyInfoType } from './companyInfo/companyInfo.types';

type Props = {
  company: CompanyInfoType;
};

const Header: React.FC<Props> = ({ company }) => {
  return <div>{company.name || 'Update Company information'}</div>;
};

export default Header;
