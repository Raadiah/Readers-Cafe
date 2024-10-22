import { Outlet } from "react-router-dom"
import Navbar from "../components/common/Navbar"
import Drawer from "../components/dashboard/Drawer"


function DashboardLayout() {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-body-pattern bg-repeat">
            <Navbar></Navbar>
            <div className="flex pt-16">
                <div className="hidden lg:block">
                    <Drawer></Drawer>
                </div>
                <div><Outlet></Outlet></div>
            </div>
        </div>
    )
}

export default DashboardLayout