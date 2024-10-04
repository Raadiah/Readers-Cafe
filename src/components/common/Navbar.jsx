import { Link } from "react-router-dom";
import { ROUTES } from '../../routes/index';

function Navbar() {
  const ACTIVE_BUTTON_CLASS = 'rounded btn-active btn-ghost'

  return (
    <div className="navbar bg-base-100 fixed top-0 z-10">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                    <Link to={ROUTES.HOME}>Home</Link>
                </li>
                <li>
                    <Link to={ROUTES.ABOUT}>About</Link>
                </li>
                <li>
                    <Link to={ROUTES.BLOG}>Blog</Link>
                </li>
                <li>
                    <Link to={ROUTES.FAQ}>FAQ</Link>
                </li>
                <li className="border-t">
                    <Link to={ROUTES.BUY}>Buy Book</Link>
                </li>
                <li>
                    <Link to={ROUTES.SIGNIN}>Sign In</Link>
                </li>
            </ul>
            </div>
            <Link 
            to={ROUTES.HOME}
            className="btn btn-ghost text-xl">
                <img className="w-10 h-10" src="/title-icon.png" alt="" />
                <span>Reader's Cafe</span>
            </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
                <li>
                    <Link to={ROUTES.HOME}>Home</Link>
                </li>
                <li>
                    <Link to={ROUTES.ABOUT}>About</Link>
                </li>
                <li>
                    <Link to={ROUTES.BLOG}>Blog</Link>
                </li>
                <li>
                    <Link to={ROUTES.FAQ}>FAQ</Link>
                </li>
            </ul>
        </div>
        <div className="navbar-end hidden gap-x-2 lg:flex">
            <Link 
            to={ROUTES.BUY}
            className="btn bg-teal-600 text-white">Buy Book</Link>
            <Link 
            to={ROUTES.SIGNIN}
            className="btn btn-outline">Sign In</Link>
        </div>
    </div>
  )
}

export default Navbar
