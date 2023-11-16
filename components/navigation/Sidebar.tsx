"use client";

import { LayoutDashboardIcon, Plus, Settings } from "lucide-react";

import GradientText from "../general/GradientText";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });

const Sidebar = () => {
    const pathname = usePathname();
    const routes = [
        {
            icon: LayoutDashboardIcon,
            href: "/dashboard",
            label: "Gallery",
            pro: false,
            color: "text-sky-500"
        },
        {
            icon: Plus,
            href: "/dashboard/celeb/new",
            label: "Add",
            pro: true,
            color: "text-sky-500"
        },
        {
            icon: Settings,
            href: "/settings",
            label: "Settings",
            pro: false,
            color: "text-sky-500"
        }
    ];


    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-primary/20 dark:bg-secondary">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <h1 className={cn("text-2xl font-bold", poppins.className)}>
                        <GradientText text="A.I Celeb" />
                    </h1>
                </Link>

                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-black  dark:hover:text-white hover:bg-gray-400  dark:hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white  dark:text-white bg-gray-400  dark:bg-white/10" : "text-zinc-500 dark:text-zinc-400",
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;