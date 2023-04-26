import React from "react";
import { BrowserRouter } from "react-router-dom";
import Menu from "./components/Menu";
import Toast from "./components/Toast";
import useRoutes from "./routes";
import { observer } from "mobx-react";
import AuthStore from "./mobx/auth";

function App() {
  const { accessToken } = AuthStore;
  const routes = useRoutes(!!accessToken);
  return (
    <BrowserRouter>
      <Menu />
      <Toast />
      {routes}
    </BrowserRouter>
  );
}

export default observer(App);
