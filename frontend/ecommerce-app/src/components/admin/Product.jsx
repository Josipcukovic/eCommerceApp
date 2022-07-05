import React, { useState, useEffect } from "react";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/products?pageSize=100", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data.products);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {products.map((product) => {
        return (
          <div className="product-box" key={product._id}>
            <div className="product admin" key={product._id}>
              <div className="img">
                <img src={product.pictureUrl} alt="Product" />
              </div>
              <div className="product-details">
                <h3>{product.name}</h3>
                <div className="price">
                  <h4>${product.price}.00</h4>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Product;
