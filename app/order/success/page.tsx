// /app/order/success/page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
  // Fix: Change state type to string | null
  const [orderId, setOrderId] = useState<string | null>(null);
  
  // Also fix: If you're getting other data, update those states too
  const [clientData, setClientData] = useState<any>(null);

  useEffect(() => {
    // This will now work correctly
    const id = localStorage.getItem('lastOrderId');
    setOrderId(id); // No more TypeScript error!
    
    // If you have other localStorage calls
    const userData = localStorage.getItem('userData');
    if (userData) {
      setClientData(JSON.parse(userData));
    }
  }, []);

  if (!orderId) {
    return <div>Loading order information...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Order Successful!</h1>
      <p>Your order ID: <strong>{orderId}</strong></p>
      {clientData && (
        <p>Customer: {clientData.name || 'Guest'}</p>
      )}
    </div>
  );
}