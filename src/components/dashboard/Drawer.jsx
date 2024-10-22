import { Link } from "react-router-dom"
import { ROUTES } from "../../routes"
import { AuthContext } from "../../provider/AuthProvider"
import User from "../common/User"
import { useContext } from "react"

const Drawer = ()=>{
    const {user, logout} = useContext(AuthContext);

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
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" checked />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-white border-b fixed top-0 z-50">
                    <div className="navbar-start">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-6 w-6 stroke-current">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                        </label>
                            <div className="mx-2 px-2">
                            <Link 
                            to={ROUTES.HOME}
                            className="btn btn-ghost text-xl">
                                <img className="w-10 h-10" src="/title-icon.png" alt="" />
                                <span className="hidden lg:block">Reader's Cafe</span>
                            </Link>
                        </div>
                    </div>
                    {/* Navbar menu content here */}
                    <div className="hidden md:flex navbar-center">
                        <ul className="menu menu-horizontal">
                            <li>
                                <Link to={ROUTES.HOME}>Home</Link>
                            </li>
                            <li>
                                <Link to={ROUTES.BOOKS}>Products</Link>
                            </li>
                            <li>
                                <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <User key={user} {...user}></User>
                        <button
                        onClick={handleLogout}
                        className="btn hidden md:flex">Log Out</button>
                    </div>
                </div>
                {/* Page content here */}
                Content
            </div>
            <div className="drawer-side mt-16">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                {/* Sidebar content here */}
                    <li className="md:hidden">
                        <Link to={ROUTES.HOME}>Home</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.BOOKS}>Profile</Link>
                    </li>
                    <li className="md:hidden">
                        <Link to={ROUTES.BOOKS}>Products</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.BOOKS}>My Orders</Link>
                    </li>
                    <div className="divider"></div>
                    <li>
                        <Link to={ROUTES.BOOKS}>All Users</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.BOOKS}>Product Mangement</Link>
                    </li>
                    <div className="divider md:hidden"></div>
                    <li onClick={handleLogout} className="border-t md:hidden">
                        <a>Log Out</a>
                    </li>
                </ul>
            </div>
            </div>
    )
}

export default Drawer