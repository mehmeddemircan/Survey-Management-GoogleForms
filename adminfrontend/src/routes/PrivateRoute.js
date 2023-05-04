import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Custom PrivateRoute component
const PrivateRoute = ({ children }) => {

  const auth = useSelector((state) => state.auth)
  const {loading} = useSelector((state) => state.auth)

  // Render loading state if authentication status is still being determined
 
  if (auth.authenticate) {
    // Render the protected page if user is authenticated
    return  children;
  } else {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" replace   />;
  }
};
export default PrivateRoute