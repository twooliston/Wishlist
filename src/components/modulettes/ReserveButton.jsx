import reserve from "../../assets/icons/reserve.png";
import sad from "../../assets/icons/sad.png";

const ReserveButton = ({wish, hasBeenBought, removeWish, i}) => {

    return <button onClick={(e) => removeWish(e, i)} className="reserve-button">
        {'buyer' in wish && wish.buyer !== ""
        ? (hasBeenBought ? (
            <>
                <img src={sad} alt="sad"/>
                <span>Taken</span>
            </>
        ) : (
            <span>Unreserve</span>
        )) : (
            <>
                <img src={reserve} alt="reserve"/>
                <span>Reserve</span>
            </>
        )}
    </button>;
  };
  
  export default ReserveButton;