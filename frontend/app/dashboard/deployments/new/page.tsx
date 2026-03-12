'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { School, GraduationCap, Building2, UserCircle, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const templates = [
  {
    type: 'school' as const,
    icon: <School size={32} />,
    color: '#6366f1',
    title: 'School Website',
    desc: 'Perfect for schools and educational institutions. Includes news, results, notifications, gallery, staff directory, and admissions.',
    features: ['News & Results', 'Gallery Albums', 'Staff Directory', 'Notifications', 'Events', 'Admissions'],
  },
  {
    type: 'college' as const,
    icon: <GraduationCap size={32} />,
    color: '#a855f7',
    title: 'College Website',
    desc: 'Everything in School plus programs, placements, research publications, and NAAC/NBA accreditation tracking.',
    features: ['Degree Programs', 'Placements', 'Research', 'Achievements', 'Accreditation', 'Departments'],
  },
  {
    type: 'portfolio' as const,
    icon: <UserCircle size={32} />,
    color: '#06b6d4',
    title: 'Personal Portfolio',
    desc: 'Showcase your work and skills. Includes project showcase, experience timeline, skills matrix, services, and testimonials.',
    features: ['Projects Gallery', 'Experience Timeline', 'Skills Matrix', 'Services', 'Testimonials', 'Blog Sections'],
  },
  {
    type: 'business' as const,
    icon: <Building2 size={32} />,
    color: '#ec4899',
    title: 'Business Website',
    desc: 'A full e-commerce site for home-based sellers. Upload products with images and receive orders — no customer login required.',
    features: ['Product Catalog', 'Guest Checkout', 'Order Management', 'Announcements', 'Testimonials', 'WhatsApp'],
  },
];

export default function NewDeployment() {
  const [selected, setSelected] = useState<'school' | 'college' | 'business' | 'portfolio' | null>(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleCreate = async () => {
    if (!selected) { setError('Please select a system type'); return; }
    if (!name.trim()) { setError('Please enter a site name'); return; }
    setError(''); setLoading(true);
    try {
      const { data } = await api.post('/platform/deployments', { system_type: selected, name: name.trim() });
      router.push(`/dashboard/deployments/${data.data.slug}`);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg || 'Failed to create site. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/dashboard/deployments" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-muted)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '1rem' }}>
          <ArrowLeft size={14} /> Back to sites
        </Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.4rem' }}>Create a New Site</h1>
        <p style={{ color: 'var(--color-muted)' }}>Choose a template to get started. You can customise everything later.</p>
      </div>

      {/* Template Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {templates.map(t => (
          <button key={t.type} onClick={() => setSelected(t.type)} style={{
            border: selected === t.type ? `2px solid ${t.color}` : '1px solid var(--color-border)',
            borderRadius: 16, padding: '1.5rem', textAlign: 'left', cursor: 'pointer',
            background: selected === t.type ? `${t.color}10` : 'var(--color-surface)',
            transition: 'all 0.2s', position: 'relative'
          }}>
            {selected === t.type && (
              <div style={{ position: 'absolute', top: 12, right: 12, color: t.color }}>
                <CheckCircle size={20} />
              </div>
            )}
            <div style={{ width: 56, height: 56, borderRadius: 14, background: `${t.color}20`, border: `1px solid ${t.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.color, marginBottom: '1rem' }}>
              {t.icon}
            </div>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>{t.title}</h3>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>{t.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {t.features.map(f => (
                <span key={f} style={{ background: 'var(--color-surface-3)', borderRadius: 999, padding: '0.2rem 0.6rem', fontSize: '0.75rem', color: 'var(--color-muted)' }}>{f}</span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Site Name + Create */}
      <div className="glass" style={{ borderRadius: 16, padding: '1.5rem' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Name Your Site</h3>
        <input
          id="site-name-input"
          type="text"
          placeholder={selected === 'business' ? 'e.g. Moms Kitchen, Craft Studio...' : 'e.g. Sri Vani School, JNTUA College...'}
          value={name}
          onChange={e => setName(e.target.value)}
          style={{
            width: '100%', marginBottom: '1rem', padding: '0.75rem 1rem',
            background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
            borderRadius: 8, color: 'var(--color-text)', fontSize: '0.95rem', outline: 'none'
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--color-primary)')}
          onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
        />
        {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '0.6rem 0.9rem', marginBottom: '1rem', fontSize: '0.85rem', color: '#f87171' }}>{error}</div>}
        <button onClick={handleCreate} disabled={loading} id="create-site-btn" style={{
          padding: '0.8rem 2rem', background: loading ? 'var(--color-surface-3)' : 'linear-gradient(135deg, #6366f1, #a855f7)',
          border: 'none', borderRadius: 8, color: '#fff', fontWeight: 700, fontSize: '0.9rem',
          cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}>
          {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Creating...</> : '🚀 Create Site'}
        </button>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
