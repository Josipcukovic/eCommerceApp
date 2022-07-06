import React from "react";
import { useHistory } from "react-router-dom";

const Categories = () => {
  const history = useHistory();
  const categoriesData = [
    {
      categoryImage: "./images/category/cat1.png",
      categoryName: "Fashion",
    },
    {
      categoryImage: "./images/category/cat2.png",
      categoryName: "Electronic",
    },
    {
      categoryImage: "./images/category/cat3.png",
      categoryName: "Cars",
    },
  ];

  const selectCategory = (categoryName) => {
    history.push({ pathname: "/categoryProducts", state: categoryName });
  };
  return (
    <>
      <div className="category">
        {categoriesData.map((value, index) => {
          return (
            <div
              className="box f_flex"
              key={index}
              id={value.categoryName}
              onClick={() => selectCategory(value.categoryName)}
            >
              <img src={value.categoryImage} alt="Category" />
              <span>{value.categoryName}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
