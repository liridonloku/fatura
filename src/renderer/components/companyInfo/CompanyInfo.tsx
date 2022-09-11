/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { CompanyInfoType } from './companyInfo.types';
import generateLogoName from '../../utils/generateInvoiceNo';

type Props = {
  /**
   * Updates app state containing company data
   */
  update: (info: CompanyInfoType) => void;
  /**
   * Company information to display
   */
  company: CompanyInfoType;
  /**
   * Updates app state containing the logo
   */
  updateLogo: (path: string) => void;
  /**
   * The company logo source
   */
  logo: string;
};

/**
 * CompanyInfo is the component where the user can see and update information
 * about the company
 */
const CompanyInfo: React.FC<Props> = ({
  company,
  update,
  updateLogo,
  logo,
}) => {
  const navigate = useNavigate();

  const [localLogo, setLocalLogo] = useState<null | File>(null);
  const [logosrc, setlogosrc] = useState('');

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

  // Set logo to display and prepare for upload
  const onImageInput = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    if (file) {
      const reader = new FileReader();
      setLocalLogo(file);
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          setlogosrc(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadLogo = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Exit if no new logo is chosen
    if (!localLogo) return;

    // Get uploaded image extension
    const extension = localLogo?.type.slice(
      localLogo.type.lastIndexOf('/') + 1
    );

    /**
     * Each time a logo is uploaded, it gets assigned a different name and the
     * old logo gets deleted. The previous solution was to save the file with the
     * same name so it would get overwritten, but it caused problems because of
     * browser cache not reloading the image thinking it hasn't changed.
     */
    const newLogoName = generateLogoName();

    try {
      const logoPath = await window.electron.ipcRenderer.invoke('upload-logo', [
        localLogo?.path,
        extension,
        newLogoName,
        logo,
      ]);
      const atomPath = `atom:///${logoPath}`; // Use custom protocol 'atom' to be able to access local files
      updateLogo(atomPath);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }

    // Remove focus from button
    if (e.currentTarget) e.currentTarget.blur();
  };

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
      <div className="container mb-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-3">
            <span className="input-group-text cSpan">Name</span>
            <input
              type="text"
              {...register('name')}
              name="name"
              id="name"
              className="form-control"
              placeholder="Company Name"
              defaultValue={company.name}
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text cSpan">Id</span>
            <input
              type="text"
              {...register('id')}
              name="id"
              id="id"
              className="form-control"
              placeholder="Company Id"
              defaultValue={company.id}
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text cSpan">Address</span>
            <input
              type="text"
              {...register('address')}
              name="address"
              id="address"
              className="form-control"
              placeholder="Company address"
              defaultValue={company.address}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text cSpan">Phone</span>
            <input
              type="tel"
              {...register('phone')}
              name="phone"
              id="phone"
              className="form-control"
              placeholder="Company phone no"
              defaultValue={company.phone}
            />
          </div>
          <div className="text-center mb-3">
            <h2>Bank Accounts</h2>
          </div>
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
      <div className="container mb-3 text-center">
        <h2>Logo</h2>
      </div>
      <div
        className="container d-flex gap-2 mb-4"
        style={{ minHeight: '200px' }}
      >
        <div className="flex-grow-1 d-flex flex-column justify-content-center">
          <input
            type="file"
            accept="image/*"
            name="logo"
            id="logo"
            className="form-control mb-3"
            onChange={(e) => onImageInput(e)}
          />
          <button
            type="button"
            className="btn btn-outline-primary w-100"
            onClick={(e) => uploadLogo(e)}
          >
            Update Logo
          </button>
        </div>
        <div className="card w-50">
          <img src={logosrc || logo} alt="" className="card-img-top h-100" />
        </div>
      </div>
    </>
  );
};

export default CompanyInfo;
