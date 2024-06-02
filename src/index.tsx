import Login from '@src/pages/login';
import Verify from '@src/pages/verify';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import NotFound from './components/molecules/NotFound';
import { DashboardContextAllProvider } from './context/dashboard';
import './index.css';
import Dashboard from './pages/dashboard';
import DashboardProfile from './pages/dashboard/profile';
import DashboardServices from './pages/dashboard/services';
import FromScratchService from './pages/dashboard/services/from-scratch';
import CaptionCreateService from './pages/dashboard/services/from-scratch/caption-create';
import GetInspiredService from './pages/dashboard/services/get-inspired';
import InspiredCaptionCreate from './pages/dashboard/services/get-inspired/caption-create';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/services",
    element: <DashboardServices />,
  },
  {
    path: "/dashboard/profile",
    element: <DashboardProfile />,
  },
  {
    path: "/dashboard/services/from-scratch",
    element: <FromScratchService />,
  },
  {
    path: "/dashboard/services/from-scratch/:social",
    element: <CaptionCreateService />,
  },
  {
    path: "/dashboard/services/get-inspired",
    element: <GetInspiredService />,
  },
  {
    path: "/dashboard/services/get-inspired/captions",
    element: <InspiredCaptionCreate />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <DashboardContextAllProvider>
      <RouterProvider router={router} />
    </DashboardContextAllProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
