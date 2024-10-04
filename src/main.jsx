import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './pages/HomePage.jsx';
import Books from './components/books/books.jsx';
import BookDetails from './components/books/BookDetails.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import FAQs from './components/faq/FAQs.jsx';

import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import Banner from './components/homepage/Banner.jsx';
import DevelopmentInProgress from './pages/DevelopmentInProgress.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
    children: [
      {
        path: "/",
        element: <div><Banner></Banner><Books></Books></div>
      },
      {
        path: "about",
        element: <DevelopmentInProgress pageName='About'></DevelopmentInProgress>
      },
      {
        path: "blog",
        element: <DevelopmentInProgress pageName='Blog'></DevelopmentInProgress>
      },
      {
        path: "faq",
        element: <FAQs></FAQs>
      },
      {
        path: "signin",
        element: <DevelopmentInProgress pageName='Sign In'></DevelopmentInProgress>
      },
      {
        path: "buy",
        element: <DevelopmentInProgress pageName='Buy book'></DevelopmentInProgress>
      },
      {
        path: "book/:bookId",
        element: <BookDetails></BookDetails>
      },
      {
        path: '*',
        element: <PageNotFound></PageNotFound>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
