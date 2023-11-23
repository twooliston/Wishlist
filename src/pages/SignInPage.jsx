import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import  { Navigate } from 'react-router-dom'

import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";

import "../styles/sign-in.scss";

function SignInPage() {
    const [authUser, setAuthUser] = useState(null);
    const [signIn, setSignIn] = useState(true);
    
    useEffect(() => {
      const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthUser(user);
        } else {
          setAuthUser(null);
        }
      });
  
      return () => {
        listen();
      };
    }, []);

    const handleClick = () => {
      setSignIn(!signIn);
    }

  return (
    <div>
      {authUser ? (
        <Navigate to='/'  />
      ):(
        <>
          <div className="flex">
            <div className="sign-in">
              {signIn ? (
                <>
                  <SignIn />
                  <button onClick={handleClick} className="sign-in-change">Create an account</button>
                </>
                ) : (
                <>
                  <SignUp />
                  <button onClick={handleClick} className="sign-in-change">Log In</button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SignInPage;
