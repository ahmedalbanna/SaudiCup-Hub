import { MatchCard } from '@/components/cards/MatchCard';
import { matches, teams } from '@/lib/mock-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

export default function SchedulePage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-lg font-semibold md:text-2xl">
          جدول المباريات
        </h1>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="تصفية حسب الفريق" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كل الفرق</SelectItem>
              {teams.map((team) => (
                <SelectItem key={team.id} value={team.id}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" asChild>
            <Link href="/schedule/calendar">
                <Calendar className="ml-2 h-4 w-4" /> عرض التقويم
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </>
  );
}
