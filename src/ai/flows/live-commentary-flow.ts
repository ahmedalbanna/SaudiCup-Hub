'use server';
/**
 * @fileOverview Provides AI-powered live match commentary.
 *
 * - generateCommentary - A function that creates a single commentary snippet for a match.
 * - GenerateCommentaryInput - The input type for the generateCommentary function.
 * - GenerateCommentaryOutput - The return type for the generateCommentary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCommentaryInputSchema = z.string();
export type GenerateCommentaryInput = z.infer<typeof GenerateCommentaryInputSchema>;

const GenerateCommentaryOutputSchema = z.object({
  commentary: z.string().describe('A single, exciting, play-by-play commentary snippet for a football match, as if it were happening live. It should be about 1-2 sentences long.'),
});
export type GenerateCommentaryOutput = z.infer<typeof GenerateCommentaryOutputSchema>;

export async function generateCommentary(input: GenerateCommentaryInput): Promise<GenerateCommentaryOutput> {
  return generateCommentaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCommentaryPrompt',
  input: { schema: GenerateCommentaryInputSchema },
  output: { schema: GenerateCommentaryOutputSchema },
  prompt: `You are an expert football commentator known for your energetic and insightful play-by-play analysis. Generate a single, brief, and exciting commentary update based on the provided context.

Context: {{{_input}}}

Generate one commentary snippet.`,
});

const generateCommentaryFlow = ai.defineFlow(
  {
    name: 'generateCommentaryFlow',
    inputSchema: GenerateCommentaryInputSchema,
    outputSchema: GenerateCommentaryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
