import React from "react";
import GoodDeals from "../components/goodDeals/GoodDeals";
import Home from "../components/main/Home";

const Pages = ({ productItems, cartItem, addToCart }) => {
  return (
    <>
      <Home cartItem={cartItem} />
      <GoodDeals productItems={productItems} addToCart={addToCart} />
    </>
  );
};

export default Pages;
