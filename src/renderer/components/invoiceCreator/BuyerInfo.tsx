/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { BuyerInfoType, InvoiceType } from './invoice.types';

type Props = {
  buyerInfo: BuyerInfoType[];
  register: UseFormRegister<InvoiceType>;
};

const BuyerInfo: React.FC<Props> = ({ buyerInfo, register }) => {
  return (
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
  );
};

export default BuyerInfo;
