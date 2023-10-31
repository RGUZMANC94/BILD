import React from "react";
import { useSelector } from "react-redux";
import { unprotectedRoutes } from "./constants";
import Layout from "../layout";
import { useRouter } from "next/router";

const isBrowser = () => typeof window !== "undefined";

const RouteGuard = ({ children }) => {
  const { email_address, name, user_rol } = useSelector((state) => state.user);
  const router = useRouter();
  const { pathname } = router;

  const isAuthenticated = name !== "" || email_address !== "";

  if (
    isBrowser() &&
    !isAuthenticated &&
    pathname !== unprotectedRoutes.loginPage
  ) {
    router.push(unprotectedRoutes.loginPage, null, { shallow: true });
  }

  return <Layout>{children}</Layout>;
};

export default RouteGuard;
