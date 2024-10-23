import { Outlet } from "react-router-dom"
import Navbar from "../components/common/Navbar"
import Drawer from "../components/dashboard/Drawer"


function DashboardLayout() {
    return (
        <div className="min-h-screen max-h-screen flex flex-col justify-between bg-repeat">
            <Navbar></Navbar>
            <div className="flex pt-16 min-h-screen max-h-screen">
                <div className="hidden lg:block">
                    <Drawer></Drawer>
                </div>
                <div className="max-h-screen overflow-auto w-full"><Outlet></Outlet></div>
            </div>
        </div>
    )
}

export default DashboardLayout