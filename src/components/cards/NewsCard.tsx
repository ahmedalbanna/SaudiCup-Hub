import Image from 'next/image';
import Link from 'next/link';
import type { NewsArticle } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

type NewsCardProps = {
  article: NewsArticle;
};

export function NewsCard({ article }: NewsCardProps) {
  const articleDate = new Date(article.date);

  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover"
          data-ai-hint="football action"
        />
      </div>
      <CardHeader>
        <Badge variant="secondary" className="w-fit">{article.category}</Badge>
        <CardTitle className="font-headline text-xl leading-tight pt-2">
          {article.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{article.excerpt}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm">
        <p className="text-muted-foreground">
          {articleDate.toLocaleDateString('ar-SA', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
        <Link
          href="#"
          className="flex items-center font-semibold text-primary hover:text-primary/80"
        >
          اقرأ المزيد <ArrowLeft className="mr-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
