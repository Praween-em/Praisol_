import { EditableText } from '../atoms/EditableText';

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  desc?: string;
  current?: boolean;
}

interface ExperienceTimelineProps {
  id?: string;
  title?: string;
  items?: ExperienceItem[];
  backgroundColor?: string;
  titleColor?: string;
  cardBackground?: string;
  cardBorderColor?: string;
  accentColor?: string;
  nodeColor?: string;
  lineColor?: string;
  textColor?: string;
  subtextColor?: string;
  padding?: string;
}

export const ExperienceTimeline = ({
  id = '',
  title = 'Work Experience',
  items = [],
  backgroundColor = '#09090b',
  titleColor = '#ffffff',
  cardBackground = '#18181b',
  cardBorderColor = '#27272a',
  accentColor = '#6366f1',
  nodeColor = '#18181b',
  lineColor = '#27272a',
  textColor = '#ffffff',
  subtextColor = '#a1a1aa',
  padding = '5rem 2rem',
}: ExperienceTimelineProps) => {
  return (
    <section style={{ padding, background: backgroundColor }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
          fontWeight: 800,
          color: titleColor,
          marginBottom: '4rem',
        }}>
          <EditableText id={id} propKey="title" value={title} />
        </h2>

        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          {/* Timeline connecting line */}
          <div style={{
            position: 'absolute',
            left: 'calc(2rem + 7px)',
            top: 0,
            bottom: 0,
            width: '2px',
            background: `linear-gradient(to bottom, transparent, ${lineColor} 10%, ${lineColor} 90%, transparent)`,
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {items.map((item, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                {/* Timeline node */}
                <div style={{
                  position: 'absolute',
                  left: '-2rem',
                  top: '0.25rem',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: item.current ? accentColor : nodeColor,
                  border: `3px solid ${item.current ? '#818cf8' : lineColor}`,
                  zIndex: 2,
                  boxShadow: item.current ? `0 0 15px ${accentColor}80` : 'none',
                }} />

                <div style={{
                  background: cardBackground,
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: `1px solid ${cardBorderColor}`,
                  transition: 'background 0.2s',
                }}>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: 'space-between', 
                    alignItems: 'baseline',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: textColor }}>
                      <EditableText id={id} propKey={`items.${idx}.role`} value={item.role} />
                    </h3>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      fontWeight: 600, 
                      color: item.current ? '#818cf8' : subtextColor,
                      background: item.current ? `${accentColor}1a` : 'rgba(255,255,255,0.05)',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '999px'
                    }}>
                      <EditableText id={id} propKey={`items.${idx}.duration`} value={item.duration} />
                    </span>
                  </div>
                  <div style={{ color: accentColor, fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                    <EditableText id={id} propKey={`items.${idx}.company`} value={item.company} />
                  </div>
                  {item.desc && (
                    <p style={{ color: subtextColor, fontSize: '0.875rem', lineHeight: 1.6 }}>
                      <EditableText id={id} propKey={`items.${idx}.desc`} value={item.desc} multiline />
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
