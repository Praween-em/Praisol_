'use client';
import { useEffect, useState } from 'react';
import { useParams as useNextParams } from 'next/navigation';
import axios from 'axios';
import { ComponentRenderer } from '@/components/builder/ComponentRenderer';

export default function TenantSubPage() {
  const params = useNextParams<{ slug: string; page: string[] }>();
  const slug = params.slug;
  const pageSlug = params.page?.[0] || 'home';

  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/public/site-config`, {
      headers: { 'X-Tenant-ID': slug }
    })
    .then(r => setConfig(r.data.data))
    .catch(e => {
      setError(`Failed to load (Status: ${e.response?.status || 'network'}).`);
    })
    .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return null;

  if (error) return (
    <div style={{ padding: '8rem 2rem', textAlign: 'center', color: '#71717a' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#fff' }}>Error</h1>
      <p>{error}</p>
    </div>
  );

  const pages: any[] = config?.builder_config?.pages || [];

  const currentPage =
    pages.find((p: any) => p.id === pageSlug) ||
    pages.find((p: any) => (p.slug || p.id) === pageSlug) ||
    pages.find((p: any) => p.id === 'home');

  const components = currentPage?.components || [];

  if (components.length === 0) {
    return (
      <div style={{ padding: '8rem 2rem', textAlign: 'center', color: '#71717a' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>Page Not Found</h1>
        <p>The page <strong>{pageSlug}</strong> hasn&apos;t been built yet.</p>
      </div>
    );
  }

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
