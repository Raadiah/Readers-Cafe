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
import baseUrl from './sites.js';
import DashboardLayout from '../layouts/DashboardLayout.jsx';

const router = createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: <MainLayout></MainLayout>,
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
          element: <FAQs></FAQs>,
          loader: ()=>fetch(`${baseUrl}/faq`)
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
          element: <Books></Books>,
          loader: ()=>fetch(`${baseUrl}/books`)
        },
        {
          path: ROUTES.BOOK_DETAIL,
          element: <PrivateRoute><BookDetails></BookDetails></PrivateRoute>,
          loader: ({params})=>fetch(`${baseUrl}/book/${params.id}`)
        },
        {
          path: '*',
          element: <PageNotFound></PageNotFound>
        }
      ]
    },
    {
      path: ROUTES.DASHBOARD,
      element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
      children: [

      ]
    }
]);

export default router

