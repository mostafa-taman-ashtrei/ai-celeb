import { Card, CardHeader } from "@/components/ui/card";

import { Celeb } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface props {
  allCelebData: Celeb[];
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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10">
      {allCelebData.map((celeb) => (
        <Card key={celeb.name} className="bg-primary/20   dark:bg-secondary rounded-xl  cursor-pointer hover:opacity-75 transition border-0">
          <Link href={`/chat/${celeb.id}`}>
            <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
              <div className="relative w-32 h-32">
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
              <p className="text-sm text-black dark:text-white">
                {celeb.description}
              </p>
              <p className="text-xs lowercase">@{celeb.userName}</p>
            </CardHeader>

          </Link>
        </Card>
      ))}
    </div>
  );
};

export default CelebCards;