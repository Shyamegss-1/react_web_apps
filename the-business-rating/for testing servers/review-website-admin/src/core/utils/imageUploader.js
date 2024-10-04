import cryptoJs from "crypto-js";
import toast from "react-hot-toast";

const getHash = () => {
  const currentDate = new Date();

  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = currentDate.toLocaleString("en-GB", options);

  return cryptoJs.MD5("456456456456456456").toString();
};

export const ImageUploadService = async (object) => {
  let hashCode = getHash();

  const toastid = toast.loading("wait...");
  const e = await fetch(
    `https://thetestingserver.com/review-web-s/api.php?api_key=${hashCode}`,
    {
      method: "POST",
      body: object,
    }
  );

  const e_1 = e.json();
  toast.dismiss(toastid);

  return e_1;
};
