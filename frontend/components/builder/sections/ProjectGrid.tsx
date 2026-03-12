'use client';
import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  desc: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
}

interface ProjectGridProps {
  title?: string;
  projects?: Project[];
}

export default function ProjectGrid({
  title = 'Featured Projects',
  projects = [],
}: ProjectGridProps) {
  return (
    <section style={{ padding: '5rem 2rem', background: '#09090b' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}>
          {projects.map((project, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#18181b',
                border: '1px solid #27272a',
                transition: 'transform 0.3s, border-color 0.3s',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#27272a';
              }}
            >
              <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
                {project.image ? (
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ color: 'rgba(255,255,255,0.1)', fontWeight: 900, fontSize: '4rem' }}>
                    {project.title[0]}
                  </div>
                )}
                
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  display: 'flex',
                  gap: '0.5rem',
                }}>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
                      width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', 
                      backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', transition: 'background 0.2s'
                    }}>
                      <Github size={18} />
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
                      width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', 
                      backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', transition: 'background 0.2s'
                    }}>
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
                  {project.title}
                </h3>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {project.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{
                      background: 'rgba(99,102,241,0.1)', color: '#818cf8', fontSize: '0.75rem',
                      fontWeight: 600, padding: '0.25rem 0.6rem', borderRadius: '6px'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
