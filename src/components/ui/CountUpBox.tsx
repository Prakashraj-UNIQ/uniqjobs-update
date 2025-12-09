'use client';

import { useState, useEffect } from 'react';

type CountUpBoxProps = {
  value: number;
  label: string;
  textalign?: string;
};

const CountUpBox: React.FC<CountUpBoxProps> = ({ value, label, textalign }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; 
    const increment = Math.ceil(value / (duration / 30));

    const interval = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(interval);
      }
      setCount(start);
    }, 30);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className={textalign ?? ''}>
      <div className="text-white font-bold text-lg">
        {count.toLocaleString()}+
      </div>
      <div className="font-medium text-white/60">{label}</div>
    </div>
  );
};

export default CountUpBox;
