import React, { useState } from 'react'
import { Login } from "./Login";

interface LoginPageProps {

}

export const LoginPage: React.FunctionComponent<LoginPageProps> = (props) => {
  return (
    <>
      <h1>Login</h1>
      <Login />
    </>
  );
}
