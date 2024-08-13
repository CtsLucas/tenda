import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/lib/query-client';
import { Form, Toaster } from '@/components';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="dark flex min-h-screen items-center justify-center bg-background px-4 font-sans text-foreground antialiased">
        <Form />
      </div>
      <Toaster richColors />
    </QueryClientProvider>
  );
}
