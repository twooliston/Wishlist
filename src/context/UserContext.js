import React, { createContext, useContext, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Context = createContext();

export const UserContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  
  const getCollection = async () => {
    const querySnapshot = await getDocs(collection(db, "customers"));
    querySnapshot.forEach((doc) => {
      if (auth.currentUser.email === doc.data().email) {
        setUserData(doc.data());
      }
    });
  }

  getCollection();

    return (
    <Context.Provider
      value={{
        userData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUserContext = () => useContext(Context);