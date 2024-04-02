import { Link } from "react-router-dom";

import unavailable from "../../assets/icons/unavailable.png";
import amazon from "../../assets/icons/amazon.png";
import google from "../../assets/icons/google.png";
import web from "../../assets/icons/web.png";

const WishLinks = ({link}) => {
    return (<>
        {link === "" ? (
            <div className="wish-extra wish-link"><img src={unavailable} alt="no link"/></div>
        ) : (
            <Link to={link} className="wish-extra wish-link wish-link-available" target="_blank" rel="noopener noreferrer">
                {link.startsWith("https://www.amazon") || link.startsWith("www.amazon") ?
                    <img src={amazon} alt="amazon" />
                :
                link.startsWith("https://www.google") || link.startsWith("www.google") ?
                    <img src={google} alt="google" />
                : <img src={web} alt="web" />}
            </Link>
        )}
    </>);
  };
  
  export default WishLinks;