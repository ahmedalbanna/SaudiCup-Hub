'use client';
import { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, PlayCircle, Square } from 'lucide-react';
import { generateCommentary } from '@/ai/flows/live-commentary-flow';
import type { Match } from '@/lib/mock-data';

type CommentaryItem = {
  timestamp: string;
  comment: string;
};

export default function LiveCommentary({ match }: { match: Match }) {
  const [commentary, setCommentary] = useState<CommentaryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchCommentary = async () => {
    setIsLoading(true);
    try {
      const prompt = `Generate a single exciting commentary update for the match between ${match.team1.name} and ${match.team2.name}. The current score is ${match.score}. We are in the middle of the match.`;
      const result = await generateCommentary(prompt);
      const newComment: CommentaryItem = {
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        comment: result.commentary,
      };
      setCommentary((prev) => [newComment, ...prev]);
    } catch (error) {
      console.error('Failed to generate commentary:', error);
      // Optional: show an error to the user
    } finally {
      setIsLoading(false);
    }
  };

  const startStreaming = () => {
    setIsStreaming(true);
    fetchCommentary(); // Fetch immediately
    intervalRef.current = setInterval(fetchCommentary, 25000); // Fetch every 25 seconds
  };

  const stopStreaming = () => {
    setIsStreaming(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsLoading(false);
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle>Live Commentary</CardTitle>
                <CardDescription>
                AI-powered play-by-play updates for the match.
                </CardDescription>
            </div>
            <div>
                {isStreaming ? (
                <Button onClick={stopStreaming} variant="destructive" disabled={!isStreaming}>
                    <Square className="mr-2 h-4 w-4" />
                    Stop Live Feed
                </Button>
                ) : (
                <Button onClick={startStreaming} disabled={isStreaming || match.status !== 'live'}>
                     {match.status !== 'live' ? (
                        <>Not Live</>
                     ) : (
                        <><PlayCircle className="mr-2 h-4 w-4" /> Start Live Feed</>
                     )}
                </Button>
                )}
            </div>
        </div>
      </CardHeader>
      <CardContent>
        {commentary.length === 0 && !isStreaming ? (
            <div className="text-center text-muted-foreground py-12">
                {match.status === 'live' ? 'Click "Start Live Feed" to get real-time commentary.' : 'Live commentary will be available when the match is live.'}
            </div>
        ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4">
          {isLoading && commentary.length === 0 && (
             <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          )}
          {commentary.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="font-mono text-xs text-muted-foreground pt-1 w-20">{item.timestamp}</div>
              <div className="flex-1 border-l-2 border-primary pl-4">
                <p>{item.comment}</p>
              </div>
            </div>
          ))}
        </div>
        )}
      </CardContent>
    </Card>
  );
}
