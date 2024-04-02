import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { useStateContext } from "../../context/StateContext";

import AddWish from "./AddWish";
import AddWishMobile from "./AddWishMobile";
import EditWish from "./EditWish";
import EditWishMobile from "./EditWishMobile";
import WishlistRow from "./WishlistRow";
import WishlistRowMobile from "./WishlistRowMobile";

import LoadingAnimation from "../modulettes/LoadingAnimation";

import "../../styles/wishlist.scss";

const WishlistTable = () => {
    const { width } = useStateContext();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editWish, setEditWish] = useState(null);

    const openEdit = (i) => {
        setEditWish(prev => i);
    }
  
    useEffect(() => {
        const getCollection = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
              if (auth.currentUser.email === doc.data().email) {
                setUserData({id: doc.id, data: doc.data()});
                setLoading(false);
              }
            });
          }
  
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
            getCollection(user.email);
            }
        });
    
        return () => {
            listen();
        };
    }, []);

    return (
        <>
        {loading ? <LoadingAnimation /> : (
            <div>
                <h1>Your Wishlist</h1>
                <div className="wishlist-table">
                    {'wishlist' in userData.data && userData.data.wishlist.map((wish, i) => {
                        return <React.Fragment key={i}>
                            {editWish === i ? (
                                <>
                                    {width <= 1050 ? (
                                        <EditWishMobile wish={wish} i={i} userData={userData} setUserData={setUserData} setEditWish={setEditWish}/>
                                    ) : (
                                        <EditWish wish={wish} i={i} userData={userData} setUserData={setUserData} setEditWish={setEditWish}/>
                                    )}
                                </>
                            ) : (
                                <>
                                    {width <= 1050 ? (
                                        <WishlistRowMobile wish={wish} i={i} userData={userData} setUserData={setUserData} openEdit={openEdit}/>
                                    ) : (
                                        <WishlistRow wish={wish} i={i} userData={userData} setUserData={setUserData} openEdit={openEdit}/>
                                    )}
                                </>
                            )}
                        </React.Fragment>
                    })}
                    {width <= 1050 ? (
                        <AddWishMobile userData={userData} setUserData={setUserData} />
                    ) : (
                        <AddWish userData={userData} setUserData={setUserData} />
                    )}
                </div>
            </div>
        )}
        </>
    );
};

export default WishlistTable;