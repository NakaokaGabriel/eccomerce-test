import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { CartButton } from "@/components/cart";
import { productsServerService, ProductWithImage } from "@/lib/products-server";
import { addToCartFormAction } from "@/lib/actions";
import { ProductCard } from "@/components/product-card";

export default async function ProductsPage() {
  const products = await productsServerService.getAllProducts();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Nossos Produtos
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra nossa seleção de produtos de alta qualidade
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <Link href="/">Produto em Destaque</Link>
              </Button>
              <Button variant="default" asChild>
                <Link href="/products">Todos os Produtos</Link>
              </Button>
            </div>
            <CartButton />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
