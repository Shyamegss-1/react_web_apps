export const dateFormater = (input) => {
  const dateObj = new Date(input);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
};
