import { Card, CardFooter, CardHeader } from "@/components/ui/card";

import { Celeb } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
      {allCelebData.map((celeb) => (
        <Card
          key={celeb.name}
          className="bg-primary/20 dark:bg-secondary rounded-2xl cursor-pointer hover:opacity-75 transition border-0"
        >
          <Link href={`/chat/${celeb.id}`}>
            <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
              <div className="relative w-40 h-40">
                <Image
                  src={celeb.src}
                  fill
                  className="rounded-xl object-cover"
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

            <CardFooter className=" flex items-center justify-between text-xs text-secondary-foreground ">
              <p className="lowercase">@{celeb.userName}</p>
              <div className="flex items-center">
                <MessageCircle className="w-3 h-3 mr-1" />
                {celeb._count.messages}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default CelebCards;