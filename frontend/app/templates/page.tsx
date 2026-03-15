'use client';
import Link from 'next/link';
import { 
  School, GraduationCap, Building2, UserCircle, 
  ArrowRight, CheckCircle, Zap
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';

const templates = [
  {
    type: 'school',
    icon: <School size={32} />,
    color: '#6366f1',
    title: 'School Management',
    desc: 'A complete system for schools. Manage news, exam results, student notifications, staff directories, and admission inquiries.',
    features: ['News & Results Portal', 'Gallery & Events', 'Staff Directory', 'Admission Processing'],
  },
  {
    type: 'college',
    icon: <GraduationCap size={32} />,
    color: '#a855f7',
    title: 'Higher Education',
    desc: 'Everything in the school template plus academic departments, degree programs, placement records, and accreditation tracking.',
    features: ['Department Management', 'Placement Tracking', 'Research Papers', 'Accreditation Boards'],
  },
  {
    type: 'business',
    icon: <Building2 size={32} />,
    color: '#ec4899',
    title: 'Business & E-commerce',
    desc: 'Perfect for local shops and home-based sellers. A fully functional shop with product catalogs and WhatsApp-integrated ordering.',
    features: ['Product Catalog', 'Guest Checkout', 'Order Management', 'WhatsApp Integration'],
  },
  {
    type: 'portfolio',
    icon: <UserCircle size={32} />,
    color: '#06b6d4',
    title: 'Professional Portfolio',
    desc: 'Showcase your career and projects gracefully. Includes interactive project grids, work experience timelines, and skill matrices.',
    features: ['Project Showcase', 'Experience Timeline', 'Skill Matrix', 'Testimonials'],
  },
];

export default function TemplatesPage() {
  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', color: 'var(--color-text)' }}>
      <Navbar />

      <section style={{ padding: '5rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: 999, padding: '0.3rem 0.9rem', marginBottom: '1.5rem',
            fontSize: '0.82rem', color: 'var(--color-primary)'
          }}>
            <Zap size={12} /> Pre-built systems for every need
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '1.25rem' }}>
            Choose Your <span className="gradient-text">Starting Point</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)', maxWidth: 600, margin: '0 auto' }}>
            Select a template to launch your site. Each one is fully functional out of the box and fully customizable.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {templates.map((t) => (
            <div key={t.type} className="glass" style={{
              borderRadius: 24, padding: '2.5rem', border: '1px solid var(--color-border)',
              display: 'flex', flexDirection: 'column', transition: 'transform 0.2s',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 16,
                background: `${t.color}22`, border: `1px solid ${t.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: t.color, marginBottom: '1.5rem'
              }}>
                {t.icon}
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>{t.title}</h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1 }}>
                {t.desc}
              </p>
              
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-muted)', marginBottom: '1rem' }}>
                  Core Features
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {t.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
                      <CheckCircle size={16} color={t.color} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link href={`/playground?template=${t.type}`} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                background: t.color, color: '#fff', padding: '1rem', borderRadius: 12,
                textDecoration: 'none', fontWeight: 700, transition: 'opacity 0.2s'
              }} onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                Start with this Template <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(168,85,247,0.05))',
          padding: '4rem 2rem', borderRadius: 32, border: '1px solid var(--color-border)', maxWidth: 900, margin: '0 auto'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Don't see what you need?</h2>
          <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
            Our visual builder allows you to mix and match components to create any kind of site.
          </p>
          <Link href="/playground" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: '#fff', color: '#000', padding: '1rem 2rem', borderRadius: 12,
            textDecoration: 'none', fontWeight: 700
          }}>
            Open Blank Canvas <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--color-border)', padding: '4rem 2rem', textAlign: 'center',
        color: 'var(--color-muted)', fontSize: '0.9rem'
      }}>
        <p>© 2024 PraiSol. All templates are fully responsive and SEO optimized.</p>
      </footer>
    </div>
  );
}
