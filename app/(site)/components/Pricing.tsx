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

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-2 m-4">
                    <PricingBox
                        packageName="Free Forever"
                        price={"0"}
                        duration={"mo"}
                        subtitle="Enjoy the app without ever paying anything."
                        buttonText="Start Now"
                        isPro={false}
                    >
                        <PriceFeature text="Chat With Any bots" status="active" />
                        <PriceFeature text="Unlimited Chats" status="active" />
                        <PriceFeature text="Browse Gallery" status="active" />
                        <PriceFeature text="Create Bots" status="inactive" />
                        <PriceFeature text="Early Access To New Features" status="inactive" />
                        <PriceFeature text="Free Lifetime Updates" status="inactive" />
                    </PricingBox>

                    <PricingBox
                        packageName="Pro"
                        price={"7.99"}
                        duration={"mo"}
                        subtitle="Unlock all the pro features for the low price $7.99/month."
                        buttonText="Subscribe"
                        isPro={true}
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