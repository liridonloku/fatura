/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { useTranslation } from 'react-i18next';
import { InvoiceType } from './invoice.types';

type Props = {
  register: UseFormRegister<InvoiceType>;
};

const CommentBox: React.FC<Props> = ({ register }) => {
  const { t } = useTranslation();

  return (
    <fieldset className="border p-3 mb-2">
      <legend className="mb-0">{t('additional-information')}</legend>
      <div className="row g-3">
        <textarea
          id="comment"
          {...register('additionalInfo')}
          rows={3}
          className="form-control"
        />
      </div>
    </fieldset>
  );
};

export default CommentBox;
