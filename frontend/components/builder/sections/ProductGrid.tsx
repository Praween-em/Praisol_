'use client';
import React from 'react';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { ShoppingCart } from 'lucide-react';

export interface ProductGridProps {
  title?: string;
  showPrice?: boolean;
  showCartButton?: boolean;
  columns?: number;
}

const mockProducts = [
  { id: 1, name: 'Handmade Ceramic Vase', price: '₹1,200', image: 'https://images.unsplash.com/photo-1578749553858-1d1df995000d?w=800&auto=format&fit=crop' },
  { id: 2, name: 'Organic Soy Candle', price: '₹450', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop' },
  { id: 3, name: 'Woven Cotton Throw', price: '₹2,100', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop' },
];

export const ProductGrid = ({
  title = 'Our Products',
  showPrice = true,
  showCartButton = true,
  columns = 3,
}: ProductGridProps) => {
  const gridCols = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[columns as 1|2|3|4] || 'md:grid-cols-3';

  return (
    <section className="py-20 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-zinc-100 mb-12 text-center">{title}</h2>
        
        <div className={`grid gap-8 grid-cols-1 ${gridCols}`}>
          {mockProducts.map((product) => (
            <Card 
              key={product.id}
              image={product.image}
              title={product.name}
            >
              <div className="flex items-center justify-between mt-2">
                {showPrice && (
                  <span className="text-lg font-bold text-zinc-100">{product.price}</span>
                )}
                {showCartButton && (
                  <Button size="sm" variant="outline" className="gap-2">
                    <ShoppingCart size={14} /> Add
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
