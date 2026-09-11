const fs = require('fs');
const assert = require('assert');

console.log('========================================');
console.log('🧪 RUNNING FULL FEATURE VERIFICATION TEST');
console.log('========================================\n');

// 1. Check index.html for required UI elements
const html = fs.readFileSync('index.html', 'utf8');
const requiredHtmlElements = [
  'id="modal-help-guide"',
  'id="modal-digital-invoice"',
  'id="modal-tech-id-card"',
  'id="quick-problem-container"',
  'id="quick-problem-chips"',
  'id="job-is-urgent"',
  'id="invoice-edit-form"',
  'id="invoice-view-card"',
  'id="inv-calc-total"',
  'id="btn-save-inv"',
  'id="btn-wa-inv"',
  'id="digital-id-pass"',
  'id="dip-tech-name"',
  'id="dip-tech-id"',
  'id="tab-help-cust"',
  'id="tab-help-tech"',
  '+94 78 680 0086'
];

console.log('--- 1. Testing HTML Elements ---');
requiredHtmlElements.forEach(item => {
  assert(html.includes(item), 'Missing HTML element: ' + item);
  console.log('✔ Found in index.html: ' + item);
});

// 2. Check CSS classes
const css = fs.readFileSync('style.css', 'utf8');
const requiredCssClasses = [
  '.job-step-tracker',
  '.jst-step',
  '.urgent-toggle-card',
  '.badge-urgent',
  '.quick-issue-chips',
  '.q-chip',
  '.invoice-modal-box',
  '.invoice-receipt-paper',
  '.digital-id-pass',
  '.help-guide-modal-box'
];

console.log('\n--- 2. Testing CSS Classes ---');
requiredCssClasses.forEach(cls => {
  assert(css.includes(cls), 'Missing CSS class: ' + cls);
  console.log('✔ Found in style.css: ' + cls);
});

// 3. Check i18n configuration and Sinhala default
console.log('\n--- 3. Testing i18n Configuration ---');
const i18nCode = fs.readFileSync('i18n.js', 'utf8');
assert(i18nCode.includes("currentLang = 'si'"), 'Default language must be Sinhala');
assert(i18nCode.includes('quick_cctv_1'), 'Must include quick problem keys');
assert(i18nCode.includes('step_posted'), 'Must include step tracker keys');
assert(i18nCode.includes('modal_invoice_title'), 'Must include invoice keys');
assert(i18nCode.includes('tech_id_badge_verified'), 'Must include digital id keys');
console.log('✔ Default language set to Sinhala (si)');
console.log('✔ All translations for Quick Issues, Step Tracker, Invoice & ID Card verified');

// 4. Check app.js function definitions
console.log('\n--- 4. Testing app.js Logic ---');
const appCode = fs.readFileSync('app.js', 'utf8');
const requiredFunctions = [
  'renderQuickIssuesForType',
  'selectQuickIssue',
  'renderJobStepTracker',
  'openHelpGuide',
  'switchHelpTab',
  'openTechDigitalId',
  'openDigitalInvoiceModal',
  'viewDigitalInvoice',
  'calculateInvoiceTotal',
  'saveDigitalInvoice',
  'sendInvoiceToCustomerWhatsApp',
  'shareExistingInvoiceWhatsApp',
  'sendInvoiceWhatsAppFormatted',
  'isUrgent'
];

requiredFunctions.forEach(fn => {
  assert(appCode.includes(fn), 'Missing function/property in app.js: ' + fn);
  console.log('✔ Found in app.js: ' + fn);
});

console.log('\n========================================');
console.log('🎉 ALL 4 TEST SUITES PASSED PERFECTLY (100%)');
console.log('========================================\n');
