import { EditableText } from '../atoms/EditableText';

interface StatsBarProps {
  id?: string;
  stats: { label: string; value: string }[];
  backgroundColor?: string;
  textColor?: string;
}

export const StatsBar = ({ 
  id = '',
  stats = [], 
  backgroundColor = '#111827', 
  textColor = '#ffffff' 
}: StatsBarProps) => {
  return (
    <section 
      style={{ 
        backgroundColor, 
        color: textColor,
        padding: '4rem 1.5rem'
      }}
      className="px-4 sm:px-6"
    >
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        gap: '2rem',
        textAlign: 'center'
      }}>
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            style={{ 
              flex: '1 1 200px',
              minWidth: '150px'
            }}
          >
            <div style={{ 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
              fontWeight: 800, 
              marginBottom: '0.5rem',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              <EditableText id={id} propKey={`stats.${idx}.value`} value={stat.value} />
            </div>
            <div style={{ 
              fontSize: '1rem', 
              fontWeight: 600, 
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              opacity: 0.8
            }}>
              <EditableText id={id} propKey={`stats.${idx}.label`} value={stat.label} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
