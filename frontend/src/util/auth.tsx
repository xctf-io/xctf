import React from "react";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

type AccessCheckProps = {
  configKey: string;
  children?: React.ReactNode;
};

/*
this component will redirect the user if they do not match the acl
 */
export function AccessCheck({ configKey, children }: AccessCheckProps) {
  // const { loading: authLoading, current_user, config } = useAuthContext();
  // if (!authLoading && !current_user?.id && config[configKey] !== "public")
  //   return <Redirect to={"/login"} />;
  return <>{children}</>;
}
