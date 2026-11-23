'use client';

import { useState } from 'react';
import clsx from 'clsx';

export default function ClsxDemo() {
  const [chalu, setChalu] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 p-10 bg-black">
      <button
        onClick={() => setChalu(!chalu)}
        className={clsx(
          // 1. These classes are ALWAYS applied
          'rounded px-6 py-2 font-bold text-red-800',

          // 2. These classes are applied only when the condition is true
          {
            'bg-green-500 text-white': chalu, // when ON
            'bg-gray-300 text-black': !chalu, // when OFF
          },
        )}>
        {chalu ? 'ON' : 'OFF'}
      </button>

      <p>Click the button and watch the color change.x</p>
    </div>
  );
}
