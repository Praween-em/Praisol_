import { TemplateDefinition, TemplateCategory, UIStyle } from './types';

import { warmAcademy } from './school/warm-academy';
import { classicSchool } from './school/classic-school';
import { neonCampus } from './school/neon-campus';

import { heritageInstitute } from './college/heritage-institute';
import { eliteUniversity } from './college/elite-university';
import { futuristicCollege } from './college/futuristic-college';

import { handcraftedShop } from './business/handcrafted-shop';
import { corporateSuite } from './business/corporate-suite';
import { digitalAgency } from './business/digital-agency';

import { vintageStudio } from './portfolio/vintage-studio';
import { executiveProfile } from './portfolio/executive-profile';
import { creativeDev } from './portfolio/creative-dev';

export * from './types';

export const TEMPLATES: TemplateDefinition[] = [
  warmAcademy,
  classicSchool,
  neonCampus,
  heritageInstitute,
  eliteUniversity,
  futuristicCollege,
  handcraftedShop,
  corporateSuite,
  digitalAgency,
  vintageStudio,
  executiveProfile,
  creativeDev,
];

export const getAllTemplates = () => TEMPLATES;

export const getTemplatesByCategory = (category: TemplateCategory) => 
  TEMPLATES.filter(t => t.category === category);

export const getTemplatesByStyle = (style: UIStyle) => 
  TEMPLATES.filter(t => t.style === style);

export const getTemplateById = (id: string) => 
  TEMPLATES.find(t => t.id === id);
