/**
 * SQL template for Personal Portfolio site schema.
 * @param {string} schema - e.g. 'tenant_port_abc123'
 */
module.exports = (schema) => `
  SET search_path TO "${schema}";

  -- Admin user
  CREATE TABLE IF NOT EXISTS admin_users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name          VARCHAR(150) NOT NULL,
    phone         VARCHAR(20) UNIQUE NOT NULL,
    email         VARCHAR(255) UNIQUE,
    password_hash TEXT NOT NULL,
    is_active     BOOLEAN DEFAULT TRUE,
    created_at    TIMESTAMPTZ DEFAULT NOW()
  );

  -- Site settings
  CREATE TABLE IF NOT EXISTS site_settings (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_name        VARCHAR(200) NOT NULL DEFAULT 'My Portfolio',
    tagline          VARCHAR(300),
    bio              TEXT,
    logo_url         TEXT,
    favicon_url      TEXT,
    contact_email    VARCHAR(255),
    contact_phone    VARCHAR(20),
    address          TEXT,
    github_url       TEXT,
    linkedin_url     TEXT,
    twitter_url      TEXT,
    primary_color    VARCHAR(10) DEFAULT '#6366F1',
    secondary_color  VARCHAR(10) DEFAULT '#8B5CF6',
    updated_at       TIMESTAMPTZ DEFAULT NOW()
  );

  -- Projects
  CREATE TABLE IF NOT EXISTS projects (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title         VARCHAR(250) NOT NULL,
    description   TEXT,
    image_url     TEXT,
    link          TEXT,
    github_link   TEXT,
    tags          TEXT[], -- Array of tech stack tags
    sort_order    INTEGER DEFAULT 0,
    is_visible    BOOLEAN DEFAULT TRUE,
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW()
  );

  -- Skills
  CREATE TABLE IF NOT EXISTS skills (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(100) NOT NULL,
    category    VARCHAR(100), -- e.g. 'Frontend', 'Backend', 'Tools'
    icon_url    TEXT,
    proficiency INTEGER CHECK (proficiency BETWEEN 0 AND 100),
    sort_order  INTEGER DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW()
  );

  -- Experience / Timeline
  CREATE TABLE IF NOT EXISTS experience (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company      VARCHAR(200) NOT NULL,
    position     VARCHAR(150) NOT NULL,
    location     VARCHAR(200),
    start_date   VARCHAR(50) NOT NULL,
    end_date     VARCHAR(50), -- Can be 'Present'
    description  TEXT,
    sort_order   INTEGER DEFAULT 0,
    created_at   TIMESTAMPTZ DEFAULT NOW()
  );

  -- Services
  CREATE TABLE IF NOT EXISTS services (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title       VARCHAR(150) NOT NULL,
    description TEXT,
    icon        VARCHAR(50), -- Icon name or emoji
    sort_order  INTEGER DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW()
  );

  -- Testimonials
  CREATE TABLE IF NOT EXISTS testimonials (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name   VARCHAR(200) NOT NULL,
    client_role   VARCHAR(150),
    company       VARCHAR(200),
    review        TEXT NOT NULL,
    photo_url     TEXT,
    is_visible    BOOLEAN DEFAULT TRUE,
    created_at    TIMESTAMPTZ DEFAULT NOW()
  );

  -- Blogs / Articles
  CREATE TABLE IF NOT EXISTS blogs (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title        VARCHAR(300) NOT NULL,
    slug         VARCHAR(300) UNIQUE NOT NULL,
    content      TEXT NOT NULL,
    image_url    TEXT,
    tags         TEXT[],
    is_published BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at   TIMESTAMPTZ DEFAULT NOW()
  );

  -- Form submissions from deployed site visitors
  CREATE TABLE IF NOT EXISTS form_submissions (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_id      VARCHAR(100),
    form_title   VARCHAR(200) DEFAULT 'Form',
    data         JSONB NOT NULL DEFAULT '{}',
    is_read      BOOLEAN DEFAULT FALSE,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Seed default settings
  INSERT INTO site_settings (site_name) VALUES ('My Portfolio');
`;
