"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const UserProfileButton: React.FC = () => {
    const { resolvedTheme } = useTheme();
    const clerkTheme = resolvedTheme === "dark" ? { baseTheme: dark } : undefined;


    return (
        <UserButton
            userProfileProps={{ appearance: clerkTheme }}
            appearance={clerkTheme}
            afterSignOutUrl="/"
        />
    );
};

export default UserProfileButton;