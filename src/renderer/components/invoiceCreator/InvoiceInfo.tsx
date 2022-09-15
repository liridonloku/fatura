/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { useTranslation } from 'react-i18next';
import generateInputDate from '../../utils/generateInputDate';
import generateInvoiceNo from '../../utils/generateInvoiceNo';
import { InvoiceType } from './invoice.types';

type Props = {
  register: UseFormRegister<InvoiceType>;
};

/**
 * InvoiceInfo component is the section where the user can input
 * information about the invoice, inside of InvoiceCreator
 */
const InvoiceInfo: React.FC<Props> = ({ register }) => {
  const { t } = useTranslation();

  return (
    <fieldset className="border p-3 mb-2">
      <legend className="mb-0">{t('invoice')}</legend>
      <div className="row g-3">
        <div className="col-md-6 col-lg-3">
          <label htmlFor="invoiceDate" className="w-100">
            {t('invoice-date')}
            <input
              type="date"
              {...register('invoiceDate')}
              id="invoiceDate"
              className="form-control"
              defaultValue={generateInputDate(new Date())}
              required
            />
          </label>
        </div>
        <div className="col-md-6 col-lg-3">
          <label htmlFor="invoiceNo" className="w-100">
            {t('invoice-no')}
            <input
              type="text"
              {...register('invoiceNo')}
              id="invoiceNo"
              className="form-control"
              defaultValue={generateInvoiceNo()}
              readOnly
              required
            />
          </label>
        </div>
        <div className="col-md-6 col-lg-3">
          <label htmlFor="deliveryAddress" className="w-100">
            {t('delivery-date')}
            <input
              type="date"
              {...register('delivery.deliveryDate')}
              id="deliveryDate"
              className="form-control"
            />
          </label>
        </div>
        <div className="col-md-6 col-lg-3">
          <label htmlFor="deliveryAddress" className="w-100">
            {t('delivery-address')}
            <input
              type="text"
              {...register('delivery.deliveryAddress')}
              id="deliveryAddress"
              className="form-control"
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default InvoiceInfo;
