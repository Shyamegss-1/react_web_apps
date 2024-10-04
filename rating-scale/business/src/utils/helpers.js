export function formatNumber(number) {
  if (number < 1000) {
    return number.toString();
  } else if (number < 1000000) {
    return (number / 1000).toFixed(1) + "k";
  } else {
    return (number / 1000000).toFixed(1) + "m";
  }
}

export const dateFormater = (input) => {
  const dateObj = new Date(input);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
};

export const reviewColor = (rate) => {
  return +rate >= 4 ? "grn-rate" : +rate === 3 ? "org-rate" : "red-rate";
};
