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
        resetForm();
    }

    const resetForm = () => {
        setAddForm({name: "",price: "",link: ""});
    }

    const cancelAddForm = () => {
        setAddWish(prev => false);
        resetForm();
    }

    return (
        <>
            {addWish ? (
                <form className="form-mobile" onSubmit={addToWishlist}>
                    <span className="wish-index add-wish-close" onClick={cancelAddForm}><img src={add_orange} alt="close" /></span>
                    <input onChange={handleAdd} placeholder="enter your wish (don't forget size, colour, etc..)" name="name" type="text" required/>
                    <input onChange={handleAdd} placeholder="price" name="price" type="number" required/>
                    <input onChange={handleAdd} placeholder="add a link" name="link" type="text"/>
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