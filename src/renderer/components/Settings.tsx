import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = unknown;

const Settings: React.FC<Props> = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.currentTarget.value);
    localStorage.setItem('language', e.currentTarget.value);
  };
  return (
    <div className="container" style={{ maxWidth: '800px', minHeight: '100%' }}>
      <h1 className="text-center my-3">{t('settings')}</h1>
      <div className="d-flex align-items-center">
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
    </div>
  );
};

export default Settings;
