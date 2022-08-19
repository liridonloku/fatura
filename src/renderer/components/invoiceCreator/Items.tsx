/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  FieldArrayMethodProps,
  FieldArrayWithId,
} from 'react-hook-form/dist/types/fieldArray';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form/dist/types/form';
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
}) => {
  /**
   * Updates the 'total' and 'priceWTax' inputs of an item when quantity, price
   * or tax changes
   * @param e Event from the input element that has changed
   * @param i The field from FieldArray that has changed
   */
  const updateTotal = (e: React.FormEvent<HTMLInputElement>, i: number) => {
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
    setValue(`items.${i}.total`, displayTotal);
    setValue(`items.${i}.priceWTax`, displayPriceWTax);
  };

  return (
    <fieldset className="border p-3 mb-2 items">
      <legend className="mb-0">Items</legend>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div>No.</div>
        <div className="row flex-grow-1 mx-0 px-1 text-center align-items-center">
          <div className="col-sm-6 p-0">Description</div>
          <div className="col-sm-1 p-0">Qty.</div>
          <div className="col-sm-1 p-0">Price</div>
          <div className="col-sm-1 p-0">Tax %</div>
          <div className="col-sm-1 p-0">Price with tax</div>
          <div className="col-sm-2 p-0">Total</div>
        </div>
        <div className="px-1 text-center d-flex align-items-center">
          <button type="button" className="btn btn-outline-danger invisible">
            Del
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
            <div className="col-sm-6 p-0">
              <input
                type="text"
                className="form-control"
                {...register(`items.${i}.description`)}
                defaultValue={item.description}
                placeholder="Description"
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
                placeholder="Quantity"
                onInput={(e) => {
                  updateTotal(e, i);
                }}
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
                placeholder="Price"
                onInput={(e) => {
                  updateTotal(e, i);
                }}
              />
            </div>
            <div className="col-sm-1 p-0">
              <input
                type="number"
                step={0.01}
                className="form-control"
                {...register(`items.${i}.tax`)}
                defaultValue={item.tax}
                placeholder="18"
                onInput={(e) => {
                  updateTotal(e, i);
                }}
              />
            </div>
            <div className="col-sm-1 p-0">
              <input
                type="text"
                className="form-control"
                readOnly
                {...register(`items.${i}.priceWTax`)}
                defaultValue={item.total}
                placeholder="-"
              />
            </div>
            <div className="col-sm-2 p-0">
              <input
                type="text"
                className="form-control text-end"
                readOnly
                {...register(`items.${i}.total`)}
                value={item.total}
                placeholder="-"
              />
            </div>
          </div>
          <div className="px-1 text-center d-flex align-items-center">
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
      <div className="text-center">
        <button
          type="button"
          onClick={() =>
            append({
              description: '',
              quantity: 0,
              price: 0,
              tax: 0,
              priceWTax: '0',
              total: '0',
            })
          }
          className="btn btn-outline-primary"
        >
          Add item
        </button>
      </div>
    </fieldset>
  );
};

export default Items;
