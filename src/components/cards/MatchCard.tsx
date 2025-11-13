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
    finished: { text: 'انتهت', className: 'bg-gray-500/10 text-gray-400 border-gray-500/30' }
  }

  return (
    <Card className="flex flex-col bg-gray-800/50 border-gray-700/50 text-white transition-all hover:border-gray-600/80">
      <CardHeader className="p-4">
        <div className="flex items-start justify-around">
          <div className="flex flex-col items-center gap-2 text-center w-2/5">
            <Image
              src={match.team1.logoUrl}
              alt={`شعار ${match.team1.name}`}
              width={60}
              height={60}
              className="rounded-full bg-gray-700/50 p-1"
              data-ai-hint="team logo"
            />
            <span className="font-headline font-semibold text-center leading-tight">{match.team1.name}</span>
            <div className="grid grid-cols-3 gap-x-3 text-xs mt-1">
                <div className="flex flex-col items-center">
                    <span className="font-bold text-gray-300">{match.team1.stats.att}</span>
                    <span className="text-gray-400">ATT</span>
                </div>
                 <div className="flex flex-col items-center">
                    <span className="font-bold text-gray-300">{match.team1.stats.mid}</span>
                    <span className="text-gray-400">MID</span>
                </div>
                 <div className="flex flex-col items-center">
                    <span className="font-bold text-gray-300">{match.team1.stats.def}</span>
                    <span className="text-gray-400">DEF</span>
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
              className="rounded-full bg-gray-700/50 p-1"
              data-ai-hint="team logo"
            />
            <span className="font-headline font-semibold text-center leading-tight">{match.team2.name}</span>
             <div className="grid grid-cols-3 gap-x-3 text-xs mt-1">
                <div className="flex flex-col items-center">
                    <span className="font-bold text-gray-300">{match.team2.stats.att}</span>
                    <span className="text-gray-400">ATT</span>
                </div>
                 <div className="flex flex-col items-center">
                    <span className="font-bold text-gray-300">{match.team2.stats.mid}</span>
                    <span className="text-gray-400">MID</span>
                </div>
                 <div className="flex flex-col items-center">
                    <span className="font-bold text-gray-300">{match.team2.stats.def}</span>
                    <span className="text-gray-400">DEF</span>
                </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0 text-center">
        <div className="text-sm text-gray-400 border-t border-b border-gray-700/50 py-3 space-y-1">
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
        <Button asChild variant="ghost" size="sm" className="text-lime-300 hover:bg-lime-300/10 hover:text-lime-200">
          <Link href={`/schedule/${match.id}`}>تفاصيل المباراة</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
