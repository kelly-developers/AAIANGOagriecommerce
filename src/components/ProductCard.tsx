import { Product } from '@/types/product';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-medium transition-all duration-300 overflow-hidden border-border">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <Link to={`/product/${product.id}`}>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>
          {product.isOrganic && (
            <Badge variant="secondary" className="ml-2 bg-accent text-accent-foreground">
              <Leaf className="w-3 h-3 mr-1" />
              Organic
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-primary">
              KSh {product.price.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground ml-1">
              /{product.unitType}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Stock: {product.stock}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onAddToCart(product)}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}