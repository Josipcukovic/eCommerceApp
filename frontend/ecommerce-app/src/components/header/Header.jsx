import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import "../../styles/index.min.css";

const Header = ({ cartItem }) => {
  return (
    <>
      <Search cartItem={cartItem} />
      <Navbar />
    </>
  );
};

export default Header;
