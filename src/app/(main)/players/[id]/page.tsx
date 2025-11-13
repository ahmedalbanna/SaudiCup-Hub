'use client';
import { use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { players, teams } from '@/lib/mock-data';
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
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { User, Calendar, Shirt, Target, Star, UserPlus } from 'lucide-react';

export default function PlayerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const player = players.find((p) => p.id === id);

  if (!player) {
    notFound();
  }

  const team = teams.find((t) => t.id === player.teamId);

  const stats = [
      { label: 'المشاركات', value: 120 },
      { label: 'الأهداف', value: 45 },
      { label: 'التمريرات الحاسمة', value: 30 },
      { label: 'البطاقات الصفراء', value: 15 },
      { label: 'البطاقات الحمراء', value: 1 },
  ]

  const careerHistory = [
    { year: '2022 - حتى الآن', team: team?.name, logo: team?.logoUrl },
    { year: '2018 - 2022', team: 'الهلال', logo: 'https://picsum.photos/seed/t_hilal/100/100' },
    { year: '2016 - 2018', team: 'الأهلي', logo: 'https://picsum.photos/seed/t_ahli/100/100' },
  ]

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-8">
      <Card className="overflow-hidden bg-card/50">
        <div className="grid md:grid-cols-[250px_1fr]">
            <div className="relative h-64 md:h-full">
                 <Image
                    src={player.imageUrl}
                    alt={`صورة ${player.name}`}
                    fill
                    className="object-cover"
                    data-ai-hint="male portrait"
                />
            </div>
            <div className='p-6'>
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-4">
                            <h1 className="font-headline text-4xl font-bold">{player.name}</h1>
                             {team && (
                                <div className="flex items-center gap-2 text-lg font-semibold">
                                    <Image src={team.logoUrl} alt={team.name} width={28} height={28} data-ai-hint="team logo" />
                                    <span>{team.name}</span>
                                </div>
                            )}
                        </div>
                        <p className="text-muted-foreground mt-1">
                            {player.position} | #{player.number}
                        </p>
                    </div>
                     <Button variant="outline" size="sm">
                        <UserPlus className="ml-2 h-4 w-4" />
                        متابعة
                    </Button>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
                    <div className="flex items-center gap-3">
                        <Calendar className="h-8 w-8 text-primary" />
                        <div>
                            <p className="text-muted-foreground">العمر</p>
                            <p className="font-bold text-lg">٢٨</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3">
                        <Target className="h-8 w-8 text-primary" />
                        <div>
                            <p className="text-muted-foreground">الجنسية</p>
                            <p className="font-bold text-lg">سعودي</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Star className="h-8 w-8 text-primary" />
                        <div>
                            <p className="text-muted-foreground">التقييم</p>
                            <p className="font-bold text-lg">{player.rating}</p>
                        </div>
                    </div>
                </div>
                 <div className="mt-6">
                    <h3 className="font-semibold mb-3">المهارات</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
                       {(Object.keys(player.stats) as Array<keyof typeof player.stats>).map(stat => (
                         <div key={stat}>
                            <div className="w-16 h-16 bg-muted/50 border-2 border-primary/50 rounded-full flex flex-col items-center justify-center font-headline mx-auto">
                                <span className="text-2xl font-bold">{player.stats[stat]}</span>
                            </div>
                            <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase">{stat}</p>
                         </div>
                       ))}
                    </div>
                 </div>
            </div>
        </div>
      </Card>

    <div className="grid gap-8 md:grid-cols-2">
        <Card className="bg-card/50">
            <CardHeader>
            <CardTitle>إحصائيات المسيرة</CardTitle>
            <CardDescription>
                نظرة عامة على أداء {player.name}.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>الإحصائية</TableHead>
                    <TableHead className="text-left">القيمة</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {stats.map(stat => (
                        <TableRow key={stat.label}>
                            <TableCell className="font-medium">{stat.label}</TableCell>
                            <TableCell className="text-left font-bold text-lg">{stat.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
        
        <Card className="bg-card/50">
            <CardHeader>
            <CardTitle>تاريخ المسيرة</CardTitle>
            <CardDescription>الأندية السابقة التي لعب لها {player.name}.</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="space-y-4">
               {careerHistory.map((item, index) => (
                    <div key={index}>
                        <div className="flex items-center gap-4">
                            <Image src={item.logo!} alt={item.team!} width={40} height={40} className="rounded-full bg-muted p-1" data-ai-hint="team logo" />
                            <div>
                                <p className="font-semibold text-lg">{item.team}</p>
                                <p className="text-sm text-muted-foreground">{item.year}</p>
                            </div>
                        </div>
                        {index < careerHistory.length - 1 && <Separator className="mt-4" />}
                    </div>
               ))}
            </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
