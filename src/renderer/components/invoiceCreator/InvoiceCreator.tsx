/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import convertInvoiceData from 'renderer/utils/convertInvoceData';
import { InvoiceType, BuyerInfoType } from './invoice.types';
import BuyerInfo from './BuyerInfo';
import InvoiceInfo from './InvoiceInfo';
import Items from './Items';
import CommentBox from './CommentBox';

type Props = {
  /**
   * Updates app state containing invoce data
   */
  updateInvoice: (newInvoice: InvoiceType) => void;
};

/**
 * The invoice creator component.
 */
const InvoiceCreator: React.FC<Props> = ({ updateInvoice }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const buyerInfo: BuyerInfoType[] = ['name', 'id', 'address', 'phone'];

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
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
        units: '',
        quantity: 0,
        price: 0,
        tax: 0,
        priceWTax: '0',
        total: '0',
      },
      { shouldFocus: false }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Calls the updateInvoice prop to set the data as invoice state
   * then navigates to the viewer component
   * @param data Form data
   * @returns void
   */
  const onSubmit: SubmitHandler<InvoiceType> = (data) => {
    const newData = convertInvoiceData(data);
    updateInvoice(newData);
    navigate('/invoice-viewer');
  };

  return (
    <div className="container-xl">
      <div className="text-center mb-3">
        <h1>{t('new-invoice')}</h1>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => navigate('/')}
        >
          {t('home')}
        </button>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) =>
            e.key === 'Enter' &&
            document.activeElement?.nodeName !== 'BUTTON' &&
            e.preventDefault()
          }
        >
          <BuyerInfo buyerInfo={buyerInfo} register={register} />
          <InvoiceInfo register={register} />
          <Items
            fields={fields}
            register={register}
            remove={remove}
            append={append}
            getValues={getValues}
            setValue={setValue}
          />
          <CommentBox register={register} />
          <div className="text-center mb-5">
            <button type="submit" className="btn btn-success mt-3">
              {`${t('print')}/${t('export')}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceCreator;
