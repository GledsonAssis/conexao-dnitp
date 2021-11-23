import React from "react";
import { toast } from "react-toastify";

export enum typesToast {
  TOAST_DEFAULT = 'default',
  TOAST_ERROR = 'error',
  TOAST_SUCCESS = 'success',
  TOAST_WARNING = 'warning'
}

export const ToastMessage = ({ type, message }) => toast[type](message);

export default ToastMessage;

