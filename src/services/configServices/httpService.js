import axios from "axios";
import { toastErrorMessage } from "../../utils/ToastMessageComponent/ToastMessageComponent";


axios.defaults.headers.post["Content-Type"] = "application/json";


axios.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedErrors) {
    toastErrorMessage("There was a problem with the server");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
