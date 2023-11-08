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

const PageNotFound = lazy(() => import('../pages/404'));
const Login = lazy(() => import('../pages/Login'));
const Homepage = lazy(() => import('../pages/Homepage'));
const Welcome = lazy(() => import('../pages/Welcome'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      // <RequireAuth>
      <Homepage />
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
    path: '/welcome',
    element: (
      // <RequireAuth>
      <Welcome />
      // </RequireAuth>
    ),
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export default routes;
