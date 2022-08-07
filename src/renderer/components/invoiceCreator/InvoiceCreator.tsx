/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BuyerType, InvoiceType } from './invoice.types';
import generateInvoiceNo from '../../utils/generateInvoiceNo';
import generateInputDate from '../../utils/generateInputDate';

type Props = Record<string, unknown>;
type BuyerInfo = keyof BuyerType;

const InvoiceCreator: React.FC<Props> = () => {
  const navigate = useNavigate();

  const buyerInfo: BuyerInfo[] = ['name', 'id', 'address', 'phone'];

  const {
    register,
    handleSubmit,
    // ADD THIS formState: { errors },
  } = useForm<InvoiceType>();

  const onSubmit: SubmitHandler<InvoiceType> = (data) => console.log(data);

  return (
    <>
      <div className="container text-center mb-3">
        <h1>New Invoice</h1>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => navigate('/')}
        >
          Home
        </button>
      </div>
      <div className="container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        >
          <fieldset className="border p-3 mb-2">
            <legend className="mb-0">Buyer</legend>
            <div className="row g-3">
              {buyerInfo.map((elem) => (
                <div className="col-md-6 col-lg-3" key={elem}>
                  <label htmlFor={`buyer${elem}`} className="w-100">
                    {elem.charAt(0).toUpperCase() + elem.slice(1)}
                    <input
                      type="text"
                      id={`buyer${elem}`}
                      {...register(`buyer.${elem}`)}
                      className="form-control"
                    />
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
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
                    defaultValue={generateInputDate()}
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
                    disabled
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
                    defaultValue={generateInputDate()}
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
          <div className="text-center">
            <button type="submit" className="btn btn-success mt-3">
              Print/Export
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InvoiceCreator;
