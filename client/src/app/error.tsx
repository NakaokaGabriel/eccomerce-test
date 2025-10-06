'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-xl">Algo deu errado!</CardTitle>
          <CardDescription>
            Ocorreu um erro inesperado. Tente novamente ou entre em contato com o suporte.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === 'development' && (
            <div className="rounded-md bg-muted p-3">
              <p className="text-sm font-medium text-muted-foreground">Detalhes do erro:</p>
              <p className="text-sm text-destructive">{error.message}</p>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-1">
                  ID do erro: {error.digest}
                </p>
              )}
            </div>
          )}
          <div className="flex gap-2">
            <Button onClick={reset} className="flex-1">
              <RefreshCw className="mr-2 h-4 w-4" />
              Tentar novamente
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'} className="flex-1">
              Voltar ao início
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
