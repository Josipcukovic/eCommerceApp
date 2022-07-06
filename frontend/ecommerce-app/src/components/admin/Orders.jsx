import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/index.min.css";

const Orders = () => {
  const [orders, setOrders] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3003/carts?pageSize=100", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const shipOrder = (id) => {
    axios
      .patch(
        "http://localhost:3003/cart/" + id,
        JSON.stringify({ shipped: true }),
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(window.location.reload());
  };

  function renderProduct(order) {
    let productResult = [];
    order.items.map((item) => {
      if (item.productId) {
        productResult.push(
          <div className="product admin" key={item._id}>
            <div className="img">
              <img src={item.productId.pictureUrl} alt="Product" />
            </div>
            <div className="product-details">
              <h3>{item.productId.name}</h3>
              <div className="price">
                <h4>${item.totalPrice}.00</h4>
              </div>
            </div>
          </div>
        );
      } else {
        productResult.push(
          <div className="product admin" key={item._id}>
            <div className="img">
              <img
                src="https://cdn2.iconfinder.com/data/icons/packing/80/shipping-34-512.png"
                alt="Product"
              />
            </div>
            <div className="product-details">
              <h3>Removed product</h3>
              <div className="price">
                <h4>${item.totalPrice}.00</h4>
              </div>
            </div>
          </div>
        );
      }
    });
    return productResult;
  }

  return (
    <section>
      {Object.keys(orders).length !== 0 &&
        orders.carts.map((order) => {
          return (
            <section className="d_flex">
              {renderProduct(order)}
              <div>
                <button onClick={() => shipOrder(order._id)}>Shipped</button>
              </div>
            </section>
          );
        })}
    </section>
  );
};

export default Orders;
