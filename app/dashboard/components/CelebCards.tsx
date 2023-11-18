import { Card, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { Celeb } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface props {
  allCelebData: (Celeb & {
    _count: { messages: number },
  })[];
}


const CelebCards: React.FC<props> = ({ allCelebData }) => {
  if (allCelebData.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className="relative w-60 h-60">
          <Image
            fill
            className="grayscale"
            src="/images/bot.png"
            alt="Empty"
          />
        </div>
        <p className="text-sm text-muted-foreground">No celebs found ... start creating some now.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 pb-2">
      {allCelebData.map((celeb) => (
        <TooltipProvider key={celeb.name}>
          <Tooltip>
            <TooltipTrigger>
              <Card className="bg-primary/20 dark:bg-secondary rounded-xl cursor-pointer hover:opacity-75 transition border-0">
                <Link href={`/chat/${celeb.id}`}>
                  <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
                    <div className="relative w-40 h-40">
                      <Image
                        src={celeb.src}
                        fill
                        className="rounded-full object-cover"
                        alt="Character"
                      />
                    </div>
                    <p className="font-bold text-black dark:text-white">
                      {celeb.name}
                    </p>
                    <p className="text-md text-black dark:text-white">
                      {celeb.description}
                    </p>
                  </CardHeader>
                </Link>
              </Card>

              <TooltipContent>
                <div className="flex items-center">
                  Sent a total of
                  <span className="text-sky-500 flex flex-row  items-center mx-1">
                    {celeb._count.messages}
                    <MessageCircle className="w-3.5 h-3.w-3.5" />
                  </span>
                  chats.
                </div>
                <Separator />
                <p>
                  Created by {" "}
                  <span className="text-sky-500">
                    @{celeb.userName}
                  </span>
                </p>
              </TooltipContent>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default CelebCards;