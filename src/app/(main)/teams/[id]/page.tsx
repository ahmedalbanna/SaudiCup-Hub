'use client';
import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { teams, players, matches, news } from '@/lib/mock-data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MatchCard } from '@/components/cards/MatchCard';
import { NewsCard } from '@/components/cards/NewsCard';
import { ShieldCheck, ShieldPlus } from 'lucide-react';

export default function TeamProfilePage({ params }: { params: { id: string } }) {
  const team = teams.find((t) => t.id === params.id);
  const [isFollowing, setIsFollowing] = useState(false);

  if (!team) {
    notFound();
  }

  const teamPlayers = players.filter((p) => p.teamId === team.id);
  const teamMatches = matches
    .filter((m) => m.team1.id === team.id || m.team2.id === team.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const teamNews = news.filter(n => n.title.includes(team.name) || n.excerpt.includes(team.name));

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6">
      <Card>
        <CardHeader className="flex flex-col items-center text-center">
          <div className="relative">
            <Image
              src={team.logoUrl}
              alt={`${team.name} logo`}
              width={120}
              height={120}
              className="rounded-full mb-4"
              data-ai-hint="team logo"
            />
            <div className="absolute top-0 right-[-50px]">
              <Button variant="outline" size="sm" onClick={() => setIsFollowing(!isFollowing)}>
                {isFollowing ? <ShieldCheck className="mr-2 h-4 w-4" /> : <ShieldPlus className="mr-2 h-4 w-4" />}
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            </div>
          </div>
          <CardTitle className="font-headline text-4xl">{team.name}</CardTitle>
          <CardDescription>
            View the team's roster, recent performance, and news.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="roster">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="roster">Roster</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
        </TabsList>
        <TabsContent value="roster">
          <Card>
            <CardHeader>
              <CardTitle>Player Roster</CardTitle>
              <CardDescription>
                The complete list of players for {team.name}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Photo</TableHead>
                    <TableHead className="w-[100px]">Number</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamPlayers.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell>
                        <Avatar>
                          <AvatarImage src={player.imageUrl} alt={player.name} data-ai-hint="male portrait" />
                          <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{player.number}</TableCell>
                      <TableCell className="font-semibold">{player.name}</TableCell>
                      <TableCell>{player.position}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="matches">
           <Card>
             <CardHeader>
                <CardTitle>Recent & Upcoming Matches</CardTitle>
                <CardDescription>A look at the recent results and future fixtures for {team.name}.</CardDescription>
             </CardHeader>
             <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {teamMatches.slice(0,6).map(match => (
                    <MatchCard key={match.id} match={match} />
                ))}
             </CardContent>
           </Card>
        </TabsContent>
        <TabsContent value="news">
            <Card>
                <CardHeader>
                    <CardTitle>Team News</CardTitle>
                    <CardDescription>The latest articles and updates related to {team.name}.</CardDescription>
                </Header>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {teamNews.length > 0 ? teamNews.map(article => (
                        <NewsCard key={article.id} article={article} />
                    )) : (
                        <p className="col-span-full text-center text-muted-foreground">No news found for {team.name}.</p>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
