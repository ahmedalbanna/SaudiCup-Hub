import { notFound } from 'next/navigation';
import Image from 'next/image';
import { news } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';

export default function NewsArticlePage({ params }: { params: { id: string } }) {
  const article = news.find((n) => n.id === params.id);

  if (!article) {
    notFound();
  }

  const articleDate = new Date(article.date);

  return (
    <div className="mx-auto max-w-4xl">
      <article>
        <Card>
          <CardHeader className="border-b">
             <div className="mb-4">
                <Badge variant="secondary">{article.category}</Badge>
            </div>
            <CardTitle className="font-headline text-4xl leading-tight">
              {article.title}
            </CardTitle>
            <div className="flex space-x-4 text-sm text-muted-foreground pt-2">
                 <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                    {articleDate.toLocaleDateString('ar-SA', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>بواسطة {article.author}</span>
                </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative aspect-video">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                data-ai-hint="football action"
                priority
              />
            </div>
            <div className="prose prose-lg max-w-none p-6 text-foreground">
                <p className="lead text-xl text-muted-foreground">{article.excerpt}</p>
                <p className="whitespace-pre-wrap">{article.content}</p>
            </div>
          </CardContent>
        </Card>
      </article>
    </div>
  );
}
