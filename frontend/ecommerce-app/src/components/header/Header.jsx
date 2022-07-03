import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import "../../styles/index.min.css";

const Header = () => {
  return (
    <>
      <Search />
      <Navbar />
    </>
  );
};

export default Header;
