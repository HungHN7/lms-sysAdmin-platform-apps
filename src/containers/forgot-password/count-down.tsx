import React, { useEffect, useState } from 'react';

interface CountdownProps {
  initialValue: number;
  onStart: boolean;
  onEnd: () => void;
  restart?: boolean;
}

const Countdown: React.FC<CountdownProps> = ({ initialValue, onStart, onEnd, restart }) => {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (onStart) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === 0) {
            clearInterval(interval);
            onEnd();
            return prevCount;
          } else {
            return prevCount - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [initialValue, onStart, onEnd]);

  useEffect(() => {
    if (restart) {
      setCount(initialValue);
    }
  }, [restart, initialValue]);

  const formatCount = (count: number): string => {
    const minutes = Math.floor(count / 60);
    const seconds = count % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <button
      disabled
      className='text-primary hover:underline underline-offset-2 text-[18px]'
    >
      {formatCount(count)}
    </button>
  );
};

export default Countdown;
