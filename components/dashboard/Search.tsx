"use client";

import { ChangeEventHandler, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "../ui/input";
import { Search as SearchIcon } from "lucide-react";
import qs from "query-string";
import { useDebounce } from "@/hooks/useDebounce";

const Search: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("categoryId");
    const name = searchParams.get("name");

    const [value, setValue] = useState(name || "");
    const debouncedValue = useDebounce<string>(value, 500);


    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        const query = {
            name: debouncedValue,
            categoryId: categoryId,
        };

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, { skipNull: true, skipEmptyString: true });

        router.push(url);
    }, [debouncedValue, router, categoryId]);


    return (
        <div className="relative">
            <SearchIcon className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />

            <Input
                onChange={onChange}
                value={value}
                placeholder="What are you looking for?"
                className="pl-10 bg-primary/10"

            />
        </div>
    );
};

export default Search;