'use client';
import { useState, useRef, useEffect } from 'react';
import api from '@/lib/api';
import { saveTokens, saveUser } from '@/lib/auth';
import { Phone, CheckCircle, Loader2, ArrowRight, RefreshCw, Smartphone } from 'lucide-react';
import { Input } from './atoms/Input';
import { Button } from './atoms/Button';

interface UnifiedAuthFlowProps {
  onSuccess: () => void;
}

export const UnifiedAuthFlow = ({ onSuccess }: UnifiedAuthFlowProps) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [countdown]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) return setError('Enter a valid 10-digit number');
    setError(''); setLoading(true);
    try {
      await api.post('/platform/auth/send-otp', { phone });
      setStep('otp');
      setCountdown(30);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally { setLoading(false); }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6) return setError('Enter 6-digit code');
    setError(''); setLoading(true);
    try {
      const { data } = await api.post('/platform/auth/verify-otp', { phone, otp: code });
      saveTokens(data.data.accessToken, data.data.refreshToken);
      saveUser(data.data.user);
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally { setLoading(false); }
  };

  const handleOTPChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  if (step === 'phone') {
    return (
      <form onSubmit={handleSendOTP} className="space-y-4">
        <Input 
          label="Mobile Number"
          placeholder="9876543210"
          value={phone}
          onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
          maxLength={10}
          icon={<Phone size={16} />}
          error={error}
        />
        <Button fullWidth type="submit" isLoading={loading}>
          Send Verification Code <ArrowRight size={16} className="ml-2" />
        </Button>
      </form>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-zinc-400">Enter code sent to +91 {phone}</p>
        <button 
          onClick={() => setStep('phone')} 
          className="text-xs text-indigo-400 mt-1 hover:underline"
        >
          Change Number
        </button>
      </div>

      <div className="flex justify-center gap-2">
        {otp.map((d, i) => (
          <input 
            key={i}
            ref={el => { otpRefs.current[i] = el; }}
            type="tel" maxLength={1}
            value={d}
            onChange={e => handleOTPChange(i, e.target.value)}
            onKeyDown={e => e.key === 'Backspace' && !otp[i] && i > 0 && otpRefs.current[i-1]?.focus()}
            className="w-10 h-12 bg-zinc-900 border border-zinc-800 rounded-lg text-center text-xl font-bold text-indigo-400 outline-none focus:border-indigo-500 transition-all"
          />
        ))}
      </div>

      {error && <p className="text-xs text-red-500 text-center">{error}</p>}

      <Button fullWidth onClick={handleVerify} isLoading={loading}>
        Verify & Continue
      </Button>

      <div className="text-center">
         <button 
           disabled={countdown > 0 || loading}
           onClick={handleSendOTP}
           className="text-xs text-zinc-500 hover:text-indigo-400 disabled:opacity-50 flex items-center gap-2 mx-auto"
         >
           <RefreshCw size={12} />
           {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
         </button>
      </div>
    </div>
  );
};
