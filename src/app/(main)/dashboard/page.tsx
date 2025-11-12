'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Calendar, Shield, User, Users, Trophy, TrendingUp, Newspaper } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { players as initialPlayers, teams, matches } from '@/lib/mock-data';
import { MatchCard } from '@/components/cards/MatchCard';

export default function Dashboard() {
  const [players, setPlayers] = useState(initialPlayers.slice(0, 4));

  const handleUnfollow = (playerId: string) => {
    setPlayers(players.filter(p => p.id !== playerId));
  }

  const upcomingMatches = matches.filter(m => m.status === 'scheduled');
  const nextMatch = upcomingMatches.length > 0 ? upcomingMatches[0] : null;

  const finishedMatches = matches.filter(m => m.status === 'finished').slice(0,2);


  return (
    <>
      <div className="flex items-center mb-4">
        <h1 className="font-headline text-lg font-semibold md:text-2xl">
          لوحة التحكم
        </h1>
      </div>
       <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الفرق المفضلة</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">أنت تتابع 3 فرق</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">اللاعبون المفضلون</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{players.length}</div>
            <p className="text-xs text-muted-foreground">أنت تتابع {players.length} لاعبين</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المباريات القادمة</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingMatches.length}</div>
            <p className="text-xs text-muted-foreground">في جدولك</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">النتائج الأخيرة</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{finishedMatches.length}</div>
            <p className="text-xs text-muted-foreground">من الفرق التي تتابعها</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                    <CardTitle>المباراة التالية لك</CardTitle>
                    <CardDescription>
                        مباراة قادمة من أحد فرقك المفضلة.
                    </CardDescription>
                    </div>
                    <Button asChild size="sm" className="mr-auto gap-1">
                    <Link href="/schedule">
                        عرض الكل
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    {nextMatch ? (
                        <MatchCard match={nextMatch} />
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            لا توجد مباريات قادمة مجدولة.
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>النتائج الأخيرة</CardTitle>
                    <CardDescription>آخر النتائج من الفرق التي تتابعها.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                    {finishedMatches.map(match => (
                        <MatchCard key={match.id} match={match} />
                    ))}
                    {finishedMatches.length === 0 && (
                        <p className="text-center py-8 text-muted-foreground md:col-span-2">
                            لا توجد نتائج حديثة لعرضها.
                        </p>
                    )}
                </CardContent>
            </Card>

        </div>

        <div className="lg:col-span-1 space-y-6">
            <Card>
            <CardHeader>
                <CardTitle>اللاعبون المفضلون</CardTitle>
                <CardDescription>
                نظرة سريعة على اللاعبين الذين تتابعهم.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                {players.map(player => (
                    <div key={player.id} className="flex items-center gap-4">
                        <Avatar className="hidden h-10 w-10 sm:flex">
                        <AvatarImage src={player.imageUrl} alt="Avatar" data-ai-hint="male portrait" />
                        <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                            {player.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {teams.find(t => t.id === player.teamId)?.name}
                        </p>
                        </div>
                        <div className="mr-auto">
                            <Button variant="outline" size="sm" onClick={() => handleUnfollow(player.id)}>إلغاء المتابعة</Button>
                        </div>
                    </div>
                ))}
                {players.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                    أنت لا تتابع أي لاعب حتى الآن.
                </p>
                )}
                 <Button asChild variant="outline" className="w-full">
                  <Link href="/players">
                    اكتشف المزيد من اللاعبين
                  </Link>
                </Button>
            </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>ملفي الشخصي</CardTitle>
                <CardDescription>
                  الوصول إلى إعدادات حسابك وتفضيلاتك.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="outline" asChild className="w-full">
                    <Link href="#">تعديل الملف الشخصي</Link>
                </Button>
              </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
