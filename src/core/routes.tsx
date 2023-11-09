import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// function NoRequireAuth(props: { children: React.ReactElement }) {
//   const location = useLocation();
//   const isAuthenticated = localStorage.getItem('token');

//   if (isAuthenticated) {
//     return <Navigate to='/' state={{ next: location }} replace />;
//   }

//   return props.children;
// }

// function RequireAuth(props: { children: React.ReactElement }) {
//   const location = useLocation();
//   const isAuthenticated = localStorage.get;

//   if (!isAuthenticated) {
//     return <Navigate to='/login' state={{ next: location }} replace />;
//   }

//   return props.children;
// }

const Cart = lazy(() => import('../pages/Cart'));
const Login = lazy(() => import('../pages/Login'));
const Menu = lazy(() => import('../pages/Menu'));
const PageNotFound = lazy(() => import('../pages/404'));
const Welcome = lazy(() => import('../pages/Welcome'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      // <RequireAuth>
      <Welcome />
      // </RequireAuth>
    ),
  },
  {
    path: '/login',
    element: (
      // <NoRequireAuth>
      <Login />
      // </NoRequireAuth>
    ),
  },
  {
    path: '/cart',
    element: (
      // <RequireAuth>
      <Cart />
      // </RequireAuth>
    ),
  },
  {
    path: '/menu',
    element: (
      // <RequireAuth>
      <Menu />
      // </RequireAuth>
    ),
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export default routes;
