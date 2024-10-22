import { Outlet } from "react-router-dom"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import DashboardContent from "../components/dashboard/DashboardContent"
import Drawer from "../components/dashboard/Drawer"


function DashboardLayout() {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-body-pattern bg-repeat">
            <Drawer></Drawer>
            <DashboardContent></DashboardContent>
            <div className="mt-16">
            </div>
        </div>
    )
}

export default DashboardLayout