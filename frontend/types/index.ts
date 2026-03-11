// TypeScript interfaces for the platform

export interface User {
  id: string;
  name: string | null;
  phone: string;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Deployment {
  id: string;
  user_id: string;
  system_type: 'school' | 'college' | 'business';
  name: string;
  slug: string;
  schema_name: string;
  status: 'building' | 'active' | 'suspended' | 'deleted';
  custom_domain: string | null;
  builder_config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Plan {
  id: string;
  name: string;
  price_inr: number;
  features: {
    max_deployments: number;
    custom_domain: boolean;
    storage_gb: number;
  };
}

export interface AppBuild {
  id: string;
  deployment_id: string;
  build_type: 'apk' | 'aab';
  status: 'queued' | 'building' | 'done' | 'failed';
  download_url: string | null;
  app_name: string;
  app_version: string;
  created_at: string;
  completed_at: string | null;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}
