const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('🧪 TESTING TECHNICIAN AVAILABLE JOBS & MAP');
console.log('========================================');

const appJs = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
const styleCss = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');

let errors = [];

function assert(condition, msg) {
  if (condition) {
    console.log('✔ ' + msg);
  } else {
    console.error('❌ FAIL: ' + msg);
    errors.push(msg);
  }
}

// 1. Check order: Available Jobs List BEFORE Map Panel in showTechTab('avail')
const availIndex = appJs.indexOf('id="tech-avail"');
const mapPanelIndex = appJs.indexOf('id="tech-map-panel"');
assert(availIndex !== -1, 'tech-avail exists in app.js');
assert(mapPanelIndex !== -1, 'tech-map-panel exists in app.js');
assert(availIndex < mapPanelIndex, 'Available Jobs grid (#tech-avail) is placed BEFORE map section (#tech-map-panel)');

// 2. Check Map toggle button in top filter bar
assert(appJs.includes('toggleTechJobsMap()'), 'toggleTechJobsMap() button is present in filter bar');
assert(appJs.includes('id="tech-map-quick-badge"'), 'tech-map-quick-badge counter is in filter bar');

// 3. Check getJobCoordinates logic
assert(appJs.includes('function getJobCoordinates('), 'getJobCoordinates function exists');
assert(appJs.includes('CITY_COORDS[j.city]'), 'getJobCoordinates falls back to CITY_COORDS');
assert(appJs.includes('DISTRICT_COORDS[j.district]'), 'getJobCoordinates falls back to DISTRICT_COORDS');

// 4. Check Leaflet clean reset & marker icon logic
assert(appJs.includes('techAvailableJobsMap.remove()'), 'renderTechJobsMap cleans up previous Leaflet map instance');
assert(appJs.includes('marker-cctv'), 'CCTV marker pin class assigned');
assert(appJs.includes('marker-satellite'), 'Satellite marker pin class assigned');
assert(appJs.includes('marker-router'), 'Router marker pin class assigned');
assert(appJs.includes('marker-urgent'), 'Urgent marker pin class assigned');

// 5. Check CSS classes
assert(styleCss.includes('.job-marker-pin'), '.job-marker-pin class defined in style.css');
assert(styleCss.includes('.marker-cctv'), '.marker-cctv defined in style.css');
assert(styleCss.includes('.marker-satellite'), '.marker-satellite defined in style.css');
assert(styleCss.includes('.marker-router'), '.marker-router defined in style.css');
assert(styleCss.includes('.marker-urgent'), '.marker-urgent defined in style.css');
assert(styleCss.includes('urgentMarkerPulse'), 'urgentMarkerPulse animation defined in style.css');

// 6. Check exports
assert(appJs.includes('window.toggleTechJobsMap = toggleTechJobsMap'), 'toggleTechJobsMap exported to window');
assert(appJs.includes('window.focusJobOnTechMap = focusJobOnTechMap'), 'focusJobOnTechMap exported to window');

if (errors.length > 0) {
  console.error('\nFAILED TESTS (' + errors.length + '):');
  errors.forEach(e => console.error('- ' + e));
  process.exit(1);
} else {
  console.log('\n========================================');
  console.log('🎉 ALL TECHNICIAN MAP TESTS PASSED (100%)');
  console.log('========================================');
}
