import { faker } from "@faker-js/faker";
import { sample } from "lodash";

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  "Jacket Solera denim",
  "Sleeveless cardigan Chiapello",
  "Jacket Thelma",
  "Sweat Chebbi",
  "Sweat Jerezarty",
  "T-shirt Austin",
  "Body Winona",
  "Pants Emile",
];

// ----------------------------------------------------------------------

const products = [...Array(8)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: `${process.env.PUBLIC_URL}/assets/images/products/product_${setIndex}.webp`,
    name: PRODUCT_NAME[index],
    price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
    priceSale:
      setIndex % 3
        ? null
        : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),

    status: sample(["sale", "", ""]),
  };
});

export default products;
