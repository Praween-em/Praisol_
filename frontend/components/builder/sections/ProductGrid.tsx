import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { ShoppingCart } from 'lucide-react';
import { EditableText } from '../atoms/EditableText';

export interface ProductItem {
  id: number | string;
  name: string;
  price: string;
  image: string;
}

export interface ProductGridProps {
  id?: string;
  title?: string;
  products?: ProductItem[];
  showPrice?: boolean;
  showCartButton?: boolean;
  columns?: number;
  backgroundColor?: string;
  titleColor?: string;
  cardBackground?: string;
  cardBorderColor?: string;
  accentColor?: string;
  priceColor?: string;
  textColor?: string;
  padding?: string;
}

const defaultProducts: ProductItem[] = [
  { id: 1, name: 'Handmade Ceramic Vase', price: '₹1,200', image: 'https://images.unsplash.com/photo-1578749553858-1d1df995000d?w=800&auto=format&fit=crop' },
  { id: 2, name: 'Organic Soy Candle', price: '₹450', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop' },
  { id: 3, name: 'Woven Cotton Throw', price: '₹2,100', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop' },
];

export const ProductGrid = ({
  id = '',
  title = 'Our Products',
  products = defaultProducts,
  showPrice = true,
  showCartButton = true,
  columns = 3,
  backgroundColor = '#09090b',
  titleColor = '#ffffff',
  cardBackground = '#18181b',
  cardBorderColor = '#27272a',
  accentColor = '#6366f1',
  priceColor = '#ffffff',
  textColor = '#ffffff',
  padding = '5rem 2rem',
}: ProductGridProps) => {
  const gridCols = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[columns as 1|2|3|4] || 'md:grid-cols-3';

  return (
    <section style={{ background: backgroundColor, padding }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 style={{ color: titleColor, fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }} className="font-bold mb-12 text-center">
          <EditableText id={id} propKey="title" value={title} />
        </h2>
        
        <div className={`grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns}`}>
          {products.map((product, idx) => (
            <div 
                key={product.id}
                style={{ 
                    background: cardBackground, 
                    borderRadius: '16px', 
                    overflow: 'hidden', 
                    border: `1px solid ${cardBorderColor}`,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <div style={{ height: '240px', overflow: 'hidden' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.5rem', flexGrow: 1 }}>
                    <h3 style={{ color: textColor, fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                        <EditableText id={id} propKey={`products.${idx}.name`} value={product.name} />
                    </h3>
                    <div className="flex items-center justify-between mt-auto">
                        {showPrice && (
                        <span style={{ color: priceColor }} className="text-lg font-bold">
                            <EditableText id={id} propKey={`products.${idx}.price`} value={product.price} />
                        </span>
                        )}
                        {showCartButton && (
                        <Button size="sm" variant="outline" className="gap-2" style={{ borderColor: accentColor, color: accentColor }}>
                            <ShoppingCart size={14} /> Add
                        </Button>
                        )}
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
