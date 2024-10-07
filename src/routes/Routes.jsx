import HomePage from '../pages/HomePage.jsx';
import Books from '../components/books/books.jsx';
import BookDetails from '../components/books/BookDetails.jsx';
import PageNotFound from '../pages/PageNotFound.jsx';
import FAQs from '../components/faq/FAQs.jsx';
import DevelopmentInProgress from '../pages/DevelopmentInProgress.jsx';
import { ROUTES } from './index.js';

import {
    createBrowserRouter,
    useParams,
} from "react-router-dom";
import MainLayout from '../layouts/MainLayout.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import PrivateRoute from './PrivateRoute.jsx';

const devBaseUrl = 'http://localhost:5000/';
const prodBaseUrl = 'https://readers-cafe-backend-gebselhrb-soomanibs-projects.vercel.app/';
const baseUrl = prodBaseUrl;

const router = createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: <MainLayout></MainLayout>,
      errorElement: <div>Some Error Occured</div>,
      children: [
        {
          path: ROUTES.HOME,
          element: <HomePage></HomePage>
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
          path: ROUTES.LOGIN,
          element: <Login></Login>
        },
        {
          path: ROUTES.REGISTER,
          element: <Register></Register>
        },
        {
          path: ROUTES.BOOKS,
          element: <PrivateRoute><Books></Books></PrivateRoute>,
          loader: ()=>fetch(`${baseUrl}books`)
        },
        {
          path: ROUTES.BOOK_DETAIL,
          element: <PrivateRoute><BookDetails></BookDetails></PrivateRoute>,
          loader: ({params})=>fetch(`${baseUrl}book/${params.id}`)
        },
        {
          path: '*',
          element: <PageNotFound></PageNotFound>
        }
      ]
    },
]);

export default router

