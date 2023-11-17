import { Cog } from "lucide-react";
import Heading from "@/components/general/Heading";
import SubscriptionButton from "./components/SubscriptionButton";
import { checkUserSubscription } from "@/lib/checkUserSubscription";

const SettingsPage = async () => {
    const isProMember = await checkUserSubscription();

    return (
        <div>
            <Heading
                title="Settings"
                description=""
                icon={Cog}
                iconColor="text-sky-700"
                bgColor="bg-sky-700/10"
            />


            <div className="px-4 mx-8 lg:px-8 space-y-4 content-center">
                <div className="grid gap-4 grid-cols-2 items-center">
                    <div className="text-muted-foreground">
                        {isProMember ? "You are currently on a Pro plan." : "You are currently on a free plan."}
                    </div>

                    <SubscriptionButton isProMember={isProMember} />
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;