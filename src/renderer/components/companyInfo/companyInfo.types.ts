type BankAccountType = {
  /**
   * The banks name
   */
  bank: string;
  /**
   * The account number for that bank
   */
  accountNumber: string;
};

export type CompanyInfoType = {
  /**
   * The name of the company
   */
  name: string;
  /**
   * The id of the company, usually a registration number
   */
  id: string;
  /**
   * Company address
   */
  address?: string;
  /**
   * Company phone number
   */
  phone?: string;
  /**
   * Company bank accounts
   */
  bankAccounts?: BankAccountType[];
};
