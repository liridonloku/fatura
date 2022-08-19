/* eslint-disable @typescript-eslint/no-explicit-any */
import { InvoiceType } from 'renderer/components/invoiceCreator/invoice.types';

/**
 * This function converts the data from the submitHandler to the correct types.
 * Some number and date inputs return as strings that TypeScript will not catch,
 * these are converted to the correct type here.
 * @param data Invoice data
 * @returns Invoice data with correct types
 */
const convertInvoiceData = (data: InvoiceType) => {
  const newData = data;

  // Convert invoice date from string
  newData.invoiceDate = new Date(data.invoiceDate);

  // Convert delivery date from string
  if (newData.delivery && data.delivery?.deliveryDate) {
    newData.delivery.deliveryDate = new Date(data.delivery.deliveryDate);
  }
  // Convert item price and quantity to floats
  const newItems = data.items.map((item: any) => {
    item.price = parseFloat(item.price);
    item.quantity = parseFloat(item.quantity);
    return item;
  });
  newData.items = newItems;
  return newData;
};

export default convertInvoiceData;
