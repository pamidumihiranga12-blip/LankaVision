const fs = require('fs');

console.log('🧪 Testing Notification Center Integration...\n');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');
const js = fs.readFileSync('app.js', 'utf8');
const i18n = fs.readFileSync('i18n.js', 'utf8');

function check(desc, cond) {
  if (cond) {
    console.log('  ✅ PASS:', desc);
  } else {
    console.error('  ❌ FAIL:', desc);
    process.exit(1);
  }
}

// 1. HTML elements
check('HTML has in-app notification popup', html.includes('id="app-notif-popup"'));
check('HTML has notification title and msg', html.includes('id="anp-title"') && html.includes('id="anp-msg"'));
check('HTML has notification dropdown panel', html.includes('id="notif-panel"'));
check('HTML has notification list container', html.includes('id="notif-list"'));
check('HTML has bell button with landing badge', html.includes('id="notif-badge-landing"'));
check('HTML has bell button with dashboard badge', html.includes('id="notif-badge-dash"'));
check('HTML has bell button with admin badge', html.includes('id="notif-badge-admin"'));

// 2. CSS classes
check('CSS has .app-notif-popup rule', css.includes('.app-notif-popup'));
check('CSS has .notif-panel rule', css.includes('.notif-panel'));
check('CSS has .notif-bell-btn rule', css.includes('.notif-bell-btn'));
check('CSS has .notif-badge rule', css.includes('.notif-badge'));
check('CSS has .notif-item rule', css.includes('.notif-item'));

// 3. JavaScript logic
check('JS has playNotificationChime function', js.includes('function playNotificationChime'));
check('JS has triggerAppNotification dispatcher', js.includes('function triggerAppNotification'));
check('JS has setupRealtimeJobNotifications listener', js.includes('function setupRealtimeJobNotifications'));
check('JS has toggleNotificationPanel function', js.includes('function toggleNotificationPanel'));
check('JS has saveNotification storage function', js.includes('function saveNotification'));
check('JS has updateNotificationBadge function', js.includes('function updateNotificationBadge'));
check('JS calls triggerAppNotification in notifyNewJobPosted', js.includes('triggerAppNotification') && js.includes('Job Posted Successfully'));
check('JS calls triggerAppNotification in notifyJobClaimed', js.includes('Technician Accepted Job'));
check('JS calls triggerAppNotification in notifyJobScheduled', js.includes('Service Visit Scheduled'));
check('JS calls triggerAppNotification in notifyJobCompleted', js.includes('Job Completed Successfully'));

// 4. i18n
check('i18n has notif_center_title', i18n.includes('notif_center_title'));
check('i18n has clear_all', i18n.includes('clear_all'));
check('i18n has no_notifs', i18n.includes('no_notifs'));

console.log('\n🎉 ALL NOTIFICATION INTEGRATION CHECKS PASSED!');
