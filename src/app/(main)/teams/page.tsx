import { TeamCard } from '@/components/cards/TeamCard';
import { teams } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';

export default function TeamsPage() {
  return (
    <>
       <div className="flex items-center justify-between">
        <h1 className="font-headline text-lg font-semibold md:text-2xl">
          Participating Teams
        </h1>
        <div className="flex items-center gap-2">
            <Input placeholder="Search teams..." className="w-48"/>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </>
  );
}