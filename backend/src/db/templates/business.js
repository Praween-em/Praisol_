/**
 * SQL template for Business/E-commerce site schema.
 * Small home-based sellers — products, cart, guest checkout.
 * @param {string} schema - e.g. 'tenant_biz_abc123'
 */
module.exports = (schema) => `
  SET search_path TO "${schema}";

  -- Admin user (only login)
  CREATE TABLE IF NOT EXISTS admin_users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name          VARCHAR(150) NOT NULL,
    phone         VARCHAR(20) UNIQUE NOT NULL,
    email         VARCHAR(255) UNIQUE,
    password_hash TEXT NOT NULL,
    is_active     BOOLEAN DEFAULT TRUE,
    created_at    TIMESTAMPTZ DEFAULT NOW()
  );

  -- Site / business settings
  CREATE TABLE IF NOT EXISTS site_settings (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_name     VARCHAR(200) NOT NULL DEFAULT 'My Business',
    tagline           VARCHAR(300),
    logo_url          TEXT,
    favicon_url       TEXT,
    contact_email     VARCHAR(255),
    contact_phone     VARCHAR(20),
    contact_whatsapp  VARCHAR(20),
    address           TEXT,
    instagram_url     TEXT,
    facebook_url      TEXT,
    upi_id            VARCHAR(100),
    primary_color     VARCHAR(10) DEFAULT '#7C3AED',
    secondary_color   VARCHAR(10) DEFAULT '#EC4899',
    updated_at        TIMESTAMPTZ DEFAULT NOW()
  );

  -- Product categories
  CREATE TABLE IF NOT EXISTS categories (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(150) NOT NULL,
    image_url   TEXT,
    description TEXT,
    sort_order  INTEGER DEFAULT 0,
    is_visible  BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMPTZ DEFAULT NOW()
  );

  -- Products
  CREATE TABLE IF NOT EXISTS products (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id   UUID REFERENCES categories(id) ON DELETE SET NULL,
    name          VARCHAR(250) NOT NULL,
    description   TEXT,
    price         NUMERIC(10,2) NOT NULL,
    sale_price    NUMERIC(10,2),
    is_in_stock   BOOLEAN DEFAULT TRUE,
    is_visible    BOOLEAN DEFAULT TRUE,
    sort_order    INTEGER DEFAULT 0,
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW()
  );

  -- Product images (multiple per product)
  CREATE TABLE IF NOT EXISTS product_images (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url   TEXT NOT NULL,
    is_primary  BOOLEAN DEFAULT FALSE,
    sort_order  INTEGER DEFAULT 0
  );

  -- Guest orders (no login needed for customers)
  CREATE TABLE IF NOT EXISTS orders (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number     VARCHAR(50) UNIQUE NOT NULL,
    customer_name    VARCHAR(200) NOT NULL,
    customer_phone   VARCHAR(20) NOT NULL,
    customer_email   VARCHAR(255),
    delivery_address TEXT,
    notes            TEXT,
    subtotal         NUMERIC(10,2) NOT NULL,
    delivery_fee     NUMERIC(10,2) DEFAULT 0,
    total            NUMERIC(10,2) NOT NULL,
    payment_method   VARCHAR(50) DEFAULT 'cod',
    payment_status   VARCHAR(30) DEFAULT 'pending' CHECK (payment_status IN ('pending','paid','failed')),
    order_status     VARCHAR(30) DEFAULT 'pending' CHECK (order_status IN ('pending','confirmed','shipped','delivered','cancelled')),
    created_at       TIMESTAMPTZ DEFAULT NOW(),
    updated_at       TIMESTAMPTZ DEFAULT NOW()
  );

  -- Order line items (snapshot prices at time of order)
  CREATE TABLE IF NOT EXISTS order_items (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id     UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id   UUID NOT NULL REFERENCES products(id),
    product_name VARCHAR(250) NOT NULL,
    unit_price   NUMERIC(10,2) NOT NULL,
    quantity     INTEGER NOT NULL,
    total        NUMERIC(10,2) NOT NULL
  );

  -- Announcement banners (offers, notices)
  CREATE TABLE IF NOT EXISTS announcements (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message    TEXT NOT NULL,
    is_active  BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Testimonials / customer reviews (admin-curated)
  CREATE TABLE IF NOT EXISTS testimonials (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name VARCHAR(200) NOT NULL,
    review        TEXT NOT NULL,
    rating        INTEGER CHECK (rating BETWEEN 1 AND 5),
    photo_url     TEXT,
    is_visible    BOOLEAN DEFAULT TRUE,
    created_at    TIMESTAMPTZ DEFAULT NOW()
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
  INSERT INTO site_settings (business_name) VALUES ('My Business');
`;
