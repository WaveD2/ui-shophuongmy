import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { tokenUtils } from '../utils/token';

const ProtectedRoute = ({ element: Component }) => {
    const userLocal = tokenUtils.getInfoLocal('user_info');
    return userLocal && Object.keys(userLocal).length > 0 ? <Component /> : <Navigate to="/sign_in" />;
};

export default ProtectedRoute;
