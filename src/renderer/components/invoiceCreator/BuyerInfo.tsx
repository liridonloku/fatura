/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { useTranslation } from 'react-i18next';
import { BuyerInfoType, InvoiceType } from './invoice.types';

type Props = {
  /**
   * Information about the buyer that can be used, taken as a collection of keys from BuyerType
   */
  buyerInfo: BuyerInfoType[];
  register: UseFormRegister<InvoiceType>;
};

/**
 * BuyerInfo component is the section where the user can input
 * information about the buyer, inside of InvoiceCreator
 */
const BuyerInfo: React.FC<Props> = ({ buyerInfo, register }) => {
  const { t } = useTranslation();

  return (
    <fieldset className="border p-3 mb-2">
      <legend className="mb-0">{t('buyer')}</legend>
      <div className="row g-3">
        {buyerInfo.map((elem) => (
          <div className="col-md-6 col-lg-3" key={elem}>
            <label htmlFor={`buyer${elem}`} className="w-100">
              {t(`${elem}`)}
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
