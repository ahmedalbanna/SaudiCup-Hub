'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Newspaper,
  Shield,
  Star,
  Store,
  Calendar,
} from 'lucide-react';

const navItems = [
  { href: '/news', label: 'الأخبار', icon: Newspaper },
  { href: '/teams', label: 'الأندية', icon: Shield },
  { href: '/schedule', label: 'المباريات', icon: Calendar },
  { href: '/dashboard', label: 'الرئيسية', icon: LayoutDashboard },
  { href: '/stadiums', label: 'المتجر', icon: Store },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <footer className="sticky bottom-0 z-50 mt-auto border-t border-gray-700 bg-gray-800/80 p-2 backdrop-blur-sm md:hidden">
      <nav className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 rounded-md p-2 text-xs font-medium text-gray-400 transition-colors hover:bg-gray-700 hover:text-white w-1/5',
                {
                  'bg-lime-300 text-gray-900 hover:bg-lime-400 hover:text-gray-900': isActive,
                }
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="uppercase tracking-wider text-center text-[10px] leading-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
