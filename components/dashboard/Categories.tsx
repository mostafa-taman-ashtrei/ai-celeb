"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Category } from "@prisma/client";
import { cn } from "@/lib/utils";
import qs from "query-string";

interface props {
    data: Category[]
}

const Categories: React.FC<props> = ({ data }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("categoryId");

    const handleClick = (id: string | undefined) => {
        const query = { categoryId: id };

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, { skipNull: true });

        router.push(url);
    };

    return (
        <div className="w-full overflow-x-auto space-x-2 flex p-1">
            <button
                onClick={() => handleClick(undefined)}
                className={cn(
                    `flex items-center  text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-2  rounded-full bg-primary/10 hover:opacity-75 transition`,
                    !categoryId ? "bg-sky-700 text-white" : "bg-primary/10"
                )}
            >
                Latest
            </button>

            {data.map((item) => (
                <button
                    onClick={() => handleClick(item.id)}
                    className={cn(
                        `flex items-center   text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-full bg-primary/10 hover:opacity-75 transition`,
                        item.id === categoryId ? "bg-sky-700 text-white" : "bg-primary/10"
                    )}
                    key={item.id}
                >
                    {item.name}
                </button>
            ))}
        </div>
    );
};

export default Categories;