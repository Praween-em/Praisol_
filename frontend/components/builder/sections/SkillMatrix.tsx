'use client';
import React from 'react';

interface Skill {
  name: string;
  proficiency: number;
}

interface SkillMatrixProps {
  title?: string;
  skills?: Skill[];
}

export default function SkillMatrix({
  title = 'Technical Skills',
  skills = [],
}: SkillMatrixProps) {
  return (
    <section style={{ padding: '5rem 2rem', background: '#09090b' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          fontWeight: 800,
          color: '#fff',
          marginBottom: '3.5rem',
        }}>
          {title}
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
        }}>
          {skills.map((skill, idx) => (
            <div key={idx}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '0.6rem',
                alignItems: 'baseline'
              }}>
                <span style={{ color: '#d4d4d8', fontWeight: 600, fontSize: '0.95rem' }}>
                  {skill.name}
                </span>
                <span style={{ color: '#6366f1', fontWeight: 700, fontSize: '0.85rem' }}>
                  {skill.proficiency}%
                </span>
              </div>
              <div style={{ 
                height: '8px', 
                background: '#27272a', 
                borderRadius: '999px',
                overflow: 'hidden'
              }}>
                <div 
                  style={{ 
                    height: '100%', 
                    width: `${skill.proficiency}%`, 
                    background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                    borderRadius: '999px',
                    boxShadow: '0 0 10px rgba(99,102,241,0.3)',
                    transition: 'width 1s ease-out'
                  }} 
                />
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
              color: '#d4d4d8',
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
