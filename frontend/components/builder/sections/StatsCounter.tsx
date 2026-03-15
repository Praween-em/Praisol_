'use client';

interface StatItem {
  label: string;
  value: string;
  icon?: string;
}

interface StatsCounterProps {
  title?: string;
  subtitle?: string;
  stats?: StatItem[];
  layout?: 'row' | 'grid';
  accentColor?: string;
  backgroundColor?: string;
}

export default function StatsCounter({
  title = 'By the Numbers',
  subtitle = 'Our impact in numbers',
  stats = [
    { label: 'Students Enrolled', value: '5,000+', icon: '🎓' },
    { label: 'Expert Teachers', value: '150+', icon: '👩‍🏫' },
    { label: 'Years of Excellence', value: '25', icon: '🏆' },
    { label: 'Alumni Network', value: '20,000+', icon: '🌐' },
  ],
  layout = 'row',
  accentColor = '#6366f1',
  backgroundColor = 'transparent',
}: StatsCounterProps) {
  return (
    <section style={{ padding: '4rem 2rem', background: backgroundColor }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        {title && <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>{title}</h2>}
        {subtitle && <p style={{ color: '#a1a1aa', marginBottom: '3rem' }}>{subtitle}</p>}
        <div style={{
          display: 'grid',
          gridTemplateColumns: layout === 'row'
            ? `repeat(${Math.min(stats.length, 4)}, 1fr)`
            : 'repeat(2, 1fr)',
          gap: '1.5rem',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 18,
              padding: '2rem 1rem',
              border: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
            }}>
              {s.icon && <div style={{ fontSize: '2.5rem' }}>{s.icon}</div>}
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: accentColor, lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: '#a1a1aa', fontSize: '0.9rem', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
