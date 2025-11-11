'use server';
/**
 * @fileOverview Provides AI-powered match analysis based on historical performance, team lineups, and live scores.
 *
 * - analyzeMatch - A function that analyzes match data and suggests key insights and potential outcomes.
 * - AnalyzeMatchInput - The input type for the analyzeMatch function.
 * - AnalyzeMatchOutput - The return type for the analyzeMatch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMatchInputSchema = z.object({
  historicalPerformance: z.string().describe('Historical performance data of the teams involved.'),
  teamLineups: z.string().describe('Team lineups for the match.'),
  liveScores: z.string().describe('Live scores of the match.'),
});
export type AnalyzeMatchInput = z.infer<typeof AnalyzeMatchInputSchema>;

const AnalyzeMatchOutputSchema = z.object({
  keyInsights: z.string().describe('Key insights derived from the match data.'),
  potentialOutcomes: z.string().describe('Potential outcomes of the match based on the analysis.'),
});
export type AnalyzeMatchOutput = z.infer<typeof AnalyzeMatchOutputSchema>;

export async function analyzeMatch(input: AnalyzeMatchInput): Promise<AnalyzeMatchOutput> {
  return analyzeMatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMatchPrompt',
  input: {schema: AnalyzeMatchInputSchema},
  output: {schema: AnalyzeMatchOutputSchema},
  prompt: `You are an AI expert in sports match analysis. Provide key insights and potential outcomes based on the following data:\n\nHistorical Performance: {{{historicalPerformance}}}\nTeam Lineups: {{{teamLineups}}}\nLive Scores: {{{liveScores}}}\n\nAnalyze the match and provide key insights and potential outcomes.\n`,
});

const analyzeMatchFlow = ai.defineFlow(
  {
    name: 'analyzeMatchFlow',
    inputSchema: AnalyzeMatchInputSchema,
    outputSchema: AnalyzeMatchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
