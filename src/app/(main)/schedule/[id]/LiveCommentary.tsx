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

type CommentaryItem = {
  timestamp: string;
  comment: string;
};

const mockCommentaryPool: string[] = [
    'انطلاقة سريعة من الفريق المضيف، وضغط مبكر على دفاعات الخصم.',
    'تسديدة قوية من خارج منطقة الجزاء، لكنها تعلو العارضة بقليل!',
    'هجمة مرتدة خطيرة للفريق الضيف، والدفاع يتدخل في اللحظة الأخيرة.',
    'خطأ في منتصف الملعب، الحكم يكتفي بالتحذير الشفهي.',
    'تمريرات قصيرة ومتقنة من لاعبي الوسط، في محاولة لفتح ثغرة في الدفاع.',
    'ركنية للفريق المضيف... رأسية خطيرة تمر بجوار القائم!',
    'يا لها من فرصة ضائعة! المهاجم وجهاً لوجه مع الحارس لكنه يسدد الكرة خارج المرمى.',
    'جوووووول! هدف رائع بعد جملة تكتيكية مميزة. أصحاب الأرض يتقدمون!',
    'الفريق الضيف يحاول العودة في المباراة، ويزيد من ضغطه الهجومي.',
    'تصدي خرافي من الحارس! ينقذ فريقه من هدف محقق.',
    'بطاقة صفراء مستحقة بعد تدخل عنيف.',
    'تغيير في صفوف الفريق الضيف، هل سيغير من مجرى المباراة؟',
    'الهدوء يسيطر على الدقائق الأخيرة، ويبدو أن الفريق المضيف في طريقه للفوز.',
    'الحكم يطلق صافرة النهاية! فوز مستحق لأصحاب الأرض بنتيجة 1-0.'
];


export default function LiveCommentary({ match }: { match: Match }) {
  const [commentary, setCommentary] = useState<CommentaryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const commentIndexRef = useRef(0);

  const fetchCommentary = () => {
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
        if (commentIndexRef.current >= mockCommentaryPool.length) {
            // Optional: stop streaming if we run out of comments
            stopStreaming();
            return;
        }

        const newComment: CommentaryItem = {
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            comment: mockCommentaryPool[commentIndexRef.current],
        };

        setCommentary((prev) => [newComment, ...prev]);
        commentIndexRef.current += 1;
        setIsLoading(false);
    }, 1000);
  };

  const startStreaming = () => {
    setIsStreaming(true);
    commentIndexRef.current = 0; // Reset index
    setCommentary([]); // Clear previous comments
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
            <div className="text-center text-muted-foreground py-12 bg-muted/30 rounded-lg">
                <Mic className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="font-semibold text-lg text-foreground">
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
              <div className="flex-1 rounded-lg bg-muted/50 p-4 border border-border">
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
