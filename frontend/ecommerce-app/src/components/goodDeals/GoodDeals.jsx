import React from "react";
import DealCard from "./DealCard";

const GoodDeals = ({ productItems, addToCart }) => {
  return (
    <>
      <section className="flash background">
        <div className="container">
          <div className="heading f_flex">
            <i className="fa fa-bolt"></i>
            <h1>Good Deals</h1>
          </div>
          <DealCard productItems={productItems} addToCart={addToCart} />
        </div>
      </section>
    </>
  );
};

export default GoodDeals;
