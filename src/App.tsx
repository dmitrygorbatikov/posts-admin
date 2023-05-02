import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import useRoutes from './routes';
import { observer } from 'mobx-react';
import AuthStore from './mobx/auth';

function App() {
  const { accessToken } = AuthStore;
  const routes = useRoutes(!!accessToken);
  return (
    <BrowserRouter>
      <Menu />
      {routes}
    </BrowserRouter>
  );
}

export default observer(App);
