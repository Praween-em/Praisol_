require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const { pool } = require('./index');

/**
 * Platform DB migration — creates all public-schema tables.
 * Run once to bootstrap the platform database.
 */
const PLATFORM_MIGRATION = `
-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Platform users (business/school/college owners who build on our platform)
CREATE TABLE IF NOT EXISTS platform_users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR(150),
  email         VARCHAR(255) UNIQUE,
  phone         VARCHAR(20) UNIQUE NOT NULL,
  password_hash TEXT,
  is_verified   BOOLEAN DEFAULT FALSE,
  avatar_url    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- OTP tokens (for phone-based login)
CREATE TABLE IF NOT EXISTS otp_tokens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier  VARCHAR(255) NOT NULL,
  otp_code    VARCHAR(10) NOT NULL,
  purpose     VARCHAR(50) NOT NULL,
  expires_at  TIMESTAMPTZ NOT NULL,
  used        BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_otp_identifier ON otp_tokens(identifier);

-- Refresh tokens
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES platform_users(id) ON DELETE CASCADE,
  token_hash  TEXT NOT NULL,
  expires_at  TIMESTAMPTZ NOT NULL,
  revoked     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Deployed sites
CREATE TABLE IF NOT EXISTS deployments (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES platform_users(id) ON DELETE CASCADE,
  system_type    VARCHAR(30) NOT NULL CHECK (system_type IN ('school', 'college', 'business')),
  name           VARCHAR(200) NOT NULL,
  slug           VARCHAR(100) UNIQUE NOT NULL,
  schema_name    VARCHAR(100) UNIQUE NOT NULL,
  status         VARCHAR(30) DEFAULT 'building' CHECK (status IN ('building', 'active', 'suspended', 'deleted')),
  custom_domain  VARCHAR(255),
  builder_config JSONB DEFAULT '{}',
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_deployments_user ON deployments(user_id);
CREATE INDEX IF NOT EXISTS idx_deployments_slug ON deployments(slug);

-- Subscription plans
CREATE TABLE IF NOT EXISTS plans (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name      VARCHAR(100) NOT NULL,
  price_inr NUMERIC(10,2) NOT NULL DEFAULT 0,
  features  JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deployment_id UUID NOT NULL REFERENCES deployments(id) ON DELETE CASCADE,
  plan_id       UUID NOT NULL REFERENCES plans(id),
  status        VARCHAR(30) DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'cancelled')),
  started_at    TIMESTAMPTZ DEFAULT NOW(),
  renews_at     TIMESTAMPTZ,
  cancelled_at  TIMESTAMPTZ
);

-- Payment records
CREATE TABLE IF NOT EXISTS payments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL REFERENCES subscriptions(id),
  amount          NUMERIC(10,2) NOT NULL,
  currency        VARCHAR(10) DEFAULT 'INR',
  gateway         VARCHAR(50),
  gateway_txn_id  TEXT,
  status          VARCHAR(30) CHECK (status IN ('success', 'failed', 'pending')),
  paid_at         TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Android app build history
CREATE TABLE IF NOT EXISTS app_builds (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deployment_id UUID NOT NULL REFERENCES deployments(id) ON DELETE CASCADE,
  build_type    VARCHAR(10) NOT NULL CHECK (build_type IN ('apk', 'aab')),
  status        VARCHAR(30) DEFAULT 'queued' CHECK (status IN ('queued', 'building', 'done', 'failed')),
  download_url  TEXT,
  app_name      VARCHAR(200),
  app_version   VARCHAR(50),
  build_log     TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  completed_at  TIMESTAMPTZ
);

-- Seed default plans
INSERT INTO plans (name, price_inr, features) VALUES
  ('free', 0, '{"max_deployments":1,"custom_domain":false,"storage_gb":1}'),
  ('basic', 299, '{"max_deployments":3,"custom_domain":false,"storage_gb":5}'),
  ('pro', 799, '{"max_deployments":10,"custom_domain":true,"storage_gb":20}')
ON CONFLICT DO NOTHING;
`;

async function migrate() {
  const client = await pool.connect();
  try {
    console.log('🔄 Running platform database migration...');
    await client.query(PLATFORM_MIGRATION);
    console.log('✅ Platform migration complete.');
  } catch (e) {
    console.error('❌ Migration failed:', e.message);
    throw e;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch(() => process.exit(1));
