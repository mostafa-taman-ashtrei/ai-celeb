import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const DashboardMobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-1/2">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};

export default DashboardMobileSidebar;