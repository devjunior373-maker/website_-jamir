import React, { useState, useEffect, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function ErrorBoundary({ children }: Props) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <h2 className="text-2xl font-bold text-red-600">Algo correu mal.</h2>
      </div>
    );
  }

  return <>{children}</>;
}
