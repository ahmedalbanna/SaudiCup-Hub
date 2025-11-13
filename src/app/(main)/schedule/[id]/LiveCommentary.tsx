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
import { Loader2, PlayCircle, Square, Mic } from 'lucide-react';
import type { Match } from '@/lib/mock-data';
import { generateCommentary } from '@/ai/flows/live-commentary-flow';

type CommentaryItem = {
  timestamp: string;
  comment: string;
};

export default function LiveCommentary({ match }: { match: Match }) {
  const [commentary, setCommentary] = useState<CommentaryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchCommentary = async () => {
    setIsLoading(true);
    try {
      // Create a more dynamic prompt based on the match state
      const prompt = `المباراة بين ${match.team1.name} و ${match.team2.name}. النتيجة الحالية هي ${match.score || '0-0'}. ${match.status === 'live' ? 'المباراة جارية.' : 'المباراة على وشك البدء.'} صف حدثًا مثيرًا.`;
      const result = await generateCommentary(prompt);
      
      if (result.commentary) {
          const newComment: CommentaryItem = {
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            comment: result.commentary,
          };
          setCommentary((prev) => [newComment, ...prev]);
      }
    } catch (error) {
      console.error('Failed to generate commentary:', error);
      // Optionally add a mock comment on error to keep the stream going
      const errorComment: CommentaryItem = {
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        comment: 'حدث خطأ أثناء إنشاء التعليق. سنحاول مرة أخرى.',
      };
      setCommentary((prev) => [errorComment, ...prev]);
    } finally {
      setIsLoading(false);
    }
  };

  const startStreaming = () => {
    setIsStreaming(true);
    fetchCommentary(); // Fetch immediately
    intervalRef.current = setInterval(fetchCommentary, 10000); // Fetch every 10 seconds
  };

  const stopStreaming = () => {
    setIsStreaming(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // Scroll to the top of the commentary list when a new comment is added
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [commentary]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle>التعليق المباشر</CardTitle>
                <CardDescription>
                تحديثات لحظة بلحظة للمباراة.
                </CardDescription>
            </div>
            <div>
                {isStreaming ? (
                <Button onClick={stopStreaming} variant="destructive" disabled={!isStreaming}>
                    <Square className="ml-2 h-4 w-4" />
                    إيقاف البث
                </Button>
                ) : (
                <Button onClick={startStreaming} disabled={isStreaming || match.status !== 'live'} className="bg-accent text-accent-foreground hover:bg-accent/90">
                     {match.status !== 'live' ? (
                        <>غير مباشر</>
                     ) : (
                        <><PlayCircle className="ml-2 h-4 w-4" /> بدء البث</>
                     )}
                </Button>
                )}
            </div>
        </div>
      </CardHeader>
      <CardContent>
        {commentary.length === 0 && !isStreaming ? (
            <div className="text-center text-muted-foreground py-12 bg-gray-900/50 rounded-lg">
                <Mic className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                <p className="font-semibold text-lg">
                    {match.status === 'live' ? 'البث المباشر جاهز' : 'التعليق غير متاح بعد'}
                </p>
                <p className="text-sm">
                    {match.status === 'live' ? 'انقر على "بدء البث" للحصول على تعليق في الوقت الفعلي.' : 'سيكون التعليق المباشر متاحًا عندما تكون المباراة مباشرة.'}
                </p>
            </div>
        ) : (
        <div ref={scrollRef} className="space-y-6 max-h-[500px] overflow-y-auto pr-4 -mr-4">
          {isLoading && commentary.length === 0 && (
             <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          )}
          {commentary.map((item, index) => (
            <div key={index} className="flex gap-4 animate-in fade-in-0 duration-500">
                <div className="flex flex-col items-center">
                    <span className="font-mono text-xs text-muted-foreground">{item.timestamp.split(' ')[0]}</span>
                    <div className="h-full w-px bg-border my-1"></div>
                </div>
              <div className="flex-1 rounded-lg bg-gray-800/80 p-4 border border-gray-700">
                <p>{item.comment}</p>
              </div>
            </div>
          ))}
           {isLoading && commentary.length > 0 && (
             <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                <p className="mr-2 text-muted-foreground text-sm">جاري إنشاء تعليق جديد...</p>
             </div>
          )}
        </div>
        )}
      </CardContent>
    </Card>
  );
}
