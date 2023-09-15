import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/Home';
import NotFound from './views/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout></Layout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        index: true,
      },
    ],
  },
]);
