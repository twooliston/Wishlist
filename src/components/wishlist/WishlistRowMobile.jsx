import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";

import PriceRange from "../modulettes/PriceRange";
import WishLinks from "../modulettes/WishLinks";

import edit from "../../assets/icons/edit.png";
import close from "../../assets/icons/close.png";

import "../../styles/mobile-only.scss";

const WishlistRow = ({wish, i, userData, setUserData, openEdit}) => {
    const [popUp, setPopUp] = useState(false);

    const deleteWish = async (e, index) => {
        setPopUp(prev => false);
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

    const showPopUp = () => {
        setPopUp(prev => !popUp);
    }

    return (
        <div className="wish-row" key={i}>
            <Link to={wish.link} className="wish-name">{wish.name}</Link>
            <div className="wish-moblie-aux">
                <div className="wish-edit-mobile" onClick={showPopUp}>{popUp ? <img className="close" src={close} alt="close"/> : <img src={edit} alt="edit"/>}</div>
                {popUp ? (
                    <div className="edit-popup">
                        <div onClick={() => openEdit(i)}>edit</div>
                        <div onClick={(e) => deleteWish(e, i)}>delete</div>
                    </div>
                ) : (
                    <>
                        <WishLinks link={wish.link} />
                        <PriceRange price={wish.price}/>
                    </>
                )}
            </div>
        </div>
    )
  }
  
  export default WishlistRow