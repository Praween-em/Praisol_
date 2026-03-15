'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { saveUser } from '@/lib/auth';
import { User } from '@/types';
import {
  User as UserIcon, Phone, Mail, Save,
  CheckCircle, AlertTriangle, Loader2, Shield
} from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Editable fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Save state
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    api.get('/platform/auth/me')
      .then(r => {
        const u: User = r.data.data;
        setUser(u);
        setName(u.name || '');
        setEmail(u.email || '');
      })
      .finally(() => setLoading(false));
  }, []);

  const saveProfile = async () => {
    setSaving(true); setMsg(null);
    try {
      const r = await api.put('/platform/auth/me', { name, email });
      const updated: User = r.data.data;
      setUser(updated);
      setName(updated.name || '');
      setEmail(updated.email || '');
      saveUser(updated); // update localStorage so sidebar reflects new name
      setMsg({ type: 'ok', text: 'Profile updated successfully!' });
    } catch (e: any) {
      setMsg({ type: 'err', text: e?.response?.data?.message || 'Failed to update profile.' });
    } finally { setSaving(false); }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    background: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: 8, padding: '0.65rem 0.9rem',
    color: 'var(--color-text)', fontSize: '0.9rem', outline: 'none'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.85rem', fontWeight: 600,
    marginBottom: '0.4rem', color: 'var(--color-muted)'
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} color="var(--color-muted)" />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ maxWidth: 560, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.35rem' }}>My Profile</h1>
      <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Manage your account details and display name.
      </p>

      {/* Avatar / Identity card */}
      <div style={{
        background: 'var(--color-surface)', border: '1px solid var(--color-border)',
        borderRadius: 16, padding: '1.75rem', marginBottom: '1.5rem',
        display: 'flex', alignItems: 'center', gap: '1.25rem'
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem', fontWeight: 800, color: '#fff', letterSpacing: -1
        }}>
          {name ? name.charAt(0).toUpperCase() : <UserIcon size={28} />}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.15rem' }}>
            {name || 'No name set'}
          </div>
          <div style={{ color: 'var(--color-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Phone size={12} /> +91 {user?.phone}
          </div>
          {email && (
            <div style={{ color: 'var(--color-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.15rem' }}>
              <Mail size={12} /> {email}
            </div>
          )}
        </div>
      </div>

      {/* Edit form */}
      <div style={{
        background: 'var(--color-surface)', border: '1px solid var(--color-border)',
        borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem'
      }}>
        <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UserIcon size={15} color="var(--color-primary)" /> Edit Profile
        </h2>

        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Display Name</label>
          <input
            style={inputStyle}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            onFocus={e => (e.target.style.borderColor = 'var(--color-primary)')}
            onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
          />
        </div>

        <div style={{ marginBottom: '0.25rem' }}>
          <label style={labelStyle}>Email Address <span style={{ fontWeight: 400, fontSize: '0.78rem' }}>(optional)</span></label>
          <input
            style={inputStyle}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            onFocus={e => (e.target.style.borderColor = 'var(--color-primary)')}
            onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
          />
        </div>

        {msg && (
          <div style={{
            marginTop: '0.85rem', padding: '0.5rem 0.85rem', borderRadius: 8, fontSize: '0.85rem',
            background: msg.type === 'ok' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            color: msg.type === 'ok' ? '#22c55e' : '#ef4444',
            display: 'flex', alignItems: 'center', gap: '0.4rem'
          }}>
            {msg.type === 'ok' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
            {msg.text}
          </div>
        )}

        <button
          onClick={saveProfile}
          disabled={saving || !name.trim()}
          style={{
            marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            color: '#fff', border: 'none', borderRadius: 8,
            padding: '0.6rem 1.3rem', fontWeight: 600, fontSize: '0.9rem',
            cursor: saving || !name.trim() ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.7 : 1
          }}>
          {saving
            ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
            : <Save size={14} />
          }
          Save Profile
        </button>
      </div>

      {/* Read-only info */}
      <div style={{
        background: 'var(--color-surface)', border: '1px solid var(--color-border)',
        borderRadius: 16, padding: '1.25rem'
      }}>
        <h2 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-muted)' }}>
          <Shield size={14} /> Account Info
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-muted)' }}>Phone (login)</span>
            <span style={{ fontWeight: 600 }}>+91 {user?.phone}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-muted)' }}>Member since</span>
            <span style={{ fontWeight: 600 }}>{user?.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-muted)' }}>Authentication</span>
            <span style={{ fontWeight: 600, color: '#22c55e', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <CheckCircle size={12} /> OTP Verified
            </span>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
