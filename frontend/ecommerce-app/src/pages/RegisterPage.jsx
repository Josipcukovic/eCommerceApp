import React from "react";
import RegisterForm from "../components/register/RegisterForm";
import HaveAccount from "../components/register/HaveAccount";

const RegisterPage = () => {
  return (
    <>
      <main>
        <RegisterForm />
        <HaveAccount />
      </main>
    </>
  );
};

export default RegisterPage;
