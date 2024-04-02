import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useStateContext } from "../../context/StateContext";

import PriceRange from "../modulettes/PriceRange";
import WishLinks from "../modulettes/WishLinks";
import ReserveButton from "../modulettes/ReserveButton";

const PersonWishlist = ({userEmail, person, buyersData, setGroupWishlistData}) => {
    const { width } = useStateContext();

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
                                ? (buyersData[i] ? "wish-row not-buyable" : "wish-row wish-reserved")
                                : "wish-row"
                            }
                            key={i}
                        >
                            {width <= 1050 ? <>
                                <div className="reserve-box">
                                    {'buyer' in wish && wish.buyer !== "" ?  "Reserved" : "Available"}
                                </div>
                                <div className={buyersData[i] ? "buyer-mobile" : "buyer-mobile"}>
                                    <div>{wish.name}</div>
                                    <div className="buyer-aux">
                                        <PriceRange price={wish.price} />
                                        <WishLinks link={wish.link} />
                                        <ReserveButton wish={wish} hasBeenBought={buyersData[i]} removeWish={removeWish} i={i} />
                                    </div>
                                </div>
                            </> : <>
                                <div className={buyersData[i] ? "wish" : "wish"}>
                                    <span className="wish-index">{i + 1}</span>
                                    <span className="wish-name">{wish.name}</span>
                                    <PriceRange price={wish.price} />
                                </div>
                                <WishLinks link={wish.link} />
                                <ReserveButton wish={wish} hasBeenBought={buyersData[i]} removeWish={removeWish} i={i} />
                            </>}
                        </div>
                    })}
                </div>
            </div>
        </>
    )
  }
  
  export default PersonWishlist