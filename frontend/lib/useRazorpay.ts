'use client';

import { useState, useCallback } from 'react';
import Script from 'next/script';
import api from '@/lib/api';

interface RazorpayCheckoutProps {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

export function useRazorpay() {
  const [loading, setLoading] = useState(false);

  const loadScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const processPayment = useCallback(async (options: {
    amount: number;
    planId: string;
    userName?: string;
    userEmail?: string;
    userContact?: string;
  }, onSuccess: (res: any) => void, onError: (err: any) => void) => {
    setLoading(true);
    try {
      // 1. Load Razorpay script
      const isLoaded = await loadScript();
      if (!isLoaded) {
        throw new Error('Razorpay SDK failed to load. Are you online?');
      }

      // 2. Create order on backend
      const { data: { order } } = await api.post('/platform/payment/create-order', {
        amount: options.amount,
        planId: options.planId
      });

      // 3. Configure Razorpay options
      const rzpOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        amount: order.amount,
        currency: order.currency,
        name: 'PraiSol Platform',
        description: `Subscription: ${options.planId} Plan`,
        image: '/logo.png',
        order_id: order.id,
        handler: async (response: any) => {
          try {
            // 4. Verify payment on backend
            const { data } = await api.post('/platform/payment/verify', response);
            if (data.success) {
              onSuccess(data);
            } else {
              throw new Error(data.message || 'Verification failed');
            }
          } catch (err: any) {
            onError(err.response?.data?.message || err.message || 'Verification failed');
          }
        },
        prefill: {
          name: options.userName || '',
          email: options.userEmail || '',
          contact: options.userContact || '',
        },
        theme: {
          color: '#6366f1',
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          }
        }
      };

      const paymentObject = new (window as any).Razorpay(rzpOptions);
      paymentObject.open();
    } catch (error: any) {
      console.error('Payment Error:', error);
      onError(error.response?.data?.message || error.message || 'Payment initiation failed');
    } finally {
      setLoading(false);
    }
  }, []);

  return { processPayment, loading };
}
