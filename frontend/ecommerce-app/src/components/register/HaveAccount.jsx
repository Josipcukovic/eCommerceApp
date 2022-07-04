import React from "react";
import { Link } from "react-router-dom";

const HaveAccount = () => {
  return (
    <section className="need_account">
      <div className="register">
        <h3>Already have an account?</h3>
        <Link to="/">
          <p>Login here</p>
        </Link>
      </div>
    </section>
  );
};

export default HaveAccount;
