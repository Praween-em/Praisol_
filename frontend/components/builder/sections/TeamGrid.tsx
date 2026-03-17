import { EditableText } from '../atoms/EditableText';

interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
}

interface TeamGridProps {
  id?: string;
  title?: string;
  subtitle?: string;
  showSubtitle?: boolean;
  members?: TeamMember[];
  columns?: number;
  accentColor?: string;
  backgroundColor?: string;
  cardBackground?: string;
  borderColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  showBio?: boolean;
  avatarSize?: number;
  cardBorderRadius?: string;
  padding?: string;
  layout?: 'card' | 'minimal';
}

export const TeamGrid = ({
  id = '',
  title = 'Meet Our Team',
  subtitle = 'The talented people behind the scenes.',
  showSubtitle = true,
  members = [
    { name: 'Aarav Sharma', role: 'Founder & CEO', bio: 'Visionary leader with 10+ years of experience.' },
    { name: 'Priya Mehta', role: 'CTO', bio: 'Engineer and architect of our core platform.' },
    { name: 'Rohan Singh', role: 'Head of Design', bio: 'Crafting beautiful user experiences.' },
  ],
  columns = 3,
  accentColor = '#6366f1',
  backgroundColor = 'transparent',
  cardBackground = 'rgba(255,255,255,0.04)',
  borderColor = 'rgba(255,255,255,0.07)',
  titleColor = '#ffffff',
  subtitleColor = '#a1a1aa',
  showBio = true,
  avatarSize = 80,
  cardBorderRadius = '20px',
  padding = '4rem 2rem',
  layout = 'card',
}: TeamGridProps) => {
  return (
    <section style={{ padding, background: backgroundColor }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 800, color: titleColor, marginBottom: '0.5rem' }}>
          <EditableText id={id} propKey="title" value={title} />
        </h2>
        {showSubtitle && (
          <p style={{ color: subtitleColor, fontSize: 'clamp(0.875rem, 2vw, 1.05rem)', marginBottom: '3rem' }}>
            <EditableText id={id} propKey="subtitle" value={subtitle} multiline />
          </p>
        )}
        <div style={{
          display: 'grid',
          gridTemplateColumns: members.length === 1 ? '1fr' : `repeat(auto-fit, minmax(280px, 1fr))`,
          gap: '2rem',
        }}>
          {members.map((m, i) => (
            <div key={i} style={{
              background: layout === 'minimal' ? 'transparent' : cardBackground,
              borderRadius: cardBorderRadius,
              padding: layout === 'minimal' ? '1rem 0' : '2rem 1.5rem',
              border: layout === 'minimal' ? 'none' : `1px solid ${borderColor}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
              transition: 'transform 0.2s',
            }}>
              {m.avatar ? (
                <img src={m.avatar} alt={m.name} style={{ width: avatarSize, height: avatarSize, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${accentColor}` }} />
              ) : (
                <div style={{
                  width: avatarSize, height: avatarSize, borderRadius: '50%', background: accentColor + '33',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: avatarSize * 0.4, fontWeight: 700, color: accentColor, border: `3px solid ${accentColor}`
                }}>
                  {m.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', margin: '0 0 0.25rem' }}>
                  <EditableText id={id} propKey={`members.${i}.name`} value={m.name} />
                </h3>
                <p style={{ color: accentColor, fontSize: '0.85rem', fontWeight: 600, margin: '0 0 0.5rem' }}>
                  <EditableText id={id} propKey={`members.${i}.role`} value={m.role} />
                </p>
                {showBio && m.bio && (
                  <p style={{ color: '#a1a1aa', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    <EditableText id={id} propKey={`members.${i}.bio`} value={m.bio} multiline />
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
