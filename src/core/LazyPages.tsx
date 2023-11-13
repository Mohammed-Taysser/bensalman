import { lazy } from 'react';

const Cart = lazy(() => import('../pages/Cart'));
const ChairReservation = lazy(() => import('../pages/ChairReservation'));
const Login = lazy(() => import('../pages/public/Login'));
const Menu = lazy(() => import('../pages/Menu'));
const PageNotFound = lazy(() => import('../pages/public/404'));
const NotAuthorized = lazy(() => import('../pages/403'));
const Welcome = lazy(() => import('../pages/Welcome'));

export {
  Cart,
  ChairReservation,
  Login,
  Menu,
  NotAuthorized,
  PageNotFound,
  Welcome,
};
