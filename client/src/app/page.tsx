import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Truck, RotateCcw, Shield } from "lucide-react";
import { CartButton } from "@/components/cart";
import { productsServerService, ProductWithImage } from "@/lib/products-server";
import { addToCartFormAction } from "@/lib/actions";
import { FeaturedProductCard } from "@/components/featured-product-card";

export default async function Home() {
  const product = await productsServerService.getProduct("prod_1");

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Nenhum produto encontrado.</p>
        </div>
      </div>
    );
  }

  const features = [
    "Câmera tripla de 108MP",
    "Tela OLED 6.7\" com 120Hz",
    "Processador octa-core",
    "256GB de armazenamento",
    "Bateria de 5000mAh",
    "Carregamento rápido 65W"
  ];
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4">
              <Button variant="default" asChild>
                <Link href="/">Produto em Destaque</Link>
              </Button>
            </div>
            <CartButton />
          </div>

          <FeaturedProductCard product={product} features={features} />
        </div>
      </div>
    </div>
  );
}
