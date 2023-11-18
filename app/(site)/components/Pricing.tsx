import GradientText from "@/components/general/GradientText";
import PriceFeature from "./PriceFeature";
import PricingBox from "./PricingBox";

const Pricing: React.FC = () => {
    return (
        <section className="relative z-10 mt-32">
            <div>
                <h2 className="mb-4 text-2xl font-semibold tracking-tighter text-center lg:text-7xl md:text-6xl">
                    <GradientText text="Plans" />
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-2 m-4 mx-16">
                    <PricingBox
                        packageName="Free Forever"
                        price={"0"}
                        duration={"mo"}
                        subtitle="Enjoy the app without ever paying anything."
                    >
                        <PriceFeature text="Chat With Any bots" status="active" />
                        <PriceFeature text="Unlimited Chats" status="active" />
                        <PriceFeature text="Browse Gallery" status="active" />
                        <PriceFeature text="Create Bots" status="inactive" />
                        <PriceFeature text="Early Access To New Features" status="inactive" />
                        <PriceFeature text="Free Lifetime Updates" status="inactive" />
                    </PricingBox>

                    <PricingBox
                        packageName="Basic"
                        price={"399"}
                        duration={"mo"}
                        subtitle="Lorem ipsum dolor sit amet adiscing elit Mauris egestas enim."
                    >
                        <PriceFeature text="Chat With Any bots" status="active" />
                        <PriceFeature text="Unlimited Chats" status="active" />
                        <PriceFeature text="Browse Gallery" status="active" />
                        <PriceFeature text="Create Bots" status="active" />
                        <PriceFeature text="Early Access To New Features" status="active" />
                        <PriceFeature text="Free Lifetime Updates" status="active" />
                    </PricingBox>
                </div>
            </div>
        </section>
    );
};

export default Pricing;