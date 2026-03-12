'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Deployment } from '@/types';
import { Plus, School, GraduationCap, Building2, CheckCircle, AlertCircle, Loader2, ExternalLink } from 'lucide-react';

const systemIcons = { school: School, college: GraduationCap, business: Building2 };
const systemColors = { school: '#6366f1', college: '#a855f7', business: '#ec4899' };

export default function DeploymentsList() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/platform/deployments')
      .then(r => setDeployments(r.data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.2rem' }}>My Sites</h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>{deployments.length} site{deployments.length !== 1 ? 's' : ''} total</p>
        </div>
        <Link href="/dashboard/deployments/new" style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff',
          padding: '0.65rem 1.2rem', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem'
        }}>
          <Plus size={15} /> New Site
        </Link>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-muted)' }}>
          <Loader2 size={28} style={{ animation: 'spin 1s linear infinite', margin: '0 auto' }} />
        </div>
      ) : deployments.length === 0 ? (
        <div className="glass" style={{ borderRadius: 16, padding: '4rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>No sites yet. Start by creating your first one.</p>
          <Link href="/dashboard/deployments/new" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff',
            padding: '0.75rem 1.5rem', borderRadius: 8, textDecoration: 'none', fontWeight: 600
          }}>
            <Plus size={16} /> Create First Site
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {deployments.map(d => {
            const Icon = systemIcons[d.system_type];
            const color = systemColors[d.system_type];
            return (
              <div key={d.id} className="glass" style={{ borderRadius: 16, overflow: 'hidden', transition: 'transform 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}20`, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
                      <Icon size={20} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</div>
                      <div style={{ color: 'var(--color-muted)', fontSize: '0.78rem', textTransform: 'capitalize' }}>{d.system_type}</div>
                    </div>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.65rem', borderRadius: 999,
                      color: d.status === 'active' ? '#22c55e' : d.status === 'building' ? '#f59e0b' : '#ef4444',
                      background: d.status === 'active' ? 'rgba(34,197,94,0.1)' : d.status === 'building' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)'
                    }}>
                      {d.status === 'active' ? <CheckCircle size={11} /> : <AlertCircle size={11} />}
                      {d.status}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)', fontFamily: 'monospace' }}>{d.slug}.praisol.online</div>
                </div>
                <div style={{ display: 'flex', gap: '0', borderTop: '1px solid var(--color-border)' }}>
                  <Link href={`/dashboard/deployments/${d.slug}`} style={{ flex: 1, padding: '0.7rem', textAlign: 'center', textDecoration: 'none', color: 'var(--color-text)', fontSize: '0.8rem', fontWeight: 600, borderRight: '1px solid var(--color-border)' }}>
                    Manage
                  </Link>
                  <Link href={`/dashboard/deployments/${d.slug}/builder`} style={{ flex: 1, padding: '0.7rem', textAlign: 'center', textDecoration: 'none', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 600, borderRight: '1px solid var(--color-border)' }}>
                    Builder
                  </Link>
                  <a href={`https://${d.slug}.praisol.online`} target="_blank" rel="noreferrer" style={{ padding: '0.7rem 1rem', textDecoration: 'none', color: 'var(--color-muted)', display: 'flex', alignItems: 'center' }}>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
