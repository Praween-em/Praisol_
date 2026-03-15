'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getUser, logout, isLoggedIn } from '@/lib/auth';
import { User } from '@/types';
import {
  Layers, LayoutDashboard, Globe, Smartphone,
  CreditCard, LogOut, Menu, X, ChevronRight, UserCircle
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/deployments', label: 'My Sites', icon: Globe },
  { href: '/dashboard/builds', label: 'App Builds', icon: Smartphone },
  { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
  { href: '/dashboard/profile', label: 'Profile', icon: UserCircle },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/login'); return; }
    setUser(getUser());
  }, [router]);

  const sidebarStyle: React.CSSProperties = {
    width: 240, flexShrink: 0, background: 'var(--color-surface)',
    borderRight: '1px solid var(--color-border)',
    display: 'flex', flexDirection: 'column', minHeight: '100vh',
    position: 'sticky', top: 0, height: '100vh', overflowY: 'auto'
  };

  const sidebar = (
    <aside style={sidebarStyle}>
      <div style={{ padding: '1.25rem 1.25rem 0' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2.5rem' }}>
          <img src="/logo.png" alt="PraiSol Logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
          <span style={{ fontWeight: 700, color: 'var(--color-text)', fontSize: '1.1rem' }}>PraiSol</span>
        </Link>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map(item => {
            const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.6rem 0.75rem', borderRadius: 8, textDecoration: 'none',
                fontWeight: 500, fontSize: '0.9rem', transition: 'all 0.15s',
                background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: active ? 'var(--color-primary)' : 'var(--color-muted)',
                border: active ? '1px solid rgba(99,102,241,0.2)' : '1px solid transparent'
              }}>
                <item.icon size={16} />
                {item.label}
                {active && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User area */}
      <div style={{ marginTop: 'auto', padding: '1.25rem', borderTop: '1px solid var(--color-border)' }}>
        {user && (
          <Link href="/dashboard/profile" style={{ textDecoration: 'none', display: 'block', marginBottom: '0.75rem' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.1rem', color: 'var(--color-text)' }}>{user.name || 'Set your name'}</div>
            <div style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>+91 {user.phone}</div>
          </Link>
        )}
        <button onClick={logout} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.6rem',
          padding: '0.6rem 0.75rem', borderRadius: 8, border: 'none', cursor: 'pointer',
          background: 'rgba(239,68,68,0.08)', color: '#f87171', fontSize: '0.85rem', fontWeight: 500
        }}>
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div style={{ display: 'flex', background: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* Desktop Sidebar */}
      <div style={{ display: 'none' }} className="sidebar-desktop">{sidebar}</div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setSidebarOpen(false)} />
          <div style={{ position: 'relative', zIndex: 1 }}>{sidebar}</div>
        </div>
      )}

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Mobile top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/logo.png" alt="PraiSol Logo" style={{ width: 28, height: 28, objectFit: 'contain' }} />
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>PraiSol</span>
          </Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', color: 'var(--color-text)', cursor: 'pointer' }}>
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div style={{ flex: 1, padding: '2rem' }}>{children}</div>
      </main>

      <style>{`
        @media (min-width: 768px) {
          .sidebar-desktop { display: block !important; }
        }
      `}</style>
    </div>
  );
}
