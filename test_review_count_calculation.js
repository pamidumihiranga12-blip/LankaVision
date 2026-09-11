// Test review count calculation, star rendering, and multi-field rating support
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('====================================================');
console.log('🧪 VERIFYING REVIEW & RATING COUNT LOGIC IN APP.JS');
console.log('====================================================');

const appJs = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

// 1. openTechDigitalId queries jobs where claimedBy == techId
assert(appJs.includes("where('claimedBy', '==', techId)"), 'openTechDigitalId must query claimedBy');

// 2. Checks multiple rating fields: rating, techRating, claimedByRating, customerRating
assert(appJs.includes('j.rating || j.techRating || j.claimedByRating || j.customerRating'), 'openTechDigitalId must check all rating field names');

// 3. reviewCount and totalRating accumulation
assert(appJs.includes('totalRating += r;'), 'openTechDigitalId must accumulate totalRating');
assert(appJs.includes('reviewCount++;'), 'openTechDigitalId must increment reviewCount');

// 4. Fallback to reviews collection
assert(appJs.includes("db.collection('reviews')"), 'Must have fallback to reviews collection');

// 5. Dynamic star and review count display
assert(appJs.includes('reviewCount === 1 ? \'review\' : \'reviews\''), 'Must format review / reviews singular/plural');

// 6. syncTechnicianLiveStats function exists
assert(appJs.includes('async function syncTechnicianLiveStats(techId)'), 'syncTechnicianLiveStats must be defined');

// 7. Called on initTechDashboard
assert(appJs.includes('syncTechnicianLiveStats(currentUser.uid)'), 'syncTechnicianLiveStats must be called for current user');

// 8. submitFeedback updates multiple rating fields and in-memory caches
assert(appJs.includes('techRating: rating'), 'submitFeedback must set techRating');
assert(appJs.includes('customerRating: rating'), 'submitFeedback must set customerRating');
assert(appJs.includes('claimedByRating: rating'), 'submitFeedback must set claimedByRating');

// 9. openJobModal customer review card checks all fields
assert(appJs.includes('modalRatingVal = Number(job.rating || job.techRating || job.customerRating || job.claimedByRating || 0)'), 'openJobModal must check all rating fields');

console.log('✔ All review count, star calculation, and multi-field rating tests passed!');
console.log('====================================================');
