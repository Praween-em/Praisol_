'use client';

interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
}

interface TeamGridProps {
  title?: string;
  subtitle?: string;
  members?: TeamMember[];
  columns?: number;
  accentColor?: string;
}

export default function TeamGrid({
  title = 'Meet Our Team',
  subtitle = 'The talented people behind the scenes.',
  members = [
    { name: 'Aarav Sharma', role: 'Founder & CEO', bio: 'Visionary leader with 10+ years of experience.' },
    { name: 'Priya Mehta', role: 'CTO', bio: 'Engineer and architect of our core platform.' },
    { name: 'Rohan Singh', role: 'Head of Design', bio: 'Crafting beautiful user experiences.' },
  ],
  columns = 3,
  accentColor = '#6366f1',
}: TeamGridProps) {
  return (
    <section style={{ padding: '4rem 2rem', background: 'transparent' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>{title}</h2>
        <p style={{ color: '#a1a1aa', fontSize: '1.05rem', marginBottom: '3rem' }}>{subtitle}</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(columns, members.length)}, 1fr)`,
          gap: '2rem',
        }}>
          {members.map((m, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 20,
              padding: '2rem 1.5rem',
              border: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
              transition: 'transform 0.2s',
            }}>
              {m.avatar ? (
                <img src={m.avatar} alt={m.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${accentColor}` }} />
              ) : (
                <div style={{
                  width: 80, height: 80, borderRadius: '50%', background: accentColor + '33',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem', fontWeight: 700, color: accentColor, border: `3px solid ${accentColor}`
                }}>
                  {m.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', margin: '0 0 0.25rem' }}>{m.name}</h3>
                <p style={{ color: accentColor, fontSize: '0.85rem', fontWeight: 600, margin: '0 0 0.5rem' }}>{m.role}</p>
                {m.bio && <p style={{ color: '#a1a1aa', fontSize: '0.85rem', lineHeight: 1.6 }}>{m.bio}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
