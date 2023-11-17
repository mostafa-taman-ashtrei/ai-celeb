import { checkUserSubscription } from "@/lib/checkUserSubscription";

const SettingsPage = async () => {
    const isProMember = await checkUserSubscription();

    return (
        <div>
            You {isProMember ? "ARE" : "ARE NOT"} a pro member
        </div>
    );
};

export default SettingsPage;