import { Suspense } from 'react';
import { Navigate, createBrowserRouter, useLocation } from 'react-router-dom';
import SuspenseLoading from '../components/SuspenseLoading';
import { isUserAuth } from '../helper';
import {
  Cart,
  ChairReservation,
  Login,
  Menu,
  PageNotFound,
  Welcome,
} from './LazyPages';

function RequireAuth(props: Readonly<{ children: React.ReactElement }>) {
  const location = useLocation();

  if (!isUserAuth()) {
    return <Navigate to='/login' state={{ next: location }} replace />;
  }

  return props.children;
}

function NoRequireAuth(props: Readonly<{ children: React.ReactElement }>) {
  if (isUserAuth()) {
    return <Navigate to='/' replace />;
  }

  return <Suspense fallback={<SuspenseLoading />}>{props.children}</Suspense>;
}

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
      <RequireAuth>
        <Welcome />
      </RequireAuth>
    ),
  },
  {
    path: '/cart',
    element: (
      <RequireAuth>
        <Cart />
      </RequireAuth>
    ),
  },
  {
    path: '/chair',
    element: (
      <RequireAuth>
        <ChairReservation />
      </RequireAuth>
    ),
  },
  {
    path: '/menu',
    element: (
      <RequireAuth>
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
