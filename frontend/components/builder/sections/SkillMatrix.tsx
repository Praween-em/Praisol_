'use client';
import React from 'react';
import { EditableText } from '../atoms/EditableText';

interface SkillItem {
  name: string;
  proficiency: number;
  icon?: string;
  category?: string;
}

interface SkillMatrixProps {
  id?: string;
  title?: string;
  subtitle?: string;
  skills?: SkillItem[];
  columns?: 1 | 2;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  accentColor?: string;
  trackColor?: string;
  barColor?: string;
  padding?: string;
}

export const SkillMatrix = ({
  id = '',
  title = 'Our Expertise',
  subtitle = 'The core competencies that drive our success and innovation.',
  skills = [
    { name: 'Web Development', proficiency: 95 },
    { name: 'UI/UX Design', proficiency: 88 },
    { name: 'Mobile Apps', proficiency: 82 },
    { name: 'Cloud Infrastructure', proficiency: 90 },
  ],
  columns = 2,
  backgroundColor = '#09090b',
  titleColor = '#ffffff',
  subtitleColor = '#a1a1aa',
  accentColor = '#6366f1',
  trackColor = '#18181b',
  barColor = 'linear-gradient(90deg, #6366f1, #a855f7)',
  padding = '5rem 2rem',
}: SkillMatrixProps) => {
  return (
    <section style={{ padding, background: backgroundColor }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }} className="px-4 sm:px-6">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 800, color: titleColor, marginBottom: '1rem' }}>
            <EditableText id={id} propKey="title" value={title} />
          </h2>
          <p style={{ color: subtitleColor, fontSize: 'clamp(0.875rem, 2vw, 1.1rem)', maxWidth: '600px', margin: '0 auto' }}>
            <EditableText id={id} propKey="subtitle" value={subtitle} multiline />
          </p>
        </div>

        <div className={`grid gap-x-10 gap-y-8 grid-cols-1 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}>
          {skills.map((skill, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: titleColor, fontWeight: 600, fontSize: '1.1rem' }}>
                  <EditableText id={id} propKey={`skills.${idx}.name`} value={skill.name} />
                </span>
                <span style={{ color: accentColor, fontWeight: 700, fontSize: '0.9rem' }}>
                  <EditableText id={id} propKey={`skills.${idx}.proficiency`} value={skill.proficiency.toString()} />%
                </span>
              </div>
              <div style={{
                height: '8px',
                background: trackColor,
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{
                  height: '100%',
                  width: `${skill.proficiency}%`,
                  background: barColor,
                  borderRadius: '4px',
                  transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Badge-style cluster for additional tools/soft skills */}
        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          borderRadius: '16px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
        }}>
          {['Git', 'Agile', 'UI/UX', 'Testing', 'AWS', 'Docker'].map(label => (
            <div key={label} style={{
              background: '#18181b',
              color: subtitleColor,
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              border: '1px solid #27272a',
              fontSize: '0.85rem',
              fontWeight: 500,
            }}>
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
