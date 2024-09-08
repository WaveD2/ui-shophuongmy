import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = ({ message, type = 'error' }) => {
    toast[type](message, {
        position: "top-right",
        autoClose: 3000, // Close the toast after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};


export default showToast;
