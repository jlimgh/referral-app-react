import { Outlet } from "react-router-dom"
import DashSidebarNav from "./DashSidebarNav"

const DashLayout = () => {
   
    return (
        <>
            <DashSidebarNav />
            <main className="sm:ml-72 sm:mr-6 sm:mt-10">
                <Outlet />
            </main>

        </>

    )
}

export default DashLayout