import { Card, CardContent } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Navigation Skeleton */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4">
              <div className="h-10 w-32 bg-muted animate-pulse rounded-md"></div>
              <div className="h-10 w-32 bg-muted animate-pulse rounded-md"></div>
            </div>
            <div className="h-10 w-10 bg-muted animate-pulse rounded-md"></div>
          </div>

          {/* Header Skeleton */}
          <div className="text-center mb-8">
            <div className="h-8 w-64 bg-muted animate-pulse rounded-md mx-auto mb-4"></div>
            <div className="h-4 w-96 bg-muted animate-pulse rounded-md mx-auto"></div>
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Product Image Skeleton */}
            <Card className="overflow-hidden">
              <div className="aspect-square bg-muted animate-pulse"></div>
            </Card>

            {/* Product Details Skeleton */}
            <Card>
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="h-8 w-3/4 bg-muted animate-pulse rounded-md"></div>
                  <div className="h-6 w-1/2 bg-muted animate-pulse rounded-md"></div>
                </div>

                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted animate-pulse rounded-md"></div>
                  <div className="h-4 w-full bg-muted animate-pulse rounded-md"></div>
                  <div className="h-4 w-3/4 bg-muted animate-pulse rounded-md"></div>
                </div>

                <div className="space-y-3">
                  <div className="h-6 w-1/3 bg-muted animate-pulse rounded-md"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-4 w-full bg-muted animate-pulse rounded-md"></div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <div className="h-12 flex-1 bg-muted animate-pulse rounded-md"></div>
                  <div className="h-12 flex-1 bg-muted animate-pulse rounded-md"></div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
