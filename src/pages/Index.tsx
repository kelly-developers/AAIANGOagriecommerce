import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, MapPin, Users, Filter } from 'lucide-react';
import heroImage from '@/assets/african-greens-hero.jpg';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addToCart } = useCartContext();
  const { toast } = useToast();

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Layout onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory}>
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="relative h-96 overflow-hidden rounded-lg mx-6 mt-6">
          <img
            src={heroImage}
            alt="Fresh African vegetables"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
            <div className="h-full flex items-center px-8">
              <div className="text-white max-w-2xl">
                <h1 className="text-4xl font-bold mb-4">
                  Fresh African Leafy Vegatables
                </h1>
                <p className="text-xl mb-6 opacity-90">
                  Supporting local farmers and sustainable agriculture across Africa
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4" />
                    <span>100% Organic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Locally Sourced</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Supporting Communities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="px-6">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Filter by Category</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="bg-primary hover:bg-primary-hover"
            >
              All Products ({products.length})
            </Button>
            {categories.map((category) => {
              const count = products.filter(p => p.category === category.id).length;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  className="bg-primary hover:bg-primary-hover"
                >
                  {category.name} ({count})
                </Button>
              );
            })}
          </div>
        </section>

        {/* Products Section */}
        <section className="px-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {selectedCategory === 'all' 
                ? 'All Products' 
                : categories.find(c => c.id === selectedCategory)?.name || 'Products'
              }
            </h2>
            <p className="text-muted-foreground">
              {selectedCategory === 'vegetables' && 'Fresh traditional African vegetables rich in nutrients'}
              {selectedCategory === 'fruits' && 'Sweet tropical fruits from local farms'}
              {selectedCategory === 'seeds' && 'High-quality seeds for sustainable farming'}
              {selectedCategory === 'tools' && 'Essential tools for modern farming'}
              {selectedCategory === 'all' && 'Discover our complete range of agricultural products'}
            </p>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </section>

        {/* About Section */}
        <section className="px-6 py-12 bg-gradient-earth rounded-lg mx-6 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Artificial Intelligence Alliance Agriculture NGO
            </h2>
            <p className="text-lg mb-6 opacity-90">
              We are committed to promoting sustainable agriculture and supporting local farming communities 
              across Africa through innovative technology and traditional knowledge.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <Leaf className="w-12 h-12 mx-auto mb-3 opacity-80" />
                <h3 className="font-semibold mb-2">Organic & Natural</h3>
                <p className="text-sm opacity-80">
                  All our products are grown using sustainable, organic farming methods
                </p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-80" />
                <h3 className="font-semibold mb-2">Community Support</h3>
                <p className="text-sm opacity-80">
                  Direct partnerships with local farmers and farming cooperatives
                </p>
              </div>
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-3 opacity-80" />
                <h3 className="font-semibold mb-2">Local Sourcing</h3>
                <p className="text-sm opacity-80">
                  Fresh products sourced directly from farms across Kenya
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;