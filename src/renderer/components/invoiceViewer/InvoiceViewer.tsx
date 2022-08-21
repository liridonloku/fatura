import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyInfoType } from '../companyInfo/companyInfo.types';
import { InvoiceType } from '../invoiceCreator/invoice.types';

type Props = {
  /**
   * Company information including the name, id, address etc.
   */
  company: CompanyInfoType;
  /**
   * Invoice data: Buyer info, dates and delivery address, and items
   */
  invoice: InvoiceType | null;
};

/**
 * The viewer component for generated invoices that contains the print and export functions.
 */
const InvoiceViewer: React.FC<Props> = ({
  company = { name: 'Company', id: 'id' },
  invoice,
}) => {
  const navigate = useNavigate();

  const [loading, setloading] = useState(false);

  /**
   * Renders items on the invoice
   * @param items Items to be rendered
   * @returns An array of JSX elements
   */
  const renderItems = (items: InvoiceType['items']) => {
    return items.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <tr key={index}>
        <td className="custom-mw no">{index + 1}</td>
        <td className="text-start">{item.description}</td>
        <td className="custom-mw px-3">{item.units}</td>
        <td className="custom-mw px-3">{item.quantity}</td>
        <td className="custom-mw px-3">{item.price}€</td>
        <td className="custom-mw px-3">{item.tax}%</td>
        <td className="custom-mw px-3">{item.priceWTax}€</td>
        <td className="custom-mw px-3">{item.total}€</td>
      </tr>
    ));
  };

  // Calculates the sum of all invoice items
  const calculateTotal = (items: InvoiceType['items']) => {
    return (
      items
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .reduce((acc: any, current) => {
          return acc + parseFloat(current.total);
        }, 0)
        .toFixed(2)
    );
  };

  const saveToPDF = async () => {
    setloading(true);
    await window.electron.ipcRenderer.invoke('save-to-pdf', [invoice]);
    setloading(false);
  };

  const printInvoice = async () => {
    setloading(true);
    window.print();
    // await window.electron.ipcRenderer.invoke('print', []);
    setloading(false);
  };

  return (
    <div className="invoice px-3">
      <div className="container-fluid d-flex justify-content-between">
        <div>
          <h1 className="fs-3">Invoice no: {invoice?.invoiceNo}</h1>
          <p className="fs-4">
            Date: {invoice?.invoiceDate.toLocaleDateString('tr')}
          </p>
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
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col" className="text-start">
                Description
              </th>
              <th scope="col">Units</th>
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
              <td>Total:</td>
              <td>{invoice?.items && calculateTotal(invoice?.items)}€</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container text-center fixed-bottom print-none mb-3 d-print-none">
        <button
          type="button"
          className="btn btn-primary me-2"
          onClick={() => saveToPDF()}
          disabled={loading}
        >
          Save as PDF
        </button>
        <button
          type="button"
          className="btn btn-success me-2"
          onClick={() => printInvoice()}
          disabled={loading}
        >
          Print
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => navigate('/')}
          disabled={loading}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default InvoiceViewer;
