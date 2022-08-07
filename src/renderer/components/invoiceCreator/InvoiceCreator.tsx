/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
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
    control,
    handleSubmit,
    // ADD THIS formState: { errors },
  } = useForm<InvoiceType>();

  // Use field array for dynamic items
  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control,
  });

  // Create first item on mount
  useEffect(() => {
    append({
      description: '',
      quantity: 0,
      price: 0,
      tax: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                      required={elem === 'name' || elem === 'id'}
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
          <fieldset className="border p-3 mb-2">
            <legend className="mb-0">Items</legend>
            <div className="row m-0 mb-2 text-center">
              <div className="col-sm-1 d-flex text-center align-items-center">
                No.
              </div>
              <div className="col-sm-6 col-md-5 p-0">Description</div>
              <div className="col-sm-6 col-md-1 p-0">Qty.</div>
              <div className="col-sm-6 col-md-1 p-0">Price</div>
              <div className="col-sm-6 col-md-1 p-0">Tax %</div>
              <div className="col-sm-6 col-md-1 p-0">Total</div>
            </div>
            {fields.map((item, i) => (
              <div className="row m-0" key={item.id}>
                <div className="col-sm-1 d-flex text-center align-items-center">
                  {i + 1}
                </div>
                <div className="col-sm-6 col-md-5 p-0">
                  <input
                    type="text"
                    className="form-control"
                    {...register(`items.${i}.description`)}
                    defaultValue={item.description}
                    placeholder="Description"
                  />
                </div>
                <div className="col-sm-6 col-md-1 p-0">
                  <input
                    type="number"
                    min={0}
                    className="form-control"
                    {...register(`items.${i}.quantity`)}
                    defaultValue={item.quantity}
                    placeholder="Quantity"
                  />
                </div>
                <div className="col-sm-6 col-md-1 p-0">
                  <input
                    type="number"
                    min={0}
                    className="form-control"
                    {...register(`items.${i}.price`)}
                    defaultValue={item.price}
                    placeholder="Price"
                  />
                </div>
                <div className="col-sm-6 col-md-1 p-0">
                  <input
                    type="number"
                    className="form-control"
                    {...register(`items.${i}.tax`)}
                    defaultValue={item.tax}
                    placeholder="18"
                  />
                </div>
                <div className="col-sm-6 col-md-2 p-0">
                  <input
                    type="number"
                    className="form-control"
                    readOnly
                    value={item.quantity + item.price}
                    placeholder="-"
                  />
                </div>
                <div className="col-sm-6 col-md-1 px-1 text-center">
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="btn btn-outline-danger"
                  >
                    Del
                  </button>
                </div>
              </div>
            ))}
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
