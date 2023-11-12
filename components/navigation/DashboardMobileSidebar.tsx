import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const DashboardMobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="md:hidden" />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-1/2">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};

export default DashboardMobileSidebar;