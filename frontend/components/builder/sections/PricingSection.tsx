'use client';
import React from 'react';

interface Plan {
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
}

interface PricingSectionProps {
  title?: string;
  plans?: Plan[];
}

export default function PricingSection({
  title = 'Our Plans',
  plans = [],
}: PricingSectionProps) {
  return (
    <section style={{ padding: '5rem 2rem', background: '#09090b' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          fontWeight: 800,
          color: '#fff',
          marginBottom: '0.75rem',
        }}>
          {title}
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#a1a1aa',
          marginBottom: '3rem',
          fontSize: '1rem',
        }}>
          Choose the plan that fits your needs
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
                  ? '2px solid #6366f1'
                  : '1px solid #27272a',
                background: plan.highlight
                  ? 'rgba(99,102,241,0.06)'
                  : '#18181b',
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {plan.highlight && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
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

              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                {plan.name}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.2rem',
                marginBottom: '1.5rem',
              }}>
                <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff' }}>
                  {plan.price}
                </span>
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 1.5rem 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
              }}>
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      color: '#a1a1aa',
                    }}
                  >
                    <span style={{ color: '#22c55e', fontSize: '1rem' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  background: plan.highlight
                    ? 'linear-gradient(135deg, #6366f1, #a855f7)'
                    : '#27272a',
                  color: '#fff',
                  transition: 'opacity 0.2s',
                }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
