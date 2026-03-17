import { Github, ExternalLink } from 'lucide-react';
import { EditableText } from '../atoms/EditableText';

interface Project {
  title: string;
  desc: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
}

interface ProjectGridProps {
  id?: string;
  title?: string;
  projects?: Project[];
  backgroundColor?: string;
  titleColor?: string;
  cardBackground?: string;
  cardBorderColor?: string;
  accentColor?: string;
  tagColor?: string;
  tagBackground?: string;
  textColor?: string;
  subtextColor?: string;
  padding?: string;
}

export const ProjectGrid = ({
  id = '',
  title = 'Featured Projects',
  projects = [],
  backgroundColor = '#09090b',
  titleColor = '#ffffff',
  cardBackground = '#18181b',
  cardBorderColor = '#27272a',
  accentColor = '#6366f1',
  tagColor = '#818cf8',
  tagBackground = 'rgba(99,102,241,0.1)',
  textColor = '#ffffff',
  subtextColor = '#a1a1aa',
  padding = '5rem 2rem',
}: ProjectGridProps) => {
  return (
    <section style={{ padding, background: backgroundColor }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
          fontWeight: 800,
          color: titleColor,
          marginBottom: '3rem',
        }}>
          <EditableText id={id} propKey="title" value={title} />
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {projects.map((project, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                background: cardBackground,
                border: `1px solid ${cardBorderColor}`,
                transition: 'transform 0.3s, border-color 0.3s',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = accentColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = cardBorderColor;
              }}
            >
              <div style={{
                height: '200px',
                background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}66)`,
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
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: textColor, marginBottom: '0.5rem' }}>
                  <EditableText id={id} propKey={`projects.${idx}.title`} value={project.title} />
                </h3>
                <p style={{ color: subtextColor, fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  <EditableText id={id} propKey={`projects.${idx}.desc`} value={project.desc} multiline />
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} style={{
                      background: tagBackground, color: tagColor, fontSize: '0.75rem',
                      fontWeight: 600, padding: '0.25rem 0.6rem', borderRadius: '6px'
                    }}>
                      <EditableText id={id} propKey={`projects.${idx}.tags.${tIdx}`} value={tag} />
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
