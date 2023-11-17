import { auth, redirectToSignIn } from "@clerk/nextjs";

import NewCeleb from "./components/NewCeleb";
import { checkUserSubscription } from "@/lib/checkUserSubscription";
import prismadb from "@/lib/prisma";
import { redirect } from "next/navigation";

interface props {
    params: {
        celebId: string;
    };
}

const CelebPage: React.FC<props> = async ({ params }) => {
    const { userId } = auth();

    const isProMemeber = await checkUserSubscription();

    if (!userId) return redirectToSignIn();
    if (!isProMemeber) redirect("/dashboard");



    const celeb = await prismadb.celeb.findUnique({
        where: {
            id: params.celebId,
            userId,
        }
    });

    const categories = await prismadb.category.findMany();

    return (
        <NewCeleb
            categories={categories}
            initialData={celeb}
        />
    );
};

export default CelebPage;