export type BuyerType = {
  name: string;
  id: string;
  phone?: string;
  address?: string;
};

export type BuyerInfoType = keyof BuyerType;

type DeliveryType = {
  deliveryAddress: string;
  deliveryDate: string;
};

export type ItemType = {
  description: string;
  quantity: number;
  price: number;
  tax: number;
  priceWTax: string;
  total: string;
};

export type InvoiceType = {
  buyer: BuyerType;
  delivery?: DeliveryType;
  invoiceNo: string;
  invoiceDate: Date;
  items: ItemType[];
};
