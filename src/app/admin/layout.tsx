import Link from 'next/link';
import {
  Bell,
  Home,
  Newspaper,
  Shield,
  Users,
  PanelLeft,
  CalendarDays,
  Landmark,
  LayoutDashboard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavLink } from './components/NavLink';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { href: '/admin', label: 'لوحة التحكم', icon: Home },
    { href: '/admin/news', label: 'إدارة الأخبار', icon: Newspaper },
    { href: '/admin/teams', label: 'إدارة الفرق', icon: Shield },
    { href: '/admin/players', label: 'إدارة اللاعبين', icon: Users },
    { href: '/admin/matches', label: 'إدارة المباريات', icon: CalendarDays },
    { href: '/admin/stadiums', label: 'إدارة الملاعب', icon: Landmark },
  ];

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-l md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Logo className="h-6 w-6" />
              <span className="">لوحة تحكم المسؤول</span>
            </Link>
            <Button variant="outline" size="icon" className="mr-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => (
                 <NavLink key={item.href} href={item.href}>
                    <item.icon className="h-4 w-4" />
                    {item.label}
                 </NavLink>
              ))}
               <NavLink href="/dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  عرض التطبيق
               </NavLink>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card>
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>ترقية</CardTitle>
                <CardDescription>
                  افتح جميع الميزات واحصل على وصول غير محدود إلى لوحة الدعم الخاصة بنا.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  ترقية
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">تبديل قائمة التنقل</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Logo className="h-6 w-6" />
                  <span className="sr-only">لوحة تحكم المسؤول</span>
                </Link>
                {navItems.map((item) => (
                 <NavLink key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground">
                    <item.icon className="h-5 w-5" />
                    {item.label}
                 </NavLink>
              ))}
               <NavLink href="/dashboard" className="text-muted-foreground hover:text-foreground">
                  <LayoutDashboard className="h-5 w-5" />
                  عرض التطبيق
               </NavLink>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>ترقية</CardTitle>
                    <CardDescription>
                     افتح جميع الميزات واحصل على وصول غير محدود إلى لوحة الدعم الخاصة بنا.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      ترقية
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Search can be added here */}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                      <AvatarImage src="https://picsum.photos/seed/user1/100/100" alt="صورة المستخدم" data-ai-hint="female portrait" />
                      <AvatarFallback>س أ</AvatarFallback>
                  </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>حسابي</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>الإعدادات</DropdownMenuItem>
              <DropdownMenuItem>الدعم</DropdownMenuItem>
              <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                  <Link href="/">تسجيل الخروج</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
}
