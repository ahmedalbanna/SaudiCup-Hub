import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      className={cn('text-primary', props.className)}
    >
      <title>SaudiCup Hub Logo</title>
      {/* Crown */}
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" fill="hsl(var(--accent))" stroke="none" />
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
      {/* Soccer Ball */}
      <circle cx="12" cy="16" r="6" fill="white" />
      <path d="M12 10v12" />
      <path d="M12 16l-5-3" />
      <path d="M12 16l5-3" />
      <path d="M12 16l-3.5 5" />
      <path d="M12 16l3.5 5" />
      <path d="M7 13l-2.5-1.5" />
      <path d="M17 13l2.5-1.5" />
    </svg>
  );
}
