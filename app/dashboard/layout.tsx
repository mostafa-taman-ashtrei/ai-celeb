import DashboardNavbar from "@/components/navigation/DashboardNavbar";
import Sidebar from "@/components/navigation/Sidebar";

interface props {
    children: React.ReactNode
}

const Dashboardlayout: React.FC<props> = ({ children }) => {
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 z-80 ">
                <Sidebar />
            </div>
            <main className="md:pl-72 pb-10">
                <DashboardNavbar />
                {children}
            </main>
        </div>
    );
};

export default Dashboardlayout;