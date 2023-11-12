"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";

const UserProfileButton = () => {
    return (
        <UserButton afterSignOutUrl="/" />
    );
};

export default UserProfileButton;