'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Calendar, Shield, User, Users } from 'lucide-react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { players as initialPlayers, teams, matches } from '@/lib/mock-data';

export default function Dashboard() {
  const [players, setPlayers] = useState(initialPlayers.slice(0, 4));

  const handleUnfollow = (playerId: string) => {
    setPlayers(players.filter(p => p.id !== playerId));
  }

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-headline text-lg font-semibold md:text-2xl">
          لوحة التحكم
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              الفرق المفضلة
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              أنت تتابع 3 فرق
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              اللاعبون المفضلون
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{players.length}</div>
            <p className="text-xs text-muted-foreground">
              أنت تتابع {players.length} لاعبين
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              المباريات القادمة التي تتابعها
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              في الأيام السبعة القادمة
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ملفي الشخصي</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button size="sm" variant="outline" asChild>
                <Link href="#">تعديل الملف الشخصي</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
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
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المباراة</TableHead>
                  <TableHead className="hidden sm:table-cell">التاريخ</TableHead>
                  <TableHead className="hidden md:table-cell">الملعب</TableHead>
                  <TableHead className="text-left">الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {matches.filter(m => m.status === 'scheduled').slice(0, 5).map(match => (
                    <TableRow key={match.id}>
                        <TableCell>
                            <div className="font-medium">{match.team1.name} ضد {match.team2.name}</div>
                        </TableCell>
                         <TableCell className="hidden sm:table-cell">
                            {new Date(match.date).toLocaleDateString('ar-SA')}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{match.venue}</TableCell>
                        <TableCell className="text-left">
                           <Badge variant="outline">{match.status === 'scheduled' ? 'مجدولة' : match.status}</Badge>
                        </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>اللاعبون المفضلون</CardTitle>
            <CardDescription>
              نظرة سريعة على اللاعبين الذين تتابعهم.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8">
            {players.map(player => (
                 <div key={player.id} className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src={player.imageUrl} alt="Avatar" data-ai-hint="male portrait" />
                    <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                        {player.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {teams.find(t => t.id === player.teamId)?.name}
                    </p>
                    </div>
                    <div className="mr-auto font-medium">
                        <Button variant="outline" size="sm" onClick={() => handleUnfollow(player.id)}>إلغاء المتابعة</Button>
                    </div>
                </div>
            ))}
             {players.length === 0 && (
              <p className="text-sm text-muted-foreground text-center">
                أنت لا تتابع أي لاعب حتى الآن.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
