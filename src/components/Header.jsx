import React from "react";
import { Link } from "react-router-dom";

import SignOut from "../utilities/SignOut";

import "../styles/header.scss";

const Header = () => {

  return (
    <header>
      <Link to={"/"} className="shop-title">Make a Wish</Link>
      <nav>
        <Link to={"/"}>My Wishlist</Link>
        <Link to={"/groups"}>My Groups</Link>
        <button onClick={SignOut}>Way out</button>{/* <img src={logout} alt="logout"/> */}
      </nav>
    </header>
  );
};

export default Header;
