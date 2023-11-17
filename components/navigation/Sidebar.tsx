"use client";

import { LayoutDashboardIcon, Plus, Settings, Sparkles } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "../ui/button";
import GradientText from "../general/GradientText";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { useProModal } from "@/hooks/useProModal";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });

interface props {
    isProMember: boolean;
}

const Sidebar: React.FC<props> = ({ isProMember }) => {
    const pathname = usePathname();
    const { openModal } = useProModal();
    const router = useRouter();

    const routes = [
        {
            icon: LayoutDashboardIcon,
            href: "/dashboard",
            label: "Gallery",
            isProRoute: false,
            color: "text-sky-500",
        },
        {
            icon: Plus,
            href: "/dashboard/celeb/new",
            label: "Add",
            isProRoute: true,
            color: "text-sky-500"
        },
        {
            icon: Settings,
            href: "/dashboard/settings",
            label: "Settings",
            isProRoute: false,
            color: "text-sky-500"
        }
    ];


    const handleNav = (href: string, isProRoute: boolean) => {
        if (isProRoute && !isProMember) return openModal();
        return router.push(href);
    };


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
                        <div
                            key={route.href}
                            onClick={() => handleNav(route.href, route.isProRoute)}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-black  dark:hover:text-white hover:bg-gray-400  dark:hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white  dark:text-white bg-gray-400  dark:bg-white/10" : "text-zinc-500 dark:text-zinc-400",
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {
                isProMember && <div className="p-3 w-full justify-around">
                    <Button
                        variant="gradient"
                        className="w-full flex flex-row gap-1 justify-center"
                        onClick={openModal}
                    >
                        <Sparkles />
                        Upgarde To Pro
                    </Button>
                </div>
            }

        </div>
    );
};

export default Sidebar;