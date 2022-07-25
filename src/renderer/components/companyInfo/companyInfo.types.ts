export type CompanyInfoType = {
  name: string;
  id: string;
  address?: string;
  phone?: string;
  bankAccounts?: {
    bank: string;
    accountNumber: string;
  }[];
};
