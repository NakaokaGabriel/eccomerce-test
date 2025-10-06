import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-8">
            <div className="h-10 w-64 bg-muted animate-pulse rounded-md mx-auto mb-4"></div>
            <div className="h-5 w-96 bg-muted animate-pulse rounded-md mx-auto"></div>
          </div>

          {/* Navigation Skeleton */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4">
              <div className="h-10 w-32 bg-muted animate-pulse rounded-md"></div>
              <div className="h-10 w-32 bg-muted animate-pulse rounded-md"></div>
            </div>
            <div className="h-10 w-10 bg-muted animate-pulse rounded-md"></div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <div className="aspect-square bg-muted animate-pulse"></div>
                  <div className="absolute top-3 left-3 h-6 w-16 bg-muted animate-pulse rounded-full"></div>
                </div>

                <CardHeader className="pb-3">
                  <div className="h-6 w-3/4 bg-muted animate-pulse rounded-md mb-2"></div>
                  <div className="h-4 w-full bg-muted animate-pulse rounded-md"></div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Rating Skeleton */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, j) => (
                        <div key={j} className="h-4 w-4 bg-muted animate-pulse rounded-sm"></div>
                      ))}
                    </div>
                    <div className="h-4 w-16 bg-muted animate-pulse rounded-md"></div>
                  </div>

                  {/* Price Skeleton */}
                  <div className="space-y-1">
                    <div className="h-6 w-24 bg-muted animate-pulse rounded-md"></div>
                  </div>

                  {/* Actions Skeleton */}
                  <div className="flex gap-2">
                    <div className="h-10 flex-1 bg-muted animate-pulse rounded-md"></div>
                    <div className="h-10 w-10 bg-muted animate-pulse rounded-md"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
