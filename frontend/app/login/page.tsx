'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Layers, Phone, Loader2, ArrowRight } from 'lucide-react';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await api.post('/platform/auth/send-otp', { phone });
      router.push(`/verify?phone=${phone}`);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--color-bg)', padding: '2rem'
    }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 600, borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)'
      }} />

      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Layers size={22} color="#fff" />
              </div>
              <span style={{ color: 'var(--color-text)', fontWeight: 800, fontSize: '1.3rem' }}>PraiSol</span>
            </div>
          </Link>
          <h1 style={{ marginTop: '2rem', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.4rem' }}>
            Welcome back
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
            Enter your mobile number to continue
          </p>
        </div>

        {/* Form Card */}
        <div className="glass" style={{ borderRadius: 16, padding: '2rem' }}>
          <form onSubmit={handleSendOTP}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--color-muted)' }}>
                Mobile Number
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                  color: 'var(--color-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem',
                  fontSize: '0.9rem', borderRight: '1px solid var(--color-border)', paddingRight: 10
                }}>
                  <Phone size={15} /> +91
                </div>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="9876543210"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                  style={{
                    width: '100%', padding: '0.75rem 1rem 0.75rem 90px',
                    background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
                    borderRadius: 8, color: 'var(--color-text)', fontSize: '1rem',
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--color-primary)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
                />
              </div>
            </div>

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 8, padding: '0.6rem 0.9rem', marginBottom: '1rem',
                fontSize: '0.85rem', color: '#f87171'
              }}>{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              id="send-otp-btn"
              style={{
                width: '100%', padding: '0.85rem',
                background: loading ? 'var(--color-surface-3)' : 'linear-gradient(135deg, #6366f1, #a855f7)',
                border: 'none', borderRadius: 8, color: '#fff',
                fontWeight: 700, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                transition: 'opacity 0.2s'
              }}
            >
              {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Sending OTP...</> : <>Send OTP <ArrowRight size={16} /></>}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--color-muted)' }}>
            We&apos;ll send a 6-digit OTP to your number via SMS
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
