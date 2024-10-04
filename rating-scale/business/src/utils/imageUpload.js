import cryptoJs from "crypto-js";

const getHash = () => {
  return cryptoJs.MD5("456456456456456456").toString();
};

export const ImageUploadService = async (object) => {
  let hashCode = getHash();

  const e = await fetch(
    `https://rating-scale.com/media/api.php?api_key=${hashCode}`,
    {
      method: "POST",
      body: object,
    }
  );

  const e_1 = e.json();

  return e_1;
};
