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

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-900 text-gray-200">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 border-b border-gray-700 bg-gray-800/80 px-4 backdrop-blur-sm md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <div className="text-right">
              <p className="font-bold">روفرز الرياض</p>
              <p className="text-xs text-gray-400">تأسست 2024</p>
            </div>
          </Link>
          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-2 text-yellow-400">
              <span className="font-bold">60,641</span>
              <div className="h-5 w-5 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center text-xs font-bold">F</div>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <span className="font-bold">0</span>
              <div className="h-5 w-5 rounded-full bg-green-400"></div>
            </div>
          </div>
        </div>

        <nav className="hidden absolute left-1/2 -translate-x-1/2 items-center gap-2 rounded-md bg-gray-700 p-1 md:flex">
          <Button variant="ghost" className="px-4 py-1 h-auto text-sm data-[active=true]:bg-gray-600">
            الرئيسية
          </Button>
          <Button variant="ghost" className="px-4 py-1 h-auto text-sm data-[active=true]:bg-gray-600">
            لعب
          </Button>
          <Button variant="ghost" className="px-4 py-1 h-auto text-sm data-[active=true]:bg-gray-600" data-active="true">
            النادي
          </Button>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 md:flex">
            <div className="flex-1">
              <p className="text-xs text-gray-400 text-left">الموسم 1</p>
              <Progress value={33} className="h-2 w-32" />
            </div>
            <div className="flex items-center gap-2">
               <span className="font-bold text-lg">1</span>
               <span className="text-xs bg-yellow-500 text-black px-1.5 py-0.5 rounded-sm font-bold">XP</span>
            </div>
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
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1 text-right">
                    <p className="text-sm font-medium leading-none">سارة الأحمد</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      sara@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
                <DropdownMenuItem>الإعدادات</DropdownMenuItem>
                <DropdownMenuSeparator />
                 <DropdownMenuItem asChild>
                  <Link href="/">تسجيل الخروج</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 lg:p-6" style={{ backgroundImage: 'url(https://picsum.photos/seed/stadium-bg/1920/1080)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="relative z-10">{children}</div>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </main>

      <BottomNav />
    </div>
  );
}
