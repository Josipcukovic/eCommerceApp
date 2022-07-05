import React from "react";
import GoodDeals from "../components/goodDeals/GoodDeals";
import Home from "../components/main/Home";

const Pages = ({ cartItem, addToCart }) => {
  return (
    <>
      <Home cartItem={cartItem} />
      <GoodDeals addToCart={addToCart} />
    </>
  );
};

export default Pages;
