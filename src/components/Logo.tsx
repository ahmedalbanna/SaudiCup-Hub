import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...props}
      className={cn('text-primary', props.className)}
    >
      <title>Saudi Cup Logo</title>
      <defs>
        <linearGradient id="ballGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4169E1" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#4169E1" stopOpacity="1" />
        </linearGradient>
         <linearGradient id="trophyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
           <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      <g transform="scale(3.8) translate(-27, -4)">
        <path
          d="M17.8 8.4a.4.4 0 0 0 .1-.5.3.3 0 0 0-.4-.2l-2.8.9a.3.3 0 0 0-.2.4.4.4 0 0 0 .4.3l2.9-.9zM19 12a.4.4 0 0 0 .4-.3.3.3 0 0 0-.2-.4l-2.9-1.2a.3.3 0 0 0-.4.2.4.4 0 0 0 .2.4l2.9 1.1zM15.4 15.3a.4.4 0 0 0 .4-.2.3.3 0 0 0-.2-.4L12.8 14a.3.3 0 0 0-.4.2.4.4 0 0 0 .2.4l2.8.7z"
          fill="hsl(var(--primary-foreground))"
          opacity="0.5"
        />
        <path
          d="M12.3 2.2a5.4 5.4 0 0 0-4.8 4.8 5.4 5.4 0 0 0 4.8 4.8 5.4 5.4 0 0 0 4.8-4.8 5.4 5.4 0 0 0-4.8-4.8zm2.4 6.8h-1.8v1.8a.6.6 0 1 1-1.2 0V9H9.9a.6.6 0 0 1 0-1.2h1.8V6a.6.6 0 1 1 1.2 0v1.8h1.8a.6.6 0 1 1 0 1.2z"
          fill="url(#ballGradient)"
        />
        <path
          d="M19.7 13.5a.6.6 0 0 1-.6-.6c.2-2.5-1.1-5.1-3.6-6.4a.6.6 0 1 1 .6-1.1c2.8 1.4 4.4 4.4 4.2 7.3a.6.6 0 0 1-.6.8z"
          fill="url(#ballGradient)"
        />
        <path
          d="M14.5 24.3c-2 0-3.9-.3-5.5-.8a.6.6 0 1 1 .4-1.1c1.5.5 3.3.7 5.1.7a8.2 8.2 0 0 0 7-4.5.6.6 0 1 1 1.1.5 9.4 9.4 0 0 1-8.1 5.2z"
          fill="url(#trophyGradient)"
        />
        <path
          d="M12.1 27.2h-.2c-3.5 0-6.8-1.4-9.2-3.8a.6.6 0 0 1 .8-.8c2.3 2.3 5.4 3.6 8.6 3.6h.2c.2 0 .5-.1.8-.2l-1.8-3.9a.6.6 0 1 1 1.1-.5l2.4 5.2a.6.6 0 0 1-.3.8.8.8 0 0 1-.5.1zM7.3 16.5c-2.4 0-4.6-1-6.2-2.6a.6.6 0 0 1 .8-.8c1.5 1.5 3.5 2.4 5.6 2.4a.6.6 0 0 1 0 1.2l-.2-.2z"
          fill="url(#trophyGradient)"
        />
        <path
          d="M14.5 24.3c-.2 0-.4 0-.6-.1a.6.6 0 0 1-.4-.8l2-5.7a.6.6 0 1 1 1.1.4l-2 5.7a.6.6 0 0 1-.5.5z"
          fill="url(#trophyGradient)"
        />
        <path
          d="M21.5 18a.6.6 0 0 1-.6-.6c.2-1.7-.5-3.5-1.9-4.7a.6.6 0 0 1 .7-1c1.6 1.3 2.5 3.4 2.2 5.5a.6.6 0 0 1-.4.8z"
          fill="url(#ballGradient)"
        />
        <path d="M12.5 29.5h-1V27a.6.6 0 0 1 .6-.6h.4a.6.6 0 0 1 .6.6v2.5z" fill="hsl(var(--muted-foreground))" />
        <path d="M15.4 31.5H8.6a.6.6 0 0 1 0-1.2h6.8a.6.6 0 0 1 0 1.2z" fill="hsl(var(--muted-foreground))" />
      </g>
    </svg>
  );
}
