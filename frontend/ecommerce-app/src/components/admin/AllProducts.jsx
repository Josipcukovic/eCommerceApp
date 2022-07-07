import React from "react";
import Product from "./Product";

const AllProducts = () => {
  return (
    <>
      <section className="shop background">
        <div className="container d_flex">
          <div className="contentWidth">
            <div className="order__headline">
              <h2>All Products</h2>
            </div>
            <div className="product-content grid1">
              <Product />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllProducts;
