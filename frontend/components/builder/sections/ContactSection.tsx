import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../atoms/Button';
import { EditableText } from '../atoms/EditableText';

export interface ContactSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  address?: string;
  showForm?: boolean;
  backgroundColor?: string;
  cardBackground?: string;
  cardBorderColor?: string;
  accentColor?: string;
  titleColor?: string;
  textColor?: string;
  subtextColor?: string;
  padding?: string;
  formTitle?: string;
  buttonText?: string;
}

export const ContactSection = ({
  id = '',
  title = 'Get in Touch',
  subtitle = 'We would love to hear from you. Reach out to us via any of the following channels.',
  email = 'contact@example.online',
  phone = '+91 8374950475',
  address = 'Anantapur, Andhra Pradesh, India',
  showForm = true,
  backgroundColor = '#09090b',
  cardBackground = '#18181b',
  cardBorderColor = '#27272a',
  accentColor = '#6366f1',
  titleColor = '#ffffff',
  textColor = '#ffffff',
  subtextColor = '#a1a1aa',
  padding = '5rem 2rem',
  formTitle = 'Send us a Message',
  buttonText = 'Send Message',
}: ContactSectionProps) => {
  return (
    <section style={{ padding, background: backgroundColor }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 800, color: titleColor, marginBottom: '1rem' }}>
            <EditableText id={id} propKey="title" value={title} />
          </h2>
          <p style={{ color: subtextColor, fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            <EditableText id={id} propKey="subtitle" value={subtitle} multiline />
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: showForm ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr',
          gap: '3rem',
        }}>
          {/* Info Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{
              padding: '2rem',
              background: cardBackground,
              borderRadius: '20px',
              border: `1px solid ${cardBorderColor}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem'
            }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${accentColor}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor, flexShrink: 0 }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ color: subtextColor, fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Email Us</h4>
                  <p style={{ color: textColor, fontWeight: 700, fontSize: '1.1rem' }}>
                    <EditableText id={id} propKey="email" value={email} />
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${accentColor}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor, flexShrink: 0 }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ color: subtextColor, fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Call Us</h4>
                  <p style={{ color: textColor, fontWeight: 700, fontSize: '1.1rem' }}>
                    <EditableText id={id} propKey="phone" value={phone} />
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${accentColor}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor, flexShrink: 0 }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ color: subtextColor, fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Visit Us</h4>
                  <p style={{ color: textColor, fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.4 }}>
                    <EditableText id={id} propKey="address" value={address} multiline />
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          {showForm && (
            <div style={{
              padding: '2.5rem',
              background: cardBackground,
              borderRadius: '24px',
              border: `1px solid ${cardBorderColor}`,
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: titleColor, marginBottom: '2rem' }}>
                <EditableText id={id} propKey="formTitle" value={formTitle} />
              </h3>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} onSubmit={(e) => e.preventDefault()}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input type="text" placeholder="First Name" style={{ background: backgroundColor, border: `1px solid ${cardBorderColor}`, borderRadius: '8px', padding: '0.75rem 1rem', color: textColor }} />
                  <input type="text" placeholder="Last Name" style={{ background: backgroundColor, border: `1px solid ${cardBorderColor}`, borderRadius: '8px', padding: '0.75rem 1rem', color: textColor }} />
                </div>
                <input type="email" placeholder="Email Address" style={{ background: backgroundColor, border: `1px solid ${cardBorderColor}`, borderRadius: '8px', padding: '0.75rem 1rem', color: textColor }} />
                <textarea rows={4} placeholder="Your Message" style={{ background: backgroundColor, border: `1px solid ${cardBorderColor}`, borderRadius: '8px', padding: '0.75rem 1rem', color: textColor, resize: 'none' }}></textarea>
                <Button size="lg" className="w-full justify-center gap-2" style={{ background: accentColor }}>
                  <Send size={18} /> {buttonText}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
