const generateInputDate = (date: Date) => {
  // Conform to the inputs required date format
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`
  }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
};

export default generateInputDate;
