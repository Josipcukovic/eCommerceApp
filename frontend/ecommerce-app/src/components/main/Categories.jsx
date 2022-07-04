import React from "react";

const Categories = () => {
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
    {
      categoryImage: "./images/category/cat4.png",
      categoryName: "Home & Garden",
    },
    {
      categoryImage: "./images/category/cat7.png",
      categoryName: "Health & Beauty",
    },
    {
      categoryImage: "./images/category/cat11.png",
      categoryName: "Books",
    },
  ];
  return (
    <>
      <div className="category">
        {categoriesData.map((value, index) => {
          return (
            <div className="box f_flex" key={index}>
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
