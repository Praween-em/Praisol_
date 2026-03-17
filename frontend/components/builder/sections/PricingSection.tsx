import React from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/lib/auth';
import { EditableText } from '../atoms/EditableText';

interface Plan {
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

interface PricingSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  plans?: Plan[];
  backgroundColor?: string;
  cardBackground?: string;
  cardBorderColor?: string;
  accentColor?: string;
  highlightColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  padding?: string;
  showBadge?: boolean;
}

export const PricingSection = ({
  id = '',
  title = 'Our Plans',
  subtitle = 'Choose the plan that fits your needs',
  plans = [],
  backgroundColor = '#09090b',
  cardBackground = '#18181b',
  cardBorderColor = '#27272a',
  accentColor = '#6366f1',
  highlightColor = 'rgba(99,102,241,0.06)',
  titleColor = '#ffffff',
  subtitleColor = '#a1a1aa',
  padding = '5rem 2rem',
  showBadge = true,
}: PricingSectionProps) => {
  const router = useRouter();

  const handleGetStarted = (plan: Plan) => {
    if (plan.ctaLink) {
        window.location.href = plan.ctaLink;
        return;
    }
    if (!isLoggedIn()) {
      router.push('/login');
      return;
    }
    // Handle authenticated click
    console.log('User is logged in, proceeding with plan:', plan.name);
  };

  return (
    <section style={{ padding, background: backgroundColor }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          fontWeight: 800,
          color: titleColor,
          marginBottom: '0.75rem',
        }}>
          <EditableText id={id} propKey="title" value={title} />
        </h2>
        <p style={{
          textAlign: 'center',
          color: subtitleColor,
          marginBottom: '3rem',
          fontSize: '1rem',
        }}>
          <EditableText id={id} propKey="subtitle" value={subtitle} multiline />
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
        }}>
          {plans.map((plan, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: '16px',
                padding: '2rem',
                border: plan.highlight
                  ? `2px solid ${accentColor}`
                  : `1px solid ${cardBorderColor}`,
                background: plan.highlight
                  ? highlightColor
                  : cardBackground,
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'flex',
                flexDirection: 'column'
              }}
              className="group"
            >
              {plan.highlight && showBadge && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: `linear-gradient(135deg, ${accentColor}, #a855f7)`,
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.8rem',
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Popular
                </div>
              )}

              <p style={{ color: subtitleColor, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                <EditableText id={id} propKey={`plans.${idx}.name`} value={plan.name} />
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.2rem',
                marginBottom: '1.5rem',
              }}>
                <span style={{ fontSize: '2.2rem', fontWeight: 800, color: titleColor }}>
                  <EditableText id={id} propKey={`plans.${idx}.price`} value={plan.price} />
                </span>
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 1.5rem 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                flexGrow: 1
              }}>
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      color: subtitleColor,
                    }}
                  >
                    <span style={{ color: '#22c55e', fontSize: '1rem' }}>✓</span>
                    <EditableText id={id} propKey={`plans.${idx}.features.${i}`} value={f} />
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleGetStarted(plan)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  background: plan.highlight
                    ? `linear-gradient(135deg, ${accentColor}, #a855f7)`
                    : '#27272a',
                  color: '#fff',
                  transition: 'opacity 0.2s',
                }}
              >
                <EditableText id={id} propKey={`plans.${idx}.ctaText`} value={plan.ctaText || 'Get Started'} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
