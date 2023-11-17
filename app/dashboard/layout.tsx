import DashboardNavbar from "@/components/navigation/DashboardNavbar";
import Sidebar from "@/components/navigation/Sidebar";
import { checkUserSubscription } from "@/lib/checkUserSubscription";

interface props {
    children: React.ReactNode
}

const Dashboardlayout: React.FC<props> = async ({ children }) => {
    const isProMember = await checkUserSubscription();

    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 z-80 ">
                <Sidebar isProMember={isProMember} />
            </div>
            <main className="md:pl-72 pb-10">
                <DashboardNavbar />
                {children}
            </main>
        </div>
    );
};

export default Dashboardlayout;