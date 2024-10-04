export const dateFormater = (input: Date): string => {
  const dateObj = new Date(input);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
};

//   export const reviewColor = (rate) => {
//     return +rate >= 4 ? "grn-rate" : +rate === 3 ? "org-rate" : "red-rate";
//   };
