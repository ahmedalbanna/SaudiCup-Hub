'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AnalyzeMatchInput,
  AnalyzeMatchOutput,
} from '@/ai/flows/ai-powered-match-analysis';
import { BrainCircuit, Lightbulb, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const FormSchema = z.object({
  historicalPerformance: z.string().min(10, { message: 'الرجاء إدخال وصف أطول.' }),
  teamLineups: z.string().min(10, { message: 'الرجاء إدخال وصف أطول.' }),
  liveScores: z.string().min(5, { message: 'الرجاء إدخال وصف أطول.' }),
});

type MatchAnalysisProps = {
  getAnalysis: (data: AnalyzeMatchInput) => Promise<AnalyzeMatchOutput>;
  initialData: AnalyzeMatchInput;
};

export default function MatchAnalysis({ getAnalysis, initialData }: MatchAnalysisProps) {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeMatchOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await getAnalysis(data);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      // Here you would show a toast or error message to the user
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <Card className="bg-card/50 border-border/50 sticky top-20">
          <CardHeader>
            <CardTitle>مولد تحليل المباريات</CardTitle>
            <CardDescription>
              أدخل بيانات المباراة لتوليد رؤى وتوقع النتائج باستخدام الذكاء الاصطناعي.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="historicalPerformance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الأداء التاريخي</FormLabel>
                      <FormControl>
                        <Textarea placeholder="مثال: الفريق المضيف فاز في آخر 3 مباريات على أرضه..." rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="teamLineups"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تشكيلات الفرق</FormLabel>
                      <FormControl>
                        <Textarea placeholder="مثال: سيلعب الفريق الضيف بخطة 4-3-3 مع غياب قائدهم بسبب الإصابة..." rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="liveScores"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>النتائج المباشرة / الحالة</FormLabel>
                      <FormControl>
                        <Textarea placeholder="مثال: النتيجة 1-1 في الدقيقة 75..." rows={2} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  {isLoading ? (
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Wand2 className="ml-2 h-5 w-5" />
                  )}
                  توليد التحليل
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3">
        {!analysisResult && !isLoading && (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full bg-muted/30 rounded-lg p-8">
                <BrainCircuit className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold text-foreground">نتائج تحليل الذكاء الاصطناعي</h3>
                <p>ستظهر الرؤى والنتائج المحتملة هنا بمجرد تشغيل التحليل.</p>
            </div>
        )}
        {isLoading && (
          <div className="space-y-8">
            <Card className="bg-card/30 border-border/30">
              <CardHeader className="flex flex-row items-center gap-3">
                <Lightbulb className="h-6 w-6 text-accent" />
                <CardTitle>الرؤى الرئيسية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[85%]" />
              </CardContent>
            </Card>
            <Card className="bg-card/30 border-border/30">
              <CardHeader className="flex flex-row items-center gap-3">
                <Sparkles className="h-6 w-6 text-primary" />
                <CardTitle>النتائج المحتملة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[95%]" />
              </CardContent>
            </Card>
          </div>
        )}
        {analysisResult && (
          <div className="space-y-8 animate-in fade-in-50 duration-500">
            <Card className="bg-card/80 border-border/80">
              <CardHeader className="flex flex-row items-center gap-3">
                <Lightbulb className="h-6 w-6 text-accent" />
                <CardTitle>الرؤى الرئيسية</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-invert prose-p:text-muted-foreground">
                <p className="whitespace-pre-wrap">{analysisResult.keyInsights}</p>
              </CardContent>
            </Card>
            <Card className="bg-card/80 border-border/80">
              <CardHeader className="flex flex-row items-center gap-3">
                <Sparkles className="h-6 w-6 text-primary" />
                <CardTitle>النتائج المحتملة</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-invert prose-p:text-muted-foreground">
                <p className="whitespace-pre-wrap">{analysisResult.potentialOutcomes}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
