import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import FormInput from "../forms/FormInput";

const SignUp = () => {
  const [showError, setShowError] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "confirm_password") setShowError(false);
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
    if (form.confirm_password !== form.password) {
      setShowError(true);
    } else {
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
          createCollection(form.email, form.first_name, form.last_name);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div  className="box">
      <form onSubmit={signUp}>
        <h1>Create Account</h1>
        <FormInput field="first_name" handleChange={handleChange} />
        <FormInput field="last_name" handleChange={handleChange} />
        <FormInput field="email" handleChange={handleChange} />
        <FormInput field="password" handleChange={handleChange} />
        <FormInput field="password" placeholder="Confirm your password" name="confirm password" handleChange={handleChange} errorMessage="passwords do not match" showError={showError}/>
        <button type="submit" name="sign-up" className="button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;