import React, { SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  currency: string;
  setCurrency: (value: SetStateAction<string>) => void;
};

const Settings: React.FC<Props> = ({ currency, setCurrency }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.currentTarget.value);
    localStorage.setItem('language', e.currentTarget.value);
  };
  return (
    <div className="container" style={{ maxWidth: '800px', minHeight: '100%' }}>
      <h1 className="text-center my-3">{t('settings')}</h1>
      <div className="d-flex align-items-center mb-3">
        <label htmlFor="language" className="col-6 text-center">
          {t('language')}
        </label>
        <select
          name="language"
          id="language"
          className="form-select"
          defaultValue={i18n.language}
          onChange={(e) => changeLanguage(e)}
        >
          <option value="en">English</option>
          <option value="al">Shqip</option>
        </select>
      </div>
      <div className="d-flex align-items-center mb-3">
        <label htmlFor="currency" className="col-6 text-center">
          {t('currency')}
        </label>
        <select
          name="currency"
          id="currency"
          className="form-select"
          defaultValue={currency}
          onChange={(e) => {
            setCurrency(e.currentTarget.value);
            localStorage.setItem('currency', e.currentTarget.value);
          }}
        >
          <option value="$">$</option>
          <option value="€">€</option>
          <option value="£">£</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;