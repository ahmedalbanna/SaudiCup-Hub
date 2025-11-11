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
        <div className="relative aspect-square">
          <Image
            src={player.imageUrl}
            alt={`Portrait of ${player.name}`}
            fill
            className="rounded-t-lg object-cover"
            data-ai-hint="male portrait"
          />
        </div>
      </CardContent>
      <CardHeader className="p-4">
        <CardTitle className="font-headline text-xl">{player.name}</CardTitle>
        <CardDescription>{player.position}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-center justify-center p-4 pt-0">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Image
                src={team.logoUrl}
                alt={`${team.name} logo`}
                width={20}
                height={20}
                className="rounded-full"
                data-ai-hint="team logo"
            />
            <span>{team.name}</span>
        </div>
         <Link
            href={`/players/${player.id}`}
            className="mt-4 text-sm font-semibold text-primary hover:underline"
        >
            View Profile
        </Link>
      </CardFooter>
    </Card>
  );
}
