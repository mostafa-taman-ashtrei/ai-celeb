"use client";

import { Celeb, Message } from "@prisma/client";
import { ChevronLeft, Edit, MessageCircle, MoreVertical, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import CelebAvatar from "@/components/general/CelebAvatar";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface props {
    celebData: Celeb & {
        messages: Message[];
        _count: { messages: number }
    };
}
const Header: React.FC<props> = ({ celebData }) => {
    const router = useRouter();
    const { user } = useUser();

    const handleDelete = () => { };

    return (
        <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
            <div className="flex gap-x-2 items-center">
                <Button onClick={() => router.back()} size="icon" variant="secondary" className="rounded-full">
                    <ChevronLeft className="h-8 w-8" />
                </Button>

                <CelebAvatar src={celebData.src} />

                <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold">{celebData.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            {celebData._count.messages}
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Created by {celebData.userName}
                    </p>
                </div>
            </div>

            {user?.id === celebData.userId && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/dashboard/celeb/${celebData.id}`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete}>
                            <Trash className="w-4 h-4 mr-2" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
};

export default Header;