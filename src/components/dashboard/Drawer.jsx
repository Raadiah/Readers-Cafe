import { Link } from "react-router-dom"
import { ROUTES } from "../../routes"
import { AuthContext } from "../../provider/AuthProvider"
import User from "../common/User"
import { useContext } from "react"
import { FaUser, FaUsersLine } from "react-icons/fa6"
import { FaBook, FaHeart, FaShoppingCart } from "react-icons/fa"

const Drawer = ()=>{
    return (
        <div className="drawer">
            <div className="min-h-screen">
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
                    <li className="border-t">
                        <Link to={ROUTES.USERS}>
                            <FaUsersLine></FaUsersLine>
                            User List
                        </Link>
                    </li>
                    <li>
                        <Link to={ROUTES.NEW_BOOK}>
                            <FaBook></FaBook>
                            New Product
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Drawer