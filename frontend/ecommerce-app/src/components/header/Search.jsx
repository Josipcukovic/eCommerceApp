import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/ecommerce.png";
import axios from "axios";

const Search = ({ cartItem }) => {
  window.addEventListener("scroll", () => {
    const search = document.querySelector(".search");
    search.classList.toggle("search--active", window.scrollY > 100);
  });

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
            <img src={logo} alt="" />
          </div>

          <div className="search__box f_flex">
            <i className="fa fa-search"></i>
            <input type="text" placeholder="Search" />
            <span>All Categories</span>
          </div>

          <div className="icon f_flex width">
            <Link to="/" onClick={handleLogout}>
              <i className="fa fa-user icon-circle"></i>
            </Link>
            <div className="cart">
              <Link to="/cart">
                <i className="fa fa-shopping-bag icon-circle"></i>
                <span>{cartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
