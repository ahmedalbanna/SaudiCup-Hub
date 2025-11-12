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

export default function PlayersPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-lg font-semibold md:text-2xl">
          اللاعبون
        </h1>
        <div className="flex items-center gap-2">
            <Input placeholder="ابحث عن لاعبين..." className="w-48"/>
          <Select defaultValue="all-teams">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="تصفية حسب الفريق" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-teams">كل الفرق</SelectItem>
              {teams.map(team => (
                <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {players.map((player) => {
          const team = teams.find((t) => t.id === player.teamId);
          if (!team) return null;
          return <PlayerCard key={player.id} player={player} team={team} />;
        })}
      </div>
    </>
  );
}
