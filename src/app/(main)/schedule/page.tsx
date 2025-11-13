
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
import { Calendar, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function SchedulePage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="font-headline text-2xl font-bold text-foreground md:text-3xl">
          جدول المباريات
        </h1>
        <p className="mt-1 text-muted-foreground">
          تصفح جميع المباريات القادمة والسابقة في البطولة.
        </p>
      </div>
      
      <Card className="mb-6 bg-card/50 border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="ابحث عن فريق أو ملعب..." className="w-full pl-10 bg-background/50 border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <div className="flex gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px] bg-background/50 border-border text-foreground">
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
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </>
  );
}
