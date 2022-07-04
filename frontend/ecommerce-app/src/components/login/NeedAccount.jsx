import React from "react";
import { Link } from "react-router-dom";

const NeedAccount = () => {
  return (
    <section className="need_account">
      <div className="register">
        <h3>Need an account?</h3>
        <Link to="/register">
          <p>Register here</p>
        </Link>
      </div>
    </section>
  );
};

export default NeedAccount;
