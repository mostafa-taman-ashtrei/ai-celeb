import Categories from "@/components/dashboard/Categories";
import CelebCards from "./components/CelebCards";
import Search from "@/components/dashboard/Search";
import prismadb from "@/lib/prisma";

interface props {
    searchParams: {
        categoryId: string;
        name: string;
    };
};

const Dashboard: React.FC<props> = async ({ searchParams }) => {
    const allCelebData = await prismadb.celeb.findMany({
        where: {
            categoryId: searchParams.categoryId,
            name: { search: searchParams.name }
        },
        orderBy: { createdAt: "desc" }
    });

    const categories = await prismadb.category.findMany();

    return (
        <div className="h-full p-4 space-y-2">
            <Search />
            <Categories data={categories} />
            <CelebCards allCelebData={allCelebData} />
        </div>
    );
};

export default Dashboard;