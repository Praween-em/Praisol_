'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import api from '@/lib/api';
import { saveTokens, saveUser } from '@/lib/auth';
import { Loader2, Phone, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';

export default function Login() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [widgetReady, setWidgetReady] = useState(false);
  const timerRef = useRef<any>(null);
  const router = useRouter();

  const widgetId = process.env.NEXT_PUBLIC_MSG91_WIDGET_ID!;
  const tokenAuth = process.env.NEXT_PUBLIC_MSG91_TOKEN_AUTH!;

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const startTimer = () => {
    setResendDisabled(true);
    setTimer(30);
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { clearInterval(timerRef.current); setResendDisabled(false); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!widgetReady) {
      setError('OTP service is loading. Please wait a moment and try again.');
      return;
    }
    setError('');
    setLoading(true);

    // MSG91 widget expects international format without +
    const fullPhone = `91${phone}`;

    (window as any).sendOtp(
      fullPhone,
      (data: any) => {
        console.log('OTP Sent:', data);
        setStep('otp');
        setLoading(false);
        startTimer();
      },
      (err: any) => {
        console.error('Send OTP Error:', JSON.stringify(err));
        setError(err?.message || 'Failed to send OTP. Please try again.');
        setLoading(false);
      }
    );
  };

  const handleVerifyOtp = () => {
    if (!otp || otp.length < 4) {
      setError('Please enter the OTP');
      return;
    }
    setError('');
    setLoading(true);

    (window as any).verifyOtp(
      otp,
      async (result: any) => {
        const tokenString = typeof result === 'object' ? result.message : result;
        console.log('OTP Verified, token:', tokenString);
        try {
          const { data } = await api.post('/platform/auth/verify-otp', { token: tokenString });
          if (data.success) {
            saveTokens(data.data.accessToken, data.data.refreshToken);
            saveUser(data.data.user);
            router.push('/dashboard');
          }
        } catch (err: any) {
          setError(err.response?.data?.message || 'Login failed. Please try again.');
          setLoading(false);
        }
      },
      (err: any) => {
        console.error('Verify OTP Error:', JSON.stringify(err));
        setError(err?.message || 'Invalid OTP. Please try again.');
        setLoading(false);
      }
    );
  };

  const handleResend = () => {
    if (resendDisabled || !widgetReady) return;
    setError('');
    (window as any).retryOtp(
      '11',
      () => startTimer(),
      (err: any) => setError(err?.message || 'Failed to resend OTP')
    );
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--color-bg)', padding: '2rem'
    }}>
      {/* MSG91 Widget Config — must load before otp-provider.js */}
      <Script id="msg91-config" strategy="beforeInteractive">
        {`
          window.configuration = {
            widgetId: "${widgetId}",
            tokenAuth: "${tokenAuth}",
            exposeMethods: true,
            success: function(data) { console.log('MSG91 success:', data); },
            failure: function(error) { console.error('MSG91 failure:', JSON.stringify(error)); }
          };
        `}
      </Script>

      <Script
        src="https://verify.msg91.com/otp-provider.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('MSG91 script loaded, initializing...');
          if ((window as any).initSendOTP) {
            (window as any).initSendOTP((window as any).configuration);
            // Poll until sendOtp is actually exposed (initSendOTP is async internally)
            let attempts = 0;
            const check = setInterval(() => {
              attempts++;
              if ((window as any).sendOtp) {
                clearInterval(check);
                setWidgetReady(true);
                console.log('MSG91 widget ready');
              } else if (attempts > 20) {
                clearInterval(check);
                setError('OTP service failed to initialize. Check Widget ID and Token Auth in settings.');
                console.error('window.sendOtp not available after 10s — check tokenAuth and widgetId');
              }
            }, 500);
          } else {
            setError('OTP provider script failed to load. Please refresh.');
          }
        }}
      />

      {/* Background glow */}
      <div style={{
        position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 600, borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)'
      }} />

      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
              <img src="/logo.png" alt="PraiSol Logo" style={{ width: 40, height: 40, objectFit: 'contain' }} />
              <span style={{ color: 'var(--color-text)', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.02em' }}>PraiSol</span>
            </div>
          </Link>
          <h1 style={{ marginTop: '1.5rem', fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
            {step === 'phone' ? 'Welcome Back' : 'Verify Identity'}
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
            {step === 'phone' ? 'Secure login via mobile OTP' : `Enter code sent to +91 ${phone}`}
          </p>
        </div>

        <div className="glass" style={{
          borderRadius: 24, padding: '2.5rem', border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
        }}>
          {step === 'phone' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }}>
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  style={{
                    width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: 12,
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff', fontSize: '1rem', outline: 'none', boxSizing: 'border-box'
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendOtp()}
                />
              </div>

              <button
                onClick={handleSendOtp}
                disabled={loading || phone.length < 10 || !widgetReady}
                className="btn-primary"
                style={{
                  width: '100%', padding: '1rem', borderRadius: 12, border: 'none',
                  background: 'var(--color-primary)', color: '#fff', fontWeight: 700,
                  fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s',
                  opacity: (loading || phone.length < 10 || !widgetReady) ? 0.6 : 1
                }}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> :
                  !widgetReady ? <><Loader2 className="animate-spin" size={16} /> Loading...</> :
                  <>Send OTP <ArrowRight size={18} /></>}
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }}>
                  <ShieldCheck size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  autoFocus
                  style={{
                    width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: 12,
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff', fontSize: '1.1rem', letterSpacing: '0.4em', outline: 'none',
                    textAlign: 'center', boxSizing: 'border-box'
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerifyOtp()}
                />
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={loading || otp.length < 4}
                style={{
                  width: '100%', padding: '1rem', borderRadius: 12, border: 'none',
                  background: 'var(--color-primary)', color: '#fff', fontWeight: 700,
                  fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s',
                  opacity: (loading || otp.length < 4) ? 0.6 : 1
                }}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Verify & Continue'}
              </button>

              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={handleResend}
                  disabled={resendDisabled || loading}
                  style={{
                    background: 'none', border: 'none',
                    color: resendDisabled ? 'var(--color-muted)' : 'var(--color-primary)',
                    fontSize: '0.85rem', fontWeight: 600, cursor: resendDisabled ? 'default' : 'pointer',
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem'
                  }}
                >
                  <RefreshCw size={14} />
                  {resendDisabled ? `Resend in ${timer}s` : 'Resend OTP'}
                </button>
              </div>

              <button
                onClick={() => { setStep('phone'); setError(''); setOtp(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--color-muted)', fontSize: '0.8rem', cursor: 'pointer' }}
              >
                Change Phone Number
              </button>
            </div>
          )}

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 12, padding: '0.75rem', marginTop: '1.5rem',
              fontSize: '0.85rem', color: '#f87171', textAlign: 'center'
            }}>{error}</div>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
          By continuing, you agree to PraiSol's Terms of Service and Privacy Policy.
        </p>
      </div>

      <style jsx>{`
        .glass { background: rgba(15, 15, 20, 0.7); backdrop-filter: blur(20px); }
        .btn-primary:hover { background: #4f46e5 !important; transform: translateY(-1px); }
      `}</style>
    </div>
  );
}
