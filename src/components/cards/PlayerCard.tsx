import Image from 'next/image';
import Link from 'next/link';
import type { Player, Team } from '@/lib/mock-data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type PlayerCardProps = {
  player: Player;
  team: Team;
};

export function PlayerCard({ player, team }: PlayerCardProps) {
  return (
    <Card className="text-center">
      <CardContent className="p-0">
        <Link href={`/players/${player.id}`}>
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={player.imageUrl}
              alt={`صورة ${player.name}`}
              fill
              className="rounded-t-lg object-cover transition-transform duration-300 hover:scale-105"
              data-ai-hint="male portrait"
            />
          </div>
        </Link>
      </CardContent>
      <CardHeader className="p-4">
        <CardTitle className="font-headline text-xl">
          <Link href={`/players/${player.id}`} className="hover:underline">
            {player.name}
          </Link>
        </CardTitle>
        <CardDescription>{player.position}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-center justify-center p-4 pt-0">
        <Link href={`/teams/${team.id}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Image
                src={team.logoUrl}
                alt={`شعار ${team.name}`}
                width={20}
                height={20}
                className="rounded-full"
                data-ai-hint="team logo"
            />
            <span>{team.name}</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
