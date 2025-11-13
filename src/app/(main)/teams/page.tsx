import { TeamCard } from '@/components/cards/TeamCard';
import { teams } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

export default function TeamsPage() {
  return (
    <>
       <div className="mb-6">
        <h1 className="font-headline text-2xl font-bold text-foreground md:text-3xl">
          الفرق المشاركة
        </h1>
        <p className="mt-1 text-muted-foreground">
          تعرف على الفرق المتنافسة في البطولة.
        </p>
      </div>

      <Card className="mb-6 bg-card/50 border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="ابحث عن فريق..." className="w-full pl-10 bg-background/50 border-border text-foreground placeholder:text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </>
  );
}
