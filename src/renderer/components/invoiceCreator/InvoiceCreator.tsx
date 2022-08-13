/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { InvoiceType, BuyerInfoType } from './invoice.types';
import BuyerInfo from './BuyerInfo';
import InvoiceInfo from './InvoiceInfo';
import Items from './Items';

type Props = Record<string, unknown>;

const InvoiceCreator: React.FC<Props> = () => {
  const navigate = useNavigate();

  const buyerInfo: BuyerInfoType[] = ['name', 'id', 'address', 'phone'];

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

  // Create first invoice item on mount
  useEffect(() => {
    append(
      {
        description: '',
        quantity: 0,
        price: 0,
        tax: 0,
      },
      { shouldFocus: false }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line no-console
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
          <BuyerInfo buyerInfo={buyerInfo} register={register} />
          <InvoiceInfo register={register} />
          <Items
            fields={fields}
            register={register}
            remove={remove}
            append={append}
          />
          <div className="text-center mb-5">
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
