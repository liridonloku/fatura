/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  FieldArrayMethodProps,
  FieldArrayWithId,
} from 'react-hook-form/dist/types/fieldArray';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { InvoiceType, ItemType } from './invoice.types';

type Props = {
  fields: FieldArrayWithId<InvoiceType, 'items', 'id'>[];
  register: UseFormRegister<InvoiceType>;
  remove: (index?: number | number[] | undefined) => void;
  append: (
    value: Partial<ItemType> | Partial<ItemType>[],
    options?: FieldArrayMethodProps | undefined
  ) => void;
};

const Items: React.FC<Props> = ({ fields, register, remove, append }) => {
  return (
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
        <div className="row m-0 mb-2" key={item.id}>
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
      <div className="text-center">
        <button
          type="button"
          onClick={() =>
            append({
              description: '',
              quantity: 0,
              price: 0,
              tax: 0,
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
