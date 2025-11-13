'use server';
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
import MatchAnalysis from './MatchAnalysis';
import {
  analyzeMatch,
  type AnalyzeMatchInput,
} from '@/ai/flows/ai-powered-match-analysis';
import LiveCommentary from './LiveCommentary';

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
- ${match.team1.name}: آخر 5 مباريات: ف-ف-خ-ت-ف. سجل هجومي قوي بمعدل 2.4 هدف في المباراة.
- ${match.team2.name}: آخر 5 مباريات: ف-ت-خ-ف-ت. معروف بدفاعه الصلب، حيث استقبل 0.8 هدف فقط في المباراة الواحدة.
- المواجهات المباشرة: في آخر 3 مواجهات، فاز ${match.team1.name} في مباراتين، وفاز ${match.team2.name} في واحدة.
`;

  const teamLineups = `
- ${match.team1.name} (4-3-3): ${team1Players.slice(0,2).map(p => p.name).join(', ')} وآخرون. اللاعب الرئيسي ${team1Players[0].name} في أفضل حالاته.
- ${match.team2.name} (4-4-2): ${team2Players.slice(0,2).map(p => p.name).join(', ')} وآخرون. يفتقدون مدافعهم الرئيسي بسبب الإصابة.
`;

  const liveScores = match.score ? `النتيجة الحالية هي ${match.team1.name} ${match.score} ${match.team2.name}. المباراة في الدقيقة 80.` : `المباراة لم تبدأ بعد.`;


  async function getAnalysis(data: AnalyzeMatchInput) {
    'use server';
    return await analyzeMatch(data);
  }


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
      <Tabs defaultValue="commentary" dir="rtl">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-muted/80 border border-border">
          <TabsTrigger value="commentary">التعليق المباشر</TabsTrigger>
          <TabsTrigger value="analysis">تحليل AI</TabsTrigger>
          <TabsTrigger value="lineups">التشكيلات</TabsTrigger>
          <TabsTrigger value="stats">الإحصائيات</TabsTrigger>
          <TabsTrigger value="h2h">المواجهات</TabsTrigger>
        </TabsList>
         <TabsContent value="commentary" className="rounded-lg bg-card/50 p-4 lg:p-6">
          <LiveCommentary match={match} />
        </TabsContent>
        <TabsContent value="analysis" className="rounded-lg bg-card/50 p-4 lg:p-6">
          <MatchAnalysis 
            getAnalysis={getAnalysis}
            initialData={{historicalPerformance, teamLineups, liveScores}}
          />
        </TabsContent>
        <TabsContent value="lineups" className="rounded-lg bg-card/50">
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
        </TabsContent>
        <TabsContent value="stats" className="rounded-lg bg-card/50">
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
