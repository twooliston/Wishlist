import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from 'react-router-dom';

import unavailable from "../../assets/icons/unavailable.png";

const PersonWishlist = ({userEmail, person, buyersData, setGroupWishlistData}) => {

    const removeWish = async (e, i) => {
        let newWishlist = [...person.data.wishlist];
        if ('buyer' in person.data.wishlist[i] && person.data.wishlist[i].buyer !== "") {
            newWishlist[i].buyer = "";
        } else {
            newWishlist[i].buyer = userEmail;
        }
        setGroupWishlistData(prev => ({
                id: prev.id,
                data: {
                    ...prev.data,
                    wishlist: [
                        ...newWishlist,
                    ]
                }
        }));
        await updateDoc(doc(db, "users", person.id), {wishlist: newWishlist});
    }

    return (
        <>
            <h1>{person.data.name}'s Wishlist</h1>
            <div className="outside-view">
                <div className="wishlist-table">
                    {person.data.wishlist.map((wish, i) => {
                        return <div className={'buyer' in wish && wish.buyer !== "" ? "wish-row crossed-out" : "wish-row"} key={i}>
                            <div className={buyersData[i] ? "wish not-buyable" : "wish"}>
                                <span className="wish-index">{i + 1}</span>
                                <span className="vertical-separator"></span>
                                <span className="wish-name">{wish.name}</span>
                                <span className="vertical-separator"></span>
                                <span className="wish-price">£{wish.price}</span>
                            </div>
                            {wish.link === "" ? (
                                <div className={buyersData[i] ? "wish-extra wish-link not-buyable" : "wish-extra wish-link"}><img src={unavailable} alt="no link"/></div>
                            ) : (
                                <Link to={wish.link} className={buyersData[i] ? "wish-extra wish-link wish-link-available not-buyable" : "wish-extra wish-link wish-link-available"} target="_blank" rel="noopener noreferrer">link</Link>
                            )}
                        </div>
                    })}
                </div>
                <div className="wishlist-table remove-choice">
                    {person.data.wishlist.map((wish, i) => {
                        return <div className="wish-row" key={i}>
                            <div className={buyersData[i] ? "wish-extra select-wish not-buyable" : "wish-extra select-wish"}>
                                <input type="checkbox" name={i} defaultChecked={'buyer' in wish && wish.buyer !== ""} onClick={(e) => removeWish(e, i)}/>
                                <label>Remove choice for others</label>
                            </div>
                        </div>
                    })}

                </div>
            </div>
        </>
    )
  }
  
  export default PersonWishlist