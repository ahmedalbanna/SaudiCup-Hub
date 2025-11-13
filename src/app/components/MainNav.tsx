'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/dashboard', label: 'الرئيسية' },
  { href: '/schedule', label: 'المباريات' },
  { href: '/news', label: 'الأخبار' },
  { href: '/teams', label: 'الفرق' },
  { href: '/players', label: 'اللاعبون' },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-md bg-muted p-1 md:flex">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          asChild
          className="px-4 py-1 h-auto text-sm data-[active=true]:bg-background data-[active=true]:text-foreground hover:bg-background/50"
          data-active={pathname.startsWith(item.href)}
        >
          <Link href={item.href}>{item.label}</Link>
        </Button>
      ))}
    </nav>
  );
}
