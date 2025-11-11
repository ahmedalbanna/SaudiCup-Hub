'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  CalendarDays,
  Shield,
  Users,
  Newspaper,
  Stadium,
  GalleryHorizontal,
  LayoutDashboard,
  PanelLeft,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/schedule', icon: CalendarDays, label: 'Schedule' },
  { href: '/teams', icon: Shield, label: 'Teams' },
  { href: '/players', icon: Users, label: 'Players' },
  { href: '/news', icon: Newspaper, label: 'News' },
  { href: '/stadiums', icon: Stadium, label: 'Stadiums' },
  { href: '/gallery', icon: GalleryHorizontal, label: 'Gallery' },
];

export function SidebarNav({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();

  if (isMobile) {
    return (
        <nav className="grid gap-6 text-lg font-medium">
            <Link
                href="#"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
                <Logo className="h-5 w-5 transition-all group-hover:scale-110 text-primary-foreground" />
                <span className="sr-only">SaudiCup Hub</span>
            </Link>
            {navItems.map((item) => (
            <Link
                key={item.href}
                href={item.href}
                className={cn("flex items-center gap-4 px-2.5",
                    pathname.startsWith(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
            >
                <item.icon className="h-5 w-5" />
                {item.label}
            </Link>
            ))}
      </nav>
    )
  }

  return (
    <TooltipProvider>
      {navItems.map((item) => (
        <Tooltip key={item.href}>
          <TooltipTrigger asChild>
            <Link
              href={item.href}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8',
                pathname.startsWith(item.href)
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="sr-only">{item.label}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      ))}
    </TooltipProvider>
  );
}