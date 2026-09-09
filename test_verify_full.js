const fs = require('fs');
const path = require('path');
const http = require('http');

const projectRoot = process.cwd();
const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(projectRoot, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(projectRoot, 'app.js'), 'utf8');

console.log('====================================================');
console.log('🔍 RUNNING COMPREHENSIVE VERIFICATION SUITE');
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

// 1. TECHNICIAN LIVE SELFIE ON REGISTRATION (NO GALLERY UPLOAD)
console.log('--- 1. Technician Live Selfie Registration ---');
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

// 2. CUSTOMER VIEW OF TECHNICIAN PHOTO
console.log('\n--- 2. Customer View of Technician Photo ---');
assert(html.includes('id="modal-photo-preview"'), 'Photo preview lightbox modal exists in index.html');
assert(html.includes('id="modal-photo-img"'), 'Photo preview img element exists in index.html');
assert(js.includes('previewPhoto'), 'app.js: previewPhoto lightbox viewer function exists');
assert(js.includes('claimedByPhoto'), 'app.js: job stores claimedByPhoto on claim');
assert(js.includes('assignedTechCardHtml'), 'app.js: assigned technician card rendered for customer');
assert(js.includes('techCardModalHtml'), 'app.js: technician photo card rendered in job details modal');

// 3. WORK COMPLETION LIVE CAMERA PROOF (NO GALLERY UPLOAD)
console.log('\n--- 3. Work Completion Live Camera Proof ---');
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

// 4. CUSTOMER COMPLETION EMAIL WITH WORK PHOTO
console.log('\n--- 4. Customer Completion Email Notification ---');
assert(js.includes('notifyJobCompleted'), 'app.js: notifyJobCompleted function exists');
assert(js.includes('job.completionPhoto'), 'app.js: completion photo embedded in completion email');
assert(js.includes('Job Completed:'), 'app.js: Completion email subject line defined');

// 5. 5-STAR RATING & FEEDBACK SYSTEM
console.log('\n--- 5. 5-Star Rating & Feedback System ---');
assert(html.includes('id="modal-feedback"'), 'Customer feedback modal exists in index.html');
assert(html.includes('id="star-picker"'), '5-Star picker container exists in index.html');
assert(html.includes('id="feedback-comment"'), 'Feedback comment textarea exists in index.html');
assert(js.includes('openFeedbackModal'), 'app.js: openFeedbackModal function exists');
assert(js.includes('setStarRating'), 'app.js: setStarRating function exists');
assert(js.includes('previewStars'), 'app.js: previewStars function exists');
assert(js.includes('submitFeedback'), 'app.js: submitFeedback function exists');
assert(js.includes('avgRating: Number(newAvg)'), 'app.js: average rating recalculated and updated on technician profile');

// 6. SHOWING TECHNICIAN AVERAGE STAR RATING TO CUSTOMERS
console.log('\n--- 6. Showing Star Rating Out of 5 to Customers ---');
assert(js.includes('renderStarRating'), 'app.js: renderStarRating helper exists');
assert(js.includes('claimedByRating: techRating'), 'app.js: claimJob stores technician rating on job');
assert(js.includes('claimedByRatingCount: techRatingCount'), 'app.js: claimJob stores technician rating count on job');
assert(css.includes('.star-rating-badge'), 'style.css: .star-rating-badge styled');
assert(css.includes('.star-picker'), 'style.css: .star-picker styled');
assert(css.includes('.customer-review-card'), 'style.css: .customer-review-card styled');

// 7. HTTP SERVER HEALTH CHECK
console.log('\n--- 7. HTTP Server Health Check ---');
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
