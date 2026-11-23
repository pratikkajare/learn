import ClsxDemo from '@/app/ui/clsx-demo';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans light:bg-yellow">
      <h1 className="text-red-400">I&apos;m blue!</h1>
      <ClsxDemo />
    </div>
  );
}
