import { useContext } from 'react'
import React from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../components/contexts/authContext';

export default function ProtectedAuthRoute({children}) {
  const {UserToken} = useContext(AuthContext);
  const isLoggedIn = !!UserToken
  return !isLoggedIn  ? children : <Navigate to={"/"}/>
  
}
