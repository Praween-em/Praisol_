'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { getUser } from '@/lib/auth';
import { Deployment } from '@/types';
import { Plus, Globe, School, GraduationCap, Building2, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const systemIcons = {
  school: <School size={18} />,
  college: <GraduationCap size={18} />,
  business: <Building2 size={18} />,
};
const systemColors = { school: '#6366f1', college: '#a855f7', business: '#ec4899' };
const statusConfig = {
  active: { icon: <CheckCircle size={13} />, color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
  building: { icon: <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  suspended: { icon: <AlertCircle size={13} />, color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  deleted: { icon: null, color: '#71717a', bg: 'transparent' },
};

export default function Dashboard() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);
  const user = getUser();

  useEffect(() => {
    api.get('/platform/deployments')
      .then(r => setDeployments(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Welcome back{user?.name ? `, ${user.name}` : ''}! 👋
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>Here&apos;s an overview of your sites and builds.</p>
        </div>
        <Link href="/dashboard/deployments/new" style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff',
          padding: '0.65rem 1.25rem', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem'
        }}>
          <Plus size={16} /> New Site
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Sites', value: deployments.length, icon: <Globe size={20} />, color: '#6366f1' },
          { label: 'Active Sites', value: deployments.filter(d => d.status === 'active').length, icon: <CheckCircle size={20} />, color: '#22c55e' },
          { label: 'Building', value: deployments.filter(d => d.status === 'building').length, icon: <Clock size={20} />, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="glass" style={{ borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>{s.label}</span>
              <span style={{ color: s.color }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Deployments */}
      <div className="glass" style={{ borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>Your Sites</h2>
          <Link href="/dashboard/deployments" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none' }}>View all →</Link>
        </div>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-muted)' }}>
            <Loader2 size={24} style={{ animation: 'spin 1s linear infinite', margin: '0 auto' }} />
          </div>
        ) : deployments.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <Globe size={40} color="var(--color-surface-3)" style={{ margin: '0 auto 1rem' }} />
            <p style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}>No sites yet. Create your first one!</p>
            <Link href="/dashboard/deployments/new" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
              + Create Site
            </Link>
          </div>
        ) : (
          deployments.slice(0, 5).map(d => {
            const status = statusConfig[d.status] || statusConfig.active;
            const color = systemColors[d.system_type];
            return (
              <Link key={d.id} href={`/dashboard/deployments/${d.slug}`} style={{
                display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem',
                borderBottom: '1px solid var(--color-border)', textDecoration: 'none', color: 'var(--color-text)',
                transition: 'background 0.15s'
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: `${color}20`, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }}>
                  {systemIcons[d.system_type]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.15rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>{d.slug}.praisol.com</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.7rem', borderRadius: 999, background: status.bg, color: status.color, fontSize: '0.78rem', fontWeight: 600, flexShrink: 0 }}>
                  {status.icon} {d.status}
                </div>
              </Link>
            );
          })
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
