import React from "react";
import { useRef } from "react";
import axios from "axios";
import "../../styles/index.min.css";
import { useHistory } from "react-router-dom";

const NewProduct = () => {
  const nameRef = useRef();
  const pictureRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    const product = {
      name: nameRef.current.value,
      pictureUrl: pictureRef.current.value,
      price: priceRef.current.value,
      category: categoryRef.current.value,
    };

    await axios.post("http://localhost:3003/product", JSON.stringify(product), {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    history.push("/allProducts");
  }

  return (
    <>
      <section className="newProduct">
        <div className="newProduct__details">
          <h1>Add new product</h1>
          <form onSubmit={handleSubmit} id="productform">
            <input
              className="name"
              type="text"
              id="name"
              name="name"
              placeholder="Product name"
              ref={nameRef}
              required
            />
            <br />
            <input
              className="picture"
              type="text"
              id="picture"
              name="picture"
              placeholder="Picture URL"
              ref={pictureRef}
              required
            />
            <br />
            <input
              className="price"
              type="number"
              id="price"
              name="price"
              placeholder="Product price"
              ref={priceRef}
              required
            />
            <br />
            <label htmlFor="product_category">Choose project category: </label>
            <select
              className="product_category"
              id="product_category"
              name="product_category"
              form="productform"
              ref={categoryRef}
            >
              <option value="Electronic">ELECTRONIC</option>
              <option value="Fashion">FASHION</option>
              <option value="Cars">CARS</option>
            </select>
            <br />
            <button type="submit">Create</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default NewProduct;
