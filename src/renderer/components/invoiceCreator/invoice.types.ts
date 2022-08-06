type BuyerType = {
  name: string;
  id: string;
  phone?: string;
  address?: string;
};

type Concrete<Type> = [keyof Type, keyof Type, keyof Type, keyof Type];

export type BuyerInfoType = Concrete<BuyerType>;

type DeliveryType = {
  deliveryAddress: string;
  deliveryDate: string;
};

type ItemType = {
  description: string;
  quantity: number;
  price: number;
  tax: number;
};

export type InvoiceType = {
  buyer: BuyerType;
  delivery?: DeliveryType;
  invoiceNo: string;
  date: Date;
  items: ItemType[];
};
