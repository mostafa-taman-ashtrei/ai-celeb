import { ArrowRightCircle, Bot, MessageCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import GradientText from "@/components/general/GradientText";
import Link from "next/link";

const features = [
    {
        id: 1,
        icon: (<MessageCircle />),
        title: "Chat",
        desc:
            "Chat with any bot you want in the bot galley. Your chat history is recorded so you can check it out later and the bots can tell the context of the conversation.",
    },
    {
        id: 2,
        icon: (<Bot />),
        title: "Create Bots",
        desc:
            "Do not just settle for bots other users created instead create your own in just a few steps. Whether you want to talk with a celebrity, a historical figure or a fictional character it's all possible.",
    },
];


const Features: React.FC = () => {
    return (
        // <section className="py-16 md:py-20 lg:py-28">
        //     <h2 className="mb-1 text-2xl font-semibold tracking-tighter text-center lg:text-7xl md:text-6xl">
        //         <GradientText text="Features" />
        //     </h2>

        //     <div className="pt-12 pb-24 max-w-4xl mx-auto grid gap-2 md:px-1 px-3">
        //         {features.map((feature) => (
        //             <div key={feature.id} className="rounded-xl p-4 border-4 border-solid border-gray-500 dark:border-gray-900">
        //                 <div className="flex flex-row gap-2 items-center justify-center">
        //                     {feature.icon}

        //                     <h3 className="font-semibold text-lg">
        //                         {feature.title}
        //                     </h3>
        //                 </div>

        //                 <p className="pt-2 value-text text-md  fkrr1">
        //                     {feature.desc}
        //                 </p>
        //             </div>
        //         ))}
        //     </div>
        // </section>

        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <div>

                    <h2 className="mb-1 text-2xl font-semibold tracking-tighter text-center lg:text-7xl md:text-6xl">
                        <GradientText text="Features" />
                    </h2>
                    <Badge className="bg-green-500">Brand New</Badge>
                </div>
            </div>

            <div className="grid gap-2  lg:grid-cols-2">
                {
                    features.map((feature) => (
                        <div className="max-w-md rounded-xl sm:mx-auto sm:text-center cursor-pointer bg-gray-300 dark:bg-gray-900 p-4" key={feature.id}>
                            <div className="flex flex-row justify-between mb-2">
                                <div className="flex flex-row gap-2 items-center justify-center">
                                    {feature.icon}

                                    <h3 className="font-semibold text-lg">
                                        {feature.title}
                                    </h3>
                                </div>

                                <Link href="/dashboard">
                                    <ArrowRightCircle className="hover:text-sky-500" />
                                </Link>
                            </div>

                            <p className="mb-3 text-sm text-justify text-gray-500">
                                {feature.desc}
                            </p>
                        </div>

                    ))
                }
            </div>
        </div>
    );
};

export default Features;