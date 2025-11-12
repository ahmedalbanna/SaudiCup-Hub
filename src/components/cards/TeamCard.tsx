import Image from 'next/image';
import Link from 'next/link';
import type { Team } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type TeamCardProps = {
  team: Team;
};

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <Image
          src={team.logoUrl}
          alt={`${team.name} logo`}
          width={80}
          height={80}
          className="mb-4 rounded-full"
          data-ai-hint="team logo"
        />
        <h3 className="font-headline text-xl font-semibold">{team.name}</h3>
        <Button asChild variant="link" className="mt-2">
          <Link href={`/teams/${team.id}`}>عرض الملف الشخصي</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
