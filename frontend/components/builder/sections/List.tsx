import { CheckCircle } from 'lucide-react';
import { EditableText } from '../atoms/EditableText';

interface ListProps {
  id?: string;
  items?: string[];
  type?: 'bullet' | 'ordered' | 'check';
  color?: string;
  spacing?: string;
}

export const List = ({
  id = '',
  items = ['First item', 'Second item', 'Third item'],
  type = 'bullet',
  color = '#a1a1aa',
  spacing = '0.75rem',
}: ListProps) => {
  const isOrdered = type === 'ordered';

  if (type === 'check') {
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: spacing }}>
        {items.map((item, idx) => (
          <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color, fontSize: '1rem' }}>
            <CheckCircle size={18} color="var(--color-primary, #6366f1)" className="flex-shrink-0" />
            <EditableText id={id} propKey={`items.${idx}`} value={item} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul style={{ 
      listStyleType: isOrdered ? 'decimal' : 'disc',
      paddingLeft: '1.5rem',
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: spacing,
      color,
      fontSize: '1rem'
    }}>
      {items.map((item, idx) => (
        <li key={idx}>
          <EditableText id={id} propKey={`items.${idx}`} value={item} />
        </li>
      ))}
    </ul>
  );
}
