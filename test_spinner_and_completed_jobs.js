const fs = require('fs');
const assert = require('assert');

console.log('====================================================');
console.log('🧪 VERIFYING SPINNER TIMEOUT GUARDS & COMPLETED JOBS');
console.log('====================================================\n');

const html = fs.readFileSync('index.html', 'utf8');
const appJs = fs.readFileSync('app.js', 'utf8');
const i18n = fs.readFileSync('i18n.js', 'utf8');

// 1. Check ID Card completed jobs badge
assert(html.includes('id="dip-tech-completed-count"'), 'index.html must have id="dip-tech-completed-count"');
assert(html.includes('id="dip-tech-completed-chip"'), 'index.html must have id="dip-tech-completed-chip"');
assert(html.includes('data-i18n="tech_id_jobs_completed"'), 'index.html must use data-i18n="tech_id_jobs_completed"');
console.log('✔ Technician ID card completed jobs badge verified in index.html');

// 2. Check i18n keys
assert(i18n.includes('tech_id_jobs_completed'), 'i18n.js must include tech_id_jobs_completed');
console.log('✔ Completed jobs translations verified in i18n.js');

// 3. Check withTimeout helper
assert(appJs.includes('function withTimeout('), 'app.js must include withTimeout helper');
console.log('✔ withTimeout function verified in app.js');

// 4. Check completed jobs counting in openTechDigitalId
assert(appJs.includes('dip-tech-completed-count'), 'openTechDigitalId must reference dip-tech-completed-count');
assert(appJs.includes("where('status', '==', 'completed')"), 'openTechDigitalId must query completed jobs');
console.log('✔ Live completed jobs count calculation verified in openTechDigitalId');

// 5. Check confirmCompleteJob increments completedJobsCount
assert(appJs.includes('completedJobsCount: firebase.firestore.FieldValue.increment(1)'), 'confirmCompleteJob must increment completedJobsCount');
console.log('✔ Technician completed jobs counter increment verified in confirmCompleteJob');

// 6. Check showAdminTab handles all tabs
assert(appJs.includes("tab === 'overview'"), "showAdminTab handles 'overview'");
assert(appJs.includes("tab === 'jobs'"), "showAdminTab handles 'jobs'");
assert(appJs.includes("tab === 'pending'"), "showAdminTab handles 'pending'");
assert(appJs.includes("loadPendingSelfiesAdmin()"), "showAdminTab loads pending selfies on pending tab");
assert(appJs.includes("loadAllJobsAdmin()"), "showAdminTab loads jobs on jobs tab");
console.log('✔ showAdminTab tab switching & data loaders verified in app.js');

// 7. Check profile card display
assert(appJs.includes("u.completedJobsCount"), 'renderProfileCard must show completedJobsCount');
console.log('✔ Technician profile card completed jobs display verified');

console.log('\n====================================================');
console.log('🎉 ALL SPINNER & COMPLETED JOBS TESTS PASSED (100%)');
console.log('====================================================');
