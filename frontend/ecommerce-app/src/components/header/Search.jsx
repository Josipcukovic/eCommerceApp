import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/ecommerce.png";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Search = ({ cartItem }) => {
  const { currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    axios.get("http://localhost:3003/auth/logout", {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="search__logo width ">
            <Link to="/home">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          {currentUser && currentUser.role === "user" && (
            <div className="search__box f_flex">
              <i className="fa fa-search"></i>
              <input type="text" placeholder="Search" />
              <span>All Categories</span>
            </div>
          )}

          <div className="icon f_flex width">
            <Link to="/" onClick={handleLogout}>
              <i className="fa fa-sign-out icon-circle"></i>
            </Link>
            {currentUser && currentUser.role === "user" && (
              <div className="cart">
                <Link to="/cart">
                  <i className="fa fa-shopping-bag icon-circle"></i>
                  <span>{cartItem.length}</span>
                </Link>
              </div>
            )}
            {currentUser && currentUser.role === "admin" && (
              <div className="cart">
                <Link to="/orders">
                  <i className="fa fa-shopping-bag icon-circle"></i>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
