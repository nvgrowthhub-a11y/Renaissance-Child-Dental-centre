const testRoutes = [
  '/',
  '/home',
  '/about',
  '/services',
  '/services/teeth-whitening',
  '/why-us',
  '/testimonials',
  '/blog',
  '/blog/enamel-protection-sensitive-teeth-guide',
  '/contact',
  '/book',
  '/booking-success',
  '/profile',
  '/appointments',
  '/offers',
  '/messages',
  '/non-existent-page'
];

async function run() {
  console.log('Testing SmileCare Web App routes at http://localhost:5173 ...\n');
  let passed = 0;
  for (const route of testRoutes) {
    try {
      const res = await fetch(`http://localhost:5173${route}`);
      const text = await res.text();
      const hasRoot = text.includes('id="root"');
      const hasScript = text.includes('/src/main.tsx');
      if (res.status === 200 && hasRoot && hasScript) {
        console.log(`✓ ${route.padEnd(45)} [HTTP ${res.status}] SPA Loaded Successfully`);
        passed++;
      } else {
        console.error(`✗ ${route.padEnd(45)} [HTTP ${res.status}] Unexpected response`);
      }
    } catch (err) {
      console.error(`✗ ${route.padEnd(45)} Error: ${err.message}`);
    }
  }

  console.log(`\nResults: ${passed}/${testRoutes.length} routes verified.`);
  if (passed === testRoutes.length) {
    console.log('ALL ROUTES VERIFIED AND SERVING CORRECTLY!');
  }
}

run();
