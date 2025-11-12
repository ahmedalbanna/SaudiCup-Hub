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
import type { Match } from '@/lib/mock-data';

type CommentaryItem = {
  timestamp: string;
  comment: string;
};

const mockCommentaries = [
  "تمريرة رائعة من خط الوسط تجد المهاجم في وضع خطير!",
  "المدافع يقوم بتدخل حاسم لإيقاف الهجمة.",
  "يا له من تصدي من حارس المرمى! لقد كان هدفًا مؤكدًا.",
  "الجماهير تقف على أقدامها مع تقدم الفريق المضيف إلى الأمام.",
  "ركلة ركنية للفريق الزائر. هل يمكنهم استغلالها؟",
  "تسديدة من مسافة بعيدة تمر بجوار القائم بقليل.",
  "بطاقة صفراء تظهر بسبب تدخل متأخر في خط الوسط.",
  "قطعة فنية مذهلة من الجناح ليتغلب على رجله.",
  "الفريقان في معركة تكتيكية، لا أحد يتنازل عن شبر.",
  "كرة طويلة فوق القمة، لكن حارس المرمى يخرج بسرعة ويمسك بها."
];


export default function LiveCommentary({ match }: { match: Match }) {
  const [commentary, setCommentary] = useState<CommentaryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const commentIndexRef = useRef(0);

  const fetchCommentary = async () => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      const comment = mockCommentaries[commentIndexRef.current % mockCommentaries.length];
      commentIndexRef.current += 1;

      const newComment: CommentaryItem = {
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        comment: comment,
      };
      setCommentary((prev) => [newComment, ...prev]);
    } catch (error) {
      console.error('Failed to generate commentary:', error);
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
                <CardTitle>التعليق المباشر</CardTitle>
                <CardDescription>
                تحديثات لحظة بلحظة للمباراة.
                </CardDescription>
            </div>
            <div>
                {isStreaming ? (
                <Button onClick={stopStreaming} variant="destructive" disabled={!isStreaming}>
                    <Square className="ml-2 h-4 w-4" />
                    إيقاف البث المباشر
                </Button>
                ) : (
                <Button onClick={startStreaming} disabled={isStreaming || match.status !== 'live'}>
                     {match.status !== 'live' ? (
                        <>غير مباشر</>
                     ) : (
                        <><PlayCircle className="ml-2 h-4 w-4" /> بدء البث المباشر</>
                     )}
                </Button>
                )}
            </div>
        </div>
      </CardHeader>
      <CardContent>
        {commentary.length === 0 && !isStreaming ? (
            <div className="text-center text-muted-foreground py-12">
                {match.status === 'live' ? 'انقر على "بدء البث المباشر" للحصول على تعليق في الوقت الفعلي.' : 'سيكون التعليق المباشر متاحًا عندما تكون المباراة مباشرة.'}
            </div>
        ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pl-4">
          {isLoading && commentary.length === 0 && (
             <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          )}
          {commentary.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="font-mono text-xs text-muted-foreground pt-1 w-20">{item.timestamp}</div>
              <div className="flex-1 border-r-2 border-primary pr-4">
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
