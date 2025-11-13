import Link from 'next/link';
import {
  Bell,
  Home,
  LineChart,
  Package,
  PanelLeft,
  Search,
  Settings,
  Users,
  CalendarDays,
  Shield,
  Newspaper,
  Landmark,
  GalleryHorizontal,
  LayoutDashboard,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Logo } from '@/components/Logo';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { BottomNav } from '@/app/components/BottomNav';
import { MainNav } from '../components/MainNav';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { LiveClock } from '../components/LiveClock';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const notifications = [
    { title: 'نتيجة المباراة', description: 'روفرز الرياض 2 - 1 جيتس جدة', time: 'منذ 5 دقائق' },
    { title: 'خبر جديد', description: 'تم الإعلان عن جدول المباريات الجديد.', time: 'منذ 1 ساعة' },
    { title: 'تذكير بالمباراة', description: 'ديناموز الدمام ضد ملوك مكة ستبدأ قريبًا.', time: 'منذ 3 ساعات' },
  ];

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/95 px-4 backdrop-blur-sm md:px-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Logo className="h-8 w-8" />
              <div className="text-right">
                <p className="font-bold text-foreground">كأس السعودية</p>
                <p className="text-xs text-muted-foreground">تأسست 2024</p>
              </div>
            </Link>
          </div>

          <LiveClock />

          <MainNav />

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" asChild>
              <Link href="/favorites">
                <Heart className="h-5 w-5" />
                <span className="sr-only">المفضلة</span>
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0 text-xs">{notifications.length}</Badge>
                  <span className="sr-only">فتح الإشعارات</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel>الإشعارات</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification, index) => (
                  <DropdownMenuItem key={index} className="flex flex-col items-start gap-1">
                    <p className="font-semibold">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground/80">{notification.time}</p>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                 <DropdownMenuItem className="justify-center">
                    <Link href="#">عرض كل الإشعارات</Link>
                 </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="https://picsum.photos/seed/user1/100/100"
                      alt="صورة المستخدم"
                      data-ai-hint="female portrait"
                    />
                    <AvatarFallback>س أ</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1 text-right">
                    <p className="text-sm font-medium leading-none">
                      سارة الأحمد
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      sara@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
                <DropdownMenuItem>الإعدادات</DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin">
                    <ShieldCheck className="ml-2 h-4 w-4" />
                    <span>لوحة التحكم</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">تسجيل الخروج</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main
          className="flex-1 overflow-auto p-4 lg:p-6"
          style={{
            backgroundImage:
              'url(https://picsum.photos/seed/stadium-bg/1920/1080)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="relative z-10">{children}</div>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
        </main>

        <BottomNav />
      </div>
    </ThemeProvider>
  );
}
