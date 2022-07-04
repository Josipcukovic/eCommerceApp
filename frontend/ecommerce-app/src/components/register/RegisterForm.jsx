import React from "react";

const RegisterForm = () => {
  return (
    <section className="login_form login_form--register">
      <h2>Register</h2>
      <form>
        <input
          className="firstName"
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First name"
          required
        />
        <input
          className="lastName"
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last name"
          required
        />
        <input
          className="email"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="password"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          autoComplete="on"
          required
        />

        <button type="submit">Register</button>
      </form>
    </section>
  );
};

export default RegisterForm;
