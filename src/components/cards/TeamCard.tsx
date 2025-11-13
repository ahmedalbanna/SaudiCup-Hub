import Image from 'next/image';
import Link from 'next/link';
import type { Team } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Star, StarHalf } from 'lucide-react';

type TeamCardProps = {
  team: Team;
};

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex justify-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-5 w-5 text-accent fill-accent" />
      ))}
      {halfStar && <StarHalf className="h-5 w-5 text-accent fill-accent" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-5 w-5 text-accent/40 fill-accent/20" />
      ))}
    </div>
  );
};


export function TeamCard({ team }: TeamCardProps) {
  return (
    <Link href={`/teams/${team.id}`} className="block group">
       <Card className="bg-gradient-to-b from-primary/80 to-primary/90 border-2 border-transparent w-full aspect-[3/4] text-primary-foreground font-headline transition-transform duration-300 group-hover:scale-105 group-hover:border-primary">
        <CardContent className="relative p-4 h-full flex flex-col justify-between items-center text-center">
            <h3 className="font-bold text-xl uppercase tracking-wider">{team.name}</h3>

            <Image
                src={team.logoUrl}
                alt={`${team.name} logo`}
                width={120}
                height={120}
                className="my-4"
                data-ai-hint="team logo"
            />

            <div>
                <StarRating rating={team.rating} />
                 <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                    <div>
                        <p className="text-sm font-semibold opacity-80">ATT</p>
                        <p className="text-2xl font-bold">{team.stats.att}</p>
                    </div>
                     <div>
                        <p className="text-sm font-semibold opacity-80">MID</p>
                        <p className="text-2xl font-bold">{team.stats.mid}</p>
                    </div>
                     <div>
                        <p className="text-sm font-semibold opacity-80">DEF</p>
                        <p className="text-2xl font-bold">{team.stats.def}</p>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </Link>
  );
}
