/**
 * Available date formats
 */
const dateFormats = {
  'de-De': { format: 'd.m.yyyy', id: 1 },
  'en-GB': { format: 'dd/mm/yyyy', id: 2 },
  'en-US': { format: 'm/d/yyyy', id: 3 },
  'fr-CH': { format: 'dd.mm.yyyy', id: 4 },
  'fr-CA': { format: 'yyyy-mm-dd', id: 5 },
  'ja-JP': { format: 'yyyy/m/d', id: 6 },
};

export type DateFormatType = keyof typeof dateFormats;

export default dateFormats;
