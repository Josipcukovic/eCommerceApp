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

  return (
    <section>
      {/* {Object.keys(orders).length !== 0 &&
        orders.carts.map((order) => {
          return order.items.map((item) => {
            return (
              <section className="cart-items" key={item._id}>
                <div className="container d_flex">
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
              </section>
            );
          });
        })} */}
    </section>
  );
};

export default Orders;
