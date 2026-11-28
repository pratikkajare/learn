import ClsxDemo from '@/app/ui/clsx-demo';
import Image from 'next/image';

export default async function Contact() {
  const response = await fetch('https://dummyjson.com/products');

  const data = await response.json();
  console.log(data);
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-pink-600 font-sans light:bg-yellow">
      <h1 className="text-amber-700">I&apos;m dark!</h1>
      {data.products.map((val: { id: string; title: string; weight: number; images: string[] }, productIndex: number) => (
        <div key={val.id} className="m-2 p-2 flex">
          <p
            className={`text-amber-100 m-1 p-0.5 ${
              val.weight < 5 ? 'bg-red-700' : 'bg-amber-700'
            }`}>
            {val.title}
          </p>

          <div className="flex gap-2">
            {val.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={val.title}
                width={128}
                height={128}
                // The first image is the LCP element; load it right away instead of lazily
                loading={productIndex === 0 && index === 0 ? 'eager' : 'lazy'}
                className="w-32 h-32 object-cover"
              />
            ))}
          </div>
        </div>
      ))}
      <ClsxDemo />
    </div>
  );
}
