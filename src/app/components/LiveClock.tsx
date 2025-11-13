'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';

export function LiveClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set initial time on client mount
    setTime(new Date());

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!time) {
    // Render a placeholder or nothing on the server and initial client render
    return <div className="hidden md:flex flex-col items-center justify-center text-sm h-[34px] w-[155px]"></div>;
  }

  const formattedTime = format(time, 'hh:mm:ss a');
  const formattedDate = format(time, 'eeee, d MMMM yyyy', { locale: arSA });

  return (
    <div className="hidden md:flex flex-col items-center justify-center text-sm">
      <div className="font-mono font-semibold text-foreground tracking-wider">
        {formattedTime}
      </div>
      <div className="text-xs text-muted-foreground">{formattedDate}</div>
    </div>
  );
}
