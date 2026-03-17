'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCart, Package, Info } from 'lucide-react';
import { EditableText } from '../atoms/EditableText';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';

export interface ProductItem {
  id: string;
  name: string;
  price: string;
  sale_price?: string;
  description: string;
  images: { image_url: string; is_primary: boolean }[];
}

export interface DynamicProductCatalogueProps {
  id?: string;
  title?: string;
  columns?: number;
  tenantSlug?: string;
}

const dummyProducts: ProductItem[] = [
  {
    id: '1',
    name: 'Sample Artisan Vase',
    price: '1200',
    description: 'A beautiful handcrafted ceramic vase.',
    images: [{ image_url: 'https://images.unsplash.com/photo-1578749553858-1d1df995000d?w=800&auto=format&fit=crop', is_primary: true }]
  },
  {
    id: '2',
    name: 'Eco-Friendly Candle',
    price: '450',
    sale_price: '399',
    description: 'Natural soy wax candle with essential oils.',
    images: [{ image_url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop', is_primary: true }]
  }
];

export const DynamicProductCatalogue = ({
  id = '',
  title = 'Our Catalogue',
  columns = 3,
  tenantSlug
}: DynamicProductCatalogueProps) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tenantSlug) {
      setLoading(true);
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/public/products`, {
        headers: { 'X-Tenant-ID': tenantSlug }
      })
      .then(res => {
        setProducts(res.data.data);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
      })
      .finally(() => setLoading(false));
    } else {
      setProducts(dummyProducts);
    }
  }, [tenantSlug]);

  const gridCols = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[columns as 1|2|3|4] || 'md:grid-cols-3';

  return (
    <section className="py-20 px-4 sm:px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-500 mb-4">
            <Package size={32} />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-100 text-center">
            <EditableText id={id} propKey="title" value={title} />
          </h2>
        </div>
        
        {loading ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-zinc-900 animate-pulse rounded-2xl border border-zinc-800" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className={`grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns}`}>
            {products.map((product) => {
              const primaryImage = product.images?.find(img => img.is_primary)?.image_url || product.images?.[0]?.image_url || '';
              const displayPrice = product.sale_price || product.price;
              const hasSale = !!product.sale_price;

              return (
                <Card 
                  key={product.id}
                  image={primaryImage}
                  title={product.name}
                >
                  <p className="text-zinc-400 text-sm line-clamp-2 mb-4 h-10">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      {hasSale && (
                        <span className="text-xs text-zinc-500 line-through">₹{product.price}</span>
                      )}
                      <span className="text-lg font-bold text-zinc-100">
                        ₹{displayPrice}
                      </span>
                    </div>
                    <Button size="sm" variant="primary" className="gap-2">
                      <ShoppingCart size={14} /> Buy
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="p-20 text-center text-zinc-600 border border-dashed border-zinc-800 rounded-3xl">
            <Info className="mx-auto mb-4 opacity-20" size={48} />
            <p>No products found in the catalogue.</p>
          </div>
        )}
      </div>
    </section>
  );
};
