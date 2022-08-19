/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { CompanyInfoType } from './companyInfo.types';

type Props = {
  /**
   * Updates app state containing company data
   */
  update: (info: CompanyInfoType) => void;
  /**
   * Company information to display
   */
  company: CompanyInfoType;
};

/**
 * CompanyInfo is the component where the user can see and update information
 * about the company
 */
const CompanyInfo: React.FC<Props> = ({ company, update }) => {
  const navigate = useNavigate();

  // Build form
  const {
    register,
    control,
    handleSubmit,
    // ADD THIS formState: { errors },
  } = useForm<CompanyInfoType>();

  // Use field array for dynamic bank accounts
  const { fields, append, remove } = useFieldArray({
    name: 'bankAccounts',
    control,
  });

  // Fill bank account information on mount
  useEffect(() => {
    company.bankAccounts?.forEach((account) => {
      append(
        {
          bank: account.bank,
          accountNumber: account.accountNumber,
        },
        {
          shouldFocus: false,
        }
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update company info on submit
  const onSubmit: SubmitHandler<CompanyInfoType> = (data) => update(data);

  return (
    <>
      <div className="container text-center">
        <h1>Company Info</h1>
        <button
          className="btn btn-primary mb-3"
          type="button"
          onClick={() => navigate('/')}
        >
          Home
        </button>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register('name')}
            name="name"
            id="name"
            className="form-control mb-2"
            placeholder="Company Name"
            defaultValue={company.name}
          />
          <input
            type="text"
            {...register('id')}
            name="id"
            id="id"
            className="form-control mb-2"
            placeholder="Company Id"
            defaultValue={company.id}
          />
          <input
            type="text"
            {...register('address')}
            name="address"
            id="address"
            className="form-control mb-2"
            placeholder="Company address"
            defaultValue={company.address}
          />
          <input
            type="tel"
            {...register('phone')}
            name="phone"
            id="phone"
            className="form-control mb-2"
            placeholder="Company phone no"
            defaultValue={company.phone}
          />
          {fields.map((item, i) => (
            <div className="input-group mb-3" key={item.id}>
              <span className="input-group-text">Bank name</span>
              <input
                type="text"
                {...register(`bankAccounts.${i}.bank`)}
                className="form-control"
                defaultValue={item.bank}
                placeholder="Bank name"
              />
              <span className="input-group-text">Account no</span>
              <input
                type="text"
                {...register(`bankAccounts.${i}.accountNumber`)}
                className="form-control"
                defaultValue={item.accountNumber}
                placeholder="Account no"
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => remove(i)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-center">
            <button
              type="button"
              onClick={() => append({ bank: '', accountNumber: '' })}
              className="btn btn-outline-primary me-2"
            >
              Add Bank Account
            </button>
            <button type="submit" className="btn btn-success">
              Update Info
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CompanyInfo;
