import { auth, redirectToSignIn } from "@clerk/nextjs";

import Chat from "./components/Chat";
import prismadb from "@/lib/prisma";
import { redirect } from "next/navigation";

interface props {
    params: {
        chatId: string;
    }
}

const ChatPage: React.FC<props> = async ({ params }) => {
    const { userId } = auth();
    if (!userId) return redirectToSignIn();


    const celebData = await prismadb.celeb.findUnique({
        where: { id: params.chatId },
        include: {
            messages: {
                orderBy: { createdAt: "asc" },
                where: { userId }
            },
            _count: {
                select: { messages: true }
            }
        }
    });

    if (!celebData) return redirect("/dashboard");

    return (
        <Chat celebData={celebData} />
    );
};

export default ChatPage;