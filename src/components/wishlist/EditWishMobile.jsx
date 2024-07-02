import React, { useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

import add_orange from "../../assets/icons/add-orange.png";
import wish_tick from "../../assets/icons/wish-tick.png";

const EditWish = ({wish, i, setEditWish, userData, setUserData}) => {
    const [editForm, setEditForm] = useState(userData.data.wishlist[i]);

    const handleEdit = (e) => {
      setEditForm(prev => ({
        ...editForm,
        [e.target.name]: e.target.value,
      }))
    }

    const editWishlist = async (e, index) => {
        e.preventDefault();
        let wishlist = [...userData.data.wishlist];
        wishlist[index] = editForm;
        setUserData(prev => ({
            ...prev,
            data: {
                wishlist: wishlist,
            },
        }));
        await updateDoc(doc(db, "users", userData.id), {wishlist: wishlist});
        setEditWish(prev => null);
    }

    return (
        <form className="form-mobile" onSubmit={(e) => editWishlist(e, i)} key={i}>
            <div className="wish-index add-wish-close" onClick={() => setEditWish(prev => null)}><img src={add_orange} alt="close" /></div>
            <input onChange={handleEdit} placeholder="enter your wish (don't forget size, colour, etc..)" name="name" type="text" defaultValue={wish.name} required/>
            <input onChange={handleEdit} placeholder="price" name="price" type="number" defaultValue={wish.price} required/>
            <input onChange={handleEdit} placeholder="add a link" name="link" defaultValue={wish.link} type="text"/>
            <button type="submit" name="editWishlist" className="add-wish save-wish">
                <span>save changes</span>
                <img src={wish_tick} alt="tick" />
            </button>
        </form>
    )
  }
  
  export default EditWish