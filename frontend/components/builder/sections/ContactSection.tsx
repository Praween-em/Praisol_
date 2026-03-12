'use client';
import React from 'react';

interface ContactSectionProps {
  title?: string;
  email?: string;
  phone?: string;
  address?: string;
  showForm?: boolean;
}

export default function ContactSection({
  title = 'Get in Touch',
  email = 'contact@example.online',
  phone = '+91 98765 43210',
  address = '123 Business Way, City, State',
  showForm = true,
}: ContactSectionProps) {
  return (
    <section style={{ padding: '5rem 2rem', background: '#09090b' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          fontWeight: 800,
          color: '#fff',
          marginBottom: '3rem',
        }}>
          {title}
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
        }}>
          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { icon: '✉️', label: 'Email', value: email },
              { icon: '📞', label: 'Phone', value: phone },
              { icon: '📍', label: 'Address', value: address },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.25rem',
                  background: '#18181b',
                  borderRadius: '12px',
                  border: '1px solid #27272a',
                }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(99,102,241,0.1)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#6366f1',
                    marginBottom: '0.25rem',
                  }}>
                    {item.label}
                  </div>
                  <div style={{ color: '#d4d4d8', fontSize: '0.95rem', lineHeight: 1.5 }}>
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          {showForm && (
            <div style={{
              padding: '2rem',
              background: '#18181b',
              borderRadius: '16px',
              border: '1px solid #27272a',
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '1.5rem',
              }}>
                Send us a message
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: '#09090b',
                    border: '1px solid #27272a',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: '#09090b',
                    border: '1px solid #27272a',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: '#09090b',
                    border: '1px solid #27272a',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                />
                <button
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s',
                  }}
                >
                  Send Message
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
