import { EditableText } from '../atoms/EditableText';

interface StatItem {
  label: string;
  value: string;
  icon?: string;
}

interface StatsCounterProps {
  id?: string;
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
  stats?: StatItem[];
  layout?: 'row' | 'grid';
  accentColor?: string;
  backgroundColor?: string;
  cardBackground?: string;
  borderColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  valueColor?: string;
  labelColor?: string;
  showIcons?: boolean;
  cardBorderRadius?: string;
  padding?: string;
}

export const StatsCounter = ({
  id = '',
  title = 'By the Numbers',
  subtitle = 'Our impact in numbers',
  showTitle = true,
  stats = [
    { label: 'Students Enrolled', value: '5,000+', icon: '🎓' },
    { label: 'Expert Teachers', value: '150+', icon: '👩‍🏫' },
    { label: 'Years of Excellence', value: '25', icon: '🏆' },
    { label: 'Alumni Network', value: '20,000+', icon: '🌐' },
  ],
  layout = 'row',
  accentColor = '#6366f1',
  backgroundColor = 'transparent',
  cardBackground = 'rgba(255,255,255,0.04)',
  borderColor = 'rgba(255,255,255,0.07)',
  titleColor = '#ffffff',
  subtitleColor = '#a1a1aa',
  valueColor,
  labelColor = '#a1a1aa',
  showIcons = true,
  cardBorderRadius = '18px',
  padding = '4rem 2rem',
}: StatsCounterProps) => {
  return (
    <section style={{ padding, background: backgroundColor }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        {showTitle && title && (
          <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 800, color: titleColor, marginBottom: '0.5rem' }}>
            <EditableText id={id} propKey="title" value={title} />
          </h2>
        )}
        {showTitle && subtitle && (
          <p style={{ color: subtitleColor, marginBottom: '3rem', fontSize: 'clamp(0.875rem, 2vw, 1.1rem)' }}>
            <EditableText id={id} propKey="subtitle" value={subtitle} multiline />
          </p>
        )}
        <div className={`
          grid gap-4 sm:gap-6 w-full
          ${layout === 'row' ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'}
        `}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: cardBackground,
              borderRadius: cardBorderRadius,
              padding: '2rem 1rem',
              border: `1px solid ${borderColor}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
            }}>
              {showIcons && s.icon && <div style={{ fontSize: '2.5rem' }}>{s.icon}</div>}
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: valueColor || accentColor, lineHeight: 1 }}>
                <EditableText id={id} propKey={`stats.${i}.value`} value={s.value} />
              </div>
              <div style={{ color: labelColor, fontSize: '0.9rem', fontWeight: 500 }}>
                <EditableText id={id} propKey={`stats.${i}.label`} value={s.label} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
