import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import router from './routes/Routes.jsx';

import {
  RouterProvider
} from "react-router-dom";
import AuthProvider from './provider/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster></Toaster>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
