import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CategoryProducts = ({ addToCart }) => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const { state } = location;

  useEffect(() => {
    axios
      .post(
        "http://localhost:3003/product/search",
        JSON.stringify({ category: state }),
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);

  return (
    <>
      {products.map((product) => {
        return (
          <div className="container d_flex" key={product._id}>
            <div className="product mtop" key={product._id}>
              <div className="img">
                <span className="discount">{product.discount}% Off</span>
                <img src={product.pictureUrl} alt="Product" />
              </div>
              <div className="product-details">
                <h3>{product.name}</h3>
                <div className="price">
                  <h4>${product.price}.00</h4>
                  <button
                    className="box-button"
                    onClick={() => addToCart(product)}
                  >
                    <i className="fa fa-plus"></i>
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

export default CategoryProducts;
