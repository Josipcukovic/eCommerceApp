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
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const removeProduct = (product) => {
    axios
      .delete("http://localhost:3003/product/" + product._id, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then(window.location.reload());
  };

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
              <div className="cart-items-function">
                <div className="removeCart">
                  <button
                    className="box-button"
                    onClick={() => removeProduct(product)}
                  >
                    <i className="fa -solid fa-xmark"></i>
                  </button>
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
