import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

import PriceRange from "../modulettes/PriceRange";
import WishLinks from "../modulettes/WishLinks";

import reserve from "../../assets/icons/reserve.png";

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
                        return <div
                                    className={'buyer' in wish && wish.buyer !== ""
                                        ? (buyersData[i] ? "wish-row-mobile crossed-out" : "wish-row-mobile wish-reserved")
                                        : "wish-row-mobile"
                                    }
                                    key={i}
                                >
                            <div className="reserve-box">
                                {'buyer' in wish && wish.buyer !== "" ?  "Reserved" : "Available"}
                            </div>
                            <div className={buyersData[i] ? "buyer-mobile not-buyable" : "buyer-mobile"}>
                                <div>{wish.name}</div>
                                <div className="buyer-aux">
                                    <PriceRange price={wish.price} />
                                    <WishLinks link={wish.link} />
                                    <button onClick={(e) => removeWish(e, i)}>
                                        <img src={reserve} alt="reserve"/>
                                        {'buyer' in wish && wish.buyer !== ""
                                        ? (buyersData[i] ? <span>Taken</span> : <span>Unreserve</span>)
                                        : <span>Reserve</span>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
  }
  
  export default PersonWishlist