'use client';
import Link from 'next/link';
import { CreditCard, CheckCircle } from 'lucide-react';

const plans = [
  { name: 'Free', price: '₹0', period: 'forever', features: ['1 website', 'Visual builder', 'Android app builder', 'All templates'], current: true },
  { name: 'Basic', price: '₹299', period: '/month', features: ['3 websites', 'Hosting & maintenance', '5 GB storage', 'Priority support'], current: false },
  { name: 'Pro', price: '₹799', period: '/month', features: ['10 websites', 'Custom domain', '20 GB storage', 'Dedicated support'], current: false },
];

export default function BillingPage() {
  return (
    <div style={{ maxWidth: 740, margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.25rem' }}>Billing & Plans</h1>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>You are currently on the <strong style={{ color: 'var(--color-text)' }}>Free</strong> plan.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {plans.map(p => (
          <div key={p.name} className="glass" style={{ borderRadius: 14, padding: '1.5rem', border: p.current ? '1px solid var(--color-primary)' : '1px solid var(--color-border)', background: p.current ? 'rgba(99,102,241,0.06)' : 'var(--color-surface)' }}>
            {p.current && <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Current Plan</div>}
            <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{p.name}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 800 }}>{p.price}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{p.period}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {p.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                  <CheckCircle size={13} color="#22c55e" /> {f}
                </li>
              ))}
            </ul>
            <button disabled={p.current} style={{ width: '100%', padding: '0.6rem', borderRadius: 7, border: 'none', fontWeight: 600, fontSize: '0.82rem', cursor: p.current ? 'not-allowed' : 'pointer', background: p.current ? 'var(--color-surface-3)' : 'linear-gradient(135deg, #6366f1, #a855f7)', color: p.current ? 'var(--color-muted)' : '#fff' }}>
              {p.current ? 'Current' : `Upgrade to ${p.name}`}
            </button>
          </div>
        ))}
      </div>

      <div className="glass" style={{ borderRadius: 14, padding: '1.25rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <CreditCard size={20} color="var(--color-muted)" />
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Payment Integration</div>
          <div style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>Payment gateway integration coming soon. You&apos;ll be notified when ready.</div>
        </div>
      </div>
    </div>
  );
}
