import { toast, ToastOptions, ToastPosition } from "react-toastify";

//export type ToastType = "success" | "error" | "info" | "warning";
export enum ToastType {
    SUCCESS = "success",
    ERROR = "error",
    INFO = "info",
    WARNING = "warning",
}

const TOP_LEFT: ToastPosition = "top-left";
const TOP_RIGHT: ToastPosition = "top-right";
const TOP_CENTER: ToastPosition = "top-center";
const BOTTOM_LEFT: ToastPosition = "bottom-left";
const BOTTOM_RIGHT: ToastPosition = "bottom-right";
const BOTTOM_CENTER: ToastPosition = "bottom-center";
export const toastPositions = {
    TOP_LEFT,
    TOP_RIGHT,
    TOP_CENTER,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    BOTTOM_CENTER,
  };




export const showToast = (
  message: string |null,
  type: ToastType = ToastType.INFO,
  options?: ToastOptions
): void => {
  const baseOptions: ToastOptions = {
    position: toastPositions.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  };

  if (!message) return;

  switch (type) {
    case ToastType.SUCCESS:
      toast.success(message, baseOptions);
      break;
    case ToastType.ERROR:
      toast.error(message, baseOptions);
      break;
    case ToastType.INFO:
      toast.info(message, baseOptions);
      break;
    case ToastType.WARNING:
      toast.warn(message, baseOptions);
      break;
    default:
      toast(message, baseOptions);
      break;
  }
};
