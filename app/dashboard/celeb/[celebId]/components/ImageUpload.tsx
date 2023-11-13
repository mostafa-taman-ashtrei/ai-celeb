"use client";

import { useEffect, useState } from "react";

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

interface props {
    value: string;
    // eslint-disable-next-line no-unused-vars
    onChange: (src: string) => void;
    disabled?: boolean;
}

const ImageUpload: React.FC<props> = ({ value, onChange }) => {
    const [isMounted, setIsMounted] = useState(false);

    // prevent hydration error.
    useEffect(() => { setIsMounted(true); }, []);
    if (!isMounted) return false;



    return (
        <CldUploadButton options={{ maxFiles: 1 }} onUpload={(result: any) => onChange(result.info.secure_url)} uploadPreset="qsglfyce">
            <div
                className=" border-2 p-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-4 items-center justify-center"
            >
                <div className="relative h-40 w-40">
                    <Image
                        fill
                        alt="Upload Image"
                        src={value || "/images/bot.png"}
                        className="rounded-lg object-cover"
                    />
                </div>
            </div>
        </CldUploadButton>
    );
};

export default ImageUpload;