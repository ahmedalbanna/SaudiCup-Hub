import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import type { Match } from '@/lib/mock-data';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type MatchCardProps = {
  match: Match;
};

export function MatchCard({ match }: MatchCardProps) {
  const matchDate = new Date(match.date);
  
  const statusMap: {[key in Match['status']]: {text: string, className: string}} = {
    scheduled: { text: 'مجدولة', className: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
    live: { text: 'مباشر', className: 'bg-red-500/10 text-red-400 border-red-500/30 animate-pulse' },
    finished: { text: 'انتهت', className: 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/30' }
  }

  return (
    <Card className="flex flex-col bg-card/50 border-border/50 text-foreground transition-all hover:border-border/80">
      <CardHeader className="p-4">
        <div className="flex items-start justify-around">
          <div className="flex flex-col items-center gap-2 text-center w-2/5">
            <Image
              src={match.team1.logoUrl}
              alt={`شعار ${match.team1.name}`}
              width={60}
              height={60}
              className="rounded-full bg-muted/50 p-1"
              data-ai-hint="team logo"
            />
            <span className="font-headline font-semibold text-center leading-tight">{match.team1.name}</span>
            <div className="grid grid-cols-3 gap-x-3 text-xs mt-1">
                <div className="flex flex-col items-center">
                    <span className="font-bold text-foreground">{match.team1.stats.att}</span>
                    <span className="text-muted-foreground">ATT</span>
                </div>
                 <div className="flex flex-col items-center">
                    <span className="font-bold text-foreground">{match.team1.stats.mid}</span>
                    <span className="text-muted-foreground">MID</span>
                </div>
                 <div className="flex flex-col items-center">
                    <span className="font-bold text-foreground">{match.team1.stats.def}</span>
                    <span className="text-muted-foreground">DEF</span>
                </div>
            </div>
          </div>
          <div className="text-center w-1/5 pt-6">
            <p className="font-bold text-3xl text-primary font-headline">
              {match.score ?? 'ضد'}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center w-2/5">
            <Image
              src={match.team2.logoUrl}
              alt={`شعار ${match.team2.name}`}
              width={60}
              height={60}
              className="rounded-full bg-muted/50 p-1"
              data-ai-hint="team logo"
            />
            <span className="font-headline font-semibold text-center leading-tight">{match.team2.name}</span>
             <div className="grid grid-cols-3 gap-x-3 text-xs mt-1">
                <div className="flex flex-col items-center">
                    <span className="font-bold text-foreground">{match.team2.stats.att}</span>
                    <span className="text-muted-foreground">ATT</span>
                </div>
                 <div className="flex flex-col items-center">
                    <span className="font-bold text-foreground">{match.team2.stats.mid}</span>
                    <span className="text-muted-foreground">MID</span>
                </div>
                 <div className="flex flex-col items-center">
                    <span className="font-bold text-foreground">{match.team2.stats.def}</span>
                    <span className="text-muted-foreground">DEF</span>
                </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0 text-center">
        <div className="text-sm text-muted-foreground border-t border-b border-border/50 py-3 space-y-1">
          <p>
            {matchDate.toLocaleDateString('ar-SA', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p>
            {match.time} - {match.venue}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Badge variant="outline" className={statusMap[match.status].className}>
          {statusMap[match.status].text}
        </Badge>
        <Button asChild variant="ghost" size="sm" className="text-primary hover:bg-primary/10 hover:text-primary">
          <Link href={`/schedule/${match.id}`}>تفاصيل المباراة</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
