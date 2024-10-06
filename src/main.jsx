import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import router from './routes/Routes.jsx';

import {
  RouterProvider
} from "react-router-dom";
import AuthProvider from './provider/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster></Toaster>
    </AuthProvider>
  </StrictMode>,
)
