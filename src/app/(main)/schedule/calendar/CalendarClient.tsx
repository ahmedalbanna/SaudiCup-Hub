'use client';

import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  add,
  sub,
  isToday,
  startOfWeek,
  endOfWeek,
  eachWeekOfInterval,
} from 'date-fns';
import { arSA } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from 'lucide-react';
import type { Match, Team } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MatchCard } from '@/components/cards/MatchCard';

type CalendarProps = {
  matches: Match[];
  teams: Team[];
  mainTeamId: string;
};

export default function CalendarClient({
  matches,
  teams,
  mainTeamId,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const mainTeam = teams.find((t) => t.id === mainTeamId);

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const weeks = eachWeekOfInterval({ start, end }, { weekStartsOn: 6 }); // Week starts on Saturday

  const nextMonth = () => setCurrentDate(add(currentDate, { months: 1 }));
  const prevMonth = () => setCurrentDate(sub(currentDate, { months: 1 }));

  const matchesOnSelectedDate = matches.filter((match) =>
    isSameDay(new Date(match.date), selectedDate)
  );

  const getMatchForDay = (day: Date) => {
    return matches.find((match) => isSameDay(new Date(match.date), day));
  };

  const getOpponent = (match: Match) => {
    if (!mainTeam) return match.team1;
    return match.team1.id === mainTeam.id ? match.team2 : match.team1;
  };

  const dayNames = ['سبت', 'أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'];


  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/80 border-gray-700 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-2xl">
              {format(currentDate, 'MMMM yyyy', { locale: arSA })}
            </h2>
            <div className="flex items-center gap-2">
              <Button onClick={prevMonth} variant="ghost" size="icon">
                <ChevronRight className="h-5 w-5" />
              </Button>
              <Button onClick={nextMonth} variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 text-center font-bold text-gray-400 border-b border-gray-700 pb-2">
            {dayNames.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {weeks.map((weekStart, weekIndex) => {
              const daysInWeek = eachDayOfInterval({
                start: weekStart,
                end: endOfWeek(weekStart, { weekStartsOn: 6 }),
              });
              return daysInWeek.map((day, dayIndex) => {
                const match = getMatchForDay(day);
                const opponent = match ? getOpponent(match) : null;
                const isCurrentMonth = day.getMonth() === currentDate.getMonth();

                return (
                  <div
                    key={day.toString()}
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                      'relative h-32 border-b border-l border-gray-700 p-2 text-right cursor-pointer transition-colors',
                      dayIndex === 6 && 'border-l-0', // last item in row
                      !isCurrentMonth && 'text-gray-600 bg-gray-900/50',
                      isToday(day) && 'bg-lime-400/10',
                      isSameDay(day, selectedDate) && 'bg-gray-700/80 ring-2 ring-lime-300 z-10',
                       (isCurrentMonth && !isSameDay(day, selectedDate)) && 'hover:bg-gray-800'
                    )}
                  >
                    <span
                      className={cn(
                        'font-bold',
                        isToday(day) ? 'text-lime-300' : isCurrentMonth ? 'text-white' : 'text-gray-500'
                      )}
                    >
                      {format(day, 'd')}
                    </span>
                    {match && opponent && isCurrentMonth && (
                      <Link href={`/schedule/${match.id}`} className="absolute inset-0 flex flex-col items-center justify-center text-center gap-2 p-1">
                          <Image
                            src={opponent.logoUrl}
                            alt={opponent.name}
                            width={40}
                            height={40}
                            className="rounded-full bg-gray-800 p-1"
                            data-ai-hint="team logo"
                          />
                           <p className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                             {match.status === 'finished' ? `ضد ${opponent.name}` : 'ودية'}
                           </p>
                      </Link>
                    )}
                  </div>
                );
              });
            })}
          </div>
        </CardContent>
      </Card>
      
      <div>
        <h3 className="font-headline text-2xl text-white mb-4">
          مباريات يوم {format(selectedDate, 'd MMMM', { locale: arSA })}
        </h3>
        {matchesOnSelectedDate.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {matchesOnSelectedDate.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <Card className="bg-gray-800/80 border-gray-700">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center text-gray-400">
              <CalendarIcon className="h-12 w-12 mb-4"/>
              <p className="font-bold text-lg">لا توجد مباريات مجدولة</p>
              <p>لا توجد مباريات مجدولة في هذا اليوم.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
