import { PlayerCard } from '@/components/cards/PlayerCard';
import { players, teams } from '@/lib/mock-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

export default function PlayersPage() {
  const positions = [...new Set(players.map(p => p.position))];

  return (
    <>
      <div className="mb-6">
        <h1 className="font-headline text-2xl font-bold text-foreground md:text-3xl">
          اللاعبون
        </h1>
        <p className="mt-1 text-muted-foreground">
          استكشف ملفات تعريف اللاعبين وإحصائياتهم.
        </p>
      </div>

      <Card className="mb-6 bg-card/50 border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="ابحث عن لاعب..." className="w-full pl-10 bg-background/50 border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <div className="flex gap-4">
               <Select defaultValue="all-teams">
                <SelectTrigger className="w-full md:w-[180px] bg-background/50 border-border text-foreground">
                  <SelectValue placeholder="تصفية حسب الفريق" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-teams">كل الفرق</SelectItem>
                  {teams.map(team => (
                    <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select defaultValue="all-positions">
                <SelectTrigger className="w-full md:w-[180px] bg-background/50 border-border text-foreground">
                  <SelectValue placeholder="تصفية حسب المركز" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-positions">كل المراكز</SelectItem>
                  {positions.map(position => (
                    <SelectItem key={position} value={position}>{position}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>


      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {players.map((player) => {
          const team = teams.find((t) => t.id === player.teamId);
          if (!team) return null;
          return <PlayerCard key={player.id} player={player} team={team} />;
        })}
      </div>
    </>
  );
}
