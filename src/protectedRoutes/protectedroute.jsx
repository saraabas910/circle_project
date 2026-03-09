
import  {Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../components/contexts/authContext';


export default function Protectedroute({children}) {
  const {UserToken} = useContext(AuthContext);  

    const isloggedin = !!UserToken

  return isloggedin ? children : <Navigate to={"/signin"} />;

 
}

