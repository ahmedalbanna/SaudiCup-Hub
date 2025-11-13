'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
      <div className="text-foreground animate-fade-in-up">
        <h1 className="text-5xl font-bold font-headline uppercase tracking-wider">
          تحديات بناء الفريق
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-lg">
          أكمل التحديات عن طريق استبدال العناصر لكسب مكافآت رائعة.
        </p>
        <div className="mt-8 flex gap-4">
           <Image src="https://picsum.photos/seed/fut-coin/100/100" alt="FUT Coin" width={80} height={80} className="rounded-full" data-ai-hint="gold coin" />
           <Image src="https://picsum.photos/seed/player-pack/120/180" alt="Player Pack" width={120} height={180} className="rounded-lg -rotate-12" data-ai-hint="trading card" />
           <Image src="https://picsum.photos/seed/sbc-pack/140/200" alt="SBC Player Pack" width={140} height={200} className="rounded-lg rotate-6" data-ai-hint="trading card design" />
        </div>
      </div>
      <div className="flex justify-center items-center animate-fade-in">
        <Card className="bg-card/70 border-border w-[350px] h-[450px] flex flex-col justify-center items-center text-center">
            <CardContent>
                <p className='font-bold text-8xl text-primary font-headline'>FUT</p>
                <p className='font-bold text-8xl text-primary font-headline'>24</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
