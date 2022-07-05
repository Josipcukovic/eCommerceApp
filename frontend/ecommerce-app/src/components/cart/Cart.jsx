import React from "react";
import "../../styles/index.min.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Cart = ({ cartItem, addToCart, decreaseQuantity, removeCart }) => {
  const totalPrice = cartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  const history = useHistory();

  async function handleConfirm(e) {
    e.preventDefault();
    const confirmData = {};

    confirmData.items = cartItem.map((item) => {
      return {
        productId: item._id,
        quantity: item.qty,
        totalPrice: item.price * item.qty,
      };
    });
    confirmData.totalPrice = totalPrice;

    await axios.post(
      "http://localhost:3003/cart",
      JSON.stringify(confirmData),
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    history.push("/home");
  }

  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {cartItem.length === 0 && (
              <h1 className="no-items product">
                No items in the shopping cart
              </h1>
            )}

            {cartItem.map((item) => {
              const productQuantity = item.price * item.qty;
              return (
                <div className="cart-list product d_flex" key={item._id}>
                  <div className="img">
                    <img src={item.pictureUrl} alt="Product" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>
                      Price: <span>${item.price}.00</span>
                      <br />
                      Quantity: <span>{item.qty}</span>
                      <br />
                      Total price: <span>${productQuantity}.00</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button
                        className="box-button"
                        onClick={() => removeCart(item)}
                      >
                        <i className="fa -solid fa-xmark"></i>
                      </button>
                    </div>

                    <div className="cartControl d_flex">
                      <button
                        className="incrementCart  box-button"
                        onClick={() => addToCart(item)}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                      <button
                        className="decrementCart box-button"
                        onClick={() => decreaseQuantity(item)}
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-total product">
            <h2>Shopping Cart Summary</h2>
            <div>
              <h4>Total Price: </h4>
              <h3>${totalPrice}</h3>
            </div>
            <button
              type="submit"
              className="button-confirm"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
