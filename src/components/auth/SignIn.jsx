import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";

import red_warning from "../../assets/icons/red-warning.png"
import FormInput from "../forms/FormInput";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        setShowError(false);
      })
      .catch((error) => {
        console.log(error);
        setShowError(true);
      });
  };

  const handleChange = (e) => {
    setForm(prev => ({
      ...form,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <div className="box">
        <form onSubmit={signIn}>
          <h1>Log In to your Account</h1>
          <>{showError ? (
            <div className="error"><img src={red_warning} alt="warning"/><>Wrong email and/or password. Try again or click Forgot password to reset it.</></div>
          ) : (
            <div className="hide-error"></div>
          )}</>
          <FormInput field="email" handleChange={handleChange} />
          <FormInput field="password" handleChange={handleChange} />
          {/* <a href="/forgot-password" className="forgotten-passowrd-text">forgotten password?</a> */}
          <button type="submit" name="sign-in" className="button">Log In</button>
        </form>
      </div>
    </>
  );
};

export default SignIn;