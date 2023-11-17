import { auth, currentUser } from "@clerk/nextjs";

import { NextResponse } from "next/server";
import { checkUserSubscription } from "@/lib/checkUserSubscription";
import prismadb from "@/lib/prisma";

interface paramsType {
    params: { celebId: string }
}

export const PATCH = async (req: Request, { params }: paramsType) => {
    try {
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description, instructions, seed, categoryId } = body;

        if (!params.celebId) return new NextResponse("Companion ID required", { status: 400 });
        if (!user || !user.id || !user.username) return new NextResponse("Unauthorized", { status: 401 });
        if (!src || !name || !description || !instructions || !seed || !categoryId) return new NextResponse("Missing required fields", { status: 400 });


        const isProMember = await checkUserSubscription();
        if (!isProMember) return new NextResponse("Pro subscription required", { status: 403 });

        const celeb = await prismadb.celeb.update({
            where: {
                id: params.celebId,
                userId: user.id,
            },
            data: {
                categoryId,
                userId: user.id,
                userName: user.username,
                src,
                name,
                description,
                instructions,
                seed,
            }
        });

        return NextResponse.json(celeb);
    } catch {
        return new NextResponse("Internal Error", { status: 500 });
    }
};

export const DELETE = async (_request: Request, { params }: paramsType) => {
    try {
        const { userId } = auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const celeb = await prismadb.celeb.delete({
            where: { userId, id: params.celebId }
        });

        return NextResponse.json(celeb);
    } catch {
        return new NextResponse("Internal Error", { status: 500 });
    }
};