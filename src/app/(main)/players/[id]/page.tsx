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

export default function PlayerProfilePage({ params }: { params: { id: string } }) {
  const player = players.find((p) => p.id === params.id);

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

  return (
    <div className="mx-auto grid w-full max-w-4xl gap-6">
      <Card>
        <CardHeader className="flex flex-col items-center text-center">
            <div className="relative h-32 w-32">
                 <Image
                    src={player.imageUrl}
                    alt={`صورة ${player.name}`}
                    fill
                    className="rounded-full object-cover border-4 border-background"
                    data-ai-hint="male portrait"
                />
            </div>
            <div className='pt-4 relative'>
                <CardTitle className="font-headline text-4xl">{player.name}</CardTitle>
                {team && (
                    <CardDescription className="flex items-center justify-center gap-2 pt-2">
                        <Image src={team.logoUrl} alt={team.name} width={20} height={20} data-ai-hint="team logo" />
                        {team.name}
                    </CardDescription>
                )}
                 <div className="absolute top-2 left-[-60px]">
                  <Button variant="outline" size="sm">
                    <UserPlus className="ml-2 h-4 w-4" />
                    متابعة
                  </Button>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <Separator />
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center py-4">
                <div>
                    <p className="text-sm text-muted-foreground">المركز</p>
                    <p className="font-semibold flex items-center justify-center gap-1"><User className="h-4 w-4"/> {player.position}</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">رقم القميص</p>
                    <p className="font-semibold flex items-center justify-center gap-1"><Shirt className="h-4 w-4"/> #{player.number}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">العمر</p>
                    <p className="font-semibold flex items-center justify-center gap-1"><Calendar className="h-4 w-4"/> ٢٨</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">الجنسية</p>
                    <p className="font-semibold flex items-center justify-center gap-1"><Target className="h-4 w-4"/> سعودي</p>
                </div>
            </div>
        </CardContent>
      </Card>

      <Card>
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
                        <TableCell className="text-left">{stat.value}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>تاريخ المسيرة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">2022 - حتى الآن</p>
              <p className="text-muted-foreground">{team?.name}</p>
            </div>
            <Separator />
            <div>
              <p className="font-semibold">2018 - 2022</p>
              <p className="text-muted-foreground">الهلال</p>
            </div>
             <Separator />
             <div>
              <p className="font-semibold">2016 - 2018</p>
              <p className="text-muted-foreground">الأهلي</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
