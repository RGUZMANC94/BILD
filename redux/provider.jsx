import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import Layout from "../components/layout";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <Layout>{children}</Layout>
    </Provider>
  );
};

export default Providers;
