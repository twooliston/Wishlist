import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

import bin from "../../assets/icons/bin.png";
import edit from "../../assets/icons/edit.png";
import unavailable from "../../assets/icons/unavailable.png";

const WishlistRow = ({wish, i, userData, setUserData, openEdit}) => {

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

    return (
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
    )
  }
  
  export default WishlistRow