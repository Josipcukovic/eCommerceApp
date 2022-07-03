import React from "react";
import Categories from "./Categories";
import Slider from "./Slider";
import "../../styles/index.min.css";

const Home = () => {
  return (
    <>
      <section className="home">
        <div className="container d_flex">
          <Categories />
          <Slider />
        </div>
      </section>
    </>
  );
};

export default Home;
