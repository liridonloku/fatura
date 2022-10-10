import React, { SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import dateFormats, {
  DateFormatType,
} from 'renderer/i18n/dateFormats/dateFormats';
import currencies, { CurrencyTypes } from '../i18n/currencies/currencies';

type Props = {
  currency: CurrencyTypes;
  setCurrency: (value: SetStateAction<CurrencyTypes>) => void;
  dateFormat: DateFormatType;
  setDateFormat: (value: SetStateAction<DateFormatType>) => void;
};

const Settings: React.FC<Props> = ({
  currency,
  setCurrency,
  dateFormat,
  setDateFormat,
}) => {
  const { t, i18n } = useTranslation();

  /**
   * Changes the UI and Invoice language
   * @param e Event from HTMLSelectElement
   * @returns void
   */
  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.currentTarget.value);
    localStorage.setItem('language', e.currentTarget.value);
  };

  const renderCurrencyOptions = () => {
    const currenciesArray = Object.entries(currencies);
    return currenciesArray.map((element) => (
      <option value={element[0]} key={element[1].id}>
        {element[1].name}
      </option>
    ));
  };

  const renderDateFormatOptions = () => {
    const dateFormatsArray = Object.entries(dateFormats);
    return dateFormatsArray.map((element) => (
      <option value={element[0]} key={element[1].id}>
        {element[1].format}
      </option>
    ));
  };

  return (
    <div className="container" style={{ maxWidth: '800px', minHeight: '100%' }}>
      <h1 className="text-center py-3">{t('settings')}</h1>
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
          <option value="de">German</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="tr">turkish</option>
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
            setCurrency(e.currentTarget.value as CurrencyTypes);
            localStorage.setItem('currency', e.currentTarget.value);
          }}
        >
          {renderCurrencyOptions()}
        </select>
      </div>
      <div className="d-flex align-items-center mb-3">
        <label htmlFor="dateFormat" className="col-6 text-center">
          {t('date-format')}
        </label>
        <select
          name="dateFormat"
          id="dateFormat"
          className="form-select"
          defaultValue={dateFormat}
          onChange={(e) => {
            setDateFormat(e.currentTarget.value as DateFormatType);
            localStorage.setItem('dateFormat', e.currentTarget.value);
          }}
        >
          {renderDateFormatOptions()}
        </select>
      </div>
    </div>
  );
};

export default Settings;
