import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, collection, getDocs, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import bin from "../assets/icons/bin.png";
import edit from "../assets/icons/edit.png";
// import add from "../assets/icons/add.png";
import add_orange from "../assets/icons/add-orange.png";
// import tick from "../assets/icons/tick.png";
import wish_tick from "../assets/icons/wish-tick.png";
// import cross from "../assets/icons/cross.png";
import unavailable from "../assets/icons/unavailable.png";

import "../styles/wishlist.scss";

const Wishlist = () => {
    const [addWish, setAddWish] = useState(false);
    const [editWish, setEditWish] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addForm, setAddForm] = useState({
      name: "",
      price: "",
      link: "",
    });
    const [editForm, setEditForm] = useState({
      name: "",
      price: "",
      link: "",
    });

    const openEdit = (i) => {
        setEditWish(prev => i);
        setEditForm(prev => userData.data.wishlist[i]);
    }

    const handleAdd = (e) => {
      setAddForm(prev => ({
        ...addForm,
        [e.target.name]: e.target.value,
      }))
    }

    const handleEdit = (e) => {
      setEditForm(prev => ({
        ...editForm,
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

    const deleteWish = async (e, index) => {
        e.preventDefault();
        let wishlist = [...userData.data.wishlist];
        wishlist.splice(index, 1);
        setUserData(prev => ({
            ...prev,
            data: {
                wishlist: wishlist,
            },
        }));
        await updateDoc(doc(db, "users", userData.id), {wishlist: wishlist});
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
                                <form onSubmit={(e) => editWishlist(e, i)} key={i}>
                                    <div className="wish-row">
                                        <div className="wish" target="_blank" rel="noopener noreferrer">
                                            <span className="wish-index add-wish-close" onClick={() => setEditWish(prev => null)}><img src={add_orange} alt="close" /></span>
                                            <span className="vertical-separator"></span>
                                            <span className="wish-name"><input onChange={handleEdit} placeholder="enter the name" name="name" type="text" defaultValue={wish.name} required/></span>
                                            <span className="vertical-separator"></span>
                                            <span className="wish-price"><input onChange={handleEdit} placeholder="price" name="price" type="number" defaultValue={wish.price} required/></span>
                                        </div>
                                        <div className="wish-extra wish-link-add"><input onChange={handleEdit} placeholder="add a link" name="link" defaultValue={wish.link} type="text"/></div>
                                    </div>
                                    <button type="submit" name="editWishlist" className="add-wish save-wish">
                                        <span>save changes</span>
                                        <img src={wish_tick} alt="tick" />
                                    </button>
                                </form>
                            ) : (
                                <div className="wish-row" key={i}>
                                    <div className="wish">
                                        <span className="wish-index">{i + 1}</span>
                                        <span className="vertical-separator"></span>
                                        <span className="wish-name">{wish.name}</span>
                                        <span className="vertical-separator"></span>
                                        <span className="wish-price">£{wish.price}</span>
                                    </div>
                                    {wish.link === "" ? (
                                        <div className="wish-extra wish-link"><img src={unavailable} alt="no link"/></div>
                                    ) : (
                                        <Link to={wish.link} className="wish-extra wish-link wish-link-available" target="_blank" rel="noopener noreferrer">link</Link>
                                    )}
                                    <div className="wish-extra">
                                        <span className="wish-edit" onClick={() => openEdit(i)}><img src={edit} alt="edit"/></span>
                                        <span className="vertical-separator"></span>
                                        <span className="wish-delete" onClick={(e) => deleteWish(e, i)}><img src={bin} alt="bin"/></span>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    })}
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
                </div>
            </div>
        )}
        </>
    );
};

export default Wishlist;
