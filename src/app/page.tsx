import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MatchCard } from '@/components/cards/MatchCard';
import { NewsCard } from '@/components/cards/NewsCard';
import { matches, news } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/Logo';
import { ArrowLeft, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="ml-6 flex items-center space-x-2">
            <Logo className="h-8 w-8" />
            <span className="font-bold sm:inline-block font-headline">
              مركز كأس السعودية
            </span>
          </Link>
          <nav className="hidden flex-1 items-center space-x-4 text-sm font-medium md:flex">
            <Link
              href="/schedule"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              الجدول
            </Link>
            <Link
              href="/teams"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              الفرق
            </Link>
            <Link
              href="/players"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              اللاعبون
            </Link>
            <Link
              href="/news"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              الأخبار
            </Link>
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">تسجيل الدخول</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">التسجيل</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative h-[60vh] min-h-[500px] w-full">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
            <h1 className="font-headline text-5xl font-bold md:text-7xl">
              مجد الكأس
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-200">
              عش الشغف والدراما والإثارة في البطولة الكروية الأولى.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/schedule">
                عرض الجدول الكامل <ArrowLeft className="mr-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="container py-12 md:py-20">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold md:text-4xl">
            المباريات القادمة
          </h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {matches.slice(0, 3).map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/schedule">عرض جميع المباريات</Link>
            </Button>
          </div>
        </section>

        <section className="bg-secondary py-12 md:py-20">
          <div className="container">
            <h2 className="mb-8 text-center font-headline text-3xl font-bold md:text-4xl">
              آخر الأخبار
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {news.slice(0, 3).map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild variant="outline">
                <Link href="/news">قراءة المزيد من الأخبار</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-20">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <Card className="bg-transparent border-0 shadow-none">
                <CardHeader>
                  <CardTitle className="font-headline text-3xl md:text-4xl">
                    مركزك المخصص
                  </CardTitle>
                  <CardDescription className="text-base">
                    أنشئ حسابًا لمتابعة فرقك ولاعبيك المفضلين، وتلقي الإشعارات، ولا تفوت أي لحظة.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <ArrowLeft className="ml-2 h-4 w-4 text-accent" />
                      تابع فرقك المفضلة
                    </li>
                    <li className="flex items-center">
                      <ArrowLeft className="ml-2 h-4 w-4 text-accent" />
                      احصل على تحديثات المباريات المباشرة
                    </li>
                    <li className="flex items-center">
                      <ArrowLeft className="ml-2 h-4 w-4 text-accent" />
                      موجز أخبار مخصص
                    </li>
                  </ul>
                  <Button asChild size="lg" className="mt-6">
                    <Link href="/register">إنشاء حساب</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src="https://picsum.photos/seed/fans/600/400"
                alt="مشجعون يهتفون في الملعب"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
                data-ai-hint="fans cheering"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-secondary py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6" />
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © {new Date().getFullYear()} مركز كأس السعودية. جميع الحقوق محفوظة.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
