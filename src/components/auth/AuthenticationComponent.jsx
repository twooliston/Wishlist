import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from 'react-router-dom'

const AuthenticationComponent = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [authUser, setAuthUser] = useState(null);
    
    useEffect(() => {
      const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthUser(prev => user);
        } else {
          setAuthUser(prev => null);
        }
        setLoading(prev => false);
      });
  
      return () => {
        listen();
      };
    }, []);

  return (
    <>
      {loading ? <>Loading...</> : (
        <>
          {authUser ? (
            <>{children}</>
          ):(
            <Navigate to={"/login"}  />
          )}
        </>
      )}
    </>
  )
}

export default AuthenticationComponent