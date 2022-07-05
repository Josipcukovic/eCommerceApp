import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <i className="fa fa-long-arrow-alt-right"></i>
      </button>
    </div>
  );
};

const PreviousArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="previous">
        <i className="fa fa-long-arrow-alt-left"></i>
      </button>
    </div>
  );
};

const DealCard = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
  };

  useEffect(() => {
    axios
      .get("http://localhost:3003/products", {
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
      <Slider {...settings}>
        {products.map((product) => {
          return (
            <div className="box" key={product._id}>
              <div className="product mtop" key={product._id}>
                <div className="img">
                  <span className="discount">{product.discount}% Off</span>
                  <img src={product.pictureUrl} alt="Product" />
                </div>
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <div className="price">
                    <h4>${product.price}.00</h4>
                    <button onClick={() => addToCart(product)}>
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default DealCard;
