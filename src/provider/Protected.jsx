import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
    const user = useSelector((state) => state?.user?.info_user);
    return Object.keys(user).length > 0 ? <Component /> : <Navigate to="/sign_in" />;
};

export default ProtectedRoute;
