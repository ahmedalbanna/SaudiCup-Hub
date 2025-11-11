'use server';
import { notFound } from 'next/navigation';
import { matches, players, teams } from '@/lib/mock-data';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import MatchAnalysis from './MatchAnalysis';
import {
  analyzeMatch,
  type AnalyzeMatchInput,
} from '@/ai/flows/ai-powered-match-analysis';

export default async function MatchDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const match = matches.find((m) => m.id === params.id);

  if (!match) {
    notFound();
  }

  const team1Players = players.filter((p) => p.teamId === match.team1.id);
  const team2Players = players.filter((p) => p.teamId === match.team2.id);

  const historicalPerformance = `
- ${match.team1.name}: Last 5 games: W-W-L-D-W. Strong attacking record, averaging 2.4 goals per game.
- ${match.team2.name}: Last 5 games: W-D-L-W-D. Known for a solid defense, conceding only 0.8 goals per game on average.
- Head-to-head: In the last 3 encounters, ${match.team1.name} won 2, ${match.team2.name} won 1.
`;

  const teamLineups = `
- ${match.team1.name} (4-3-3): ${team1Players.slice(0,2).map(p => p.name).join(', ')} and others. Key player ${team1Players[0].name} is in top form.
- ${match.team2.name} (4-4-2): ${team2Players.slice(0,2).map(p => p.name).join(', ')} and others. Missing their main defender due to injury.
`;

  const liveScores = match.score ? `Current score is ${match.team1.name} ${match.score} ${match.team2.name}. Match is in the 80th minute.` : `Match has not started.`;


  async function getAnalysis(data: AnalyzeMatchInput) {
    'use server';
    return await analyzeMatch(data);
  }


  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <h1 className="sr-only">Match Details</h1>
      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center justify-around">
            <div className="flex flex-col items-center gap-2 text-center w-1/3">
              <Image
                src={match.team1.logoUrl}
                alt={`${match.team1.name} logo`}
                width={80}
                height={80}
                className="rounded-full"
                data-ai-hint="team logo"
              />
              <span className="font-headline text-xl font-semibold">
                {match.team1.name}
              </span>
            </div>
            <div className="text-center w-1/3">
              <p className="font-bold text-4xl text-primary">
                {match.score ?? 'vs'}
              </p>
              <p className="text-sm text-muted-foreground">{match.venue}</p>
              <p className="text-sm text-muted-foreground">{new Date(match.date).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center w-1/3">
              <Image
                src={match.team2.logoUrl}
                alt={`${match.team2.name} logo`}
                width={80}
                height={80}
                className="rounded-full"
                data-ai-hint="team logo"
              />
              <span className="font-headline text-xl font-semibold">
                {match.team2.name}
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Tabs defaultValue="analysis">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
          <TabsTrigger value="lineups">Lineups</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="h2h">H2H</TabsTrigger>
        </TabsList>
        <TabsContent value="analysis">
          <MatchAnalysis 
            getAnalysis={getAnalysis}
            initialData={{historicalPerformance, teamLineups, liveScores}}
          />
        </TabsContent>
        <TabsContent value="lineups">
          <Card>
            <CardHeader>
              <CardTitle>Team Lineups</CardTitle>
              <CardDescription>
                Starting players for both teams.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">{match.team1.name} (4-3-3)</h3>
                <div className="space-y-1">
                  {team1Players.map(p => (
                    <div key={p.id} className="text-sm">#{p.number} {p.name} ({p.position})</div>
                  ))}
                </div>
              </div>
               <div>
                <h3 className="font-semibold mb-2">{match.team2.name} (4-4-2)</h3>
                <div className="space-y-1">
                  {team2Players.map(p => (
                    <div key={p.id} className="text-sm">#{p.number} {p.name} ({p.position})</div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stats">
           <Card>
            <CardHeader>
                <CardTitle>Match Statistics</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">{match.team1.name}</TableHead>
                            <TableHead className="text-center">Stat</TableHead>
                            <TableHead className="text-right">{match.team2.name}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow><TableCell className="text-left">12</TableCell><TableCell className="text-center font-medium">Shots</TableCell><TableCell className="text-right">8</TableCell></TableRow>
                        <TableRow><TableCell className="text-left">5</TableCell><TableCell className="text-center font-medium">Shots on Target</TableCell><TableCell className="text-right">3</TableCell></TableRow>
                        <TableRow><TableCell className="text-left">58%</TableCell><TableCell className="text-center font-medium">Possession</TableCell><TableCell className="text-right">42%</TableCell></TableRow>
                        <TableRow><TableCell className="text-left">450</TableCell><TableCell className="text-center font-medium">Passes</TableCell><TableCell className="text-right">320</TableCell></TableRow>
                        <TableRow><TableCell className="text-left">85%</TableCell><TableCell className="text-center font-medium">Pass Accuracy</TableCell><TableCell className="text-right">78%</TableCell></TableRow>
                        <TableRow><TableCell className="text-left">2</TableCell><TableCell className="text-center font-medium">Yellow Cards</TableCell><TableCell className="text-right">3</TableCell></TableRow>
                    </TableBody>
                </Table>
            </CardContent>
           </Card>
        </TabsContent>
        <TabsContent value="h2h">
           <Card>
            <CardHeader>
                <CardTitle>Head-to-Head</CardTitle>
                <CardDescription>Previous encounters between the two teams.</CardDescription>
            </CardHeader>
            <CardContent>
                {matches.filter(m => m.id !== match.id && ((m.team1.id === match.team1.id && m.team2.id === match.team2.id) || (m.team1.id === match.team2.id && m.team2.id === match.team1.id))).slice(0,3).map(m => (
                    <div key={m.id} className="mb-4">
                        <p className="text-sm text-muted-foreground">{new Date(m.date).toLocaleDateString()} at {m.venue}</p>
                        <p className="font-semibold">{m.team1.name} {m.score} {m.team2.name}</p>
                        <Separator className="mt-2" />
                    </div>
                ))}
            </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}