import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import { AuthLayout, Login } from './components/index.js';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const AllPosts = lazy(() => import('./pages/AllPosts'));
const AddPost = lazy(() => import('./pages/AddPost'));
const EditPost = lazy(() => import('./pages/EditPost'));
const Post = lazy(() => import('./pages/Post'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword.jsx'))
const ResetPassword = lazy(() => import('./pages/ResetPassword.jsx'))


// Fallback loader
const Loader = () => (
  <div className="min-h-screen flex items-center justify-center text-gray-500">
    Loading...
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: '/all-posts',
        element: (
          <Suspense fallback={<Loader />}>
            <AuthLayout authentication>
              <AllPosts />
            </AuthLayout>
          </Suspense>
        ),
      },
      {
        path: '/add-post',
        element: (
          <Suspense fallback={<Loader />}>
            <AuthLayout authentication>
              <AddPost />
            </AuthLayout>
          </Suspense>
        ),
      },
      {
        path: '/edit-post/:slug',
        element: (
          <Suspense fallback={<Loader />}>
            <AuthLayout authentication>
              <EditPost />
            </AuthLayout>
          </Suspense>
        ),
      },
      {
        path: '/post/:slug',
        element: (
          <Suspense fallback={<Loader />}>
            <Post />
          </Suspense>
        ),
      },
      {
        path: '/forgot-password',
        element: (
          <Suspense fallback={<Loader />}>
            <ForgotPassword />
          </Suspense>
        )
      },
      {
        path: '/reset-password',
        element: (
          <Suspense fallback={<Loader />}>
            <ResetPassword />
          </Suspense>
        )
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
