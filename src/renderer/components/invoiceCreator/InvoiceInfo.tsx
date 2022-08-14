/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import generateInputDate from '../../utils/generateInputDate';
import generateInvoiceNo from '../../utils/generateInvoiceNo';
import { InvoiceType } from './invoice.types';

type Props = {
  register: UseFormRegister<InvoiceType>;
};

const InvoiceInfo: React.FC<Props> = ({ register }) => {
  return (
    <fieldset className="border p-3 mb-2">
      <legend className="mb-0">Invoice</legend>
      <div className="row g-3">
        <div className="col-md-6 col-lg-3">
          <label htmlFor="invoiceDate" className="w-100">
            Invoice Date
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
            Invoice No.
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
            Delivery Date
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
            Delivery Address
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
