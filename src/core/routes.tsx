import { ReactElement, Suspense } from 'react';
import { Navigate, createBrowserRouter, useLocation } from 'react-router-dom';
import SuspenseLoading from '../components/SuspenseLoading';
import { isRouteAUth, isUserAuth } from '../helper';
import {
  Cart,
  ChairReservation,
  Login,
  Menu,
  NotAuthorized,
  PageNotFound,
  Welcome,
} from './LazyPages';

function RequireAuth(props: Readonly<{ children: ReactElement; path: string }>) {
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
