'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { ArrowLeft, Inbox, Trash2, Check, CheckCheck, ChevronDown, ChevronUp, Loader2, RefreshCw } from 'lucide-react';

interface Submission {
  id: string;
  form_id: string | null;
  form_title: string;
  data: Record<string, string>;
  is_read: boolean;
  submitted_at: string;
}

export default function FormSubmissionsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [markingAll, setMarkingAll] = useState(false);

  const tenantHeaders = { headers: { 'X-Tenant-ID': slug } };

  const fetchSubmissions = () => {
    setLoading(true);
    api.get('/admin/form-submissions', tenantHeaders)
      .then(r => setSubmissions(r.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchSubmissions(); }, [slug]);

  const markRead = async (id: string) => {
    await api.patch(`/admin/form-submissions/${id}/read`, {}, tenantHeaders).catch(() => {});
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, is_read: true } : s));
  };

  const markAllRead = async () => {
    setMarkingAll(true);
    await api.patch('/admin/form-submissions/mark-all-read', {}, tenantHeaders).catch(() => {});
    setSubmissions(prev => prev.map(s => ({ ...s, is_read: true })));
    setMarkingAll(false);
  };

  const deleteSubmission = async (id: string) => {
    await api.delete(`/admin/form-submissions/${id}`, tenantHeaders).catch(() => {});
    setSubmissions(prev => prev.filter(s => s.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
    // Auto mark as read when opened
    const sub = submissions.find(s => s.id === id);
    if (sub && !sub.is_read) markRead(id);
  };

  const unreadCount = submissions.filter(s => !s.is_read).length;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Header */}
      <Link href={`/dashboard/deployments/${slug}`}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-muted)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <ArrowLeft size={14} /> Back to Site
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Inbox size={22} color="#f59e0b" /> Form Submissions
            {unreadCount > 0 && (
              <span style={{ background: '#ef4444', color: '#fff', borderRadius: 999, fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px' }}>
                {unreadCount} unread
              </span>
            )}
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            {submissions.length} total message{submissions.length !== 1 ? 's' : ''} from <span style={{ fontFamily: 'monospace' }}>{slug}.praisol.online</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={fetchSubmissions}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-muted)', borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.85rem' }}>
            <RefreshCw size={14} /> Refresh
          </button>
          {unreadCount > 0 && (
            <button onClick={markAllRead} disabled={markingAll}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b', borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
              <CheckCheck size={14} /> Mark all read
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="glass" style={{ borderRadius: 16, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-muted)' }}>
            <Loader2 size={28} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
            <p>Loading submissions...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <Inbox size={48} color="var(--color-surface-3)" style={{ margin: '0 auto 1rem' }} />
            <p style={{ color: 'var(--color-muted)', fontWeight: 600 }}>No submissions yet</p>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginTop: '0.4rem' }}>
              When visitors fill your site&apos;s forms, their messages will appear here.
            </p>
          </div>
        ) : (
          submissions.map((sub, idx) => (
            <div key={sub.id} style={{
              borderBottom: idx < submissions.length - 1 ? '1px solid var(--color-border)' : 'none',
            }}>
              {/* Row */}
              <div onClick={() => toggleExpand(sub.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem',
                  cursor: 'pointer', transition: 'background 0.15s',
                  background: expandedId === sub.id ? 'var(--color-surface-2)' : 'transparent',
                }}
                onMouseEnter={e => { if (expandedId !== sub.id) (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-2)'; }}
                onMouseLeave={e => { if (expandedId !== sub.id) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>

                {/* Unread dot */}
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: sub.is_read ? 'transparent' : '#6366f1', flexShrink: 0 }} />

                {/* Form label */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: sub.is_read ? 500 : 700, fontSize: '0.9rem', color: 'var(--color-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {sub.form_title}
                    </span>
                    {!sub.is_read && (
                      <span style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8', borderRadius: 999, fontSize: '0.65rem', fontWeight: 700, padding: '1px 6px' }}>NEW</span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)', marginTop: '0.15rem' }}>
                    {sub.data.name && <span style={{ marginRight: '0.75rem' }}>👤 {sub.data.name}</span>}
                    {sub.data.email && <span style={{ marginRight: '0.75rem' }}>✉️ {sub.data.email}</span>}
                    {sub.data.phone && <span>📱 {sub.data.phone}</span>}
                  </div>
                </div>

                {/* Date */}
                <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', flexShrink: 0, textAlign: 'right' }}>
                  <div>{new Date(sub.submitted_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                  <div>{new Date(sub.submitted_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                  {!sub.is_read && (
                    <button onClick={() => markRead(sub.id)}
                      title="Mark as read"
                      style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e', borderRadius: 7, padding: '4px 8px', cursor: 'pointer' }}>
                      <Check size={13} />
                    </button>
                  )}
                  <button onClick={() => deleteSubmission(sub.id)}
                    title="Delete"
                    style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', borderRadius: 7, padding: '4px 8px', cursor: 'pointer' }}>
                    <Trash2 size={13} />
                  </button>
                </div>

                {/* Expand chevron */}
                <div style={{ color: 'var(--color-muted)', flexShrink: 0 }}>
                  {expandedId === sub.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* Expanded detail */}
              {expandedId === sub.id && (
                <div style={{ padding: '0 1.25rem 1.25rem 1.25rem', borderTop: '1px solid var(--color-border)' }}>
                  <div style={{ background: 'var(--color-surface)', borderRadius: 12, padding: '1rem', marginTop: '0.75rem' }}>
                    {Object.entries(sub.data).map(([key, value]) => (
                      <div key={key} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                        <span style={{ color: 'var(--color-muted)', textTransform: 'capitalize', minWidth: 80, fontWeight: 600 }}>{key}</span>
                        <span style={{ color: 'var(--color-text)', flex: 1, wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>{value}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)', fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                      <span>Submitted: {new Date(sub.submitted_at).toLocaleString('en-IN')}</span>
                      {sub.form_id && <span>Form ID: <code style={{ fontFamily: 'monospace', fontSize: '0.7rem' }}>{sub.form_id}</code></span>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
