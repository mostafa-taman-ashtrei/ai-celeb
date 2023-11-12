"use client";

import { Button } from "@/components/ui/button";
import GradientText from "@/components/general/GradientText";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

const LandingNavbar = () => {
    const { isSignedIn } = useAuth();

    return (
        <nav className="p-4 bg-transparent flex items-baseline justify-between">
            <Link href="/" className="flex items-center">

                <h1 className={cn("text-2xl font-bold", font.className)}>
                    <GradientText text="A.I Celebrity" />
                </h1>
            </Link>

            <div className="flex items-center gap-x-2">
                {isSignedIn
                    ? <Link href="/dashboard">
                        <Button variant="secondary" className="rounded-full">
                            Get Started
                        </Button>
                    </Link>
                    : <>
                        <Link href="/sign-up">
                            <Button variant="secondary" className="rounded-full">
                                Sign Up
                            </Button>
                        </Link>

                        <Link href="/sign-in">
                            <Button variant="default" className="rounded-full">
                                Sign In
                            </Button>
                        </Link>
                    </>
                }
            </div>
        </nav>
    );
};

export default LandingNavbar;