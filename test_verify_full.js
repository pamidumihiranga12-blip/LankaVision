// Comprehensive verification test for LankaVision Pro features
const fs = require('fs');
const path = require('path');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    testsPassed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    testsFailed++;
  }
}

console.log('========================================================');
console.log('🧪 RUNNING COMPREHENSIVE VERIFICATION SUITE');
console.log('========================================================\n');

// 1. Check i18n translation keys
console.log('🔹 Test 1: i18n Keys Across Languages (si, en, ta)');
const i18nSandbox = {};
const i18nFileContent = fs.readFileSync('i18n.js', 'utf8');
const vm = require('vm');
const context = {
  window: { localStorage: { getItem: () => 'si', setItem: () => {} } },
  localStorage: { getItem: () => 'si', setItem: () => {} },
  document: { documentElement: { lang: 'si', dir: 'ltr' }, querySelectorAll: () => [] }
};
vm.createContext(context);
i18nSandbox.I18N = vm.runInContext(i18nFileContent + '\n;({ si: I18N.si, en: I18N.en, ta: I18N.ta })', context);

const requiredI18nKeys = [
  'svc_router',
  'job_type_router',
  'adm_tab_customers',
  'adm_tech_loc_search_title',
  'adm_tech_loc_search_placeholder',
  'active_job_lock_title',
  'active_job_lock_warning',
  'btn_add_router',
  'btn_not_now',
  'router_prompt_title',
  'router_prompt_desc'
];

['si', 'en', 'ta'].forEach(lang => {
  const dict = i18nSandbox.I18N[lang];
  requiredI18nKeys.forEach(k => {
    assert(dict && dict[k] !== undefined, `i18n key "${k}" is defined in "${lang}"`);
  });
});

// 2. Check HTML elements
console.log('\n🔹 Test 2: HTML Structure & Required Elements in index.html');
const html = fs.readFileSync('index.html', 'utf8');
const appJsContent = fs.readFileSync('app.js', 'utf8');
assert(html.includes('id="adm-tech-loc-search"'), 'Technician location search input present');
assert(html.includes('id="adm-tech-radius"'), 'Technician radius selector present (36km default)');
assert(html.includes('id="adm-tech-city-list"'), 'Admin city datalist present');
assert(html.includes('id="adm-tech-loc-banner"'), 'Admin location filter banner present');
assert(html.includes('id="atab-customers"'), 'Customers admin tab container present');
assert(html.includes('id="adm-cust-search"'), 'Customer search input present');
assert(html.includes('id="total-cust-count"'), 'Customer total count element present');
assert(html.includes('id="cust-count"'), 'Customer tab badge count present');
assert(html.includes('id="customers-list"'), 'Customers list container present');
assert(html.includes('name="tech-svc-opt" value="Router"'), 'Registration Router checkbox present');
assert(html.includes('name="edit-tech-svc-opt" value="Router"'), 'Edit tech Router checkbox present');
assert(html.includes('name="job-type" value="Router"'), 'Job post Router radio present');
assert(html.includes('name="edit-job-type" value="Router"'), 'Job edit Router radio present');
assert(appJsContent.includes('id="banner-router-upgrade"'), 'Router upgrade banner logic present in app.js');

// 3. Check CSS rules
console.log('\n🔹 Test 3: CSS Classes & Styles in style.css');
const css = fs.readFileSync('style.css', 'utf8');
assert(css.includes('.type-badge.Router'), '.type-badge.Router defined');
assert(css.includes('.job-marker-pin.marker-router'), '.marker-router pin styling defined');
assert(css.includes('.job-marker-pin.marker-satellite'), '.marker-satellite pin styling defined');
assert(css.includes('.job-marker-pin.marker-cctv'), '.marker-cctv pin styling defined');
assert(css.includes('.job-marker-pin.marker-tech'), '.marker-tech pin beacon defined');
assert(css.includes('.job-marker-pin.marker-pick'), '.marker-pick location pin defined');
assert(css.includes('.customer-card'), '.customer-card styling defined');
assert(css.includes('.active-job-lock-banner'), '.active-job-lock-banner styling defined');
assert(css.includes('.router-upgrade-banner'), '.router-upgrade-banner styling defined');

// Check Map Marker Icons in openJobModal & initPostJobMap
assert(appJsContent.includes('job-marker-pin ${markerClass}'), 'openJobModal uses custom divIcon pin with markerClass');
assert(appJsContent.includes('marker-pick'), 'initPostJobMap uses custom marker-pick pin');
assert(appJsContent.includes('L.Icon.Default.mergeOptions'), 'Leaflet icon CDN fallback configured');

// 4. Test Logic from app.js in sandbox
console.log('\n🔹 Test 4: Business Logic & Distance Formulas from app.js');
// Evaluate relevant functions
const appCode = fs.readFileSync('app.js', 'utf8');

// Extract CITY_COORDS, DISTRICT_COORDS, calcDistanceKm, getTechServices, techProvidesService, resolveLocationCoords
const testEnv = {};
const sandboxCode = `
  ${appCode.match(/const SL_DISTRICTS = \[[\s\S]*?\];/)[0]}
  ${appCode.match(/const DISTRICT_COORDS = \{[\s\S]*?\};/)[0]}
  ${appCode.match(/const DISTRICT_CITIES = \{[\s\S]*?\};/)[0]}
  ${appCode.match(/const CITY_COORDS = \{[\s\S]*?\};/)[0]}
  ${appCode.match(/function calcDistanceKm[\s\S]*?\n\}/)[0]}
  ${appCode.match(/function getTechServices[\s\S]*?\n\}/)[0]}
  ${appCode.match(/function techProvidesService[\s\S]*?\n\}/)[0]}
  ${appCode.match(/function resolveLocationCoords[\s\S]*?\n\}/)[0]}

  testEnv.SL_DISTRICTS = SL_DISTRICTS;
  testEnv.DISTRICT_COORDS = DISTRICT_COORDS;
  testEnv.CITY_COORDS = CITY_COORDS;
  testEnv.calcDistanceKm = calcDistanceKm;
  testEnv.getTechServices = getTechServices;
  testEnv.techProvidesService = techProvidesService;
  testEnv.resolveLocationCoords = resolveLocationCoords;
`;

eval(sandboxCode);

// Multi-service testing
const techAll = { services: ['CCTV', 'Satellite', 'Router'] };
const techBothLegacy = { serviceType: 'Both' };
const techRouterOnly = { services: ['Router'] };
const techCctvRouter = { serviceType: 'CCTV, Router' };

assert(testEnv.getTechServices(techAll).length === 3, 'techAll provides 3 services');
assert(testEnv.techProvidesService(techAll, 'CCTV'), 'techAll provides CCTV');
assert(testEnv.techProvidesService(techAll, 'Satellite'), 'techAll provides Satellite');
assert(testEnv.techProvidesService(techAll, 'Router'), 'techAll provides Router');

assert(testEnv.techProvidesService(techBothLegacy, 'CCTV'), 'Legacy Both provides CCTV');
assert(testEnv.techProvidesService(techBothLegacy, 'Satellite'), 'Legacy Both provides Satellite');
assert(!testEnv.techProvidesService(techBothLegacy, 'Router'), 'Legacy Both does not provide Router');

assert(testEnv.techProvidesService(techRouterOnly, 'Router'), 'Router tech provides Router');
assert(!testEnv.techProvidesService(techRouterOnly, 'CCTV'), 'Router tech does not provide CCTV');

assert(testEnv.techProvidesService(techCctvRouter, 'CCTV'), 'CCTV+Router provides CCTV');
assert(testEnv.techProvidesService(techCctvRouter, 'Router'), 'CCTV+Router provides Router');
assert(!testEnv.techProvidesService(techCctvRouter, 'Satellite'), 'CCTV+Router does not provide Satellite');

// 36 km Radius & Coordinate Distance testing
console.log('\n🔹 Test 5: 36 km Radius Search Coordinates');
const padaviya = testEnv.CITY_COORDS['Padaviya'];
const kebithigollewa = testEnv.CITY_COORDS['Kebithigollewa'];
const colombo = testEnv.DISTRICT_COORDS['Colombo'];
const kekirawa = testEnv.CITY_COORDS['Kekirawa'];
const dambulla = testEnv.CITY_COORDS['Dambulla'];

assert(padaviya != null, 'Padaviya coordinates exist');
assert(kekirawa != null, 'Kekirawa coordinates exist');

const distPadaviyaToKebithigollewa = testEnv.calcDistanceKm(padaviya[0], padaviya[1], kebithigollewa[0], kebithigollewa[1]);
console.log(`    Distance Padaviya -> Kebithigollewa: ${distPadaviyaToKebithigollewa} km`);
assert(distPadaviyaToKebithigollewa <= 36, 'Kebithigollewa is within 36 km of Padaviya');

const distPadaviyaToColombo = testEnv.calcDistanceKm(padaviya[0], padaviya[1], colombo[0], colombo[1]);
console.log(`    Distance Padaviya -> Colombo: ${distPadaviyaToColombo} km`);
assert(distPadaviyaToColombo > 36, 'Colombo is outside 36 km of Padaviya');

const distKekirawaToDambulla = testEnv.calcDistanceKm(kekirawa[0], kekirawa[1], dambulla[0], dambulla[1]);
console.log(`    Distance Kekirawa -> Dambulla: ${distKekirawaToDambulla} km`);
assert(distKekirawaToDambulla <= 36, 'Dambulla is within 36 km of Kekirawa');

// Location resolution testing
const resPadaviya = testEnv.resolveLocationCoords('padaviya');
assert(resPadaviya && resPadaviya.name === 'Padaviya', 'Resolves "padaviya" (lowercase) correctly');

const resKekirawa = testEnv.resolveLocationCoords('  Kekirawa  ');
assert(resKekirawa && resKekirawa.name === 'Kekirawa', 'Resolves "  Kekirawa  " with whitespace correctly');

const resNonExistent = testEnv.resolveLocationCoords('FakeCityXYZ99');
assert(resNonExistent === null, 'Returns null for non-existent city');

console.log('\n========================================================');
console.log(`RESULTS: ${testsPassed} Passed, ${testsFailed} Failed`);
console.log('========================================================');

if (testsFailed > 0) {
  process.exit(1);
}
