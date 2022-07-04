import React from "react";
import LoginForm from "../components/login/LoginForm";
import NeedAccount from "../components/login/NeedAccount";
import "../styles/index.min.css";

const LoginPage = () => {
  return (
    <>
      <main>
        <LoginForm />
        <NeedAccount />
      </main>
    </>
  );
};

export default LoginPage;
