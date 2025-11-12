import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import type { Match } from '@/lib/mock-data';
import {
  Card,
  CardContent,
  CardDescription,
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
  
  const statusMap = {
    scheduled: 'مجدولة',
    live: 'مباشر',
    finished: 'انتهت'
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-around">
          <div className="flex flex-col items-center gap-2 text-center">
            <Image
              src={match.team1.logoUrl}
              alt={`شعار ${match.team1.name}`}
              width={60}
              height={60}
              className="rounded-full"
              data-ai-hint="team logo"
            />
            <span className="font-semibold">{match.team1.name}</span>
          </div>
          <div className="text-center">
            {match.status === 'finished' ? (
              <p className="font-bold text-2xl text-primary">{match.score}</p>
            ) : (
               <p className="font-bold text-2xl">ضد</p>
            )}
            
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <Image
              src={match.team2.logoUrl}
              alt={`شعار ${match.team2.name}`}
              width={60}
              height={60}
              className="rounded-full"
              data-ai-hint="team logo"
            />
            <span className="font-semibold">{match.team2.name}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {matchDate.toLocaleDateString('ar-SA', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{match.time}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Badge variant={match.status === 'finished' ? 'secondary' : 'default'} className={match.status === 'live' ? 'bg-red-500 text-white' : ''}>
          {statusMap[match.status]}
        </Badge>
        <Button asChild variant="outline" size="sm">
          <Link href={`/schedule/${match.id}`}>تفاصيل المباراة</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
