import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/index.min.css";

const User = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/auth/currentUser", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(Array(res.data));
        setUserData(Array(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {userData.map((user) => {
        return (
          <div className="user" key={user._id}>
            <div className="user__details">
              <h1>User info</h1>
              <h4>
                First Name: <span>{user.firstName}</span>
                <br />
                Last Name: <span>{user.lastName}</span>
                <br />
                Email: <span>{user.email}</span>
                <br />
                Role: <span>{user.role}</span>
              </h4>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default User;
