import { createBrowserRouter } from 'react-router-dom';
import {
  Cart,
  ChairReservation,
  Login,
  Menu,
  NoRequireAuth,
  PageNotFound,
  RequireAuth,
  Success,
  Welcome,
  Kitchen,
  Reservation,
  Orders,
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
    path: '/success',
    element: (
      <RequireAuth path='/success'>
        <Success />
      </RequireAuth>
    ),
  },
  {
    path: '/kitchen',
    element: (
      <RequireAuth path='/kitchen'>
        <Kitchen />
      </RequireAuth>
    ),
  },
  {
    path: '/reservation',
    element: (
      <RequireAuth path='/reservation'>
        <Reservation />
      </RequireAuth>
    ),
  },
  {
    path: '/orders',
    element: (
      <RequireAuth path='/orders'>
        <Orders />
      </RequireAuth>
    ),
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export default routes;
