import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeRemaining: number;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ timeRemaining, onTimeUp }) => {
  useEffect(() => {
    if (timeRemaining === 0) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-md flex items-center gap-2">
      <Clock className="w-5 h-5 text-blue-600" />
      <span className="font-mono text-xl">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}

export default Timer;