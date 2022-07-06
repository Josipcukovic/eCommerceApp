import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pages from "./pages/Pages";
import Cart from "./components/cart/Cart";
import { useState, useEffect, useContext } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import User from "./pages/User";
import axios from "axios";
import AuthContext from "./components/context/AuthContext";
import NewProduct from "./components/admin/NewProduct";
import AllProducts from "./components/admin/AllProducts";
import Orders from "./components/admin/Orders";
import SearchedProducts from "./components/search/SearchedProducts";
import CategoryProducts from "./components/category/CategoryProducts";

function App() {
  const [cartItem, setCartItem] = useState([]);
  const { setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:3003/auth/currentUser", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const addToCart = (product) => {
    const productCart = cartItem.find((item) => item._id === product._id);

    if (productCart) {
      setCartItem(
        cartItem.map((item) =>
          item._id === product._id
            ? { ...productCart, qty: productCart.qty + 1 }
            : item
        )
      );
    } else {
      setCartItem([...cartItem, { ...product, qty: 1 }]);
    }
  };

  const decreaseQuantity = (product) => {
    const productCart = cartItem.find((item) => item._id === product._id);

    if (productCart.qty === 1) {
      setCartItem(cartItem.filter((item) => item._id !== product._id));
    } else {
      setCartItem(
        cartItem.map((item) =>
          item._id === product._id
            ? { ...productCart, qty: productCart.qty - 1 }
            : item
        )
      );
    }
  };

  const removeCart = (product) => {
    const productCart = cartItem.filter((item) => item._id !== product._id);
    setCartItem(productCart);
  };

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <LoginPage />
          </Route>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <Route path="/home" exact>
            <Header cartItem={cartItem} />
            <Pages addToCart={addToCart} />
          </Route>
          <Route path="/cart" exact>
            <Header cartItem={cartItem} />
            <Cart
              cartItem={cartItem}
              addToCart={addToCart}
              decreaseQuantity={decreaseQuantity}
              removeCart={removeCart}
            />
          </Route>
          <Route path="/user" exact>
            <Header cartItem={cartItem} />
            <User />
          </Route>
          <Route path="/newProduct">
            <Header />
            <NewProduct />
          </Route>
          <Route path="/allProducts">
            <Header />
            <AllProducts />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/searchedProducts">
            <Header cartItem={cartItem} />
            <SearchedProducts addToCart={addToCart} />
          </Route>
          <Route path="/categoryProducts">
            <Header cartItem={cartItem} />
            <CategoryProducts addToCart={addToCart} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
