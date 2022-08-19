/**
 * Generates a date in format required by the html input element
 * @param date The date to be converted
 * @returns Date in 2022-01-01 format
 */
const generateInputDate = (date: Date) => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`
  }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
};

export default generateInputDate;
