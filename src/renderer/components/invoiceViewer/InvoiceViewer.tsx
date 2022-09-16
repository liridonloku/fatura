import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DateFormatType } from 'renderer/i18n/dateFormats/dateFormats';
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
  /**
   * Path to the logo
   */
  logo: string;
  /**
   * Date Format
   */
  dateFormat: DateFormatType;
};

/**
 * The viewer component for generated invoices that contains the print and export functions.
 */
const InvoiceViewer: React.FC<Props> = ({
  company = { name: 'Company', id: 'id' },
  invoice,
  logo,
  dateFormat,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  /**
   * Calculates the total cost of all invoice items
   * @param items - Items from the invoice
   * @returns the total cost of all items in fixed-point notation
   */
  const calculateTotal = (items: InvoiceType['items']) => {
    return items
      .reduce((acc, current) => {
        return acc + parseFloat(current.total);
      }, 0)
      .toFixed(2);
  };

  /**
   * Calculates the cost of all invoice items without tax
   * @param items - Items from the invoice
   * @returns the total cost without tax of all items in fixed-point notation
   */
  const calculateTotalWithoutTax = (items: InvoiceType['items']) => {
    return items
      .reduce((acc, current) => {
        return acc + current.quantity * current.price;
      }, 0)
      .toFixed(2);
  };

  /**
   * Save invoice as PDF using the system dialog
   */
  const saveToPDF = async () => {
    setloading(true);
    await window.electron.ipcRenderer.invoke('save-to-pdf', [invoice]);
    setloading(false);
  };

  /**
   * Print the invoice
   */
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
          {logo ? <img src={logo} alt="" /> : <h1>{t('logo')}</h1>}
        </div>
        <div className="invoice-no">
          <h2>
            <span>{t('invoice')}: </span>
            {invoice?.invoiceNo}
          </h2>
          <h3>
            <span>{t('date')}: </span>
            {invoice?.invoiceDate.toLocaleDateString(dateFormat)}
          </h3>
        </div>
      </div>
      <div className="seller-buyer-delivery">
        <div>
          <p className="mb-0 fw-bold">{t('seller')}:</p>
          <p className="mb-0">{company.name}</p>
          <p className="mb-0">{company.id}</p>
          <p className="mb-0">{company.address}</p>
          <p className="mb-0">{company.phone}</p>
        </div>
        {(invoice?.delivery?.deliveryAddress ||
          invoice?.delivery?.deliveryDate) && (
          <div>
            <p className="mb-0 fw-bold">{t('delivery')}</p>
            <p className="mb-0">
              {t('date')}:{' '}
              {invoice.delivery.deliveryDate.toLocaleDateString(dateFormat)}
            </p>
            <p className="mb-0">
              {t('address')}: {invoice.delivery.deliveryAddress}
            </p>
          </div>
        )}
        <div className="buyer">
          <p className="mb-0 fw-bold">{t('bill-to')}:</p>
          <p className="mb-0">{invoice?.buyer.name}</p>
          <p className="mb-0">{invoice?.buyer.id}</p>
          <p className="mb-0">{invoice?.buyer.address}</p>
          <p className="mb-0">{invoice?.buyer.phone}</p>
        </div>
      </div>
      <div className="items">
        <div className="items-header">
          <div className="no">{t('no.')}</div>
          <div className="description">{t('description')}</div>
          <div className="units">{t('units')}</div>
          <div className="qty">{t('qty')}</div>
          <div className="price">{t('price')}</div>
          <div className="tax">{t('tax-%')}</div>
          <div className="price-w-tax">{t('price-with-tax')}</div>
          <div className="total">{t('total')}</div>
        </div>
        <div className="items-body">
          {invoice?.items && renderItems(invoice.items)}
        </div>
      </div>
      {invoice?.items && (
        <div className="calculations-container">
          <div className="comment-box">
            <p>
              <b>{t('additional-information')}: </b> <br />
              {invoice.additionalInfo}
            </p>
          </div>
          <div className="labels">
            <p>{t('total')}: </p>
            <p>{t('total-without-tax')}: </p>
            <p>{t('tax')}: </p>
            <p className="amount-due">
              <b>{t('ammount-due')}: </b>
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
      <div className="signings">
        <p>{t('seller')}</p>
        <p>{t('buyer')}</p>
      </div>
      <div className="footer">
        <p className="fw-bold">{t('bank-accounts')}:</p>
        {company.bankAccounts?.map((account, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <p className="mb-0" key={index}>
            {account.bank}: {account.accountNumber}
          </p>
        ))}
      </div>
      <div className="container text-center fixed-bottom print-none mb-3 d-print-none">
        <button
          type="button"
          className="btn btn-primary me-2"
          onClick={() => saveToPDF()}
          disabled={loading}
        >
          {t('save-as-pdf')}
        </button>
        <button
          type="button"
          className="btn btn-success me-2"
          onClick={() => printInvoice()}
          disabled={loading}
        >
          {t('print')}
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => navigate('/')}
          disabled={loading}
        >
          {t('home')}
        </button>
      </div>
    </StyledInvoiceViewer>
  );
};

export default InvoiceViewer;
