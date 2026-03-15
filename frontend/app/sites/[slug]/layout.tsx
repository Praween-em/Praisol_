'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  const { slug } = useParams<{ slug: string }>();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch site settings for branding/theme
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/public/site-settings`, {
      headers: { 'X-Tenant-ID': slug }
    })
    .then(r => setSettings(r.data.data))
    .catch(e => console.error('Failed to fetch site settings:', e))
    .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#09090b', color: '#fff' }}>
      <Loader2 className="animate-spin" size={32} />
    </div>
  );

  return (
    <div className="tenant-site" style={{ 
      '--tenant-primary': settings?.primary_color || '#6366f1',
      '--tenant-secondary': settings?.secondary_color || '#a855f7',
    } as any}>
      {/* Dynamic Title */}
      <title>{settings?.site_name || settings?.business_name || 'Loading...'}</title>
      
      {children}
      
      <style jsx global>{`
        :root {
          --color-primary: var(--tenant-primary);
          --color-secondary: var(--tenant-secondary);
        }
        body {
          background: #000;
          color: #fff;
          margin: 0;
          font-family: 'Inter', sans-serif;
        }
        .gradient-text {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
