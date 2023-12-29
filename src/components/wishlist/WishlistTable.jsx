import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import AddWish from "./AddWish";

import "../../styles/wishlist.scss";
import EditWish from "./EditWish";
import WishlistRow from "./WishlistRow";

const WishlistTable = () => {
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
        {loading ? <>Loading your wishlist...</> : (
            <div>
                <h1>Your Wishlist</h1>
                <div className="wishlist-table">
                    {'wishlist' in userData.data && userData.data.wishlist.map((wish, i) => {
                        return <React.Fragment key={i}>
                            {editWish === i ? (
                                <EditWish wish={wish} i={i} userData={userData} setUserData={setUserData} setEditWish={setEditWish}/>
                            ) : (
                                <WishlistRow wish={wish} i={i} userData={userData} setUserData={setUserData} openEdit={openEdit}/>
                            )}
                        </React.Fragment>
                    })}
                    <AddWish userData={userData} setUserData={setUserData} />
                </div>
            </div>
        )}
        </>
    );
};

export default WishlistTable;