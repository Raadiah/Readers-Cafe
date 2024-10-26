import { Link } from "react-router-dom"
import { ROUTES } from "../../routes"
import { AuthContext } from "../../provider/AuthProvider"
import User from "../common/User"
import { useContext } from "react"
import { FaUser, FaUsersLine } from "react-icons/fa6"
import { FaBook, FaHeart, FaList, FaPlusSquare, FaPowerOff, FaShoppingCart } from "react-icons/fa"
import toast from "react-hot-toast"

const Drawer = ()=>{
    const {user, logout} = useContext(AuthContext)
    const {isAdmin} = user

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
        <div className="drawer h-full">
            <div className="h-full">
                <ul className="menu bg-white shadow-md min-h-full w-80 p-4">
                {/* Sidebar content here */}
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
                            <div className="divider"></div>
                            <li>
                                <Link to={ROUTES.USERS}>
                                    <FaUsersLine></FaUsersLine>
                                    User List
                                </Link>
                            </li>
                            <div className="divider"></div>
                            <li>
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
                    <div className="divider"></div>
                    <li onClick={handleLogout}>
                        <a>
                            <FaPowerOff></FaPowerOff>
                            Log Out
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Drawer