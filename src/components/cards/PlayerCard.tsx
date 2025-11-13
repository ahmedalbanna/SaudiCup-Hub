import Image from 'next/image';
import Link from 'next/link';
import type { Player, Team } from '@/lib/mock-data';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

type PlayerCardProps = {
  player: Player;
  team: Team;
};

export function PlayerCard({ player, team }: PlayerCardProps) {
  const stats = [
    { label: 'PAC', value: player.stats.pac },
    { label: 'SHO', value: player.stats.sho },
    { label: 'PAS', value: player.stats.pas },
    { label: 'DRI', value: player.stats.dri },
    { label: 'DEF', value: player.stats.def },
    { label: 'PHY', value: player.stats.phy },
  ];

  return (
    <Link href={`/players/${player.id}`} className="block group">
       <Card className="bg-gradient-to-b from-primary/50 via-card to-background border-2 border-border w-full aspect-[3/4] text-foreground font-headline transition-transform duration-300 group-hover:scale-105 group-hover:border-primary">
        <CardContent className="relative p-2 h-full flex flex-col justify-end">
          {/* Background Player Image */}
          <Image
            src={player.imageUrl}
            alt={`صورة ${player.name}`}
            fill
            className="object-cover rounded-lg opacity-30 group-hover:opacity-50 transition-opacity"
            data-ai-hint="male portrait"
          />

          <div className="relative z-10 flex flex-col h-full">
            {/* Top section: Rating, Position, Flag, Team Logo */}
            <div className="flex-shrink-0 p-2">
              <div className="text-3xl font-bold">{player.rating}</div>
              <div className="text-lg font-semibold -mt-1">{player.position}</div>
              <div className="mt-1 flex flex-col items-start gap-1">
                 <Image src={player.nationality.flagUrl} alt={player.nationality.name} width={32} height={20} className="rounded-sm" data-ai-hint="country flag" />
                 <Image src={team.logoUrl} alt={team.name} width={24} height={24} className="rounded-full" data-ai-hint="team logo" />
              </div>
            </div>

            <div className="flex-grow flex flex-col justify-end">
                {/* Player Name */}
                <div className="text-center my-4">
                  <h3 className="text-2xl font-bold uppercase tracking-wider">{player.name}</h3>
                </div>

                {/* Divider */}
                <hr className="border-border w-11/12 mx-auto" />

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 p-4 text-lg">
                  {stats.map(stat => (
                      <div key={stat.label} className="flex gap-2">
                          <span className="font-bold">{stat.value}</span>
                          <span className="text-muted-foreground">{stat.label}</span>
                      </div>
                  ))}
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
