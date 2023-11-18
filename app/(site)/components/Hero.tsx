import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero: React.FC = () => {
    return (
        <>
            <section className="relative z-10 overflow-hidden pb-16 pt-[120px] md:pb-[120px] md:pt-[120px] xl:pb-[160px] xl:pt-[120px] 2xl:pb-[200px] 2xl:pt-[210px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div className=" mx-auto max-w-[1000px] text-center">
                                <Badge className="bg-sky-500">✨ Chat Partners Perfected</Badge>

                                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                                    Free and Open-Source Next.js Template for Startup & SaaS
                                </h1>

                                <p className="dark:text-body-color-dark mb-5 text-base !leading-relaxed text-body-color sm:text-lg md:text-lg">
                                    A one of a kind chat bot ... where you can chat with any celebrity / famous person dead or alive through the
                                    magnificent power of AI. If you are a <strong><u>PRO</u></strong> member you can create a chat bot of whoever you want in just a few clicks

                                </p>

                                <Link href="/dashboard">
                                    <Button variant="gradient" size="lg" className="rounded-full w-1/2">
                                        Get Started
                                    </Button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
                    <svg
                        width="364"
                        height="201"
                        viewBox="0 0 364 201"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            opacity="0.8"
                            cx="214.505"
                            cy="60.5054"
                            r="49.7205"
                            transform="rotate(-13.421 214.505 60.5054)"
                            stroke="url(#paint4_linear_25:218)"
                        />
                        <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
                    </svg>
                </div>

                <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
                    <svg
                        width="364"
                        height="201"
                        viewBox="0 0 364 201"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >

                        <circle
                            opacity="0.8"
                            cx="214.505"
                            cy="60.5054"
                            r="49.7205"
                            transform="rotate(-13.421 214.505 60.5054)"
                            stroke="url(#paint4_linear_25:218)"
                        />
                        <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />

                        <defs>
                            <linearGradient
                                id="paint0_linear_25:218"
                                x1="184.389"
                                y1="69.2405"
                                x2="184.389"
                                y2="212.24"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" />
                            </linearGradient>
                            <linearGradient
                                id="paint1_linear_25:218"
                                x1="156.389"
                                y1="69.2405"
                                x2="156.389"
                                y2="212.24"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" />
                            </linearGradient>
                            <linearGradient
                                id="paint2_linear_25:218"
                                x1="125.389"
                                y1="69.2405"
                                x2="125.389"
                                y2="212.24"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" />
                            </linearGradient>
                            <linearGradient
                                id="paint3_linear_25:218"
                                x1="93.8507"
                                y1="67.2674"
                                x2="89.9278"
                                y2="210.214"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" stopOpacity="0" />
                                <stop offset="1" stopColor="#4A6CF7" />
                            </linearGradient>
                            <linearGradient
                                id="paint4_linear_25:218"
                                x1="214.505"
                                y1="10.2849"
                                x2="212.684"
                                y2="99.5816"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" />
                                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                            </linearGradient>
                            <radialGradient
                                id="paint5_radial_25:218"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(220 63) rotate(90) scale(43)"
                            >
                                <stop offset="0.145833" stopColor="white" stopOpacity="0" />
                                <stop offset="1" stopColor="white" stopOpacity="0.08" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
            </section>


        </>
    );
};

export default Hero;