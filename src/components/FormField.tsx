import { ShieldAlert } from 'lucide-react';
import React from 'react';

import { Input, InputProps } from '@/components';

interface IFormFieldProps extends InputProps {
  error?: string;
}

export const FormField = React.forwardRef<HTMLInputElement, IFormFieldProps>(
  ({ error, ...props }, ref) => {
    return (
      <div>
        <Input {...props} ref={ref} />
        {error && (
          <span className="mt-2 flex items-center justify-start text-sm text-red-500">
            <ShieldAlert className="mr-2 size-4" />
            {error}
          </span>
        )}
      </div>
    );
  },
);
