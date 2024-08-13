import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/lib/query-client';
import { Form } from '@/components/Form';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="dark flex min-h-screen items-center justify-center bg-background font-sans text-foreground antialiased">
        <Form />
      </div>
    </QueryClientProvider>
  );
}
