import * as cryptoJs from "crypto-js";
import { toast } from "sonner";

const getHash = (): string => {
  return cryptoJs.MD5("456456456456456456").toString();
};

export const ImageUploadService = async (object: FormData): Promise<object> => {
  const hashCode: string = getHash();

  const toastId = toast.loading("wait...");

  try {
    const response = await fetch(
      `https://rating-scale.com/media/api.php?api_key=${hashCode}`,
      {
        method: "POST",
        body: object,
      }
    );

    const responseData = await response.json();
    toast.dismiss(toastId);

    return responseData;
  } catch (error) {
    console.error("Error in ImageUploadService:", error);
    toast.dismiss(toastId);
    throw error;
  }
};
