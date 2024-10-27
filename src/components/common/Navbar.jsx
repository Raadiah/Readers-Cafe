import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from '../../routes/index';
import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";
import User from "./User";
import { FaUser, FaUsersLine } from "react-icons/fa6"
import { FaBook, FaCog, FaHeart, FaHome, FaList, FaPlusSquare, FaPowerOff, FaShoppingCart } from "react-icons/fa"

function Navbar() {
  const ACTIVE_BUTTON_CLASS = 'rounded btn-active btn-ghost'
  const {user, logout} = useContext(AuthContext);
  const isAdmin = user?.isAdmin;
  const navigate = useNavigate();

  const handleLogout = ()=>{
    logout()
    .then(()=>{
        toast.success('You are successfully signed out')
    })
    .catch((error)=>{
        toast.error('Request could not be processed')
        console.error(error);
    });;
  }

  return (
    <div className="navbar bg-white border-b fixed top-0 z-50">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-60 p-2 shadow">
                <li>
                    <Link to={ROUTES.HOME}>
                        <FaHome></FaHome>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to={ROUTES.BOOKS}>
                        <FaBook></FaBook>
                        Products
                    </Link>
                </li>
                {
                    user ? <>
                            <li className="border-t">
                                <Link to={ROUTES.PROFILE}>
                                    <FaCog></FaCog>
                                    Dashboard
                                </Link>
                                <ul className="p-2 border-none">
                                    <li>
                                        <Link to={ROUTES.PROFILE}>
                                            <FaUser></FaUser>
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={ROUTES.WISHLIST}>
                                            <FaHeart></FaHeart>
                                            My Wishlist
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={ROUTES.ORDERS}>
                                            <FaShoppingCart></FaShoppingCart>
                                            My Orders
                                        </Link>
                                    </li>
                                    {
                                        isAdmin ?
                                        <>
                                            <li className="border-t pt-2">
                                                <Link to={ROUTES.USERS}>
                                                    <FaUsersLine></FaUsersLine>
                                                    User List
                                                </Link>
                                            </li>
                                            <li className="border-t pt-2">
                                                <Link to={ROUTES.ALL_PRODUCTS}>
                                                    <FaBook></FaBook>
                                                    All Products
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={ROUTES.NEW_BOOK}>
                                                    <FaPlusSquare></FaPlusSquare>
                                                    New Product
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={ROUTES.PRODUCT_CATEGORY}>
                                                    <FaList></FaList>
                                                    Product Categories
                                                </Link>
                                            </li>
                                        </>
                                        :
                                        <></>
                                    }
                                </ul>
                            </li>
                        <li onClick={handleLogout} className="border-t">
                            <a>
                                <FaPowerOff></FaPowerOff>
                                Log Out
                            </a>
                        </li>
                    </>:<>
                        <li className="border-t">
                            <Link to={ROUTES.LOGIN}>Sign In</Link>
                        </li>
                        <li>
                            <Link to={ROUTES.REGISTER}>Register</Link>
                        </li>
                    </>
                }
            </ul>
            </div>
            <Link 
            to={ROUTES.HOME}
            className="btn btn-ghost text-xl">
                <img className="w-10 h-10" src="/title-icon.png" alt="" />
                <span className="hidden md:flex">Reader's Cafe</span>
            </Link>
        </div>
        <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal px-1">
                <li>
                    <Link to={ROUTES.HOME}>Home</Link>
                </li>
                <li>
                    <Link to={ROUTES.BOOKS}>Products</Link>
                </li>
                {
                user ? 
                <>
                <li>
                    <Link className="hidden lg:block" to={ROUTES.PROFILE}>Dashboard</Link>
                    <details className="lg:hidden">
                        <summary>Dashboard</summary>
                        <ul className="p-2 w-60">
                            <li>
                                <Link to={ROUTES.PROFILE}>
                                    <FaUser></FaUser>
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link to={ROUTES.WISHLIST}>
                                    <FaHeart></FaHeart>
                                    My Wishlist
                                </Link>
                            </li>
                            <li>
                                <Link to={ROUTES.ORDERS}>
                                    <FaShoppingCart></FaShoppingCart>
                                    My Orders
                                </Link>
                            </li>
                            {
                                isAdmin ? 
                                <>
                                    <li className="border-t">
                                        <Link to={ROUTES.USERS}>
                                            <FaUsersLine></FaUsersLine>
                                            User List
                                        </Link>
                                    </li>
                                    <li className="border-t pt-2">
                                        <Link to={ROUTES.ALL_PRODUCTS}>
                                            <FaBook></FaBook>
                                            All Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={ROUTES.NEW_BOOK}>
                                            <FaPlusSquare></FaPlusSquare>
                                            New Product
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={ROUTES.PRODUCT_CATEGORY}>
                                            <FaList></FaList>
                                            Product Categories
                                        </Link>
                                    </li>
                                </>
                                :
                                <></>
                            }
                            <li onClick={handleLogout} className="border-t">
                                <a>
                                    <FaPowerOff></FaPowerOff>
                                    Log Out
                                </a>
                            </li>
                        </ul>
                    </details>
                </li>
                </>
                :
                <></>
                }
            </ul>
        </div>
        {
            user ? <>
                <div className="navbar-end">
                    <Link to={ROUTES.PROFILE}>
                        <User key={user} {...user} showNameOnSmallDevice={false}></User>
                    </Link>
                </div>
            </>:<>
                <div className="navbar-end hidden gap-x-2 md:flex">
                    <Link 
                    to={ROUTES.LOGIN}
                    className="btn bg-teal-600 text-white">Sign In</Link>
                    <Link 
                    to={ROUTES.REGISTER}
                    className="btn btn-outline">Register</Link>
                </div>
            </>
        }
    </div>
  )
}

export default Navbar
