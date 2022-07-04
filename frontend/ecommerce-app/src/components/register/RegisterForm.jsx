import React, { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    const user = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    await axios.post(
      "http://localhost:3003/auth/register",
      JSON.stringify(user),
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    history.push("/home");
  }

  return (
    <section className="login_form login_form--register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="firstName"
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First name"
          ref={firstNameRef}
          required
        />
        <input
          className="lastName"
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last name"
          ref={lastNameRef}
          required
        />
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

        <button type="submit">Register</button>
      </form>
    </section>
  );
};

export default RegisterForm;
