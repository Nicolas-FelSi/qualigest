import { toast } from "react-toastify";

const showToast = (messages, type = "error") => {
    const notify = Array.isArray(messages) ? messages : [messages];
    notify.forEach((msg) => toast[type](msg));
};

export default showToast;