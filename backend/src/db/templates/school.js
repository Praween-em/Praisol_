/**
 * SQL template for School website schema.
 * Returns a SQL string that creates all tables for a school site.
 * @param {string} schema - schema name e.g. 'tenant_sch_abc123'
 */
module.exports = (schema) => `
  SET search_path TO "${schema}";

  -- Admin user (only login for school sites)
  CREATE TABLE IF NOT EXISTS admin_users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name          VARCHAR(150) NOT NULL,
    phone         VARCHAR(20) UNIQUE NOT NULL,
    email         VARCHAR(255) UNIQUE,
    password_hash TEXT NOT NULL,
    is_active     BOOLEAN DEFAULT TRUE,
    created_at    TIMESTAMPTZ DEFAULT NOW()
  );

  -- Site-wide settings
  CREATE TABLE IF NOT EXISTS site_settings (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_name        VARCHAR(200) NOT NULL DEFAULT 'My School',
    tagline          VARCHAR(300),
    logo_url         TEXT,
    favicon_url      TEXT,
    contact_email    VARCHAR(255),
    contact_phone    VARCHAR(20),
    address          TEXT,
    facebook_url     TEXT,
    twitter_url      TEXT,
    youtube_url      TEXT,
    primary_color    VARCHAR(10) DEFAULT '#1E40AF',
    secondary_color  VARCHAR(10) DEFAULT '#0EA5E9',
    updated_at       TIMESTAMPTZ DEFAULT NOW()
  );

  -- Navigation pages
  CREATE TABLE IF NOT EXISTS pages (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title       VARCHAR(200) NOT NULL,
    slug        VARCHAR(100) UNIQUE NOT NULL,
    content     TEXT,
    is_visible  BOOLEAN DEFAULT TRUE,
    sort_order  INTEGER DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
  );

  -- News & updates
  CREATE TABLE IF NOT EXISTS news (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title        VARCHAR(300) NOT NULL,
    content      TEXT NOT NULL,
    image_url    TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at   TIMESTAMPTZ DEFAULT NOW()
  );

  -- Results (PDF uploads)
  CREATE TABLE IF NOT EXISTS results (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           VARCHAR(300) NOT NULL,
    class_name      VARCHAR(100),
    exam_name       VARCHAR(200),
    result_file_url TEXT,
    description     TEXT,
    is_published    BOOLEAN DEFAULT TRUE,
    published_at    TIMESTAMPTZ DEFAULT NOW(),
    created_at      TIMESTAMPTZ DEFAULT NOW()
  );

  -- Notifications / circulars
  CREATE TABLE IF NOT EXISTS notifications (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title          VARCHAR(300) NOT NULL,
    message        TEXT NOT NULL,
    attachment_url TEXT,
    is_important   BOOLEAN DEFAULT FALSE,
    is_published   BOOLEAN DEFAULT TRUE,
    published_at   TIMESTAMPTZ DEFAULT NOW(),
    created_at     TIMESTAMPTZ DEFAULT NOW()
  );

  -- Events
  CREATE TABLE IF NOT EXISTS events (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title        VARCHAR(300) NOT NULL,
    description  TEXT,
    event_date   DATE NOT NULL,
    location     VARCHAR(200),
    image_url    TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    created_at   TIMESTAMPTZ DEFAULT NOW()
  );

  -- Gallery albums
  CREATE TABLE IF NOT EXISTS gallery_albums (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title       VARCHAR(200) NOT NULL,
    description TEXT,
    cover_url   TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW()
  );

  -- Gallery photos
  CREATE TABLE IF NOT EXISTS gallery_photos (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    album_id    UUID NOT NULL REFERENCES gallery_albums(id) ON DELETE CASCADE,
    image_url   TEXT NOT NULL,
    caption     TEXT,
    sort_order  INTEGER DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW()
  );

  -- Staff / faculty listing
  CREATE TABLE IF NOT EXISTS staff (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name          VARCHAR(200) NOT NULL,
    designation   VARCHAR(150),
    department    VARCHAR(200),
    qualification TEXT,
    photo_url     TEXT,
    email         VARCHAR(255),
    phone         VARCHAR(20),
    sort_order    INTEGER DEFAULT 0,
    is_visible    BOOLEAN DEFAULT TRUE,
    created_at    TIMESTAMPTZ DEFAULT NOW()
  );

  -- Departments
  CREATE TABLE IF NOT EXISTS departments (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(200) NOT NULL,
    description TEXT,
    hod_name    VARCHAR(200),
    image_url   TEXT,
    sort_order  INTEGER DEFAULT 0,
    is_visible  BOOLEAN DEFAULT TRUE
  );

  -- Admissions info
  CREATE TABLE IF NOT EXISTS admissions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academic_year   VARCHAR(50) NOT NULL,
    description     TEXT,
    eligibility     TEXT,
    process         TEXT,
    important_dates JSONB DEFAULT '[]',
    brochure_url    TEXT,
    is_open         BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
  );

  -- Seed default site_settings row
  INSERT INTO site_settings (site_name) VALUES ('My School');
`;
