import { toast } from "react-toastify";

export function customToast(message, type = "default") {
  if (type === "success") toast.success(message);
  if (type === "error") toast.error(message);
  if (type === "default") toast(message);
}
