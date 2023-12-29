import React, { useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";


import add_orange from "../../assets/icons/add-orange.png";
import wish_tick from "../../assets/icons/wish-tick.png";


const AddWish = ({userData, setUserData}) => {
    const [addWish, setAddWish] = useState(false);
    const [addForm, setAddForm] = useState({
      name: "",
      price: "",
      link: "",
    });

    const handleAdd = (e) => {
      setAddForm(prev => ({
        ...addForm,
        [e.target.name]: e.target.value,
      }))
    }

    const addToWishlist = async (e) => {
        e.preventDefault();
        let wishlist = [];
        if ('wishlist' in userData.data) {
            wishlist = [
                ...userData.data.wishlist,
                addForm
            ];
        } else {
            wishlist = [addForm];
        }
        setUserData(prev => ({
            ...prev,
            data: {
                wishlist: wishlist,
            },
        }));
        setAddWish(prev => false);
        await updateDoc(doc(db, "users", userData.id), {wishlist: wishlist});
    }

    return (
        <>
            {addWish ? (
                <form onSubmit={addToWishlist}>
                    <div className="wish-row">
                        <div className="wish" target="_blank" rel="noopener noreferrer">
                            <span className="wish-index add-wish-close" onClick={() => setAddWish(prev => false)}><img src={add_orange} alt="close" /></span>
                            <span className="vertical-separator"></span>
                            <span className="wish-name"><input onChange={handleAdd} placeholder="enter the name" name="name" type="text" required/></span>
                            <span className="vertical-separator"></span>
                            <span className="wish-price"><input onChange={handleAdd} placeholder="price" name="price" type="number" required/></span>
                        </div>
                        <div className="wish-extra wish-link-add"><input onChange={handleAdd} placeholder="add a link" name="link" type="text"/></div>
                    </div>
                    <button type="submit" name="addToWishlist" className="add-wish save-wish">
                        <span>save wish</span>
                        <img src={wish_tick} alt="tick" />
                    </button>
                </form>
            ) : (
                <div className="add-wish" onClick={() => setAddWish(prev => true)}>
                    <img src={add_orange} alt="add-wish" />
                    <span>Add a wish</span>
                </div>
            )}
        </>
    )
  }
  
  export default AddWish