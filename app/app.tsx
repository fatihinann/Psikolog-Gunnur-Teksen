'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to website home page
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }

  return null;
}
