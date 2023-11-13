import { auth, redirectToSignIn } from "@clerk/nextjs";

import NewCeleb from "./components/NewCeleb";
import prismadb from "@/lib/prisma";

interface props {
    params: {
        celebId: string;
    };
}

const CelebPage: React.FC<props> = async ({ params }) => {
    const { userId } = auth();

    if (!userId) return redirectToSignIn();


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