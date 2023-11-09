import { createBrowserRouter } from 'react-router-dom';
import {
  Cart,
  ChairReservation,
  Login,
  Menu,
  PageNotFound,
  Welcome,
} from './LazyPages';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/chair-reservation',
    element: <ChairReservation />,
  },
  {
    path: '/menu',
    element: <Menu />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export default routes;
