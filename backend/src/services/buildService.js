const { pool } = require('../db');

/**
 * Triggers the React Native Expo build process.
 * For now, this simulates the 10-minute EAS cloud build process locally.
 */
async function triggerBuild(buildRecord, deployment) {
  const buildId = buildRecord.id;
  console.log(`[BuildService] Starting ${buildRecord.build_type} build ${buildId} for ${deployment.slug}...`);

  try {
    // 1. Mark as building
    await pool.query(\`UPDATE app_builds SET status = 'building' WHERE id = $1\`, [buildId]);

    // --- SIMULATE GENERATION ---
    // In production, we would:
    // a. copy backend/templates/app-template to a temp dir
    // b. write app.json, eas.json, src/api/client.ts
    // c. spawn `eas build --profile preview --platform android --non-interactive`
    const builderConfig = typeof deployment.builder_config === 'string' 
      ? JSON.parse(deployment.builder_config) 
      : (deployment.builder_config || {});
      
    const primaryColor = builderConfig?.globalSettings?.primaryColor || '#6366f1';
    
    // Simulate app.json generation logging
    console.log(`[BuildService] Generated app.json for ${deployment.slug}:
    Name: ${buildRecord.app_name}
    Bundle ID: com.praisol.${deployment.slug.replace(/-/g, '')}
    API URL: https://api.praisol.online/api
    Tenant ID: ${deployment.id}
    Primary Color: ${primaryColor}
    `);

    // 2. Simulate the 15-second EAS Build Cloud wait time
    console.log(`[BuildService] Queued EAS build. Waiting for completion...`);
    
    // Non-blocking wait
    setTimeout(async () => {
      try {
        console.log(`[BuildService] Build ${buildId} completed successfully!`);
        
        // Mock download URL based on build type
        const ext = buildRecord.build_type === 'apk' ? 'apk' : 'aab';
        const mockUrl = \`https://expo.dev/artifacts/eas/mock_build_\${buildId}.\${ext}\`;
        
        await pool.query(
          \`UPDATE app_builds 
           SET status = 'done', download_url = $1, completed_at = NOW() 
           WHERE id = $2\`,
          [mockUrl, buildId]
        );
      } catch (err) {
        console.error(`[BuildService] Failed to complete simulated build:`, err);
        await pool.query(\`UPDATE app_builds SET status = 'failed' WHERE id = $1\`, [buildId]);
      }
    }, 15000); // 15 seconds simulate

  } catch (error) {
    console.error(`[BuildService] Build initiation failed:`, error);
    await pool.query(\`UPDATE app_builds SET status = 'failed' WHERE id = $1\`, [buildId]);
  }
}

module.exports = {
  triggerBuild
};
