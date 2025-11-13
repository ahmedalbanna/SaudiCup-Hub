'use client';
import { use } from 'react';
import { notFound } from 'next/navigation';
import { matches, players, teams } from '@/lib/mock-data';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
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
import LiveCommentary from './LiveCommentary';
import { Info } from 'lucide-react';

export default function MatchDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const match = matches.find((m) => m.id === id);

  if (!match) {
    notFound();
  }

  const team1Players = players.filter((p) => p.teamId === match.team1.id);
  const team2Players = players.filter((p) => p.teamId === match.team2.id);

  const isScheduled = match.status === 'scheduled';
  
  const TABS = [
    { value: 'commentary', label: 'التعليق المباشر' },
    { value: 'lineups', label: 'التشكيلات' },
    { value: 'stats', label: 'الإحصائيات' },
    { value: 'h2h', label: 'المواجهات' },
  ];

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6">
      <h1 className="sr-only">تفاصيل المباراة</h1>
      <Card className="bg-card/50 border-border/50 text-foreground">
        <CardHeader className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-3 text-center w-1/3">
              <Image
                src={match.team1.logoUrl}
                alt={`شعار ${match.team1.name}`}
                width={96}
                height={96}
                className="rounded-full bg-muted/50 p-2"
                data-ai-hint="team logo"
              />
              <span className="font-headline text-xl md:text-2xl font-bold">
                {match.team1.name}
              </span>
            </div>
            <div className="text-center w-1/3">
              <p className="font-bold text-5xl md:text-6xl text-primary font-headline">
                {match.score ?? 'VS'}
              </p>
              <p className="text-sm text-muted-foreground mt-2">{match.venue}</p>
              <p className="text-sm text-muted-foreground">{new Date(match.date).toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="flex flex-col items-center gap-3 text-center w-1/3">
              <Image
                src={match.team2.logoUrl}
                alt={`شعار ${match.team2.name}`}
                width={96}
                height={96}
                className="rounded-full bg-muted/50 p-2"
                data-ai-hint="team logo"
              />
              <span className="font-headline text-xl md:text-2xl font-bold">
                {match.team2.name}
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Tabs defaultValue={TABS[0].value} dir="rtl">
        <TabsList className={`grid w-full ${isScheduled ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'} bg-muted/80 border border-border`}>
          {TABS.filter(tab => !isScheduled || (tab.value !== 'commentary' && tab.value !== 'stats')).map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
          ))}
        </TabsList>
         <TabsContent value="commentary" className="rounded-lg bg-card/50 p-4 lg:p-6">
          {!isScheduled ? <LiveCommentary match={match} /> : null}
        </TabsContent>
        <TabsContent value="lineups" className="rounded-lg bg-card/50">
           {isScheduled ? (
            <Card className="bg-transparent border-none shadow-none">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                <Info className="h-12 w-12 mb-4" />
                <p className="font-bold text-lg">التشكيلات غير متاحة بعد</p>
                <p>سيتم إعلان تشكيلات الفرق قبل بدء المباراة بقليل.</p>
              </CardContent>
            </Card>
          ) : (
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle>تشكيلات الفرق</CardTitle>
              <CardDescription>
                اللاعبون الأساسيون لكلا الفريقين.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">{match.team1.name} (4-3-3)</h3>
                <div className="space-y-1">
                  {team1Players.map(p => (
                    <div key={p.id} className="text-sm"># {p.number} {p.name} ({p.position})</div>
                  ))}
                </div>
              </div>
               <div>
                <h3 className="font-semibold mb-2">{match.team2.name} (4-4-2)</h3>
                <div className="space-y-1">
                  {team2Players.map(p => (
                    <div key={p.id} className="text-sm"># {p.number} {p.name} ({p.position})</div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          )}
        </TabsContent>
        <TabsContent value="stats" className="rounded-lg bg-card/50">
          {!isScheduled ? (
           <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
                <CardTitle>إحصائيات المباراة</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-right">{match.team1.name}</TableHead>
                            <TableHead className="text-center">الإحصائية</TableHead>
                            <TableHead className="text-left">{match.team2.name}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow><TableCell className="text-right font-bold text-lg">12</TableCell><TableCell className="text-center font-medium">تسديدات</TableCell><TableCell className="text-left font-bold text-lg">8</TableCell></TableRow>
                        <TableRow><TableCell className="text-right font-bold text-lg">5</TableCell><TableCell className="text-center font-medium">تسديدات على المرمى</TableCell><TableCell className="text-left font-bold text-lg">3</TableCell></TableRow>
                        <TableRow><TableCell className="text-right font-bold text-lg">58%</TableCell><TableCell className="text-center font-medium">استحواذ</TableCell><TableCell className="text-left font-bold text-lg">42%</TableCell></TableRow>
                        <TableRow><TableCell className="text-right font-bold text-lg">450</TableCell><TableCell className="text-center font-medium">تمريرات</TableCell><TableCell className="text-left font-bold text-lg">320</TableCell></TableRow>
                        <TableRow><TableCell className="text-right font-bold text-lg">85%</TableCell><TableCell className="text-center font-medium">دقة التمرير</TableCell><TableCell className="text-left font-bold text-lg">78%</TableCell></TableRow>
                        <TableRow><TableCell className="text-right font-bold text-lg">2</TableCell><TableCell className="text-center font-medium">بطاقات صفراء</TableCell><TableCell className="text-left font-bold text-lg">3</TableCell></TableRow>
                    </TableBody>
                </Table>
            </CardContent>
           </Card>
           ) : null}
        </TabsContent>
        <TabsContent value="h2h" className="rounded-lg bg-card/50">
           <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
                <CardTitle>المواجهات المباشرة</CardTitle>
                <CardDescription>المواجهات السابقة بين الفريقين.</CardDescription>
            </CardHeader>
            <CardContent>
                {matches.filter(m => m.id !== match.id && ((m.team1.id === match.team1.id && m.team2.id === match.team2.id) || (m.team1.id === match.team2.id && m.team2.id === match.team1.id))).slice(0,3).map(m => (
                    <div key={m.id} className="mb-4">
                        <p className="text-sm text-muted-foreground">{new Date(m.date).toLocaleDateString('ar-SA')} في {m.venue}</p>
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
