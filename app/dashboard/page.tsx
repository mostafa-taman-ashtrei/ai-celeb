import Categories from "@/components/dashboard/Categories";
import Search from "@/components/dashboard/Search";
import prismadb from "@/lib/prisma";

interface props {
    searchParams: {
        categoryId: string;
        name: string;
    };
};

const Dashboard: React.FC<props> = async () => {

    const categories = await prismadb.category.findMany();

    return (
        <div className="h-full p-4 space-y-2">
            <Search />
            <Categories data={categories} />
        </div>
    );
};

export default Dashboard;