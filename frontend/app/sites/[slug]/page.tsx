'use client';
import { useEffect, useState } from 'react';
import { useParams as useNextParams } from 'next/navigation';
import axios from 'axios';
import { ComponentRenderer } from '@/components/builder/ComponentRenderer';
import { Loader2 } from 'lucide-react';

export default function TenantPage() {
  const { slug } = useNextParams<{ slug: string }>();
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch site config (builder layout)
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/public/site-config`, {
      headers: { 'X-Tenant-ID': slug }
    })
    .then(r => setConfig(r.data.data))
    .catch(e => {
      console.error('Failed to fetch site config:', e.response?.data || e.message);
      setError(`Failed to load site configuration (Status: ${e.response?.status || 'network'}). Please ensure the site is active.`);
    })
    .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return null; // Showing loader in Layout

  if (error) return (
    <div style={{ padding: '8rem 2rem', textAlign: 'center', color: '#71717a' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>404</h1>
      <p style={{ marginBottom: '2rem' }}>{error}</p>
      <button onClick={() => window.location.reload()} 
        style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
        Try Again
      </button>
    </div>
  );

  // Find the home page components
  const homePage = config?.builder_config?.pages?.find((p: any) => p.id === 'home');
  const components = homePage?.components || [];

  return (
    <div>
      {components.map((comp: any) => (
        <ComponentRenderer
          key={comp.id}
          type={comp.type}
          props={comp.props}
          tenantSlug={slug}
        />
      ))}
    </div>
  );
}
