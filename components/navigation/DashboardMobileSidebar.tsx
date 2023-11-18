import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { checkUserSubscription } from "@/lib/checkUserSubscription";

const DashboardMobileSidebar = async () => {
    const isProMember = await checkUserSubscription();

    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="md:hidden" />
            </SheetTrigger>

            <SheetContent side="left" className="p-0 w-1/2">
                <Sidebar isProMember={isProMember} />
            </SheetContent>
        </Sheet>
    );
};

export default DashboardMobileSidebar;