import React from "react";
import { Link } from "react-router-dom";

import SignOut from "../utilities/SignOut";
import { useStateContext } from "../context/StateContext";

import "../styles/header.scss";

const Header = () => {
  const { width, menu, setMenu } = useStateContext();

  return (
    <header>
      {width <= 950 ? (
        <>
          <nav onClick={() => setMenu(!menu)}>
            <Link to={"/"}>My Wishlist</Link>
            <Link to={"/groups"}>My Groups</Link>
            <button onClick={SignOut}>Log out</button>
          </nav>
          <button className="menu-button" onClick={() => setMenu(!menu)}>{menu ? "Close" : "Menu"}</button>
        </>
      ) : (
        <>
          <Link to={"/"} className="shop-title">Make a Wish</Link>
          <nav>
            <Link to={"/"}>My Wishlist</Link>
            <Link to={"/groups"}>My Groups</Link>
            <button onClick={SignOut}>Log out</button>{/* <img src={logout} alt="logout"/> */}
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
