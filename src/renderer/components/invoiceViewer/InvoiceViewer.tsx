import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyInfoType } from '../companyInfo/companyInfo.types';
import { InvoiceType } from '../invoiceCreator/invoice.types';
import StyledInvoiceViewer from './InvoiceViewer.styled';

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
      <div className="item" key={index}>
        <div className="no">{index + 1}</div>
        <div className="description">{item.description}</div>
        <div className="units">{item.units}</div>
        <div className="qty">{item.quantity}</div>
        <div className="price">{item.price.toFixed(2)}€</div>
        <div className="tax">{item.tax}%</div>
        <div className="price-w-tax">{item.priceWTax}€</div>
        <div className="total">{item.total}€</div>
      </div>
    ));
  };

  // Calculates the sum of all invoice items
  const calculateTotal = (items: InvoiceType['items']) => {
    return items
      .reduce((acc, current) => {
        return acc + parseFloat(current.total);
      }, 0)
      .toFixed(2);
  };

  const calculateTotalWithoutTax = (items: InvoiceType['items']) => {
    return items
      .reduce((acc, current) => {
        return acc + current.quantity * current.price;
      }, 0)
      .toFixed(2);
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
    <StyledInvoiceViewer>
      <div className="logo-container">
        <div className="logo">
          <h1>Logo</h1>
        </div>
        <div className="invoice-no">
          <h2>
            <span>Invoice: </span>
            {invoice?.invoiceNo}
          </h2>
          <h3>
            <span>Date: </span>
            {invoice?.invoiceDate.toLocaleDateString('tr')}
          </h3>
        </div>
      </div>
      <div className="seller-buyer-delivery">
        <div>
          <p className="mb-0 fw-bold">Seller:</p>
          <p className="mb-0">{company.name}</p>
          <p className="mb-0">{company.id}</p>
          <p className="mb-0">{company.address}</p>
          <p className="mb-0">{company.phone}</p>
        </div>
        {(invoice?.delivery?.deliveryAddress ||
          invoice?.delivery?.deliveryDate) && (
          <div>
            <p className="mb-0 fw-bold">Delivery</p>
            <p className="mb-0">
              Date: {invoice.delivery.deliveryDate.toLocaleDateString('tr')}
            </p>
            <p className="mb-0">Address: {invoice.delivery.deliveryAddress}</p>
          </div>
        )}
        <div className="buyer">
          <p className="mb-0 fw-bold">Bill to:</p>
          <p className="mb-0">{invoice?.buyer.name}</p>
          <p className="mb-0">{invoice?.buyer.id}</p>
          <p className="mb-0">{invoice?.buyer.address}</p>
          <p className="mb-0">{invoice?.buyer.phone}</p>
        </div>
      </div>
      <div className="items">
        <div className="items-header">
          <div className="no">#</div>
          <div className="description">Description</div>
          <div className="units">Units</div>
          <div className="qty">Qty.</div>
          <div className="price">Price</div>
          <div className="tax">Tax %</div>
          <div className="price-w-tax">Price with tax</div>
          <div className="total">Total</div>
        </div>
        <div>{invoice?.items && renderItems(invoice.items)}</div>
      </div>
      {invoice?.items && (
        <div className="calculations-container">
          <div className="comment-box">
            <p>Comment:</p>
          </div>
          <div className="labels">
            <p>Total: </p>
            <p>Total without tax: </p>
            <p>Tax: </p>
            <p className="amount-due">
              <b>Amount Due: </b>
            </p>
          </div>
          <div className="calculations">
            <p>{calculateTotal(invoice.items)}€</p>
            <p>{calculateTotalWithoutTax(invoice.items)}€</p>
            <p>
              {(
                parseFloat(calculateTotal(invoice.items)) -
                parseFloat(calculateTotalWithoutTax(invoice.items))
              ).toFixed(2)}
              €
            </p>
            <p className="amount-due">
              <b>{calculateTotal(invoice.items)}€</b>
            </p>
          </div>
        </div>
      )}
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
    </StyledInvoiceViewer>
  );
};

export default InvoiceViewer;
