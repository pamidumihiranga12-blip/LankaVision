const fs = require('fs');
const path = require('path');
const http = require('http');

const projectRoot = process.cwd();
const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(projectRoot, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(projectRoot, 'app.js'), 'utf8');
const i18nContent = fs.readFileSync(path.join(projectRoot, 'i18n.js'), 'utf8');

console.log('====================================================');
console.log('🔍 RUNNING COMPREHENSIVE VERIFICATION SUITE (v16 - i18n)');
console.log('====================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`✅ [PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`❌ [FAIL] ${testName}`);
    failCount++;
  }
}

// 1. TRILINGUAL LANGUAGE SUPPORT (SINHALA, ENGLISH, TAMIL)
console.log('--- 1. Trilingual Multi-Language Support (i18n) ---');
assert(fs.existsSync(path.join(projectRoot, 'i18n.js')), 'i18n.js file exists');
assert(html.includes('<script src="i18n.js'), 'index.html imports i18n.js');
assert(html.includes('class="lang-switcher"'), 'Language switcher UI container rendered in index.html');
assert(!html.includes('lang-flag'), 'Strict check: NO flag emojis/containers in language switcher');
assert(html.includes('>English</button>'), 'Clean text button for English present');
assert(html.includes('>සිංහල</button>'), 'Clean text button for Sinhala present');
assert(html.includes('>தமிழ்</button>'), 'Clean text button for Tamil present');
assert(html.includes('Noto+Sans+Sinhala') && html.includes('Noto+Sans+Tamil'), 'Google Fonts Noto Sans Sinhala & Tamil loaded in index.html');
assert(css.includes('Noto Sans Sinhala') && css.includes('Noto Sans Tamil'), 'CSS font-family includes Noto Sans Sinhala & Tamil');
assert(css.includes('.lang-switcher'), 'style.css contains styles for .lang-switcher');
assert(css.includes('.lang-btn.active'), 'style.css contains active button styles');

// Test i18n dictionary contents
const vm = require('vm');
const i18nSandbox = {
  localStorage: {
    data: {},
    getItem(k) { return this.data[k] || null; },
    setItem(k, v) { this.data[k] = v; }
  },
  document: {
    documentElement: {},
    querySelectorAll() { return []; },
    addEventListener() {}
  }
};
vm.createContext(i18nSandbox);
vm.runInContext(i18nContent, i18nSandbox);

const I18N = i18nSandbox.I18N;
assert(!!I18N, 'I18N dictionary object loaded');
assert(!!I18N.si, 'Sinhala (si) language dictionary exists');
assert(!!I18N.en, 'English (en) language dictionary exists');
assert(!!I18N.ta, 'Tamil (ta) language dictionary exists');

// Verify sample keys in each language
assert(I18N.si.btn_post_job === 'Job එකක් දාන්න', 'Sinhala translation for btn_post_job verified');
assert(I18N.en.btn_post_job === 'Post a Job', 'English translation for btn_post_job verified');
assert(I18N.ta.btn_post_job === 'வேலையை பதிவு செய்க', 'Tamil translation for btn_post_job verified');

// Test t() and setLanguage()
const t = i18nSandbox.t;
const setLanguage = i18nSandbox.setLanguage;
assert(typeof t === 'function', 't(key) translation function exists');
assert(typeof setLanguage === 'function', 'setLanguage(lang) function exists');

setLanguage('si');
assert(t('btn_login') === 'Login වන්න', 't() returns Sinhala string when active');
setLanguage('en');
assert(t('btn_login') === 'Login', 't() returns English string when active');
setLanguage('ta');
assert(t('btn_login') === 'உள்நுழைக', 't() returns Tamil string when active');

// Verify default language is English (en)
assert(i18nContent.includes("localStorage.getItem('app_lang') || 'en'"), "Default language falls back to 'en'");

// Verify admin panel keys
assert(!!I18N.si.admin_panel_title && !!I18N.en.admin_panel_title && !!I18N.ta.admin_panel_title, 'Admin panel title translated in all 3 languages');
assert(!!I18N.si.adm_tab_overview && !!I18N.en.adm_tab_overview && !!I18N.ta.adm_tab_overview, 'Admin tabs translated in all 3 languages');
assert(!!I18N.si.adm_stat_pending_techs && !!I18N.en.adm_stat_pending_techs && !!I18N.ta.adm_stat_pending_techs, 'Admin stats translated in all 3 languages');
assert(html.includes('data-i18n="admin_panel_title"'), 'index.html: Admin Panel nav brand has data-i18n');
assert(html.includes('data-i18n="adm_tab_overview"'), 'index.html: Admin Overview tab has data-i18n');
assert(html.includes('data-i18n="adm_stat_pending_techs"'), 'index.html: Admin pending techs stat has data-i18n');
assert(html.includes('data-i18n="adm_recent_jobs"'), 'index.html: Admin recent jobs heading has data-i18n');

assert(js.includes('onLanguageChanged'), 'app.js: onLanguageChanged listener defined');
assert(js.includes("isAdminActive"), 'app.js: onLanguageChanged handles admin screen');

// 2. TECHNICIAN LIVE SELFIE ON REGISTRATION (NO GALLERY UPLOAD)
console.log('\n--- 2. Technician Live Selfie Registration ---');
assert(html.includes('id="reg-tech-form"'), 'Technician registration form exists');
assert(html.includes('id="tech-selfie-box"'), 'Live selfie container exists');
assert(html.includes('id="tech-selfie-video"'), 'Live selfie video element exists');
assert(html.includes('id="tech-selfie-canvas"'), 'Live selfie canvas exists');
assert(html.includes('id="tech-selfie-preview-img"'), 'Live selfie preview image exists');

const techFormMatch = html.match(/<div id="reg-tech-form"[\s\S]*?<\/form>/);
const formHasFileInput = techFormMatch ? techFormMatch[0].includes('type="file"') : false;
assert(!formHasFileInput, 'Strict check: NO <input type="file"> in technician registration form (Gallery upload blocked)');

assert(js.includes('startTechCamera'), 'app.js: startTechCamera function exists');
assert(js.includes('stopTechCamera'), 'app.js: stopTechCamera function exists');
assert(js.includes('captureTechSelfie'), 'app.js: captureTechSelfie function exists');
assert(js.includes('retakeTechSelfie'), 'app.js: retakeTechSelfie function exists');
assert(js.includes('photoUrl: capturedTechSelfieDataUrl'), 'app.js: live selfie saved to technician profile');

// 3. CUSTOMER VIEW OF TECHNICIAN PHOTO
console.log('\n--- 3. Customer View of Technician Photo ---');
assert(html.includes('id="modal-photo-preview"'), 'Photo preview lightbox modal exists in index.html');
assert(html.includes('id="modal-photo-img"'), 'Photo preview img element exists in index.html');
assert(js.includes('previewPhoto'), 'app.js: previewPhoto lightbox viewer function exists');
assert(js.includes('claimedByPhoto'), 'app.js: job stores claimedByPhoto on claim');
assert(js.includes('assignedTechCardHtml'), 'app.js: assigned technician card rendered for customer');
assert(js.includes('techCardModalHtml'), 'app.js: technician photo card rendered in job details modal');

// 4. WORK COMPLETION LIVE CAMERA PROOF (NO GALLERY UPLOAD)
console.log('\n--- 4. Work Completion Live Camera Proof ---');
assert(html.includes('id="modal-complete-job"'), 'Work completion modal exists in index.html');
assert(html.includes('id="work-proof-video"'), 'Work proof live video element exists');
assert(html.includes('id="work-proof-canvas"'), 'Work proof canvas exists');
assert(html.includes('id="work-proof-preview-img"'), 'Work proof preview image exists');
assert(html.includes('switchWorkCamera()'), 'Camera switch control (rear/front) exists');

const completionModalMatch = html.match(/<div id="modal-complete-job"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
const modalHasFileInput = completionModalMatch ? completionModalMatch[0].includes('type="file"') : false;
assert(!modalHasFileInput, 'Strict check: NO <input type="file"> in work completion modal (Gallery upload blocked)');

assert(js.includes('openCompleteJobModal'), 'app.js: openCompleteJobModal function exists');
assert(js.includes('startWorkCamera'), 'app.js: startWorkCamera function exists');
assert(js.includes('stopWorkCamera'), 'app.js: stopWorkCamera function exists');
assert(js.includes('switchWorkCamera'), 'app.js: switchWorkCamera function exists');
assert(js.includes('captureWorkProof'), 'app.js: captureWorkProof function exists');
assert(js.includes('retakeWorkProof'), 'app.js: retakeWorkProof function exists');
assert(js.includes('confirmJobCompletion'), 'app.js: confirmJobCompletion function exists');
assert(js.includes('completionPhoto: capturedWorkPhotoDataUrl'), 'app.js: completion photo saved to job doc');

// 5. CUSTOMER COMPLETION EMAIL WITH WORK PHOTO
console.log('\n--- 5. Customer Completion Email Notification ---');
assert(js.includes('notifyJobCompleted'), 'app.js: notifyJobCompleted function exists');
assert(js.includes('job.completionPhoto'), 'app.js: completion photo embedded in completion email');
assert(js.includes('Job Completed:'), 'app.js: Completion email subject line defined');

// 6. 5-STAR RATING & FEEDBACK SYSTEM
console.log('\n--- 6. 5-Star Rating & Feedback System ---');
assert(html.includes('id="modal-feedback"'), 'Customer feedback modal exists in index.html');
assert(html.includes('id="star-picker"'), '5-Star picker container exists in index.html');
assert(html.includes('id="feedback-comment"'), 'Feedback comment textarea exists in index.html');
assert(js.includes('openFeedbackModal'), 'app.js: openFeedbackModal function exists');
assert(js.includes('setStarRating'), 'app.js: setStarRating function exists');
assert(js.includes('previewStars'), 'app.js: previewStars function exists');
assert(js.includes('submitFeedback'), 'app.js: submitFeedback function exists');
assert(js.includes('avgRating: Number(newAvg)'), 'app.js: average rating recalculated and updated on technician profile');

// 7. SHOWING TECHNICIAN AVERAGE STAR RATING TO CUSTOMERS
console.log('\n--- 7. Showing Star Rating Out of 5 to Customers ---');
assert(js.includes('renderStarRating'), 'app.js: renderStarRating helper exists');
assert(js.includes('claimedByRating: techRating'), 'app.js: claimJob stores technician rating on job');
assert(js.includes('claimedByRatingCount: techRatingCount'), 'app.js: claimJob stores technician rating count on job');
assert(css.includes('.star-rating-badge'), 'style.css: .star-rating-badge styled');
assert(css.includes('.star-picker'), 'style.css: .star-picker styled');
assert(css.includes('.customer-review-card'), 'style.css: .customer-review-card styled');

// 8. MANDATORY LIVE SELFIE ENFORCEMENT FOR EXISTING TECHNICIANS
console.log('\n--- 8. Mandatory Live Selfie for Existing Technicians ---');
assert(html.includes('id="modal-mandatory-selfie"'), 'Mandatory selfie modal exists in index.html');
assert(html.includes('id="mandatory-selfie-video"'), 'Mandatory selfie live video element exists');
assert(html.includes('id="mandatory-selfie-canvas"'), 'Mandatory selfie canvas exists');
assert(html.includes('id="mandatory-selfie-preview-img"'), 'Mandatory selfie preview image exists');

const mandatoryModalMatch = html.match(/<div id="modal-mandatory-selfie"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
const mandatoryHasFileInput = mandatoryModalMatch ? mandatoryModalMatch[0].includes('type="file"') : false;
assert(!mandatoryHasFileInput, 'Strict check: NO <input type="file"> in mandatory selfie modal (Gallery upload blocked)');

const mandatoryHasCloseBtn = mandatoryModalMatch ? mandatoryModalMatch[0].includes('modal-close') : false;
assert(!mandatoryHasCloseBtn, 'Strict check: NO close button in mandatory selfie modal (Non-dismissible)');

assert(js.includes('promptMandatoryTechSelfie'), 'app.js: promptMandatoryTechSelfie function exists');
assert(js.includes('startMandatoryCamera'), 'app.js: startMandatoryCamera function exists');
assert(js.includes('stopMandatoryCamera'), 'app.js: stopMandatoryCamera function exists');
assert(js.includes('switchMandatoryCamera'), 'app.js: switchMandatoryCamera function exists');
assert(js.includes('captureMandatorySelfie'), 'app.js: captureMandatorySelfie function exists');
assert(js.includes('retakeMandatorySelfie'), 'app.js: retakeMandatorySelfie function exists');
assert(js.includes('saveMandatorySelfie'), 'app.js: saveMandatorySelfie function exists');
assert(js.includes('if (!currentUserData.photoUrl)'), 'app.js: loadUserData checks missing photoUrl for technicians');
assert(js.includes('currentUserData.role === \'technician\' && !currentUserData.photoUrl'), 'app.js: claimJob blocks claims if photoUrl missing');

// 9. HTTP SERVER HEALTH CHECK
console.log('\n--- 9. HTTP Server Health Check ---');
const req = http.get('http://localhost:8080/index.html', (res) => {
  assert(res.statusCode === 200, `Local HTTP server is responding with status 200 OK (got ${res.statusCode})`);
  
  console.log('\n====================================================');
  console.log(`TEST SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
  console.log('====================================================');
  
  if (failCount > 0) {
    process.exit(1);
  } else {
    console.log('🎉 ALL SYSTEM TESTS PASSED PERFECTLY!');
    process.exit(0);
  }
});

req.on('error', (err) => {
  assert(false, `Local HTTP server connection error: ${err.message}`);
  process.exit(1);
});
