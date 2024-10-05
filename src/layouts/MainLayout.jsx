import { Outlet } from "react-router-dom"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"


function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Navbar></Navbar>
            <div className="pt-16">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default MainLayout