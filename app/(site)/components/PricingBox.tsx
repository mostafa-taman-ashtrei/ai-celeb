import { Button } from "@/components/ui/button";
import GradientText from "@/components/general/GradientText";
import { Separator } from "@/components/ui/separator";

interface props {
    price: string;
    duration: string;
    packageName: string;
    subtitle: string;
    children: React.ReactNode;
}

const PricingBox: React.FC<props> = ({ price, duration, packageName, subtitle, children }) => {
    return (
        <div className="relative z-10 rounded-xl px-8 py-10 bg-gray-300 dark:bg-gray-900">
            <div className="flex items-center justify-between">
                <h3 className="price mb-2 text-3xl font-bold ">
                    $<span className="amount">{price}</span>
                    <span className="time text-body-color">/{duration}</span>
                </h3>

                <h4 className="mb-2 text-xl font-bold">
                    <GradientText text={packageName} />
                </h4>
            </div>

            <p className="mb-7 text-base text-body-color">{subtitle}</p>

            <Button variant="outline" className="w-full">Get Started</Button>

            <Separator className="my-4" />

            <div>{children}</div>
        </div>

    );
};

export default PricingBox;