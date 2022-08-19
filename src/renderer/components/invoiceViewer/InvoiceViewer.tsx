import React from 'react';
import { CompanyInfoType } from '../companyInfo/companyInfo.types';
import { InvoiceType } from '../invoiceCreator/invoice.types';

/**
 * The viewer component for generated invoices that contains the print and export functions.
 */

type Props = {
  company: CompanyInfoType;
  invoice: InvoiceType | null;
};

const InvoiceViewer: React.FC<Props> = ({
  company = { name: 'Company', id: 'id' },
  invoice,
}) => {
  /**
   * Renders items on the invoice
   * @param items Items to be rendered
   * @returns JSX.Element[]
   */
  const renderItems = (items: InvoiceType['items']) => {
    return items.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.description}</td>
        <td>{item.quantity}</td>
        <td>{item.price}€</td>
        <td>{item.tax} %</td>
        <td>{item.priceWTax}€</td>
        <td>{item.total}€</td>
      </tr>
    ));
  };

  const calculateItemTotal = (items: InvoiceType['items']) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return items.reduce((acc: any, current) => {
      return acc + parseFloat(current.total);
    }, 0);
  };
  return (
    <div className="container">
      <div className="container-fluid d-flex justify-content-between">
        <div>
          <h1 className="fs-3">Invoice no: {invoice?.invoiceNo}</h1>
          <p className="fs-4">Date: {invoice?.invoiceDate.toString()}</p>
        </div>
        <div className="d-flex align-items-center">
          <h2>Logo</h2>
        </div>
      </div>
      <div className="container-fluid mb-4 d-flex justify-content-between">
        <div>
          <p className="mb-0 fw-bold">Bill to:</p>
          <p className="mb-0">{invoice?.buyer.name}</p>
          <p className="mb-0">{invoice?.buyer.id}</p>
          <p className="mb-0">{invoice?.buyer.address}</p>
          <p className="mb-0">{invoice?.buyer.phone}</p>
        </div>
        <div>
          <p className="mb-0 fw-bold">From:</p>
          <p className="mb-0">{company.name}</p>
          <p className="mb-0">{company.id}</p>
          <p className="mb-0">{company.address}</p>
          <p className="mb-0">{company.phone}</p>
        </div>
      </div>
      <div className="container-fluid d-flex justify-content-between">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Description</th>
              <th scope="col">Qty.</th>
              <th scope="col">Price</th>
              <th scope="col">Tax</th>
              <th scope="col">
                Price <br /> with tax
              </th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>{invoice?.items && renderItems(invoice.items)}</tbody>
        </table>
      </div>
      <div className="container-fluid d-flex justify-content-end">
        <table className="table w-25">
          <tbody>
            <tr>
              <td>Total</td>
              <td>{invoice?.items && calculateItemTotal(invoice?.items)}€</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container text-center fixed-bottom print-none mb-3">
        <button type="button" className="btn btn-primary">
          Save to PDF
        </button>
      </div>
    </div>
  );
};

export default InvoiceViewer;
