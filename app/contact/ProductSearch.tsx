'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

export default function ProductSearch({ initialProducts }: { initialProducts: Product[] }) {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const query = search.trim();

    // If search is empty, show initial products
    if (!query) {
      setProducts(initialProducts);
      setLoading(false);
      setError('');
      return;
    }

    const controller = new AbortController();

    // Debounce API calls
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error('Failed to search products');
        }

        const data = await response.json();

        setProducts(data.products);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search, initialProducts]);

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full border rounded-lg p-3 mb-6"
      />

      {/* Loading */}
      {loading && <p>Searching products...</p>}

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Products */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-contain"
              />

              <h2 className="font-semibold mt-3">{product.title}</h2>

              <p className="text-gray-500 text-sm">{product.description}</p>

              <p className="font-bold mt-2">${product.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && <p>No products found.</p>}
    </div>
  );
}
