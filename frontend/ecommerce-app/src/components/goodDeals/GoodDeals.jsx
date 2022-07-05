import React from "react";
import DealCard from "./DealCard";

const GoodDeals = ({ addToCart }) => {
  return (
    <>
      <section className="flash background">
        <div className="container">
          <div className="heading f_flex">
            <i className="fa fa-bolt"></i>
            <h1>Good Deals</h1>
          </div>
          <DealCard addToCart={addToCart} />
        </div>
      </section>
    </>
  );
};

export default GoodDeals;
