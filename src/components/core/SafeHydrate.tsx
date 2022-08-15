import React, { ReactNode } from 'react';

const SafeHydrate = ({ children }: { children: ReactNode }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  );
};

export { SafeHydrate as default };