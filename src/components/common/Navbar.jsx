import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from '../../routes/index';
import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";
import User from "./User";

function Navbar() {
  const ACTIVE_BUTTON_CLASS = 'rounded btn-active btn-ghost'
  const {user, logout} = useContext(AuthContext);
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
                    <Link to={ROUTES.BOOKS}>Products</Link>
                </li>
                {
                    user ? <>
                        <User key={user} {...user}></User>
                        <li onClick={handleLogout} className="border-t">
                            Log Out
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
                <span>Reader's Cafe</span>
            </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
                <li>
                    <Link to={ROUTES.HOME}>Home</Link>
                </li>
                <li>
                    <Link to={ROUTES.BOOKS}>Products</Link>
                </li>
            </ul>
        </div>
        <div className="navbar-end hidden gap-x-2 lg:flex">
        {
            user ? <>
                <User key={user} {...user}></User>
                    <button
                    onClick={handleLogout}
                    className="btn">Log Out</button>
                </> : <>
                <Link 
                to={ROUTES.LOGIN}
                className="btn bg-teal-600 text-white">Sign In</Link>
                <Link 
                to={ROUTES.REGISTER}
                className="btn btn-outline">Register</Link>
            </>
        }
        </div>
    </div>
  )
}

export default Navbar
