'use client';
import { useEffect } from 'react';
import ClsxDemo from '../ui/clsx-demo';

export default function Contact() {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://dummyjson.com/products');

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-amber-700 font-sans">
      <h1 className="text-amber-300">I'm yellow!</h1>
    </div>
  );
}
