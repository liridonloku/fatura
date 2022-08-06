type BankAccountType = {
  bank: string;
  accountNumber: string;
};

export type CompanyInfoType = {
  name: string;
  id: string;
  address?: string;
  phone?: string;
  bankAccounts?: BankAccountType[];
};
