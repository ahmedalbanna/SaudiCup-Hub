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
import { BrainCircuit, Lightbulb, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const FormSchema = z.object({
  historicalPerformance: z.string(),
  teamLineups: z.string(),
  liveScores: z.string(),
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
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Match Analysis</CardTitle>
          <CardDescription>
            Input match data to generate insights and predict outcomes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="historicalPerformance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historical Performance</FormLabel>
                    <FormControl>
                      <Textarea rows={5} {...field} />
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
                    <FormLabel>Team Lineups</FormLabel>
                    <FormControl>
                      <Textarea rows={5} {...field} />
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
                    <FormLabel>Live Scores / Status</FormLabel>
                    <FormControl>
                      <Textarea rows={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <BrainCircuit className="mr-2 h-4 w-4" />
                )}
                Analyze Match
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div>
        {isLoading && (
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" />
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-primary" />
                <CardTitle>Potential Outcomes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          </div>
        )}
        {analysisResult && (
          <div className="space-y-6 animate-in fade-in-50 duration-500">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" />
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{analysisResult.keyInsights}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-primary" />
                <CardTitle>Potential Outcomes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{analysisResult.potentialOutcomes}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
