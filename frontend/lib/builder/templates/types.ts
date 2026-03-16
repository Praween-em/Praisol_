import { BuilderConfig } from '../useBuilder';

export type UIStyle = 'skeuomorphic' | 'professional' | 'modern';
export type TemplateCategory = 'school' | 'college' | 'business' | 'portfolio';

export interface TemplateDefinition {
  id: string;
  name: string;
  category: TemplateCategory;
  style: UIStyle;
  description: string;
  thumbnail: string;
  accentColor: string;
  config: BuilderConfig;
}
