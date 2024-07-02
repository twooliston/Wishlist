import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import FormInput from "../forms/FormInput";

const SignUp = () => {
  const [showMatchError, setShowMatchError] = useState(false);
  const [showSizeError, setShowSizeError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "email") setShowEmailError(false);
    if (e.target.name === "password") setShowSizeError(false);
    if (e.target.name === "confirm_password") setShowMatchError(false);
    setForm(prev => ({
      ...form,
      [e.target.name]: e.target.value,
    }))
  }

  const createCollection = async (email, first_name, last_name) => {
    try {
      await addDoc(collection(db, "users"), {
        email,
        first_name,
        last_name,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const signUp = (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setShowSizeError(true);
    } else if (form.confirm_password !== form.password) {
      setShowMatchError(true);
    } else {
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
          createCollection(form.email, form.first_name, form.last_name);
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") setShowEmailError(true);
          else console.log({error});
          
        });
    }
  };

  return (
    <div  className="box">
      <form onSubmit={signUp}>
        <h1>Create Account</h1>
        <FormInput field="first_name" handleChange={handleChange} />
        <FormInput field="last_name" handleChange={handleChange} />
        <FormInput field="email" handleChange={handleChange}  errorMessage="email already in use" showError={showEmailError}/>
        <FormInput field="password" handleChange={handleChange}  errorMessage="passwords need to be more than 6 characters" showError={showSizeError}/>
        <FormInput field="password" placeholder="Confirm your password" name="confirm password" handleChange={handleChange} errorMessage="passwords do not match" showError={showMatchError}/>
        <button type="submit" name="sign-up" className="button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;