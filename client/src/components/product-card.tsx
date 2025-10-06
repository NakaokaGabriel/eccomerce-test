"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { addToCartFormAction } from "@/lib/actions";
import { ProductWithImage } from "@/lib/products-server";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { toast } from "@/lib/toast";

interface ProductCardProps {
  product: ProductWithImage;
}

function AddToCartButton({ productId, disabled }: { productId: string; disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="outline"
      size="icon"
      disabled={disabled || pending}
      className="flex-shrink-0"
    >
      <ShoppingCart className="w-4 h-4" />
    </Button>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const [state, formAction] = useFormState(async (prevState: { success: boolean; error?: boolean }, formData: FormData) => {
    try {
      await addToCartFormAction(formData);
      toast.success("Produto adicionado ao carrinho!");
      return { success: true };
    } catch (error) {
      toast.error("Erro ao adicionar produto ao carrinho");
      return { success: false, error: true };
    }
  }, { success: false });

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <div className="aspect-square bg-muted overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {product.badge && (
          <Badge className="absolute top-3 left-3" variant="default">
            {product.badge}
          </Badge>
        )}
        {discountPercentage > 0 && (
          <Badge className="absolute top-3 right-3" variant="destructive">
            -{discountPercentage}%
          </Badge>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary">Esgotado</Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating!)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                    }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">
              R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button asChild className="flex-1" disabled={!product.inStock}>
            <Link href="/">
              Ver Detalhes
            </Link>
          </Button>

          <form action={formAction}>
            <input type="hidden" name="productId" value={product.id} />
            <input type="hidden" name="quantity" value="1" />
            <AddToCartButton productId={product.id} disabled={!product.inStock} />
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
