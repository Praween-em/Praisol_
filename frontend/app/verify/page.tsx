'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { saveTokens, saveUser } from '@/lib/auth';
import { Layers, Loader2, ArrowLeft, RefreshCw } from 'lucide-react';

function VerifyContent() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const params = useSearchParams();
  const phone = params.get('phone') || '';

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6) { setError('Enter the 6-digit OTP'); return; }
    setError(''); setLoading(true);
    try {
      const { data } = await api.post('/platform/auth/verify-otp', { phone, otp: code });
      saveTokens(data.data.accessToken, data.data.refreshToken);
      saveUser(data.data.user);
      router.push('/dashboard');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg || 'Invalid OTP. Please try again.');
    } finally { setLoading(false); }
  };

  const handleResend = async () => {
    setResending(true);
    try { await api.post('/platform/auth/send-otp', { phone }); setCountdown(30); }
    catch { setError('Failed to resend OTP.'); }
    finally { setResending(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src="/logo.png" alt="PraiSol Logo" style={{ width: 40, height: 40, objectFit: 'contain' }} />
            </div>
          </Link>
          <h1 style={{ marginTop: '1.5rem', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.4rem' }}>Verify your number</h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
            We sent a 6-digit OTP to <strong style={{ color: 'var(--color-text)' }}>+91 {phone}</strong>
          </p>
        </div>

        <div className="glass" style={{ borderRadius: 16, padding: '2rem' }}>
          {/* OTP Inputs */}
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => { inputRefs.current[i] = el; }}
                type="tel" inputMode="numeric" maxLength={1}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                style={{
                  width: 48, height: 56, borderRadius: 10, textAlign: 'center',
                  fontSize: '1.3rem', fontWeight: 700,
                  background: 'var(--color-surface-2)', border: digit ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                  color: 'var(--color-text)', outline: 'none', transition: 'border-color 0.2s'
                }}
              />
            ))}
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '0.6rem 0.9rem', marginBottom: '1rem', fontSize: '0.85rem', color: '#f87171' }}>
              {error}
            </div>
          )}

          <button onClick={handleVerify} disabled={loading} id="verify-otp-btn"
            style={{
              width: '100%', padding: '0.85rem', border: 'none', borderRadius: 8, color: '#fff',
              background: loading ? 'var(--color-surface-3)' : 'linear-gradient(135deg, #6366f1, #a855f7)',
              fontWeight: 700, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
            }}>
            {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Verifying...</> : 'Verify & Continue'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem' }}>
            <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--color-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>
              <ArrowLeft size={14} /> Change number
            </Link>
            <button onClick={handleResend} disabled={countdown > 0 || resending}
              style={{ background: 'none', border: 'none', cursor: countdown > 0 ? 'not-allowed' : 'pointer', color: countdown > 0 ? 'var(--color-muted)' : 'var(--color-primary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <RefreshCw size={13} /> {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function VerifyPage() {
  return <Suspense><VerifyContent /></Suspense>;
}
