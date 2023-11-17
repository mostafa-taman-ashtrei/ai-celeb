import { auth } from "@clerk/nextjs";
import prismadb from "./prisma";

const DayInMs = 86400000;

export const checkUserSubscription = async () => {
    const { userId } = auth();
    if (!userId) return false;

    const userSubscription = await prismadb.userSubscription.findUnique({
        where: { userId: userId },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
        },
    });

    if (!userSubscription) return false;

    const isValid = userSubscription.stripePriceId && userSubscription.stripeCurrentPeriodEnd?.getTime()! + DayInMs > Date.now();
    return !!isValid;
};