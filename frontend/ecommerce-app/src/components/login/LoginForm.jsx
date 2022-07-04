import React from "react";

const LoginForm = () => {
  return (
    <section className="login_form">
      <h2>Login</h2>
      <form>
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
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default LoginForm;
