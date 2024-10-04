import HomePage from '../pages/HomePage.jsx';
import Books from '../components/books/books.jsx';
import BookDetails from '../components/books/BookDetails.jsx';
import PageNotFound from '../pages/PageNotFound.jsx';
import FAQs from '../components/faq/FAQs.jsx';
import Banner from '../components/homepage/Banner.jsx';
import DevelopmentInProgress from '../pages/DevelopmentInProgress.jsx';
import { ROUTES } from './index.js';

import {
    createBrowserRouter,
    useParams,
} from "react-router-dom";

const router = createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: <HomePage></HomePage>,
      children: [
        {
          path: ROUTES.HOME,
          element: <div><Banner></Banner><Books></Books></div>
        },
        {
          path: ROUTES.ABOUT,
          element: <DevelopmentInProgress pageName='About'></DevelopmentInProgress>
        },
        {
          path: ROUTES.BLOG,
          element: <DevelopmentInProgress pageName='Blog'></DevelopmentInProgress>
        },
        {
          path: ROUTES.FAQ,
          element: <FAQs></FAQs>
        },
        {
          path: ROUTES.SIGNIN,
          element: <DevelopmentInProgress pageName='Sign In'></DevelopmentInProgress>
        },
        {
          path: ROUTES.BUY,
          element: <DevelopmentInProgress pageName='Buy book'></DevelopmentInProgress>
        },
        {
          path: ROUTES.BOOKS,
          element: <Books></Books>
        },
        {
          path: ROUTES.BOOK_DETAIL,
          element: <BookDetails></BookDetails>
        },
        {
          path: '*',
          element: <PageNotFound></PageNotFound>
        }
      ]
    },
]);

export default router

