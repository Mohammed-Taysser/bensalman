import { createBrowserRouter } from 'react-router-dom';
import {
  Cart,
  ChairReservation,
  Login,
  Menu,
  NoRequireAuth,
  PageNotFound,
  RequireAuth,
  Welcome,
} from './LazyPages';

const routes = createBrowserRouter([
  {
    path: '/login',
    element: (
      <NoRequireAuth>
        <Login />
      </NoRequireAuth>
    ),
  },
  {
    path: '/',
    element: (
      <RequireAuth path='/'>
        <Welcome />
      </RequireAuth>
    ),
  },
  {
    path: '/cart',
    element: (
      <RequireAuth path='/cart'>
        <Cart />
      </RequireAuth>
    ),
  },
  {
    path: '/chair',
    element: (
      <RequireAuth path='/chair'>
        <ChairReservation />
      </RequireAuth>
    ),
  },
  {
    path: '/menu',
    element: (
      <RequireAuth path='/menu'>
        <Menu />
      </RequireAuth>
    ),
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export default routes;
