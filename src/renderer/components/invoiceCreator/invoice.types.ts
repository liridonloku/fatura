export type BuyerType = {
  /**
   * Name of the buyer
   */
  name: string;
  /**
   * Id of the buyer, usually a registration number
   */
  id: string;
  /**
   * Buyers phone number
   */
  phone?: string;
  /**
   * Buyers address
   */
  address?: string;
};

/**
 * Information about the buyer that can be used, taken as a collection of keys from BuyerType
 */
export type BuyerInfoType = keyof BuyerType;

/**
 * Delivery address and date
 */
type DeliveryType = {
  deliveryAddress: string;
  deliveryDate: string;
};

/**
 * Informtaion about the item
 */
export type ItemType = {
  description: string;
  quantity: number;
  price: number;
  tax: number;
  priceWTax: string;
  total: string;
};

/**
 * Information about the invoice
 */
export type InvoiceType = {
  buyer: BuyerType;
  delivery?: DeliveryType;
  invoiceNo: string;
  invoiceDate: Date;
  items: ItemType[];
};
