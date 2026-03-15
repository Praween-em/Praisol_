'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { isLoggedIn } from '@/lib/auth';
import { 
  School, Building2, GraduationCap, Smartphone,
  Zap, ArrowRight, CheckCircle, Star, ChevronRight
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';

export default function Landing() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => { setLoggedIn(isLoggedIn()); }, []);

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', color: 'var(--color-text)' }}>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'PraiSol',
            url: 'https://praisol.online',
            description:
              'Create fully functional school, college, and business management websites with our visual builder. No coding needed.',
            applicationCategory: 'WebApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'INR',
              description: 'Free forever plan — 1 website, visual builder, android app builder',
            },
            creator: {
              '@type': 'Organization',
              name: 'PraiSol',
              url: 'https://praisol.online',
            },
          }),
        }}
      />
      <Navbar />

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '6rem 2rem 4rem', maxWidth: 860, margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: 999, padding: '0.3rem 0.9rem', marginBottom: '1.5rem',
          fontSize: '0.82rem', color: 'var(--color-primary)'
        }}>
          <Zap size={12} /> Launch your site in minutes — free
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem' }}>
          Build & Deploy{' '}
          <span className="gradient-text">School, College &amp; Business</span>{' '}
          Websites — Free
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: 620, margin: '0 auto 2.5rem' }}>
          Choose a template, customize with our visual builder, and publish your fully working website in minutes. No coding required.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/playground" style={{
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            color: '#fff', padding: '0.85rem 2rem', borderRadius: 10, textDecoration: 'none',
            fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            Start Building Free <ArrowRight size={16} />
          </Link>
          <Link href="/templates" style={{
            border: '1px solid var(--color-border)', color: 'var(--color-text)',
            padding: '0.85rem 2rem', borderRadius: 10, textDecoration: 'none',
            fontWeight: 600, fontSize: '1rem', background: 'var(--color-surface)'
          }}>
            View Templates
          </Link>
        </div>
      </section>

      {/* System Type Cards */}
      <section style={{ padding: '4rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          Three Powerful Systems
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--color-muted)', marginBottom: '3rem' }}>
          Each system comes pre-built with everything you need
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[
            {
              icon: <School size={28} />, color: '#6366f1', label: 'School',
              desc: 'Publish news, exam results, circulars, staff listings, gallery, events and more. Manage everything via admin panel.',
              features: ['News & Results', 'Gallery & Events', 'Staff Directory', 'Notifications'],
            },
            {
              icon: <GraduationCap size={28} />, color: '#a855f7', label: 'College',
              desc: 'Everything in School plus departments, degree programs, placements, research, NAAC accreditation and more.',
              features: ['Degree Programs', 'Placements', 'Research Papers', 'Accreditation'],
            },
            {
              icon: <Building2 size={28} />, color: '#ec4899', label: 'Business',
              desc: 'A fully working e-commerce site for home-based sellers. Upload products, receive orders — no customer login needed.',
              features: ['Product Catalog', 'Guest Checkout', 'Order Management', 'WhatsApp Orders'],
            },
          ].map((s) => (
            <div key={s.label} className="glass" style={{ borderRadius: 16, padding: '2rem', transition: 'transform 0.2s', cursor: 'default' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: `${s.color}22`, border: `1px solid ${s.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: s.color, marginBottom: '1.25rem'
              }}>{s.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.6rem' }}>{s.label} Website</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>{s.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {s.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-muted)' }}>
                    <CheckCircle size={14} color={s.color} />{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Android App Builder Feature */}
      <section style={{
        margin: '2rem auto', maxWidth: 1000, padding: '3rem 2rem',
        background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08))',
        border: '1px solid rgba(99,102,241,0.2)', borderRadius: 20,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Smartphone size={20} color="#6366f1" />
              <span style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem' }}>Android App Builder</span>
            </div>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.3 }}>
              Build a Mobile App for Your System
            </h2>
            <p style={{ color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Generate a native Android app for your deployed site. Export as APK or AAB and publish directly to the Play Store — all from our dashboard.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['Visual mobile app builder', 'Export APK & AAB', 'Publish to Google Play', 'Synced with your website data'].map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                  <ChevronRight size={14} color="#6366f1" />{f}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: 180, height: 320, borderRadius: 28, border: '6px solid var(--color-surface-3)',
              background: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: '1rem', boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
            }} className="animate-float">
              <Smartphone size={40} color="#6366f1" />
              <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', textAlign: 'center', padding: '0 1rem' }}>Your School App</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '4rem 2rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>Simple Pricing</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-muted)', marginBottom: '3rem' }}>
          Build and publish for free. Pay only when you want us to maintain your site.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {[
            { name: 'Free', price: '₹0', period: 'forever', features: ['1 website', 'Visual builder', 'Android app builder', 'All templates'], highlight: false },
            { name: 'Basic', price: '₹299', period: '/month', features: ['3 websites', 'Hosting & maintenance', '5 GB storage', 'Priority support'], highlight: true },
            { name: 'Pro', price: '₹799', period: '/month', features: ['10 websites', 'Custom domain', '20 GB storage', 'Dedicated support'], highlight: false },
          ].map((p) => (
            <div key={p.name} style={{
              borderRadius: 16, padding: '2rem',
              border: p.highlight ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
              background: p.highlight ? 'rgba(99,102,241,0.08)' : 'var(--color-surface)',
              position: 'relative'
            }}>
              {p.highlight && <div style={{
                position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff',
                fontSize: '0.7rem', fontWeight: 700, padding: '0.25rem 0.8rem', borderRadius: 999
              }}>MOST POPULAR</div>}
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{p.name}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800 }}>{p.price}</span>
                <span style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>{p.period}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-muted)' }}>
                    <CheckCircle size={14} color="#22c55e" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/playground" style={{
                display: 'block', textAlign: 'center', textDecoration: 'none',
                background: p.highlight ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'var(--color-surface-3)',
                color: '#fff', padding: '0.7rem', borderRadius: 8, fontWeight: 600, fontSize: '0.9rem'
              }}>Get Started</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--color-border)', padding: '2rem', textAlign: 'center',
        color: 'var(--color-muted)', fontSize: '0.85rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
          <img src="/logo.png" alt="PraiSol Logo" style={{ width: 24, height: 24, objectFit: 'contain' }} />
          <span style={{ fontWeight: 700, color: 'var(--color-text)', fontSize: '1.1rem' }}>PraiSol</span>
        </div>
        <p>© 2026 PraiSol. Build freely. Grow confidently.</p>
      </footer>
    </div>
  );
}
