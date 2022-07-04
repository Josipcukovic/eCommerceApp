import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pages from "./pages/Pages";
import Cart from "./components/cart/Cart";
import dealsData from "./components/goodDeals/DealsData";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const { productItems } = dealsData;

  const [cartItem, setCartItem] = useState([]);

  const addToCart = (product) => {
    const productCart = cartItem.find((item) => item.id === product.id);

    if (productCart) {
      setCartItem(
        cartItem.map((item) =>
          item.id === product.id
            ? { ...productCart, qty: productCart.qty + 1 }
            : item
        )
      );
    } else {
      setCartItem([...cartItem, { ...product, qty: 1 }]);
    }
  };

  const decreaseQuantity = (product) => {
    const productCart = cartItem.find((item) => item.id === product.id);

    if (productCart.qty === 1) {
      setCartItem(cartItem.filter((item) => item.id !== product.id));
    } else {
      setCartItem(
        cartItem.map((item) =>
          item.id === product.id
            ? { ...productCart, qty: productCart.qty - 1 }
            : item
        )
      );
    }
  };

  const removeCart = (product) => {
    const productCart = cartItem.filter((item) => item.id !== product.id);
    setCartItem(productCart);
  };

  return (
    <>
      <Router>
        <Header cartItem={cartItem} />
        <Switch>
          <Route path="/" exact>
            <Pages productItems={productItems} addToCart={addToCart} />
          </Route>
          <Route path="/cart" exact>
            <Cart
              cartItem={cartItem}
              addToCart={addToCart}
              decreaseQuantity={decreaseQuantity}
              removeCart={removeCart}
            />
          </Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
