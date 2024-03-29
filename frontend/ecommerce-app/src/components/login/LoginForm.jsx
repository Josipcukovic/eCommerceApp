import React from "react";
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { setCurrentUser } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const response = await axios.post(
      "http://localhost:3003/auth/login",
      JSON.stringify(user),
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    setCurrentUser(response.data);
    history.push("/home");
  }

  return (
    <section className="login_form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="email"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          ref={emailRef}
          required
        />
        <input
          className="password"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          autoComplete="on"
          ref={passwordRef}
          required
        />
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default LoginForm;
