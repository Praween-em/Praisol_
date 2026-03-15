'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Deployment } from '@/types';
import {
  ArrowLeft, Save, Globe, Trash2, AlertTriangle,
  Info, CheckCircle, Loader2, ExternalLink, X
} from 'lucide-react';

export default function SiteSettingsPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [deployment, setDeployment] = useState<Deployment | null>(null);
  const [loading, setLoading] = useState(true);

  // General
  const [siteName, setSiteName] = useState('');
  const [savingGeneral, setSavingGeneral] = useState(false);
  const [generalMsg, setGeneralMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // Custom domain
  const [domain, setDomain] = useState('');
  const [savingDomain, setSavingDomain] = useState(false);
  const [domainMsg, setDomainMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // Danger zone
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    api.get('/platform/deployments')
      .then(r => {
        const found = (r.data.data as Deployment[]).find(d => d.slug === slug);
        if (found) {
          setDeployment(found);
          setSiteName(found.name);
          setDomain(found.custom_domain || '');
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const saveGeneral = async () => {
    if (!deployment) return;
    setSavingGeneral(true); setGeneralMsg(null);
    try {
      const r = await api.patch(`/platform/deployments/${deployment.id}/settings`, {
        name: siteName, custom_domain: domain || null
      });
      setDeployment(prev => prev ? { ...prev, name: r.data.data.name } : prev);
      setGeneralMsg({ type: 'ok', text: 'Site name updated!' });
    } catch (e: any) {
      setGeneralMsg({ type: 'err', text: e?.response?.data?.message || 'Failed to update.' });
    } finally { setSavingGeneral(false); }
  };

  const saveDomain = async () => {
    if (!deployment) return;
    setSavingDomain(true); setDomainMsg(null);
    try {
      await api.patch(`/platform/deployments/${deployment.id}/settings`, {
        name: siteName, custom_domain: domain || null
      });
      setDomainMsg({ type: 'ok', text: domain ? 'Custom domain saved!' : 'Custom domain removed.' });
    } catch (e: any) {
      setDomainMsg({ type: 'err', text: e?.response?.data?.message || 'Failed to update.' });
    } finally { setSavingDomain(false); }
  };

  const deleteSite = async () => {
    if (!deployment || deleteConfirm !== deployment.name) return;
    setDeleting(true);
    try {
      await api.delete(`/platform/deployments/${deployment.id}`);
      router.push('/dashboard/deployments');
    } catch { setDeleting(false); }
  };

  const cardStyle: React.CSSProperties = {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 16,
    padding: '1.5rem',
    marginBottom: '1.5rem'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    background: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: 8,
    padding: '0.65rem 0.9rem',
    color: 'var(--color-text)',
    fontSize: '0.9rem',
    outline: 'none'
  };

  const btnPrimary: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
    color: '#fff', border: 'none', borderRadius: 8,
    padding: '0.6rem 1.2rem', fontWeight: 600, fontSize: '0.9rem',
    cursor: 'pointer', marginTop: '1rem'
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} color="var(--color-muted)" />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
  if (!deployment) return <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-muted)' }}>Site not found.</div>;

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      <Link href={`/dashboard/deployments/${slug}`} style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        color: 'var(--color-muted)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '1.5rem'
      }}>
        <ArrowLeft size={14} /> Back to {deployment.name}
      </Link>

      <h1 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.4rem' }}>Site Settings</h1>
      <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Manage your site name, custom domain, and other preferences.
      </p>

      {/* General */}
      <div style={cardStyle}>
        <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Save size={16} color="var(--color-primary)" /> General
        </h2>

        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-muted)' }}>
          Site Name
        </label>
        <input
          style={inputStyle}
          value={siteName}
          onChange={e => setSiteName(e.target.value)}
          placeholder="My Awesome School"
          onFocus={e => (e.target.style.borderColor = 'var(--color-primary)')}
          onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
        />
        <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)', marginTop: '0.35rem' }}>
          Subdomain: <code style={{ color: 'var(--color-primary)' }}>{slug}.praisol.online</code> (cannot be changed)
        </div>

        {generalMsg && (
          <div style={{
            marginTop: '0.75rem', padding: '0.5rem 0.85rem', borderRadius: 8, fontSize: '0.85rem',
            background: generalMsg.type === 'ok' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            color: generalMsg.type === 'ok' ? '#22c55e' : '#ef4444',
            display: 'flex', alignItems: 'center', gap: '0.4rem'
          }}>
            {generalMsg.type === 'ok' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
            {generalMsg.text}
          </div>
        )}

        <button onClick={saveGeneral} disabled={savingGeneral || !siteName.trim()} style={{ ...btnPrimary, opacity: savingGeneral ? 0.7 : 1 }}>
          {savingGeneral ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={14} />}
          Save Changes
        </button>
      </div>

      {/* Custom Domain */}
      <div style={cardStyle}>
        <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Globe size={16} color="#22c55e" /> Custom Domain
        </h2>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          Point your own domain to this site.
        </p>

        {/* How it works */}
        <div style={{
          background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: 10, padding: '1rem', marginBottom: '1.25rem', fontSize: '0.83rem'
        }}>
          <div style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary)' }}>
            <Info size={13} /> How to set up a custom domain
          </div>
          <ol style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--color-muted)', display: 'flex', flexDirection: 'column', gap: '0.3rem', lineHeight: 1.6 }}>
            <li>Buy a domain from any registrar (GoDaddy, Namecheap, Cloudflare, etc.)</li>
            <li>Go to your domain&apos;s <strong>DNS settings</strong> and add a <strong>CNAME record</strong>:</li>
          </ol>
          <div style={{
            margin: '0.6rem 0', padding: '0.6rem 0.9rem', background: 'var(--color-surface-2)',
            borderRadius: 8, fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--color-text)'
          }}>
            <span style={{ color: '#6366f1' }}>www.yoursite.com</span>
            {' → CNAME → '}
            <span style={{ color: '#22c55e' }}>praisol.online</span>
          </div>
          <p style={{ margin: '0.4rem 0 0', color: 'var(--color-muted)', fontSize: '0.8rem' }}>
            3. Enter your domain below and click Save. DNS changes can take up to 24 hours to propagate.
          </p>
        </div>

        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-muted)' }}>
          Your Custom Domain
        </label>
        <input
          style={inputStyle}
          value={domain}
          onChange={e => setDomain(e.target.value)}
          placeholder="www.myschool.com"
          onFocus={e => (e.target.style.borderColor = 'var(--color-primary)')}
          onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
        />

        {deployment.custom_domain && (
          <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#22c55e' }}>
            <CheckCircle size={12} />
            Currently active: <strong>{deployment.custom_domain}</strong>
            <a href={`https://${deployment.custom_domain}`} target="_blank" rel="noreferrer" style={{ color: '#22c55e' }}>
              <ExternalLink size={11} />
            </a>
          </div>
        )}

        {domainMsg && (
          <div style={{
            marginTop: '0.75rem', padding: '0.5rem 0.85rem', borderRadius: 8, fontSize: '0.85rem',
            background: domainMsg.type === 'ok' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            color: domainMsg.type === 'ok' ? '#22c55e' : '#ef4444',
            display: 'flex', alignItems: 'center', gap: '0.4rem'
          }}>
            {domainMsg.type === 'ok' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
            {domainMsg.text}
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={saveDomain} disabled={savingDomain} style={{ ...btnPrimary, opacity: savingDomain ? 0.7 : 1 }}>
            {savingDomain ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={14} />}
            Save Domain
          </button>
          {domain && (
            <button onClick={() => { setDomain(''); }} style={{
              ...btnPrimary, background: 'rgba(239,68,68,0.1)', color: '#ef4444'
            }}>
              <X size={14} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div style={{ ...cardStyle, border: '1px solid rgba(239,68,68,0.35)', background: 'rgba(239,68,68,0.04)' }}>
        <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444' }}>
          <AlertTriangle size={16} /> Danger Zone
        </h2>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          Permanently delete this site. This cannot be undone. All data, configurations, and form submissions will be lost.
        </p>
        <button onClick={() => setShowDeleteModal(true)} style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          background: 'rgba(239,68,68,0.1)', color: '#ef4444',
          border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8,
          padding: '0.6rem 1.2rem', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer'
        }}>
          <Trash2 size={15} /> Delete Site
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => { setShowDeleteModal(false); setDeleteConfirm(''); }} />
          <div style={{
            position: 'relative', zIndex: 1, background: 'var(--color-surface)', borderRadius: 16,
            padding: '2rem', width: '100%', maxWidth: 440, margin: '0 1rem',
            border: '1px solid rgba(239,68,68,0.3)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontWeight: 700, fontSize: '1rem' }}>
                <AlertTriangle size={18} /> Delete Site
              </div>
              <button onClick={() => { setShowDeleteModal(false); setDeleteConfirm(''); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}>
                <X size={18} />
              </button>
            </div>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              This will permanently delete <strong style={{ color: 'var(--color-text)' }}>{deployment.name}</strong> and all its data.
              Type the site name to confirm:
            </p>
            <input
              style={{ ...inputStyle, marginBottom: '1rem' }}
              placeholder={deployment.name}
              value={deleteConfirm}
              onChange={e => setDeleteConfirm(e.target.value)}
              onFocus={e => (e.target.style.borderColor = '#ef4444')}
              onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
            />
            <button
              onClick={deleteSite}
              disabled={deleteConfirm !== deployment.name || deleting}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                background: deleteConfirm === deployment.name ? '#ef4444' : 'rgba(239,68,68,0.2)',
                color: '#fff', border: 'none', borderRadius: 8,
                padding: '0.7rem', fontWeight: 700, fontSize: '0.9rem',
                cursor: deleteConfirm === deployment.name ? 'pointer' : 'not-allowed',
                opacity: deleting ? 0.7 : 1, transition: 'all 0.2s'
              }}>
              {deleting ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={15} />}
              {deleting ? 'Deleting...' : 'Yes, Delete Site'}
            </button>
          </div>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
