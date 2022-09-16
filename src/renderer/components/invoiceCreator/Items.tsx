/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  FieldArrayMethodProps,
  FieldArrayWithId,
} from 'react-hook-form/dist/types/fieldArray';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form/dist/types/form';
import { useTranslation } from 'react-i18next';
import { BsFillTrashFill } from 'react-icons/bs';
import currencies, { CurrencyTypes } from 'renderer/i18n/currencies/currencies';
import { InvoiceType, ItemType } from './invoice.types';

type Props = {
  fields: FieldArrayWithId<InvoiceType, 'items', 'id'>[];
  register: UseFormRegister<InvoiceType>;
  remove: (index?: number | number[] | undefined) => void;
  append: (
    value: Partial<ItemType> | Partial<ItemType>[],
    options?: FieldArrayMethodProps | undefined
  ) => void;
  getValues: UseFormGetValues<InvoiceType>;
  setValue: UseFormSetValue<InvoiceType>;
  currency: CurrencyTypes;
};

/**
 * Items component is the section where the user can input
 * information about the items, inside of InvoiceCreator
 */
const Items: React.FC<Props> = ({
  fields,
  register,
  remove,
  append,
  getValues,
  setValue,
  currency,
}) => {
  const { t } = useTranslation();

  const [totals, settotals] = useState({
    total: 0,
    totalWithoutTax: 0,
    tax: 0,
  });

  const calculateInvoiceTotals = () => {
    const invoice = getValues();
    const total = invoice.items.reduce((acc, current) => {
      return acc + parseFloat(current.total);
    }, 0);
    let totalWithoutTax = invoice.items.reduce((acc, current) => {
      return acc + current.quantity * current.price;
    }, 0);
    totalWithoutTax = Number.isNaN(totalWithoutTax) ? 0 : totalWithoutTax;
    const tax = total - totalWithoutTax;
    settotals({ total, totalWithoutTax, tax });
  };

  /**
   * Updates the 'total' and 'priceWTax' inputs of an item when quantity, price
   * or tax changes
   * @param e Event from the input element that has changed
   * @param i The field from FieldArray that has changed
   */
  const updateItemTotal = (e: React.FormEvent<HTMLInputElement>, i: number) => {
    const values = getValues(`items.${i}`);
    let { quantity, price, tax } = values;
    if (e.currentTarget.getAttribute('name')?.includes('quantity')) {
      quantity = parseFloat(e.currentTarget.value);
    }
    if (e.currentTarget.getAttribute('name')?.includes('price')) {
      price = parseFloat(e.currentTarget.value);
    }
    if (e.currentTarget.getAttribute('name')?.includes('tax')) {
      tax = parseFloat(e.currentTarget.value);
    }
    const priceWTax = price * (1 + tax / 100);
    const total = quantity * price * (1 + tax / 100);

    const displayPriceWTax = Number.isNaN(priceWTax)
      ? '0'
      : priceWTax.toFixed(2);
    const displayTotal = Number.isNaN(total) ? '0' : total.toFixed(2);
    setValue(`items.${i}.quantity`, quantity);
    setValue(`items.${i}.price`, price);
    setValue(`items.${i}.tax`, tax);
    setValue(`items.${i}.total`, displayTotal);
    setValue(`items.${i}.priceWTax`, displayPriceWTax);
    calculateInvoiceTotals();
  };

  return (
    <fieldset className="border p-3 mb-2 items">
      <legend className="mb-0">{t('items')}</legend>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div>{t('no.')}</div>
        <div className="row flex-grow-1 mx-0 px-1 text-center align-items-center">
          <div className="col-sm-5 p-0">{t('description')}</div>
          <div className="col-sm-1 p-0">{t('units')}</div>
          <div className="col-sm-1 p-0">{t('qty')}</div>
          <div className="col-sm-1 p-0">{t('price')}</div>
          <div className="col-sm-1 p-0">{t('tax-%')}</div>
          <div className="col-sm-1 p-0">{t('price-with-tax')}</div>
          <div className="col-sm-2 p-0">{t('total')}</div>
        </div>
        <div className="px-1 text-center d-flex align-items-center">
          <button type="button" className="btn btn-outline-danger invisible">
            {t('del')}
          </button>
        </div>
      </div>
      {fields.map((item, i) => (
        <div
          key={item.id}
          className="container-fluid d-flex justify-content-between align-items-center mb-2"
        >
          <div className="d-flex flex-shrink-0" style={{ width: '19.5px' }}>
            {i + 1}.
          </div>
          <div
            className="row flex-grow-1 mx-0 px-1 text-center align-items-center"
            key={item.id}
          >
            <div className="col-sm-5 p-0">
              <input
                type="text"
                className="form-control"
                {...register(`items.${i}.description`)}
                defaultValue={item.description}
                placeholder={t('description')}
                required
              />
            </div>
            <div className="col-sm-1 p-0">
              <input
                type="text"
                step={0.01}
                min={0}
                className="form-control"
                {...register(`items.${i}.units`)}
                defaultValue={item.units}
                placeholder={t('units')}
                required
              />
            </div>
            <div className="col-sm-1 p-0">
              <input
                type="number"
                step={0.01}
                min={0}
                className="form-control"
                {...register(`items.${i}.quantity`)}
                defaultValue={item.quantity}
                placeholder="0"
                onInput={(e) => {
                  updateItemTotal(e, i);
                }}
                required
              />
            </div>
            <div className="col-sm-1 p-0">
              <input
                type="number"
                step={0.01}
                min={0}
                className="form-control"
                {...register(`items.${i}.price`)}
                defaultValue={item.price}
                placeholder="0"
                onInput={(e) => {
                  updateItemTotal(e, i);
                }}
                required
              />
            </div>
            <div className="col-sm-1 p-0">
              <input
                type="number"
                step={0.01}
                className="form-control"
                {...register(`items.${i}.tax`)}
                defaultValue={item.tax}
                placeholder="0"
                onInput={(e) => {
                  updateItemTotal(e, i);
                }}
                required
              />
            </div>
            <div className="col-sm-1 p-0">
              <input
                type="text"
                className="form-control px-1 text-center"
                readOnly
                {...register(`items.${i}.priceWTax`)}
                defaultValue={item.total}
                placeholder="0"
              />
            </div>
            <div className="col-sm-2 p-0">
              <input
                type="text"
                className="form-control text-end"
                readOnly
                {...register(`items.${i}.total`)}
                defaultValue={item.total}
                placeholder="-"
              />
            </div>
          </div>
          <div className="px-1 text-center d-flex align-items-center">
            <button
              type="button"
              onClick={() => remove(i)}
              className="btn btn-outline-danger px-2"
            >
              <BsFillTrashFill size={16} />
            </button>
          </div>
        </div>
      ))}
      <div className="text-center">
        <button
          type="button"
          onClick={() =>
            append({
              description: '',
              units: '',
              quantity: 0,
              price: 0,
              tax: 0,
              priceWTax: '0',
              total: '0',
            })
          }
          className="btn btn-outline-primary"
        >
          {t('add-item')}
        </button>
      </div>
      <div className="container-fluid d-flex flex-column align-items-end">
        <div className="col-sm-4 d-flex align-items-center gap-2 mb-2">
          <label htmlFor="total" className="fs-6 w-75 text-end">
            {t('total')}
          </label>
          <input
            type="text"
            readOnly
            id="total"
            className="form-control text-end w-50"
            value={`${totals.total.toFixed(2)}${
              currencies[`${currency}`].symbol
            }`}
          />
          <div className="text-center d-flex align-items-center">
            <button type="button" className="btn btn-outline-danger invisible">
              <BsFillTrashFill size={20} />
            </button>
          </div>
        </div>
        <div className="col-sm-4 d-flex align-items-center gap-2 mb-2">
          <label htmlFor="totalWithoutTax" className="fs-6 w-75 text-end">
            {t('total-without-tax')}
          </label>
          <input
            type="text"
            readOnly
            id="totalWithoutTax"
            className="form-control text-end w-50"
            value={`${totals.totalWithoutTax.toFixed(2)}${
              currencies[`${currency}`].symbol
            }`}
          />
          <div className="text-center d-flex align-items-center">
            <button type="button" className="btn btn-outline-danger invisible">
              <BsFillTrashFill size={20} />
            </button>
          </div>
        </div>
        <div className="col-sm-4 d-flex align-items-center gap-2 mb-2">
          <label htmlFor="total" className="fs-6 w-75 text-end">
            {t('tax')}
          </label>
          <input
            type="text"
            readOnly
            id="total"
            className="form-control text-end w-50"
            value={`${totals.tax.toFixed(2)}${
              currencies[`${currency}`].symbol
            }`}
          />
          <div className="text-center d-flex align-items-center">
            <button type="button" className="btn btn-outline-danger invisible">
              <BsFillTrashFill size={20} />
            </button>
          </div>
        </div>
        <div className="col-sm-4 d-flex align-items-center gap-2 mb-2">
          <label htmlFor="total" className="fs-6 fw-bold w-75 text-end">
            {t('ammount-due')}
          </label>
          <input
            type="text"
            readOnly
            id="total"
            className="form-control text-end fw-bold w-50"
            value={`${totals.total.toFixed(2)}${
              currencies[`${currency}`].symbol
            }`}
          />
          <div className="text-center d-flex align-items-center">
            <button type="button" className="btn btn-outline-danger invisible">
              <BsFillTrashFill size={20} />
            </button>
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default Items;
