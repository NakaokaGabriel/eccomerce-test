"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Truck, RotateCcw, Shield } from "lucide-react";
import { addToCartFormAction } from "@/lib/actions";
import { ProductWithImage } from "@/lib/products-server";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "@/lib/toast";

interface FeaturedProductCardProps {
  product: ProductWithImage;
  features: string[];
}

function AddToCartButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="outline"
      size="lg"
      disabled={disabled || pending}
      className="flex-1"
    >
      {pending ? "Adicionando..." : "Adicionar ao Carrinho"}
    </Button>
  );
}

export function FeaturedProductCard({ product, features }: FeaturedProductCardProps) {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Product Image Card */}
      <Card className="overflow-hidden">
        <div className="relative">
          <div className="aspect-square bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <Badge className="absolute top-4 right-4" variant="default">
            Novo
          </Badge>
        </div>
      </Card>

      {/* Product Details Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl mb-2">
                {product.name}
              </CardTitle>
              <div className="text-4xl font-bold text-primary">
                R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <CardDescription className="text-lg leading-relaxed">
            {product.description}
          </CardDescription>

          {/* Features */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Características Principais
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-muted-foreground">
                  <Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="flex-1">
              Comprar Agora
            </Button>

            <form action={formAction}>
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="quantity" value="1" />
              <AddToCartButton disabled={!product.inStock} />
            </form>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="text-center">
              <Truck className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-sm text-muted-foreground">Frete Grátis</div>
            </div>
            <div className="text-center">
              <RotateCcw className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-sm text-muted-foreground">30 dias para trocar</div>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-sm text-muted-foreground">Garantia 2 anos</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
