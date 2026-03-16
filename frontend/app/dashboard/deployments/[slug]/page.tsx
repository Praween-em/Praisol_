'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Deployment } from '@/types';
import { ArrowLeft, Palette, Smartphone, Globe, Settings, Loader2, CheckCircle, Copy, Inbox } from 'lucide-react';

export default function DeploymentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [deployment, setDeployment] = useState<Deployment | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    api.get('/platform/deployments')
      .then(r => {
        const found = (r.data.data as Deployment[]).find(d => d.slug === slug);
        setDeployment(found || null);
      })
      .finally(() => setLoading(false));

    // Fetch unread form submission count for this tenant
    api.get('/admin/form-submissions/unread-count', {
      headers: { 'X-Tenant-ID': slug }
    }).then(r => setUnreadCount(r.data.data?.count || 0)).catch(() => { });
  }, [slug]);

  const copySlug = () => {
    navigator.clipboard.writeText(`${slug}.praisol.online`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <Loader2 size={28} style={{ animation: 'spin 1s linear infinite', margin: '0 auto' }} color="var(--color-muted)" />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!deployment) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-muted)' }}>Site not found.</div>
  );

  const actions = [
    { href: `/dashboard/deployments/${slug}/builder`, icon: <Palette size={22} />, color: '#6366f1', label: 'Visual Builder', desc: 'Customize your site layout and content' },
    { href: `/dashboard/builds?site=${slug}`, icon: <Smartphone size={22} />, color: '#a855f7', label: 'Android App', desc: 'Build and export your mobile app' },
    {
      href: process.env.NODE_ENV === 'development'
        ? `http://${slug}.localhost:3000`
        : `https://${slug}.praisol.online`,
      icon: <Globe size={22} />,
      color: '#22c55e',
      label: 'View Live Site',
      desc: 'Open your deployed website',
      external: true
    },
    {
      href: `/dashboard/deployments/${slug}/submissions`,
      icon: <Inbox size={22} />,
      color: '#f59e0b',
      label: 'Form Submissions',
      desc: 'View contact & inquiry messages',
      badge: unreadCount > 0 ? unreadCount : undefined
    },
    { href: `/dashboard/deployments/${slug}/settings`, icon: <Settings size={22} />, color: '#64748b', label: 'Settings', desc: 'Custom domain, danger zone' },
  ];

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <Link href="/dashboard/deployments" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-muted)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <ArrowLeft size={14} /> My Sites
      </Link>

      {/* Header */}
      <div className="glass" style={{ borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.25rem' }}>{deployment.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--color-muted)', fontSize: '0.85rem', fontFamily: 'monospace' }}>{slug}.praisol.online</span>
              <button onClick={copySlug} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', padding: 0 }}>
                {copied ? <CheckCircle size={14} color="#22c55e" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.85rem', borderRadius: 999,
            background: deployment.status === 'active' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
            color: deployment.status === 'active' ? '#22c55e' : '#f59e0b', fontWeight: 600, fontSize: '0.85rem'
          }}>
            <CheckCircle size={13} /> {deployment.status}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)', textTransform: 'capitalize' }}>Type: <strong style={{ color: 'var(--color-text)' }}>{deployment.system_type}</strong></span>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>Created: <strong style={{ color: 'var(--color-text)' }}>{new Date(deployment.created_at).toLocaleDateString()}</strong></span>
        </div>
      </div>

      {/* Action Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {actions.map(a => (
          <a key={a.label} href={a.href} target={(a as any).external ? '_blank' : undefined} rel={(a as any).external ? 'noreferrer' : undefined}
            style={{
              borderRadius: 14, padding: '1.25rem', textDecoration: 'none', display: 'block',
              border: '1px solid var(--color-border)', background: 'var(--color-surface)',
              transition: 'all 0.2s', cursor: 'pointer', position: 'relative'
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = a.color; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
            {(a as any).badge != null && (
              <span style={{
                position: 'absolute', top: 12, right: 12,
                background: '#ef4444', color: '#fff', borderRadius: 999,
                fontSize: '0.7rem', fontWeight: 700, padding: '1px 7px', lineHeight: '18px'
              }}>{(a as any).badge}</span>
            )}
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${a.color}18`, border: `1px solid ${a.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: a.color, marginBottom: '0.75rem' }}>
              {a.icon}
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem', color: 'var(--color-text)' }}>{a.label}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{a.desc}</div>
          </a>
        ))}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
