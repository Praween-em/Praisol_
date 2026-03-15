/**
 * SQL template for College website schema.
 * @param {string} schema - e.g. 'tenant_col_abc123'
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
    site_name        VARCHAR(200) NOT NULL DEFAULT 'My College',
    tagline          VARCHAR(300),
    logo_url         TEXT,
    favicon_url      TEXT,
    contact_email    VARCHAR(255),
    contact_phone    VARCHAR(20),
    address          TEXT,
    facebook_url     TEXT,
    twitter_url      TEXT,
    youtube_url      TEXT,
    primary_color    VARCHAR(10) DEFAULT '#7C3AED',
    secondary_color  VARCHAR(10) DEFAULT '#6366F1',
    updated_at       TIMESTAMPTZ DEFAULT NOW()
  );

  -- Pages
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

  -- News
  CREATE TABLE IF NOT EXISTS news (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title        VARCHAR(300) NOT NULL,
    content      TEXT NOT NULL,
    image_url    TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at   TIMESTAMPTZ DEFAULT NOW()
  );

  -- Results (PDF uploads per semester/program)
  CREATE TABLE IF NOT EXISTS results (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           VARCHAR(300) NOT NULL,
    program_name    VARCHAR(250),
    semester        VARCHAR(50),
    result_file_url TEXT,
    is_published    BOOLEAN DEFAULT TRUE,
    published_at    TIMESTAMPTZ DEFAULT NOW(),
    created_at      TIMESTAMPTZ DEFAULT NOW()
  );

  -- Notifications
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

  -- Faculty / staff
  CREATE TABLE IF NOT EXISTS staff (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name          VARCHAR(200) NOT NULL,
    designation   VARCHAR(150),
    department    VARCHAR(200),
    qualification TEXT,
    photo_url     TEXT,
    email         VARCHAR(255),
    sort_order    INTEGER DEFAULT 0,
    is_visible    BOOLEAN DEFAULT TRUE,
    created_at    TIMESTAMPTZ DEFAULT NOW()
  );

  -- Departments
  CREATE TABLE IF NOT EXISTS departments (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(200) NOT NULL,
    code        VARCHAR(20),
    description TEXT,
    hod_name    VARCHAR(200),
    image_url   TEXT,
    sort_order  INTEGER DEFAULT 0,
    is_visible  BOOLEAN DEFAULT TRUE
  );

  -- Programs offered (B.Tech, MBA, etc.)
  CREATE TABLE IF NOT EXISTS programs (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    name          VARCHAR(250) NOT NULL,
    degree_type   VARCHAR(50),
    duration      VARCHAR(50),
    eligibility   TEXT,
    description   TEXT,
    brochure_url  TEXT,
    is_visible    BOOLEAN DEFAULT TRUE,
    sort_order    INTEGER DEFAULT 0
  );

  -- Admissions
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

  -- Placements
  CREATE TABLE IF NOT EXISTS placements (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academic_year    VARCHAR(50) NOT NULL,
    company_name     VARCHAR(200) NOT NULL,
    company_logo_url TEXT,
    package_lpa      NUMERIC(6,2),
    students_placed  INTEGER,
    description      TEXT,
    created_at       TIMESTAMPTZ DEFAULT NOW()
  );

  -- Research / publications
  CREATE TABLE IF NOT EXISTS research (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title      VARCHAR(400) NOT NULL,
    authors    TEXT,
    journal    VARCHAR(300),
    year       INTEGER,
    link       TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Achievements
  CREATE TABLE IF NOT EXISTS achievements (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title        VARCHAR(300) NOT NULL,
    description  TEXT,
    date         DATE,
    image_url    TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    created_at   TIMESTAMPTZ DEFAULT NOW()
  );

  -- Accreditation (NAAC, NBA, NIRF)
  CREATE TABLE IF NOT EXISTS accreditation (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    body            VARCHAR(200) NOT NULL,
    grade           VARCHAR(50),
    score           VARCHAR(50),
    valid_until     DATE,
    certificate_url TEXT,
    updated_at      TIMESTAMPTZ DEFAULT NOW()
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

  -- Seed default site_settings
  INSERT INTO site_settings (site_name) VALUES ('My College');
`;
