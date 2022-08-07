const generateInputDate = () => {
  // Conform to the inputs required date format
  const date = new Date();
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`
  }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
};

export default generateInputDate;
