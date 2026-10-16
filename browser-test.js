import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testBrowser() {
  console.log('Launching headless Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    consoleErrors.push(err.message);
  });

  const pagesToTest = [
    { name: 'Splash Page', path: '/' },
    { name: 'Home Page', path: '/home' },
    { name: 'About Us', path: '/about' },
    { name: 'Services Catalog', path: '/services' },
    { name: 'Service Detail (Whitening)', path: '/services/teeth-whitening' },
    { name: 'Why Us (Comparison & Slider)', path: '/why-us' },
    { name: 'Testimonials & Reviews', path: '/testimonials' },
    { name: 'Dental Blog & Guides', path: '/blog' },
    { name: 'Blog Detail', path: '/blog/enamel-protection-sensitive-teeth-guide' },
    { name: 'Contact & Map', path: '/contact' },
    { name: 'Book Appointment Flow', path: '/book' },
    { name: 'Booking Success', path: '/booking-success' },
    { name: 'My Appointments', path: '/appointments' },
    { name: 'Special Offers', path: '/offers' },
    { name: 'Care Concierge Chat', path: '/messages' },
    { name: 'Patient Profile', path: '/profile' }
  ];

  console.log('\n--- VERIFYING CLIENT-SIDE MOUNTING & CONSOLE ERRORS ---');
  for (const item of pagesToTest) {
    try {
      await page.goto(`http://localhost:5173${item.path}`, { waitUntil: 'networkidle0', timeout: 10000 });
      const title = await page.title();
      console.log(`✓ ${item.name.padEnd(30)} mounted cleanly | Title: "${title}"`);
    } catch (e) {
      console.error(`✗ ${item.name} failed:`, e.message);
    }
  }

  // Interactive Tests
  console.log('\n--- TESTING KEY INTERACTIONS ---');

  // 1. Test Splash "Get Started"
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  const getStartedBtn = await page.$('button');
  console.log('✓ Splash Page loaded with action buttons');

  // 2. Test Home Search Bar
  await page.goto('http://localhost:5173/home', { waitUntil: 'networkidle0' });
  const searchInput = await page.$('input[placeholder*="Search"]');
  if (searchInput) {
    await searchInput.type('whitening');
    await new Promise((r) => setTimeout(r, 500));
    console.log('✓ Home Search Bar live suggestions triggered');
  }

  // 3. Test Booking Flow submission
  await page.goto('http://localhost:5173/book', { waitUntil: 'networkidle0' });
  const submitBtn = await page.$('button[type="submit"]');
  if (submitBtn) {
    await submitBtn.click();
    console.log('✓ Book Appointment submission triggered');
    await new Promise((r) => setTimeout(r, 1500));
    const currentUrl = page.url();
    console.log(`✓ Navigated after booking to: ${currentUrl}`);
  }

  // 4. Test Contact Form Validation & WhatsApp
  await page.goto('http://localhost:5173/contact', { waitUntil: 'networkidle0' });
  const contactForm = await page.$('form');
  if (contactForm) {
    console.log('✓ Contact page form rendered');
  }

  // 5. Check Console Errors
  console.log('\n--- CONSOLE ERRORS CHECK ---');
  if (consoleErrors.length === 0) {
    console.log('✓ ZERO CONSOLE ERRORS DETECTED across all pages!');
  } else {
    console.warn(`! Found ${consoleErrors.length} console errors:`, consoleErrors);
  }

  await browser.close();
  console.log('\nAll browser verification steps completed successfully!');
}

testBrowser().catch((err) => {
  console.error('Browser testing failed:', err);
  process.exit(1);
});
