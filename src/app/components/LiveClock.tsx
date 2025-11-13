'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';

export function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
