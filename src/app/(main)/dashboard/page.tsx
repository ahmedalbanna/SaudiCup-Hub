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
import { Logo } from '@/components/Logo';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
      <div className="text-foreground animate-fade-in-up">
        <h1 className="text-5xl font-bold font-headline uppercase tracking-wider">
          أهلاً بك في كأس السعودية
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-lg">
          مركزك لمتابعة كل ما يتعلق بالبطولة، من المباريات المباشرة إلى أخبار الفرق واللاعبين.
        </p>
        <div className="mt-8 flex gap-4">
           <Image src="https://picsum.photos/seed/trophy-cup/150/150" alt="Trophy" width={120} height={120} className="rounded-lg" data-ai-hint="gold trophy" />
           <Image src="https://picsum.photos/seed/player-card-action/120/180" alt="Player Action" width={120} height={180} className="rounded-lg rotate-6" data-ai-hint="football player action" />
        </div>
      </div>
      <div className="flex justify-center items-center animate-fade-in">
        <Card className="bg-card/70 border-border w-[350px] h-[450px] flex flex-col justify-center items-center text-center shadow-2xl">
            <CardContent>
                <Logo className="h-48 w-48 text-primary" />
                <p className='font-bold text-3xl text-primary font-headline mt-4'>كأس السعودية</p>
                <p className='text-muted-foreground'>موسم 2024</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
