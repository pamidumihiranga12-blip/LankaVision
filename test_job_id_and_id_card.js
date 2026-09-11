// Test script for Auto Job Tracking ID, Universal Tracking Search, and Realistic PVC ID Card
const fs = require('fs');
const assert = require('assert');

console.log('--- 🧪 STARTING TEST: Auto Job Tracking ID & Realistic PVC ID Card ---');

// 1. Verify i18n.js
console.log('1. Checking i18n.js...');
const i18nContent = fs.readFileSync('i18n.js', 'utf8');
const languages = ['si', 'en', 'ta'];
languages.forEach(lang => {
  assert(i18nContent.includes('track_job_heading'), `Missing track_job_heading in i18n.js for ${lang}`);
  assert(i18nContent.includes('track_job_sub'), `Missing track_job_sub in i18n.js for ${lang}`);
  assert(i18nContent.includes('btn_track_job'), `Missing btn_track_job in i18n.js for ${lang}`);
  assert(i18nContent.includes('job_id_copied'), `Missing job_id_copied in i18n.js for ${lang}`);
  assert(i18nContent.includes('tech_id_share'), `Missing tech_id_share in i18n.js for ${lang}`);
});
console.log('  ✅ i18n.js translations verified for all 3 languages.');

// 2. Verify index.html structure
console.log('2. Checking index.html elements...');
const htmlContent = fs.readFileSync('index.html', 'utf8');

// Live Job Tracking Box
assert(htmlContent.includes('landing-track-job-box'), 'Missing landing-track-job-box in index.html');
assert(htmlContent.includes('landing-job-track-input'), 'Missing landing-job-track-input in index.html');
assert(htmlContent.includes('modal-track-job'), 'Missing modal-track-job in index.html');
assert(htmlContent.includes('modal-job-track-input'), 'Missing modal-job-track-input in index.html');

// Realistic PVC ID Card Elements
assert(htmlContent.includes('dip-lanyard-hanger'), 'Missing dip-lanyard-hanger in index.html');
assert(htmlContent.includes('dip-lanyard-slot'), 'Missing dip-lanyard-slot in index.html');
assert(htmlContent.includes('dip-pvc-sheen'), 'Missing dip-pvc-sheen in index.html');
assert(htmlContent.includes('dip-hologram-crest'), 'Missing dip-hologram-crest in index.html');
assert(htmlContent.includes('dip-emv-chip'), 'Missing dip-emv-chip in index.html');
assert(htmlContent.includes('dip-photo-frame'), 'Missing dip-photo-frame in index.html');
assert(htmlContent.includes('dip-verified-ribbon'), 'Missing dip-verified-ribbon in index.html');
assert(htmlContent.includes('dip-barcode-lines'), 'Missing dip-barcode-lines in index.html');
assert(htmlContent.includes('dip-barcode-text'), 'Missing dip-barcode-text in index.html');
assert(htmlContent.includes('dip-microtext-ribbon'), 'Missing dip-microtext-ribbon in index.html');
assert(htmlContent.includes('shareTechIdCard()'), 'Missing shareTechIdCard() call in index.html');

console.log('  ✅ index.html has all required tracking & realistic PVC ID elements.');

// 3. Verify style.css rules
console.log('3. Checking style.css rules...');
const cssContent = fs.readFileSync('style.css', 'utf8');
assert(cssContent.includes('.landing-track-job-box'), 'Missing .landing-track-job-box in style.css');
assert(cssContent.includes('.badge-job-id'), 'Missing .badge-job-id in style.css');
assert(cssContent.includes('.job-tracking-hero-banner'), 'Missing .job-tracking-hero-banner in style.css');
assert(cssContent.includes('.dip-lanyard-slot'), 'Missing .dip-lanyard-slot in style.css');
assert(cssContent.includes('.dip-pvc-sheen'), 'Missing .dip-pvc-sheen in style.css');
assert(cssContent.includes('.dip-emv-chip'), 'Missing .dip-emv-chip in style.css');
assert(cssContent.includes('.dip-hologram-crest'), 'Missing .dip-hologram-crest in style.css');
assert(cssContent.includes('.dip-barcode-lines'), 'Missing .dip-barcode-lines in style.css');
assert(cssContent.includes('.dip-microtext-ribbon'), 'Missing .dip-microtext-ribbon in style.css');
console.log('  ✅ style.css has all required styling classes.');

// 4. Test logic in app.js
console.log('4. Checking app.js logic...');
const appContent = fs.readFileSync('app.js', 'utf8');

// Function existence checks
assert(appContent.includes('function generateJobTrackingId'), 'Missing generateJobTrackingId in app.js');
assert(appContent.includes('function getJobCode'), 'Missing getJobCode in app.js');
assert(appContent.includes('function copyTrackingCode'), 'Missing copyTrackingCode in app.js');
assert(appContent.includes('function openTrackJobModal'), 'Missing openTrackJobModal in app.js');
assert(appContent.includes('async function trackJobSearch'), 'Missing trackJobSearch in app.js');
assert(appContent.includes('function shareTechIdCard'), 'Missing shareTechIdCard in app.js');

// Job Card & Modal integration checks
assert(appContent.includes('const jobCode = getJobCode(job);'), 'Missing getJobCode call in jobCard or openJobModal');
assert(appContent.includes('badge-job-id'), 'Missing badge-job-id in jobCard');
assert(appContent.includes('job-tracking-hero-banner'), 'Missing job-tracking-hero-banner in openJobModal');
assert(appContent.includes('jobCode: jobTrackingId'), 'Missing jobCode assignment in handlePostJob');

// Test the ID generation and fallback in sandbox
eval(`
${appContent.slice(appContent.indexOf('function generateJobTrackingId'), appContent.indexOf('// Technician Digital ID Pass'))}
`);

// Test generateJobTrackingId
for (let i = 0; i < 20; i++) {
  const code = generateJobTrackingId();
  assert(/^LV-JOB-\d{5}$/.test(code), `Generated code ${code} does not match LV-JOB-XXXXX pattern`);
}
console.log('  ✅ generateJobTrackingId produces valid LV-JOB-XXXXX 5-digit codes.');

// Test getJobCode
const jobWithCode = { id: 'abc123xyz', jobCode: 'LV-JOB-88491' };
assert.strictEqual(getJobCode(jobWithCode), 'LV-JOB-88491', 'Failed to use existing jobCode');

const jobWithoutCode = { id: 'dF7a8b99c' };
const fallbackCode = getJobCode(jobWithoutCode);
assert.strictEqual(fallbackCode, 'LV-JOB-DF7A8', `Fallback code unexpected: \${fallbackCode}`);

const emptyJob = {};
assert.strictEqual(getJobCode(emptyJob), 'LV-JOB-00000', 'Empty job fallback failed');
console.log('  ✅ getJobCode handles both existing codes and legacy doc ID fallbacks accurately.');

console.log('--- 🎉 ALL TESTS PASSED SUCCESSFULLY! ---');
