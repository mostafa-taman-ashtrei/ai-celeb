"use client";

import { CreditCard, Sparkles } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";

interface props {
    isProMember: boolean;
}

const SubscriptionButton: React.FC<props> = ({ isProMember = false }) => {
    const [loading, setLoading] = useState(false);


    const handleClick = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url;
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button variant={isProMember ? "outline" : "gradient"} disabled={loading} onClick={handleClick} >
            {isProMember ? "Manage Subscription" : "Upgrade"}
            {!isProMember ? <Sparkles className="w-4 h-4 ml-2" /> : <CreditCard className="w-4 h-4 ml-2 " />}
        </Button>
    );
};

export default SubscriptionButton;