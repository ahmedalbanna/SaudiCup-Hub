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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarInset,
    SidebarRail,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroup,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/Logo';
import { SidebarNav } from '../components/SidebarNav';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
        <Sidebar side="right">
            <SidebarHeader>
                <Logo className="h-8 w-8 text-primary" />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarNav />
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="justify-start gap-2 p-2 h-auto w-full">
                         <Avatar className="h-8 w-8">
                            <AvatarImage src="https://picsum.photos/seed/user1/100/100" alt="صورة المستخدم" data-ai-hint="female portrait" />
                            <AvatarFallback>س أ</AvatarFallback>
                        </Avatar>
                        <div className="text-right hidden group-data-[collapsible=icon]:hidden">
                            <p className="text-sm font-medium">سارة الأحمد</p>
                            <p className="text-xs text-muted-foreground">sara@example.com</p>
                        </div>
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
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
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
                        <SidebarNav isMobile={true} />
                    </SheetContent>
                </Sheet>
                <div className="w-full flex-1">
                    {/* Header content can go here */}
                </div>
                <Button variant="secondary" size="icon" className="rounded-full">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">تبديل الإشعارات</span>
                </Button>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
