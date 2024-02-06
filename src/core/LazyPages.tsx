import { ReactElement, Suspense, lazy } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import SuspenseLoading from '../components/SuspenseLoading';
import { isRouteAUth, isUserAuth } from '../helper';

const Cart = lazy(() => import('../pages/auth/Cart'));
const ChairReservation = lazy(() => import('../pages/auth/Chair'));
const Login = lazy(() => import('../pages/public/Login'));
const Menu = lazy(() => import('../pages/auth/Menu'));
const PageNotFound = lazy(() => import('../pages/public/404'));
const NotAuthorized = lazy(() => import('../pages/auth/403'));
const Welcome = lazy(() => import('../pages/auth/Welcome'));
const Success = lazy(() => import('../pages/auth/Success'));
const Kitchen = lazy(() => import('../pages/auth/kitchen'));
const Reservation = lazy(() => import('../pages/auth/Reservation'));
const Orders = lazy(() => import('../pages/auth/Orders'));

function RequireAuth(
  props: Readonly<{ children: ReactElement; path: string }>
) {
  const location = useLocation();

  if (!isUserAuth()) {
    return <Navigate to='/login' state={{ next: location }} replace />;
  }

  if (!isRouteAUth(props.path)) {
    return <NotAuthorized />;
  }

  return props.children;
}

function NoRequireAuth(props: Readonly<{ children: ReactElement }>) {
  if (isUserAuth()) {
    return <Navigate to='/' replace />;
  }

  return <Suspense fallback={<SuspenseLoading />}>{props.children}</Suspense>;
}

export {
  Cart,
  ChairReservation, Kitchen, Login,
  Menu,
  NotAuthorized, Orders, PageNotFound, Reservation, Success,
  Welcome
};

  export { NoRequireAuth, RequireAuth };

