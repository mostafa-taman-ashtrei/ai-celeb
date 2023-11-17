"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ShoppingBag, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import GradientText from "../general/GradientText";
import axios from "axios";
import toast from "react-hot-toast";
import { useProModal } from "@/hooks/useProModal";

const SubscriptionModal = () => {
    const { isOpen, closeModal } = useProModal();
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);

    const handleSubscribe = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url;
        } catch {
            toast.error("Something went wrong ... try again later");
        } finally {
            setLoading(false);
        }
    };

    if (!isMounted) return null;

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent>
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-center">
                        Upgrade to <GradientText text="AI Celeb Pro" />
                    </DialogTitle>
                    <DialogDescription className="text-center space-y-2">
                        With the pro plan you can
                        Create
                        <span className="mx-1 font-bold underline">
                            Unlimited AI Celeb Bots
                        </span>
                        celebs.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-between items-center">
                    <p className="text-3xl font-medium">
                        $7<span className="text-lg font-normal">.99 / month</span>
                    </p>

                    <Button
                        onClick={handleSubscribe}
                        disabled={loading}
                        variant="gradient"
                        className="w-1/3 flex gap-1 items-center"
                    >
                        {
                            loading
                                ? <>
                                    <ShoppingBag className="animate-bounce" />
                                    Checking Out
                                </>
                                : <>
                                    <Sparkles />
                                    Upgrade
                                </>
                        }
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SubscriptionModal;