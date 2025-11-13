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
import Link from 'next/link';

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
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-6">
           <div className="flex flex-col md:flex-row items-center gap-6">
             <Image
              src={team.logoUrl}
              alt={`شعار ${team.name}`}
              width={120}
              height={120}
              className="rounded-full bg-muted p-2"
              data-ai-hint="team logo"
            />
            <div className="flex-1 text-center md:text-right">
                <CardTitle className="font-headline text-4xl">{team.name}</CardTitle>
                <CardDescription className="mt-2">
                    عرض قائمة الفريق وأدائه الأخير والأخبار.
                </CardDescription>
            </div>
            <div className="flex flex-col items-center gap-4">
                 <Button variant="outline" size="sm" onClick={() => setIsFollowing(!isFollowing)} className="w-32">
                    {isFollowing ? <ShieldCheck className="ml-2 h-4 w-4" /> : <ShieldPlus className="ml-2 h-4 w-4" />}
                    {isFollowing ? 'تتابع' : 'متابعة'}
                 </Button>
            </div>
           </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="roster" dir="rtl">
        <TabsList className="grid w-full grid-cols-3 bg-muted/80 border border-border">
          <TabsTrigger value="roster">قائمة اللاعبين</TabsTrigger>
          <TabsTrigger value="matches">المباريات</TabsTrigger>
          <TabsTrigger value="news">الأخبار</TabsTrigger>
        </TabsList>
        <TabsContent value="roster" className="mt-6">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>قائمة لاعبي الفريق</CardTitle>
              <CardDescription>
                القائمة الكاملة للاعبي فريق {team.name}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">الصورة</TableHead>
                    <TableHead className="w-[100px]">الرقم</TableHead>
                    <TableHead>الاسم</TableHead>
                    <TableHead>المركز</TableHead>
                    <TableHead className="text-right">التقييم</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamPlayers.map((player) => (
                    <TableRow key={player.id} className="hover:bg-muted/50">
                      <TableCell>
                        <Avatar>
                          <AvatarImage src={player.imageUrl} alt={player.name} data-ai-hint="male portrait" />
                          <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">#{player.number}</TableCell>
                      <TableCell className="font-semibold">
                         <Link href={`/players/${player.id}`} className="hover:underline">
                            {player.name}
                         </Link>
                      </TableCell>
                      <TableCell>{player.position}</TableCell>
                      <TableCell className="text-right font-bold text-lg">{player.rating}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="matches" className="mt-6">
           <Card className="bg-card/50 border-border/50">
             <CardHeader>
                <CardTitle>المباريات الأخيرة والقادمة</CardTitle>
                <CardDescription>نظرة على النتائج الأخيرة والمباريات المستقبلية لفريق {team.name}.</CardDescription>
             </CardHeader>
             <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {teamMatches.length > 0 ? teamMatches.slice(0,6).map(match => (
                    <MatchCard key={match.id} match={match} />
                )) : (
                     <p className="col-span-full text-center text-muted-foreground py-12">لا توجد مباريات مجدولة أو مكتملة لهذا الفريق.</p>
                )}
             </CardContent>
           </Card>
        </TabsContent>
        <TabsContent value="news" className="mt-6">
            <Card className="bg-card/50 border-border/50">
                <CardHeader>
                    <CardTitle>أخبار الفريق</CardTitle>
                    <CardDescription>آخر المقالات والتحديثات المتعلقة بفريق {team.name}.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {teamNews.length > 0 ? teamNews.map(article => (
                        <NewsCard key={article.id} article={article} />
                    )) : (
                        <p className="col-span-full text-center text-muted-foreground py-12">لم يتم العثور على أخبار لفريق {team.name}.</p>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
