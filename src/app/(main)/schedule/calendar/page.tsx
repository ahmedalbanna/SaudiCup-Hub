'use server';
import { matches, teams } from '@/lib/mock-data';
import CalendarClient from './CalendarClient';

export default async function CalendarPage() {
  // In a real app, you would fetch this data
  const mainTeamId = 't1'; 
  
  return (
    <>
      <h1 className="font-headline text-lg font-semibold md:text-2xl mb-4 text-foreground">
        تقويم المباريات
      </h1>
      <CalendarClient matches={matches} teams={teams} mainTeamId={mainTeamId} />
    </>
  );
}
