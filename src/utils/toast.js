// toast.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = ({ message, type = 'error' }) => {
    toast[type](message, {
        position: "top-right",
        autoClose: 5000, // Close the toast after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};
// used

// showToast({message: "Password must be at least 8 characters long", type : 'error'});


export default showToast;
