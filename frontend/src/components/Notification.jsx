import { Bounce, toast } from "react-toastify";

const notify = (msg, type) => {
  toast(msg, {
    type: type,
    className: "custom-toast",
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    closeButton: true,
    transition: Bounce,
  });
};

export default notify;
