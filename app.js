// =============================================================
// LankaVision Pro — app.js v3
// Complete Application Logic
// =============================================================

const MAIN_ADMIN_EMAIL = 'lankavisionadmin@gmail.com';

const SL_DISTRICTS = [
  'Ampara','Anuradhapura','Badulla','Batticaloa','Colombo',
  'Galle','Gampaha','Hambantota','Jaffna','Kalutara',
  'Kandy','Kegalle','Kilinochchi','Kurunegala','Mannar',
  'Matale','Matara','Monaragala','Mullaitivu','Nuwara Eliya',
  'Polonnaruwa','Puttalam','Ratnapura','Trincomalee','Vavuniya'
];

const DISTRICT_COORDS = {
  'Ampara':[7.2948,81.6727],'Anuradhapura':[8.3114,80.4037],
  'Badulla':[6.9934,81.0550],'Batticaloa':[7.7102,81.6924],
  'Colombo':[6.9271,79.8612],'Galle':[6.0328,80.2170],
  'Gampaha':[7.0917,80.0106],'Hambantota':[6.1240,81.1185],
  'Jaffna':[9.6615,80.0255],'Kalutara':[6.5854,79.9607],
  'Kandy':[7.2906,80.6337],'Kegalle':[7.2513,80.3464],
  'Kilinochchi':[9.3803,80.4003],'Kurunegala':[7.4867,80.3647],
  'Mannar':[8.9786,79.9044],'Matale':[7.4675,80.6234],
  'Matara':[5.9549,80.5550],'Monaragala':[6.8728,81.3507],
  'Mullaitivu':[9.2671,80.8142],'Nuwara Eliya':[6.9497,80.7891],
  'Polonnaruwa':[7.9403,81.0188],'Puttalam':[8.0362,79.8283],
  'Ratnapura':[6.7056,80.3847],'Trincomalee':[8.5874,81.2152],
  'Vavuniya':[8.7514,80.4972]
};

const DISTRICT_CITIES = {
  'Ampara': [
    'Ampara','Akkaraipattu','Kalmunai','Sammanthurai','Pottuvil',
    'Dehiattakandiya','Uhana','Mahaoya','Damana','Padiyathalawa','Sainthamaruthu'
  ],
  'Anuradhapura': [
    'Anuradhapura','Padaviya','Kekirawa','Medawachchiya','Eppawala',
    'Galenbindunuwewa','Mihintale','Nochchiyagama','Thalawa','Tambuttegama',
    'Habarana','Kahatagasdigiliya','Horowpathana','Galnewa','Ipalogama',
    'Kebithigollewa','Rajanganaya','Rambewa','Thirappane'
  ],
  'Badulla': [
    'Badulla','Bandarawela','Hali Ela','Ella','Haputale',
    'Welimada','Mahiyanganaya','Passara','Diyatalawa','Demodara'
  ],
  'Batticaloa': [
    'Batticaloa','Eravur','Kattankudy','Valachchenai','Kaluwanchikudy',
    'Vakarai','Chenkalady','Oddamavadi'
  ],
  'Colombo': [
    'Colombo 1-15','Dehiwala','Mount Lavinia','Moratuwa','Kotte',
    'Maharagama','Kesbewa','Homagama','Nugegoda','Kotikawatta',
    'Mulleriyawa','Kolonnawa','Malabe','Kaduwela','Piliyandala',
    'Battaramulla','Rajagiriya','Athurugiriya','Padukka','Hanwella','Boralesgamuwa'
  ],
  'Galle': [
    'Galle','Karapitiya','Ambalangoda','Hikkaduwa','Elpitiya',
    'Bentota','Baddegama','Ahangama','Habaraduwa','Neluwa','Batapola'
  ],
  'Gampaha': [
    'Gampaha','Negombo','Kelaniya','Wattala','Ja-Ela',
    'Kandana','Minuwangoda','Katunayake','Ragama','Divulapitiya',
    'Mirigama','Kiribathgoda','Kadawatha','Veyangoda','Nittambuwa'
  ],
  'Hambantota': [
    'Hambantota','Tangalle','Beliatta','Tissamaharama','Ambalantota',
    'Walasmulla','Weeraketiya','Middeniya','Suriyawewa'
  ],
  'Jaffna': [
    'Jaffna','Nallur','Chavakachcheri','Point Pedro','Karainagar',
    'Velanai','Chunnakam','Manipay','Kopay','Tellippalai'
  ],
  'Kalutara': [
    'Kalutara','Panadura','Horana','Beruwala','Aluthgama',
    'Matugama','Wadduwa','Bandaragama','Ingiriya','Bulathsinhala'
  ],
  'Kandy': [
    'Kandy','Peradeniya','Katugastota','Gampola','Nawalapitiya',
    'Kundasale','Digana','Akurana','Teldeniya','Gelioya',
    'Pilimathalawa','Wattegama'
  ],
  'Kegalle': [
    'Kegalle','Mawanella','Warakapola','Rambukkana','Ruwanwella',
    'Dehiowita','Deraniyagala','Yatiyantota','Galigamuwa'
  ],
  'Kilinochchi': [
    'Kilinochchi','Paranthan','Pallai','Pooneryn','Kandavalai'
  ],
  'Kurunegala': [
    'Kurunegala','Kuliyapitiya','Narammala','Wariyapola','Pannala',
    'Giriulla','Polgahawela','Ibbagamuwa','Alawwa','Mawathagama',
    'Nikaweratiya','Maho','Galgamuwa'
  ],
  'Mannar': [
    'Mannar','Pesalai','Thalaimannar','Murunkan','Madhu','Nanaddan'
  ],
  'Matale': [
    'Matale','Dambulla','Galewela','Sigiriya','Ukuwela',
    'Rattota','Naula','Yatawatta'
  ],
  'Matara': [
    'Matara','Weligama','Akuressa','Dikwella','Deniyaya',
    'Hakmana','Kamburupitiya','Devinuwara','Gandara'
  ],
  'Monaragala': [
    'Monaragala','Wellawaya','Buttala','Bibile','Kataragama',
    'Siyambalanduwa','Medagama'
  ],
  'Mullaitivu': [
    'Mullaitivu','Puthukkudiyiruppu','Oddusuddan','Mankulam','Mallavi'
  ],
  'Nuwara Eliya': [
    'Nuwara Eliya','Hatton','Talawakelle','Kotagala','Ginigathena',
    'Maskeliya','Ragala','Walapane','Norwood'
  ],
  'Polonnaruwa': [
    'Polonnaruwa','Kaduruwela','Hingurakgoda','Medirigiriya','Aralaganwila',
    'Welikanda','Dimbulagala','Giritale'
  ],
  'Puttalam': [
    'Puttalam','Chilaw','Wennappuwa','Marawila','Dankotuwa',
    'Anamaduwa','Nattandiya','Kalpitiya','Mahawewa'
  ],
  'Ratnapura': [
    'Ratnapura','Embilipitiya','Balangoda','Pelmadulla','Kuruwita',
    'Kahawatta','Eheliyagoda','Godakawela','Nivithigala'
  ],
  'Trincomalee': [
    'Trincomalee','Kinniya','Kantale','Muttur','Nilaveli',
    'Kuchchaveli','Serunuwara'
  ],
  'Vavuniya': [
    'Vavuniya','Cheddikulam','Nedunkeni','Omanthai'
  ]
};

const CITY_COORDS = {
  'Padaviya': [8.8784, 80.7580],
  'Anuradhapura': [8.3114, 80.4037],
  'Kekirawa': [8.0441, 80.5960],
  'Medawachchiya': [8.5434, 80.4958],
  'Eppawala': [8.1408, 80.4136],
  'Mihintale': [8.3512, 80.5042],
  'Tambuttegama': [8.1561, 80.3019],
  'Habarana': [8.0338, 80.7511],
  'Horowpathana': [8.5556, 80.8667],
  'Galenbindunuwewa': [8.3846, 80.6587],
  'Dehiwala': [6.8533, 79.8656],
  'Moratuwa': [6.7730, 79.8816],
  'Negombo': [7.2008, 79.8736],
  'Panadura': [6.7130, 79.9074],
  'Horana': [6.7153, 80.0631],
  'Dambulla': [7.8742, 80.6511],
  'Chilaw': [7.5758, 79.7953],
  'Tangalle': [6.0240, 80.7941],
  'Bandarawela': [6.8259, 80.9982]
};

// ── NEIGHBORING DISTRICTS (ශ්‍රී ලංකාවේ මායිම් දිස්ත්‍රික්ක) ──
const NEARBY_DISTRICTS = {
  'Ampara': ['Batticaloa', 'Polonnaruwa', 'Badulla', 'Monaragala'],
  'Anuradhapura': ['Vavuniya', 'Mannar', 'Puttalam', 'Kurunegala', 'Matale', 'Polonnaruwa', 'Mullaitivu', 'Trincomalee'],
  'Badulla': ['Nuwara Eliya', 'Kandy', 'Matale', 'Polonnaruwa', 'Ampara', 'Monaragala', 'Ratnapura'],
  'Batticaloa': ['Polonnaruwa', 'Ampara', 'Trincomalee'],
  'Colombo': ['Gampaha', 'Kalutara', 'Kegalle'],
  'Galle': ['Kalutara', 'Matara', 'Ratnapura'],
  'Gampaha': ['Colombo', 'Kalutara', 'Kegalle', 'Kurunegala', 'Puttalam'],
  'Hambantota': ['Matara', 'Monaragala', 'Ratnapura'],
  'Jaffna': ['Kilinochchi'],
  'Kalutara': ['Colombo', 'Galle', 'Ratnapura'],
  'Kandy': ['Matale', 'Nuwara Eliya', 'Kegalle', 'Kurunegala', 'Badulla'],
  'Kegalle': ['Gampaha', 'Colombo', 'Ratnapura', 'Kandy', 'Nuwara Eliya', 'Kurunegala'],
  'Kilinochchi': ['Jaffna', 'Mullaitivu', 'Mannar'],
  'Kurunegala': ['Gampaha', 'Puttalam', 'Anuradhapura', 'Matale', 'Kandy', 'Kegalle'],
  'Mannar': ['Kilinochchi', 'Mullaitivu', 'Vavuniya', 'Anuradhapura', 'Puttalam'],
  'Matale': ['Kandy', 'Anuradhapura', 'Polonnaruwa', 'Kurunegala', 'Badulla'],
  'Matara': ['Galle', 'Hambantota', 'Ratnapura'],
  'Monaragala': ['Badulla', 'Ampara', 'Hambantota', 'Ratnapura'],
  'Mullaitivu': ['Kilinochchi', 'Mannar', 'Vavuniya', 'Trincomalee'],
  'Nuwara Eliya': ['Kandy', 'Badulla', 'Kegalle', 'Ratnapura'],
  'Polonnaruwa': ['Anuradhapura', 'Matale', 'Badulla', 'Batticaloa', 'Ampara'],
  'Puttalam': ['Kurunegala', 'Gampaha', 'Anuradhapura', 'Mannar'],
  'Ratnapura': ['Kalutara', 'Colombo', 'Kegalle', 'Nuwara Eliya', 'Badulla', 'Monaragala', 'Hambantota', 'Galle', 'Matara'],
  'Trincomalee': ['Mullaitivu', 'Vavuniya', 'Anuradhapura', 'Polonnaruwa', 'Batticaloa'],
  'Vavuniya': ['Mannar', 'Anuradhapura', 'Trincomalee', 'Mullaitivu']
};

function calcDistanceKm(lat1, lon1, lat2, lon2) {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return null;
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// ── STATE ──────────────────────────────────────────────────────
let currentUser     = null;
let currentUserData = null;
let postJobMap      = null;
let modalMap        = null;
let selectedLoc     = null;
let allAdminJobs    = [];
let allTechs        = [];
let appInitialized  = false;
let authResolved    = false;

// ── EMAIL NOTIFICATIONS (via LankaVision SMTP) ────────────────
const BACKUP_ADMIN_EMAIL = 'lankavision@smartzonelk.lk';
const ADMIN_EMAIL = MAIN_ADMIN_EMAIL;
const ADMIN_EMAILS = [MAIN_ADMIN_EMAIL, BACKUP_ADMIN_EMAIL];

function getAllAdminEmails() {
  return ADMIN_EMAILS;
}

async function sendEmailNotification({ to, subject, html, text }) {
  if (!to) return;
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, html, text })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('[EMAIL ERROR]', err);
    return { success: false, error: err.message };
  }
}

async function sendAdminTestEmail() {
  showToast('Test Email එක යවමින් පවතී... 📨', 'info');
  try {
    const adminRecipients = await getAllAdminEmails();
    const res = await sendEmailNotification({
      to: adminRecipients,
      subject: '🧪 LankaVision Pro - Admin Email System Test',
      html: emailWrapper('Admin System Test', `
        <h2 style="color:#60a5fa;margin-top:0">🧪 Admin Email System Working!</h2>
        <p>ආයුබෝවන් Administrator, මෙය LankaVision Pro පද්ධතියෙන් සාර්ථකව නිකුත් කරන ලද පරීක්ෂණ ඊමේල් පණිවිඩයකි (Test Email).</p>
        <div class="detail-card">
          <div class="row"><span class="lbl">Recipients</span><span class="val" style="color:#38bdf8">${esc(adminRecipients.join(', '))}</span></div>
          <div class="row"><span class="lbl">Server</span><span class="val">smtp.smartzonelk.lk (Port 465)</span></div>
          <div class="row"><span class="lbl">Status</span><span class="val" style="color:#34d399">✅ Active &amp; Connected</span></div>
          <div class="row"><span class="lbl">Time</span><span class="val">${new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}</span></div>
        </div>
        <p style="color:#94a3b8;font-size:13px">ඔබට මෙම ඊමේල් පණිවිඩය ලැබුණේ නම්, නව Jobs, Technicians ලියාපදිංචි වීම් ආදී සියලුම Admin Alerts නිවැරදිව ලැබෙනු ඇත.</p>
        <div style="text-align:center;margin-top:18px">
          <a href="http://localhost:8080/index.html" class="btn-link">Open Admin Panel</a>
        </div>
      `),
      text: `LankaVision Pro Admin Email Test. System verified for ${adminRecipients.join(', ')}`
    });

    if (res && res.success) {
      showToast(`Test Email සාර්ථකව යවන ලදී! (${MAIN_ADMIN_EMAIL} Inbox/Spam check කරන්න) 🎉`, 'success');
    } else {
      showToast('Email යැවීම අසාර්ථක විය: ' + (res?.error || 'Unknown error'), 'error');
    }
  } catch (err) {
    console.error('sendAdminTestEmail error:', err);
    showToast('Error: ' + err.message, 'error');
  }
}

function emailWrapper(title, contentHtml) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #080c14; margin: 0; padding: 24px 12px; color: #f1f5f9; }
      .email-container { max-width: 580px; margin: 0 auto; background: #111827; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.6); }
      .email-header { background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%); padding: 26px 20px; text-align: center; }
      .email-brand { font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px; margin: 0; }
      .email-sub { color: #dbeafe; font-size: 13px; margin: 4px 0 0; }
      .email-body { padding: 28px 24px; color: #e2e8f0; line-height: 1.6; font-size: 14.5px; }
      .detail-card { background: #0c1220; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px 18px; margin: 20px 0; }
      .row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 14px; }
      .row:last-child { border-bottom: none; }
      .lbl { color: #94a3b8; font-weight: 500; }
      .val { color: #ffffff; font-weight: 700; text-align: right; }
      .badge { display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; }
      .badge-cctv { background: rgba(6,182,212,0.2); color: #22d3ee; }
      .badge-sat { background: rgba(245,158,11,0.2); color: #fbbf24; }
      .email-footer { padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid rgba(255,255,255,0.07); background: #0b101b; }
      .btn-link { display: inline-block; background: #2563eb; color: #ffffff !important; padding: 10px 22px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; margin-top: 14px; }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1 class="email-brand">📡 LankaVision Pro</h1>
        <p class="email-sub">CCTV & Satellite Job Platform Sri Lanka</p>
      </div>
      <div class="email-body">
        ${contentHtml}
      </div>
      <div class="email-footer">
        © 2026 LankaVision Pro. Smart Zone LK.<br>
        Island-wide CCTV & Satellite Technician Network.<br>
        Support: <a href="mailto:lankavision@smartzonelk.lk" style="color:#60a5fa">lankavision@smartzonelk.lk</a>
      </div>
    </div>
  </body>
  </html>`;
}

// Trigger 1: New Job Posted -> Notify Admin, District Technicians, and Customer
async function notifyNewJobPosted(job) {
  const loc = job.city ? `${job.district}, ${job.city}` : job.district;
  const badgeClass = job.type === 'CCTV' ? 'badge-cctv' : 'badge-sat';

  // 1. To Admin
  const adminHtml = emailWrapper('New Job Posted', `
    <h2 style="color:#60a5fa;margin-top:0;font-size:18px">🔔 New Job Posted!</h2>
    <p>පද්ධතියට අලුත් Job එකක් post කර ඇත. විස්තර පහත දැක්වේ:</p>
    <div class="detail-card">
      <div class="row"><span class="lbl">Job Title</span><span class="val">${esc(job.title)}</span></div>
      <div class="row"><span class="lbl">Service Type</span><span class="val"><span class="badge ${badgeClass}">${esc(job.type)}</span></span></div>
      <div class="row"><span class="lbl">Location</span><span class="val">${esc(loc)}</span></div>
      <div class="row"><span class="lbl">Customer Name</span><span class="val">${esc(job.customerName || 'N/A')}</span></div>
      <div class="row"><span class="lbl">Customer Phone</span><span class="val" style="color:#34d399;font-family:monospace">${esc(job.customerPhone)}</span></div>
      ${job.customerEmail ? `<div class="row"><span class="lbl">Customer Email</span><span class="val">${esc(job.customerEmail)}</span></div>` : ''}
    </div>
    <p style="color:#94a3b8;font-size:13px;line-height:1.5"><strong>Description:</strong> ${esc(job.description)}</p>
    <div style="text-align:center;margin-top:20px">
      <a href="http://localhost:8080/index.html" class="btn-link">Open Admin Panel</a>
    </div>
  `);

  sendEmailNotification({
    to: ADMIN_EMAILS,
    subject: `🔔 New Job: ${job.title} (${loc})`,
    html: adminHtml,
    text: `New Job: ${job.title} in ${loc}. Type: ${job.type}. Phone: ${job.customerPhone}`
  });

  // 2. To Customer (if email provided)
  if (job.customerEmail) {
    const custHtml = emailWrapper('Job Received', `
      <h2 style="color:#34d399;margin-top:0;font-size:18px">✅ Job Request Received!</h2>
      <p>ආයුබෝවන් <strong>${esc(job.customerName || 'Customer')}</strong>, ඔබගේ Job Request එක සාර්ථකව පද්ධතියට ලැබී ඇත.</p>
      <div class="detail-card">
        <div class="row"><span class="lbl">Job Title</span><span class="val">${esc(job.title)}</span></div>
        <div class="row"><span class="lbl">Service</span><span class="val"><span class="badge ${badgeClass}">${esc(job.type)}</span></span></div>
        <div class="row"><span class="lbl">Location</span><span class="val">${esc(loc)}</span></div>
      </div>
      <p>ඔබගේ ප්‍රදේශයේ (${esc(job.district)}) සිටින සුදුසුකම්ලත් Technicians ලාව මේ වන විටත් දැනුවත් කර ඇත. Technician කෙනෙක් Job එක භාරගත් (Accept කළ) විගස ඔබට Email මගින් දන්වනු ලැබේ.</p>
    `);
    sendEmailNotification({
      to: job.customerEmail,
      subject: `✅ Job Received: ${job.title} - LankaVision Pro`,
      html: custHtml,
      text: `Your job request for ${job.title} in ${loc} was received.`
    });
  }

  // 3. To Technicians (Home District + Nearby Border Districts within ~60km)
  try {
    const snap = await db.collection('users')
      .where('role', '==', 'technician')
      .where('status', '==', 'approved')
      .get();

    const jobDistrict = job.district;
    const nearbyDistricts = NEARBY_DISTRICTS[jobDistrict] || [];
    const jobLat = job.location?.lat || (job.city && CITY_COORDS[job.city]?.[0]) || (jobDistrict && DISTRICT_COORDS[jobDistrict]?.[0]);
    const jobLng = job.location?.lng || (job.city && CITY_COORDS[job.city]?.[1]) || (jobDistrict && DISTRICT_COORDS[jobDistrict]?.[1]);

    snap.forEach(d => {
      const t = d.data();
      if (!t.email) return;

      // Check service type match
      if (t.serviceType !== 'Both' && t.serviceType !== job.type) return;

      const isHome = t.district === jobDistrict;
      const isNeighbor = nearbyDistricts.includes(t.district);

      if (!isHome && !isNeighbor) return;

      let distanceKm = null;
      const techCoords = (t.city && CITY_COORDS[t.city]) || (t.district && DISTRICT_COORDS[t.district]);
      if (techCoords && jobLat && jobLng) {
        distanceKm = calcDistanceKm(techCoords[0], techCoords[1], jobLat, jobLng);
      }

      // If neighboring district, only notify if within 60 km
      if (!isHome && distanceKm !== null && distanceKm > 60) {
        return;
      }

      const techLoc = t.city ? `${t.district}, ${t.city}` : t.district;
      const distText = distanceKm ? ` (~${distanceKm} km දුර)` : '';
      const headline = isHome
        ? `⚡ ඔබේ ප්‍රදේශයේ (${jobDistrict}) නව Job එකක්!`
        : `🚗 ඔබේ ප්‍රදේශයට ළඟම (${loc}) නව Job එකක්!${distText}`;
      const introText = isHome
        ? `ආයුබෝවන් <strong>${esc(t.name)}</strong>, ඔබගේ ප්‍රදේශයේ (${esc(techLoc)}) අලුත් ${esc(job.type)} Job එකක් post කර ඇත.`
        : `ආයුබෝවන් <strong>${esc(t.name)}</strong>, ඔබ සිටින ප්‍රදේශයට (${esc(techLoc)}) ආසන්නව පිහිටි <strong>${esc(loc)}</strong> හි අලුත් ${esc(job.type)} Job එකක් post කර ඇත.${distanceKm ? `<br><strong>ආසන්න දුර:</strong> ~${distanceKm} km` : ''}`;

      const techHtml = emailWrapper('New Job Available', `
        <h2 style="color:${isHome ? '#fbbf24' : '#60a5fa'};margin-top:0;font-size:18px">${headline}</h2>
        <p>${introText}</p>
        <div class="detail-card">
          <div class="row"><span class="lbl">Job Title</span><span class="val">${esc(job.title)}</span></div>
          <div class="row"><span class="lbl">Location</span><span class="val">${esc(loc)}</span></div>
          <div class="row"><span class="lbl">Area Status</span><span class="val"><span class="badge ${isHome ? 'badge-sat' : 'badge-cctv'}">${isHome ? 'ඔබේ දිස්ත්‍රික්කය' : 'ළඟම ප්‍රදේශය'}</span></span></div>
          ${distanceKm ? `<div class="row"><span class="lbl">Estimated Distance</span><span class="val">~${distanceKm} km</span></div>` : ''}
          <div class="row"><span class="lbl">Service</span><span class="val"><span class="badge ${badgeClass}">${esc(job.type)}</span></span></div>
        </div>
        <p style="color:#94a3b8;font-size:13px">Job එක Accept කිරීමට වහාම LankaVision Pro app එකට log වන්න.</p>
        <div style="text-align:center;margin-top:18px">
          <a href="http://localhost:8080/index.html" class="btn-link">View & Accept Job</a>
        </div>
      `);

      sendEmailNotification({
        to: t.email,
        subject: `${isHome ? '⚡' : '🚗'} New Job in ${loc}: ${job.title}`,
        html: techHtml,
        text: `New Job in ${loc}: ${job.title}. Service: ${job.type}.${distanceKm ? ` Distance: ~${distanceKm} km.` : ''} Login to accept.`
      });
    });
  } catch (err) {
    console.warn('Technician notification error:', err);
  }
}

// Trigger 2: Technician Registers -> Notify Admin & Technician
async function notifyTechRegistered(tech) {
  try {
    const techLoc = tech.city ? `${tech.district}, ${tech.city}` : tech.district;
    console.log('[NOTIFY] Dispatching registration emails for:', tech.name, techLoc);

    // 1. To Admin
    const adminHtml = emailWrapper('New Technician Application', `
      <h2 style="color:#60a5fa;margin-top:0;font-size:18px">👤 New Technician Registration!</h2>
      <p>නව Technician කෙනෙක් system එකට register වී ඇත. Review කර approve කරන්න.</p>
      ${tech.photoUrl ? `<div style="text-align:center;margin:12px 0"><img src="${tech.photoUrl}" style="width:76px;height:76px;border-radius:50%;border:3px solid #3b82f6;object-fit:cover" alt="Technician Selfie" /></div>` : ''}
      <div class="detail-card">
        <div class="row"><span class="lbl">Name</span><span class="val">${esc(tech.name)}</span></div>
        <div class="row"><span class="lbl">Phone</span><span class="val" style="color:#34d399;font-family:monospace">${esc(tech.phone)}</span></div>
        <div class="row"><span class="lbl">Email</span><span class="val">${esc(tech.email)}</span></div>
        <div class="row"><span class="lbl">District / City</span><span class="val">${esc(techLoc)}</span></div>
        <div class="row"><span class="lbl">Service</span><span class="val">${esc(tech.serviceType)}</span></div>
      </div>
      <div style="text-align:center;margin-top:18px">
        <a href="http://localhost:8080/index.html" class="btn-link">Review in Admin Panel</a>
      </div>
    `);

    sendEmailNotification({
      to: ADMIN_EMAILS,
      subject: `👤 New Technician Application: ${tech.name} (${techLoc})`,
      html: adminHtml,
      text: `New Technician: ${tech.name}, ${tech.phone}, Location: ${techLoc}`
    });

    // 2. To Technician
    if (tech.email) {
      const techHtml = emailWrapper('Application Received', `
        <h2 style="color:#fbbf24;margin-top:0;font-size:18px">⏳ Application Received!</h2>
        <p>ආයුබෝවන් <strong>${esc(tech.name)}</strong>, LankaVision Pro Technician ජාලය හා එක්වීමට ඉල්ලුම් කළාට ස්තූතියි.</p>
        <div class="detail-card">
          <div class="row"><span class="lbl">District / City</span><span class="val">${esc(techLoc)}</span></div>
          <div class="row"><span class="lbl">Service</span><span class="val">${esc(tech.serviceType)}</span></div>
          <div class="row"><span class="lbl">Status</span><span class="val" style="color:#fbbf24">Pending Admin Review</span></div>
        </div>
        <p>ඔබගේ තොරතුරු Admin විසින් review කර පැය 24–48ක් ඇතුළත approve කරනු ඇත. Approve වූ විගස ඔබට confirmation email එකක් ලැබෙනු ඇත.</p>
      `);
      sendEmailNotification({
        to: tech.email,
        subject: `⏳ Application Received - LankaVision Pro`,
        html: techHtml,
        text: `Application received. Location: ${techLoc}. Pending admin review.`
      });
    }
  } catch (err) {
    console.error('[NOTIFY TECH ERROR]', err);
  }
}

// Trigger 3: Technician Approved -> Notify Technician
async function notifyTechApproved(tech) {
  if (!tech || !tech.email) return;
  const techLoc = tech.city ? `${tech.district}, ${tech.city}` : tech.district;
  const html = emailWrapper('Account Approved', `
    <h2 style="color:#34d399;margin-top:0;font-size:18px">🎉 Congratulations! Account Approved!</h2>
    <p>ආයුබෝවන් <strong>${esc(tech.name)}</strong>, ඔබගේ Technician ගිණුම Admin විසින් සාර්ථකව Approve කර ඇත!</p>
    <div class="detail-card">
      <div class="row"><span class="lbl">District / City</span><span class="val">${esc(techLoc)}</span></div>
      <div class="row"><span class="lbl">Service</span><span class="val">${esc(tech.serviceType)}</span></div>
      <div class="row"><span class="lbl">Status</span><span class="val" style="color:#34d399">✅ Active / Approved</span></div>
    </div>
    <p>ඔබට දැන් LankaVision Pro වෙත login වී ඔබගේ District එකේ සහ ළඟම ප්‍රදේශ වල CCTV සහ Satellite Jobs භාරගත (Accept කළ) හැකිය.</p>
    <div style="text-align:center;margin-top:18px">
      <a href="http://localhost:8080/index.html" class="btn-link">Login & View Jobs</a>
    </div>
  `);
  sendEmailNotification({
    to: tech.email,
    subject: `🎉 Congratulations! Your Account is Approved - LankaVision Pro`,
    html,
    text: `Your technician account is approved. Login to view jobs.`
  });
}

// Trigger 4: Job Claimed / Accepted -> Notify Customer & Admin
async function notifyJobClaimed(job, tech) {
  const loc = job.city ? `${job.district}, ${job.city}` : job.district;

  // 1. To Customer
  let custEmail = job.customerEmail || '';
  if (!custEmail && job.postedBy && job.postedBy !== 'guest') {
    try {
      const uDoc = await db.collection('users').doc(job.postedBy).get();
      if (uDoc.exists) custEmail = uDoc.data().email || '';
    } catch (e) {}
  }

  if (custEmail) {
    const custHtml = emailWrapper('Technician Assigned', `
      <h2 style="color:#34d399;margin-top:0;font-size:18px">🤝 Technician Accepted Your Job!</h2>
      <p>ආයුබෝවන් <strong>${esc(job.customerName || 'Customer')}</strong>, ඔබගේ Job එක සඳහා Technician කෙනෙක් පත් විය.</p>
      ${tech.photoUrl ? `<div style="text-align:center;margin:12px 0"><img src="${tech.photoUrl}" style="width:72px;height:72px;border-radius:50%;border:3px solid #3b82f6;object-fit:cover" alt="Technician" /></div>` : ''}
      <div class="detail-card">
        <div class="row"><span class="lbl">Job Title</span><span class="val">${esc(job.title)}</span></div>
        <div class="row"><span class="lbl">Technician</span><span class="val" style="color:#60a5fa">${esc(tech.name)}</span></div>
        <div class="row"><span class="lbl">Technician Phone</span><span class="val" style="color:#34d399;font-family:monospace">${esc(tech.phone || 'N/A')}</span></div>
      </div>
      <p>Technician ඔබව ඉක්මනින් දුරකථනයෙන් සම්බන්ධ කර ගනු ඇත. ඔබටද ඉහත අංකයෙන් Technician ඇමතිය හැක.</p>
    `);
    sendEmailNotification({
      to: custEmail,
      subject: `🤝 Technician Assigned: ${job.title} - LankaVision Pro`,
      html: custHtml,
      text: `Technician ${tech.name} (${tech.phone}) accepted your job: ${job.title}`
    });
  }

  // 2. To Admin
  const adminHtml = emailWrapper('Job Claimed', `
    <h2 style="color:#fbbf24;margin-top:0;font-size:18px">📋 Job Claimed!</h2>
    <p>Technician කෙනෙක් Job එකක් භාරගෙන (claim කර) ඇත.</p>
    <div class="detail-card">
      <div class="row"><span class="lbl">Job Title</span><span class="val">${esc(job.title)}</span></div>
      <div class="row"><span class="lbl">Location</span><span class="val">${esc(loc)}</span></div>
      <div class="row"><span class="lbl">Technician</span><span class="val" style="color:#60a5fa">${esc(tech.name)} (${esc(tech.phone || '')})</span></div>
      <div class="row"><span class="lbl">Customer</span><span class="val">${esc(job.customerName || '')} (${esc(job.customerPhone || '')})</span></div>
    </div>
  `);
  sendEmailNotification({
    to: ADMIN_EMAILS,
    subject: `📋 Job Claimed: ${job.title} by ${tech.name}`,
    html: adminHtml,
    text: `Job ${job.title} claimed by ${tech.name} (${tech.phone})`
  });
}

// Trigger 5: Job Completed -> Notify Customer
async function notifyJobCompleted(job) {
  let custEmail = job.customerEmail || '';
  if (!custEmail && job.postedBy && job.postedBy !== 'guest') {
    try {
      const uDoc = await db.collection('users').doc(job.postedBy).get();
      if (uDoc.exists) custEmail = uDoc.data().email || '';
    } catch (e) {}
  }

  if (custEmail) {
    const custHtml = emailWrapper('Job Completed', `
      <h2 style="color:#a855f7;margin-top:0;font-size:18px">⭐ Job Completed!</h2>
      <p>ආයුබෝවන් <strong>${esc(job.customerName || 'Customer')}</strong>, ඔබගේ <strong>${esc(job.title)}</strong> job එක සාර්ථකව අවසන් කළ බව සටහන් විය.</p>
      <p>LankaVision Pro සේවාව භාවිත කළාට ස්තූතියි! තවත් CCTV හෝ Satellite සේවාවක් අවශ්‍ය නම් ඕනෑම වෙලාවක අප හා සම්බන්ධ වන්න.</p>
    `);
    sendEmailNotification({
      to: custEmail,
      subject: `⭐ Job Completed: ${job.title} - LankaVision Pro`,
      html: custHtml,
      text: `Your job ${job.title} has been marked completed. Thank you for choosing LankaVision Pro.`
    });
  }
}

// ── INIT ───────────────────────────────────────────────────────
function initApp() {
  if (appInitialized) return;
  appInitialized = true;

  populateAllDistricts();

  // Show skip button after 1.5s if auth not resolved
  setTimeout(() => {
    const skipBtn = document.getElementById('btn-skip-loading');
    if (skipBtn && !authResolved) skipBtn.style.opacity = '1';
  }, 1500);

  // Safety fallback
  setTimeout(() => {
    if (!authResolved) {
      authResolved = true;
      showScreen('screen-landing');
    }
  }, 2500);

  if (typeof auth !== 'undefined' && auth) {
    auth.onAuthStateChanged(async (user) => {
      authResolved = true;
      if (user) {
        currentUser = user;
        await loadUserData(user.uid);
      } else {
        currentUser = null;
        currentUserData = null;
        showScreen('screen-landing');
      }
    }, (error) => {
      console.error('Auth error:', error);
      authResolved = true;
      showScreen('screen-landing');
    });
  } else {
    authResolved = true;
    showScreen('screen-landing');
  }

  document.addEventListener('click', e => {
    const dd = document.getElementById('nav-dropdown');
    const btn = document.getElementById('menu-btn');
    if (dd && btn && !dd.contains(e.target) && !btn.contains(e.target)) {
      dd.classList.add('hidden');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// ── DISTRICTS ─────────────────────────────────────────────────
function populateAllDistricts() {
  ['tech-district','job-district','edit-district','edit-tech-district'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const firstOpt = el.querySelector('option');
    el.innerHTML = '';
    if (firstOpt) el.appendChild(firstOpt.cloneNode(true));
    SL_DISTRICTS.forEach(d => {
      const o = document.createElement('option');
      o.value = d; o.textContent = d;
      el.appendChild(o);
    });
  });

  const adm = document.getElementById('adm-filter-district');
  if (adm) {
    adm.innerHTML = '<option value="all">All Districts</option>';
    SL_DISTRICTS.forEach(d => {
      const o = document.createElement('option');
      o.value = d; o.textContent = d;
      adm.appendChild(o);
    });
  }
}

// ── SCREENS ───────────────────────────────────────────────────
function showScreen(id) {
  if (id !== 'screen-register') {
    stopTechCamera();
  }
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) { el.classList.add('active'); }
  window.scrollTo(0, 0);

  if (id === 'screen-post-job') {
    setTimeout(initPostJobMap, 200);
    updatePostJobScreen();
  }
}

function goBack() {
  if (!currentUser || !currentUserData) { showScreen('screen-landing'); return; }
  if (currentUserData.role === 'admin') showScreen('screen-admin');
  else showScreen('screen-dashboard');
}

// ── AUTH ──────────────────────────────────────────────────────
async function loadUserData(uid) {
  try {
    const fetchDoc = db.collection('users').doc(uid).get();
    const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 10000));
    const doc = await Promise.race([fetchDoc, timeout]);

    if (!doc.exists) {
      if (currentUser && currentUser.email && currentUser.email.toLowerCase() === MAIN_ADMIN_EMAIL.toLowerCase()) {
        currentUserData = { id: uid, name: 'Main Administrator', email: currentUser.email, role: 'admin', isMainAdmin: true };
        showScreen('screen-admin');
        initAdminDashboard();
        return;
      }
      showScreen('screen-landing');
      return;
    }

    currentUserData = { id: doc.id, ...doc.data() };

    // Extra safety: ensure Main Admin always gets admin screen
    if (currentUser && currentUser.email && currentUser.email.toLowerCase() === MAIN_ADMIN_EMAIL.toLowerCase()) {
      currentUserData.role = 'admin';
      currentUserData.isMainAdmin = true;
    }

    switch (currentUserData.role) {
      case 'admin':
        showScreen('screen-admin');
        initAdminDashboard();
        break;
      case 'technician':
        if (currentUserData.status === 'pending') {
          showScreen('screen-pending');
        } else if (currentUserData.status === 'rejected') {
          showToast('ඔබේ application reject කරා. Admin ගෙන් confirm කරගන්න.', 'error');
          handleLogout();
        } else {
          showScreen('screen-dashboard');
          initTechDashboard();
        }
        break;
      default:
        showScreen('screen-dashboard');
        initCustomerDashboard();
    }
  } catch (err) {
    console.error('loadUserData error:', err);
    if (currentUser && currentUser.email && currentUser.email.toLowerCase() === MAIN_ADMIN_EMAIL.toLowerCase()) {
      currentUserData = { id: uid, name: 'Main Administrator', email: currentUser.email, role: 'admin', isMainAdmin: true };
      showScreen('screen-admin');
      initAdminDashboard();
      return;
    }
    showScreen('screen-landing');
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const rawEmail = document.getElementById('login-email').value;
  const rawPassword = document.getElementById('login-password').value;
  const email = (rawEmail || '').trim();
  const password = (rawPassword || '').trim();
  const errEl = document.getElementById('login-error');
  const btn = document.getElementById('login-btn');

  errEl.classList.add('hidden');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';

  try {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (primaryErr) {
      // If primary sign-in failed, check for common casing mistake (e.g. 'l' vs 'L' in password)
      const altPassword = password.startsWith('l')
        ? 'L' + password.slice(1)
        : (password.startsWith('L') ? 'l' + password.slice(1) : null);

      if (altPassword) {
        await auth.signInWithEmailAndPassword(email, altPassword);
      } else {
        throw primaryErr;
      }
    }
  } catch (err) {
    console.error('Login error:', err.code, err.message);
    errEl.textContent = authErr(err.code);
    errEl.classList.remove('hidden');
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
  }
}

async function handleCustomerRegister(e) {
  e.preventDefault();
  const name = document.getElementById('cust-name').value.trim();
  const phone = document.getElementById('cust-phone').value.trim();
  const email = document.getElementById('cust-email').value.trim();
  const password = document.getElementById('cust-password').value;
  const errEl = document.getElementById('cust-error');
  errEl.classList.add('hidden');

  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection('users').doc(cred.user.uid).set({
      name, phone, email, role: 'customer',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    showToast('Account හදාගත්තා! 🎉', 'success');
  } catch (err) {
    errEl.textContent = authErr(err.code);
    errEl.classList.remove('hidden');
  }
}

// ── TECHNICIAN LIVE CAMERA CAPTURE ────────────────────────────
let techCameraStream = null;
let techCameraFacingMode = 'user'; // default front-facing selfie camera
let capturedTechSelfieDataUrl = null;

async function startTechCamera() {
  const errEl = document.getElementById('selfie-error');
  if (errEl) errEl.classList.add('hidden');

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (errEl) {
      errEl.textContent = 'ඔබගේ Browser එක කැමරා භාවිතයට සහය නොදක්වයි. (Camera not supported in this browser).';
      errEl.classList.remove('hidden');
    }
    showToast('Camera not supported in this browser', 'error');
    return;
  }

  stopTechCamera();

  const constraints = {
    video: {
      facingMode: techCameraFacingMode,
      width: { ideal: 640 },
      height: { ideal: 640 }
    },
    audio: false
  };

  try {
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (e1) {
      // Fallback to generic video device
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    }

    techCameraStream = stream;
    const video = document.getElementById('tech-selfie-video');
    if (video) {
      video.srcObject = stream;
      await video.play().catch(() => {});
    }

    document.getElementById('selfie-idle')?.classList.add('hidden');
    document.getElementById('selfie-camera-wrap')?.classList.remove('hidden');
    document.getElementById('selfie-preview-wrap')?.classList.add('hidden');
  } catch (err) {
    console.error('Camera access error:', err);
    if (errEl) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errEl.textContent = 'කැමරාව Access කිරීමට අවසර නොලැබුණි (Permission Denied). කරුණාකර Browser settings වලින් Camera permission ලබා දී නැවත උත්සාහ කරන්න.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errEl.textContent = 'කැමරාවක් හමු නොවීය. කරුණාකර Device එකෙහි කැමරාවක් තිබේදැයි පරීක්ෂා කරන්න.';
      } else {
        errEl.textContent = 'කැමරාව On කිරීමේදී දෝෂයක් ඇතිවිය: ' + (err.message || 'Error accessing camera');
      }
      errEl.classList.remove('hidden');
    }
    showToast('Camera permission required for selfie verification', 'error');
  }
}

function stopTechCamera() {
  if (techCameraStream) {
    techCameraStream.getTracks().forEach(track => {
      try { track.stop(); } catch(e) {}
    });
    techCameraStream = null;
  }
  const video = document.getElementById('tech-selfie-video');
  if (video) {
    video.srcObject = null;
  }
}

async function switchTechCamera() {
  techCameraFacingMode = (techCameraFacingMode === 'user') ? 'environment' : 'user';
  await startTechCamera();
}

function captureTechSelfie() {
  const video = document.getElementById('tech-selfie-video');
  const canvas = document.getElementById('tech-selfie-canvas');
  const errEl = document.getElementById('selfie-error');
  if (errEl) errEl.classList.add('hidden');

  if (!video || !canvas || !video.videoWidth) {
    showToast('Camera is not ready yet', 'error');
    return;
  }

  const vWidth = video.videoWidth;
  const vHeight = video.videoHeight;
  const targetSize = 480;
  canvas.width = targetSize;
  canvas.height = targetSize;

  const ctx = canvas.getContext('2d');
  const minDim = Math.min(vWidth, vHeight);
  const startX = (vWidth - minDim) / 2;
  const startY = (vHeight - minDim) / 2;

  // Mirror horizontally if user-facing so captured photo matches preview
  if (techCameraFacingMode === 'user') {
    ctx.translate(targetSize, 0);
    ctx.scale(-1, 1);
  }

  ctx.drawImage(video, startX, startY, minDim, minDim, 0, 0, targetSize, targetSize);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
  capturedTechSelfieDataUrl = dataUrl;

  const previewImg = document.getElementById('tech-selfie-preview-img');
  if (previewImg) {
    previewImg.src = dataUrl;
  }

  stopTechCamera();

  document.getElementById('selfie-camera-wrap')?.classList.add('hidden');
  document.getElementById('selfie-idle')?.classList.add('hidden');
  document.getElementById('selfie-preview-wrap')?.classList.remove('hidden');

  showToast('Live Selfie Capture කළා! 🎉', 'success');
}

function retakeTechSelfie() {
  capturedTechSelfieDataUrl = null;
  const previewImg = document.getElementById('tech-selfie-preview-img');
  if (previewImg) previewImg.src = '';
  document.getElementById('selfie-preview-wrap')?.classList.add('hidden');
  startTechCamera();
}

function previewPhoto(url, title) {
  if (!url) return;
  const modal = document.getElementById('modal-photo-preview');
  const img = document.getElementById('modal-photo-img');
  const titleEl = document.getElementById('modal-photo-title');
  const capEl = document.getElementById('modal-photo-caption');
  if (!modal || !img) return;
  img.src = url;
  if (titleEl) {
    titleEl.innerHTML = `<i class="fas fa-id-badge" style="color:var(--primary-l)"></i> <span>${esc(title || 'Technician Photo')}</span>`;
  }
  if (capEl) {
    capEl.innerHTML = '<i class="fas fa-check-circle" style="color:var(--success)"></i> Verified Live Selfie · Camera එකෙන්ම ලබාගත් ඡායාරූපයකි';
  }
  modal.classList.remove('hidden');
}

async function handleTechRegister(e) {
  e.preventDefault();
  const name = document.getElementById('tech-name').value.trim();
  const phone = document.getElementById('tech-phone').value.trim();
  const email = document.getElementById('tech-email').value.trim();
  const password = document.getElementById('tech-password').value;
  const district = document.getElementById('tech-district').value;
  const citySelect = document.getElementById('tech-city');
  let city = citySelect?.value || '';
  if (city === '__other__') {
    city = document.getElementById('tech-city-custom')?.value.trim() || '';
  }
  const serviceType = document.querySelector('input[name="svc-type"]:checked')?.value;
  const errEl = document.getElementById('tech-error');
  errEl.classList.add('hidden');

  if (!district) { errEl.textContent = 'District Select කරන්න.'; errEl.classList.remove('hidden'); return; }
  if (!serviceType) { errEl.textContent = 'Service Type Select කරන්න.'; errEl.classList.remove('hidden'); return; }

  // Strictly enforce live selfie capture
  if (!capturedTechSelfieDataUrl) {
    const selfieErr = document.getElementById('selfie-error');
    if (selfieErr) {
      selfieErr.textContent = 'කරුණාකර Camera එකෙන් ඔබගේ Live Selfie එකක් ලබාගන්න (Selfie photo required).';
      selfieErr.classList.remove('hidden');
    }
    errEl.textContent = 'කරුණාකර Camera එකෙන් Selfie ඡායාරූපය ලබාගන්න (Selfie is required).';
    errEl.classList.remove('hidden');
    document.getElementById('tech-selfie-box')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection('users').doc(cred.user.uid).set({
      name, phone, email, role: 'technician',
      district, city, serviceType,
      photoUrl: capturedTechSelfieDataUrl,
      status: 'pending',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    const selfieData = capturedTechSelfieDataUrl;
    stopTechCamera();
    capturedTechSelfieDataUrl = null;
    showToast('Application submit කළා! Admin approve වෙනතුරු wait කරන්න.', 'success');
    await notifyTechRegistered({ name, phone, email, district, city, serviceType, photoUrl: selfieData });
  } catch (err) {
    console.error('handleTechRegister error:', err);
    errEl.textContent = authErr(err.code);
    errEl.classList.remove('hidden');
  }
}

async function handleLogout() {
  stopTechCamera();
  await auth.signOut();
  currentUser = null; currentUserData = null;
  showScreen('screen-landing');
}

// ── REGISTER NAV ──────────────────────────────────────────────
function showRegisterOptions() { showScreen('screen-register'); showRegisterRoleSelect(); }
function showRegisterRoleSelect() {
  stopTechCamera();
  document.getElementById('reg-role-select').classList.remove('hidden');
  ['reg-cust-form','reg-tech-form'].forEach(id => document.getElementById(id)?.classList.add('hidden'));
}
function showRegisterForm(type) {
  if (type !== 'technician') {
    stopTechCamera();
  }
  document.getElementById('reg-role-select').classList.add('hidden');
  document.getElementById('reg-cust-form').classList.toggle('hidden', type !== 'customer');
  document.getElementById('reg-tech-form').classList.toggle('hidden', type !== 'technician');
}

// ── CUSTOMER DASHBOARD ────────────────────────────────────────
function initCustomerDashboard() {
  document.getElementById('nav-user-name').textContent = currentUserData.name;
  document.getElementById('fab-post').classList.remove('hidden');

  document.getElementById('dash-tabs').innerHTML = `
    <button class="tab-btn active" data-tab="jobs" onclick="showCustTab('jobs')"><i class="fas fa-briefcase"></i> My Jobs</button>
    <button class="tab-btn" data-tab="post" onclick="showCustTab('post')"><i class="fas fa-plus"></i> Post Job</button>
    <button class="tab-btn" data-tab="profile" onclick="showCustTab('profile')"><i class="fas fa-user"></i> Profile</button>`;
  showCustTab('jobs');
}

function showCustTab(tab) {
  setActiveTab('dash-tabs', tab);
  const c = document.getElementById('dash-content');
  if (tab === 'jobs') {
    c.innerHTML = `<div class="filter-bar"><h2 style="font-size:1rem;font-weight:800;margin:0"><i class="fas fa-briefcase" style="color:var(--primary-l)"></i> My Posted Jobs</h2></div><div id="cust-jobs" class="jobs-grid"><div class="empty-state" style="grid-column:1/-1"><i class="fas fa-spinner fa-spin"></i><p>Loading...</p></div></div>`;
    loadCustomerJobs();
  } else if (tab === 'post') {
    showScreen('screen-post-job');
  } else {
    c.innerHTML = renderProfileCard();
  }
}

async function loadCustomerJobs() {
  try {
    const snap = await db.collection('jobs').where('postedBy', '==', currentUser.uid).get();
    const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
    const el = document.getElementById('cust-jobs');
    if (!el) return;
    if (!docs.length) {
      el.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-briefcase"></i><p>Job post කර නැත.</p><button class="btn btn-primary" style="margin-top:14px" onclick="showScreen('screen-post-job')"><i class="fas fa-plus"></i> First Job Post කරන්න</button></div>`;
      return;
    }
    el.innerHTML = docs.map(j => jobCard(j.id, j, 'customer')).join('');
  } catch (err) { console.error(err); }
}

function goToMyJobs() {
  document.getElementById('nav-dropdown').classList.add('hidden');
  if (!currentUserData) return;
  if (currentUserData.role === 'technician') showTechTab('claims');
  else showCustTab('jobs');
}

function goToProfile() {
  document.getElementById('nav-dropdown').classList.add('hidden');
  document.getElementById('dash-content').innerHTML = renderProfileCard();
}

// ── TECHNICIAN DASHBOARD ──────────────────────────────────────
function initTechDashboard() {
  document.getElementById('nav-user-name').textContent = currentUserData.name;
  document.getElementById('fab-post').classList.remove('hidden');

  document.getElementById('dash-tabs').innerHTML = `
    <button class="tab-btn active" data-tab="avail" onclick="showTechTab('avail')"><i class="fas fa-list"></i> Available Jobs</button>
    <button class="tab-btn" data-tab="claims" onclick="showTechTab('claims')"><i class="fas fa-handshake"></i> My Claimed</button>
    <button class="tab-btn" data-tab="post" onclick="showTechTab('post')"><i class="fas fa-plus"></i> Post Job</button>
    <button class="tab-btn" data-tab="profile" onclick="showTechTab('profile')"><i class="fas fa-user"></i> Profile</button>`;
  showTechTab('avail');
}

function showTechTab(tab) {
  setActiveTab('dash-tabs', tab);
  const c = document.getElementById('dash-content');
  if (tab === 'avail') {
    c.innerHTML = `
      <div class="filter-bar" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
        <div>
          <h2 style="font-size:1rem;font-weight:800;margin:0"><i class="fas fa-map-marker-alt" style="color:var(--primary-l)"></i> Available Jobs</h2>
          <p style="font-size:.78rem;color:var(--txt3);margin-top:2px">
            <span class="type-badge ${esc(currentUserData.serviceType)}">${esc(currentUserData.serviceType)}</span>
            · Base: <strong>${esc(currentUserData.city ? `${currentUserData.district}, ${currentUserData.city}` : currentUserData.district)}</strong>
          </p>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <select id="tech-scope-filter" onchange="loadTechJobs()" style="background:var(--card);border:1px solid var(--border);color:var(--txt);padding:7px 14px;border-radius:8px;font-size:.82rem;font-weight:600;cursor:pointer">
            <option value="all_nearby" selected>🌐 ඔබේ දිස්ත්‍රික්කය + ළඟම ප්‍රදේශ (Nearby)</option>
            <option value="my_district">📍 මගේ දිස්ත්‍රික්කය පමණක් (${esc(currentUserData.district)})</option>
          </select>
        </div>
      </div>
      <div id="tech-avail" class="jobs-grid"><div class="empty-state" style="grid-column:1/-1"><i class="fas fa-spinner fa-spin"></i><p>Loading...</p></div></div>`;
    loadTechJobs();
  } else if (tab === 'claims') {
    c.innerHTML = `<div class="filter-bar"><h2 style="font-size:1rem;font-weight:800;margin:0"><i class="fas fa-handshake" style="color:var(--success)"></i> My Claimed Jobs</h2></div><div id="tech-claims" class="jobs-grid"><div class="empty-state" style="grid-column:1/-1"><i class="fas fa-spinner fa-spin"></i><p>Loading...</p></div></div>`;
    loadTechClaims();
  } else if (tab === 'post') {
    showScreen('screen-post-job');
  } else {
    c.innerHTML = renderProfileCard();
  }
}

async function loadTechJobs() {
  try {
    const scope = document.getElementById('tech-scope-filter')?.value || 'all_nearby';
    const techDistrict = currentUserData.district;
    const techCity = currentUserData.city;
    const techCoords = (techCity && CITY_COORDS[techCity]) || (techDistrict && DISTRICT_COORDS[techDistrict]);

    // Fetch open jobs
    const snap = await db.collection('jobs')
      .where('status', '==', 'open')
      .get();

    let docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    // Filter by service type
    if (currentUserData.serviceType !== 'Both') {
      docs = docs.filter(j => j.type === currentUserData.serviceType);
    }

    const nearbyDistricts = NEARBY_DISTRICTS[techDistrict] || [];

    // Filter by location scope
    docs = docs.filter(j => {
      // 1. Same district is always included
      if (j.district === techDistrict) return true;

      // If user selected "my_district only", exclude outside jobs
      if (scope === 'my_district') return false;

      // 2. Must be an adjacent neighboring district
      if (!nearbyDistricts.includes(j.district)) return false;

      // 3. Distance check: if coords available, must be within ~65 km
      const jobLat = j.location?.lat || (j.city && CITY_COORDS[j.city]?.[0]) || (j.district && DISTRICT_COORDS[j.district]?.[0]);
      const jobLng = j.location?.lng || (j.city && CITY_COORDS[j.city]?.[1]) || (j.district && DISTRICT_COORDS[j.district]?.[1]);

      if (techCoords && jobLat && jobLng) {
        const dist = calcDistanceKm(techCoords[0], techCoords[1], jobLat, jobLng);
        j._distanceKm = dist;
        return dist !== null ? dist <= 65 : true;
      }

      return true;
    });

    // Compute distance for any remaining jobs for sorting & badge display
    docs.forEach(j => {
      if (j._distanceKm === undefined) {
        const jobLat = j.location?.lat || (j.city && CITY_COORDS[j.city]?.[0]) || (j.district && DISTRICT_COORDS[j.district]?.[0]);
        const jobLng = j.location?.lng || (j.city && CITY_COORDS[j.city]?.[1]) || (j.district && DISTRICT_COORDS[j.district]?.[1]);
        if (techCoords && jobLat && jobLng) {
          j._distanceKm = calcDistanceKm(techCoords[0], techCoords[1], jobLat, jobLng);
        }
      }
    });

    // Sort: Same district first, then by distance / date
    docs.sort((a, b) => {
      const aSame = a.district === techDistrict ? 0 : 1;
      const bSame = b.district === techDistrict ? 0 : 1;
      if (aSame !== bSame) return aSame - bSame;
      if (a._distanceKm != null && b._distanceKm != null && a._distanceKm !== b._distanceKm) {
        return a._distanceKm - b._distanceKm;
      }
      return (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0);
    });

    const el = document.getElementById('tech-avail');
    if (!el) return;
    if (!docs.length) {
      el.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-search"></i><p>ඔබේ ප්‍රදේශයේ හෝ ළඟම ප්‍රදේශවල open jobs නැත.</p></div>`;
      return;
    }
    el.innerHTML = docs.map(j => jobCard(j.id, j, 'tech')).join('');
  } catch (err) {
    console.error(err);
    const el = document.getElementById('tech-avail');
    if (el) el.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-exclamation-triangle"></i><p>Error loading. <a href="#" onclick="loadTechJobs()" style="color:var(--primary-l)">Retry</a></p></div>`;
  }
}

async function loadTechClaims() {
  try {
    const snap = await db.collection('jobs').where('claimedBy', '==', currentUser.uid).get();
    const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
    const el = document.getElementById('tech-claims');
    if (!el) return;
    if (!docs.length) {
      el.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-handshake"></i><p>Claimed jobs නැත.</p></div>`;
      return;
    }
    el.innerHTML = docs.map(j => jobCard(j.id, j, 'tech-claimed')).join('');
  } catch (err) { console.error(err); }
}

// ── JOB CARD ──────────────────────────────────────────────────
function jobCard(id, job, view) {
  const ago = timeAgo(job.createdAt?.toDate?.());
  const myJob = job.claimedBy === currentUser?.uid;
  const showPhone = view === 'customer' || view === 'tech-claimed' || myJob || view === 'admin';

  let locationBadge = '';
  if (view === 'tech' && currentUserData?.role === 'technician') {
    const isHome = job.district === currentUserData.district;
    if (isHome) {
      locationBadge = `<span class="badge" style="background:rgba(16,185,129,0.15);color:#34d399;font-size:.72rem;padding:2px 8px;border-radius:6px"><i class="fas fa-map-pin"></i> ඔබේ දිස්ත්‍රික්කය</span>`;
    } else {
      locationBadge = `<span class="badge" style="background:rgba(59,130,246,0.15);color:#60a5fa;font-size:.72rem;padding:2px 8px;border-radius:6px"><i class="fas fa-car-side"></i> ළඟම ප්‍රදේශය${job._distanceKm ? ` (~${job._distanceKm} km)` : ''}</span>`;
    }
  }

  const phoneHtml = showPhone
    ? `<div class="jc-phone" style="border-color:rgba(16,185,129,0.2);background:rgba(16,185,129,0.05)">
         <i class="fas fa-phone" style="color:var(--success)"></i>
         <span class="phone-visible">${esc(job.customerPhone)}</span>
         <div class="jc-contact-group" style="margin-left:auto">
           <a href="tel:${esc(job.customerPhone)}" class="btn btn-success btn-sm"><i class="fas fa-phone"></i> Call</a>
           <a href="https://wa.me/94${cleanPhone(job.customerPhone)}" target="_blank" class="btn btn-whatsapp btn-sm"><i class="fab fa-whatsapp"></i> WhatsApp</a>
         </div>
       </div>`
    : `<div class="jc-phone">
         <i class="fas fa-lock" style="color:var(--txt3)"></i>
         <span class="phone-hidden">${maskPhone(job.customerPhone)}</span>
         <span style="margin-left:auto;font-size:.72rem;color:var(--txt3)">🔒 Accept කළ පසු පෙනේ</span>
       </div>`;

  // Assigned Technician Card for Customer view
  let assignedTechCardHtml = '';
  if (view === 'customer' && (job.status === 'claimed' || job.status === 'completed' || job.claimedByName)) {
    const techName = job.claimedByName || 'Technician';
    const techPhone = job.claimedByPhone || '';
    const techPhoto = job.claimedByPhoto || '';
    const cleanTechPhone = cleanPhone(techPhone);

    const avatarHtml = techPhoto
      ? `<img src="${techPhoto}" class="assigned-tech-img" alt="${esc(techName)}" onclick="event.stopPropagation();previewPhoto('${techPhoto}', '${esc(techName)} - Technician Selfie')" title="Click to view full photo" />`
      : `<div class="assigned-tech-initial">${(techName || 'T').charAt(0).toUpperCase()}</div>`;

    assignedTechCardHtml = `
    <div class="assigned-tech-card" onclick="openJobModal('${id}')">
      <div class="assigned-tech-photo-wrap" onclick="event.stopPropagation();if('${techPhoto}') previewPhoto('${techPhoto}', '${esc(techName)} - Technician Selfie')">
        ${avatarHtml}
        <div class="assigned-tech-verify-badge" title="Verified Technician"><i class="fas fa-check"></i></div>
      </div>
      <div class="assigned-tech-details">
        <div class="assigned-tech-lbl"><i class="fas fa-user-check"></i> භාරගත් Technician</div>
        <div class="assigned-tech-name">${esc(techName)}</div>
        ${techPhone ? `
        <div class="assigned-tech-actions">
          <a href="tel:${esc(techPhone)}" class="btn btn-success btn-sm" onclick="event.stopPropagation()"><i class="fas fa-phone"></i> Call</a>
          <a href="https://wa.me/94${cleanTechPhone}" target="_blank" class="btn btn-whatsapp btn-sm" onclick="event.stopPropagation()"><i class="fab fa-whatsapp"></i> WhatsApp</a>
        </div>` : ''}
      </div>
    </div>`;
  }

  let actions = '';
  if (view === 'tech' && job.status === 'open') {
    const mapBtn = job.location?.lat ? `<button class="btn btn-maps btn-sm" onclick="openJobModal('${id}')"><i class="fas fa-map-marker-alt"></i> Map</button>` : '';
    actions = `<button class="btn btn-primary btn-sm" onclick="claimJob('${id}',event)"><i class="fas fa-handshake"></i> Accept Job</button>${mapBtn}`;
  } else if (view === 'tech-claimed' || (myJob && view !== 'customer')) {
    const mapBtn = job.location?.lat ? `<button class="btn btn-maps btn-sm" onclick="openJobModal('${id}')"><i class="fas fa-map-marker-alt"></i> Map</button>` : '';
    actions = `<button class="btn btn-success btn-sm" onclick="markComplete('${id}')"><i class="fas fa-check"></i> Complete</button>${mapBtn}`;
  } else if (view === 'customer') {
    const mapBtn = job.location?.lat ? `<button class="btn btn-maps btn-sm" onclick="openJobModal('${id}')"><i class="fas fa-map-marker-alt"></i> View Map</button>` : '';
    actions = `<button class="btn btn-ghost btn-sm" onclick="openJobModal('${id}')"><i class="fas fa-eye"></i> View</button>${mapBtn}`;
  } else if (view === 'admin') {
    const mapBtn = job.location?.lat ? `<button class="btn btn-maps btn-sm" onclick="openJobModal('${id}')"><i class="fas fa-map-marker-alt"></i> Map</button>` : '';
    actions = `<button class="btn btn-ghost btn-sm" onclick="openJobModal('${id}')"><i class="fas fa-eye"></i> View</button>
               <button class="btn btn-warning btn-sm" onclick="openEditJobModal('${id}')"><i class="fas fa-edit"></i> Edit</button>
               <button class="btn btn-danger btn-sm" onclick="deleteJob('${id}')"><i class="fas fa-trash"></i></button>
               ${mapBtn}`;
  }

  return `
  <div class="job-card type-${esc(job.type)}" id="jc-${id}">
    <div class="jc-header">
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
        <span class="type-badge ${esc(job.type)}"><i class="fas fa-${job.type === 'CCTV' ? 'video' : 'satellite-dish'}"></i> ${esc(job.type)}</span>
        ${locationBadge}
      </div>
      <span class="status-badge s-${esc(job.status)}">${statusLabel(job.status)}</span>
    </div>
    <div class="jc-title">${esc(job.title)}</div>
    <div class="jc-desc">${esc(job.description)}</div>
    <div class="jc-meta">
      <span class="meta-item"><i class="fas fa-map-marker-alt"></i>${esc(job.city ? `${job.district}, ${job.city}` : job.district)}</span>
      ${job._distanceKm && (!currentUserData || job.district !== currentUserData.district) ? `<span class="meta-item" style="color:var(--primary-l)"><i class="fas fa-route"></i>~${job._distanceKm} km දුර</span>` : ''}
      <span class="meta-item"><i class="fas fa-user"></i>${esc(job.customerName || 'Customer')}</span>
      <span class="meta-item"><i class="fas fa-clock"></i>${ago}</span>
      ${job.claimedByName ? `<span class="meta-item"><i class="fas fa-tools"></i>${esc(job.claimedByName)}</span>` : ''}
    </div>
    ${view === 'customer' && assignedTechCardHtml ? assignedTechCardHtml : phoneHtml}
    <div class="jc-actions">${actions}</div>
  </div>`;
}

function statusLabel(s) {
  const labels = { open: '🟢 Open', claimed: '🟡 Claimed', completed: '✅ Completed', cancelled: '🔴 Cancelled' };
  return labels[s] || s;
}

function maskPhone(p) {
  if (!p) return '07X XXX XXXX';
  const s = String(p).replace(/\s+/g, '');
  return s.length >= 4 ? s.slice(0, 3) + 'X XXX XXXX' : 'XXXXXXXXXX';
}

function cleanPhone(p) {
  if (!p) return '';
  let s = String(p).replace(/\D/g, '');
  if (s.startsWith('0')) s = s.slice(1);
  return s;
}

// ── JOB ACTIONS ───────────────────────────────────────────────
async function claimJob(jobId, e) {
  if (e) e.stopPropagation();
  if (!currentUser || !currentUserData) { showToast('Login කරන්න', 'error'); return; }

  try {
    const ref = db.collection('jobs').doc(jobId);
    const doc = await ref.get();
    if (!doc.exists || doc.data().status !== 'open') {
      showToast('Job no longer available', 'error'); return;
    }
    const jobData = doc.data();

    await ref.update({
      status: 'claimed',
      claimedBy: currentUser.uid,
      claimedByName: currentUserData.name,
      claimedByPhone: currentUserData.phone || '',
      claimedByPhoto: currentUserData.photoUrl || '',
      claimedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    showToast('Job Accept! 🎉 Phone number reveal වෙලා!', 'success');
    openJobModal(jobId);
    if (document.getElementById('tech-avail')) loadTechJobs();

    notifyJobClaimed(jobData, currentUserData);
  } catch (err) {
    console.error(err);
    showToast('Failed to accept job. Try again.', 'error');
  }
}

async function markComplete(jobId) {
  try {
    const doc = await db.collection('jobs').doc(jobId).get();
    const jobData = doc.exists ? doc.data() : null;

    await db.collection('jobs').doc(jobId).update({
      status: 'completed',
      completedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    showToast('Job complete! ✅', 'success');
    if (document.getElementById('tech-claims')) loadTechClaims();

    if (jobData) {
      notifyJobCompleted(jobData);
    }
  } catch (err) { showToast('Failed to update', 'error'); }
}

// ── JOB MODAL ─────────────────────────────────────────────────
async function openJobModal(jobId) {
  try {
    const doc = await db.collection('jobs').doc(jobId).get();
    if (!doc.exists) return;
    const job = doc.data();

    const isAdmin = currentUserData?.role === 'admin';
    const isMine  = job.claimedBy === currentUser?.uid;
    const isOwner = job.postedBy  === currentUser?.uid;
    const showPhone = isAdmin || isMine || isOwner;

    const phoneHtml = showPhone
      ? `<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
           <span style="font-size:1.1rem;font-weight:800;color:var(--success);font-family:monospace">${esc(job.customerPhone)}</span>
           <a href="tel:${esc(job.customerPhone)}" class="btn btn-success btn-sm"><i class="fas fa-phone"></i> Call</a>
           <a href="https://wa.me/94${cleanPhone(job.customerPhone)}" target="_blank" class="btn btn-whatsapp btn-sm"><i class="fab fa-whatsapp"></i> WhatsApp</a>
         </div>`
      : `<span class="phone-hidden" style="font-size:.95rem">${maskPhone(job.customerPhone)}</span>
         <p style="font-size:.76rem;color:var(--txt3);margin-top:4px">🔒 Job accept කළ පසු reveal වේ</p>`;

    let mapHtml = '';
    if (job.location?.lat) {
      const gmapUrl = `https://www.google.com/maps?q=${job.location.lat},${job.location.lng}`;
      const navUrl  = `https://www.google.com/maps/dir/?api=1&destination=${job.location.lat},${job.location.lng}`;
      mapHtml = `
        <div class="modal-map-box" id="modal-map-el"></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
          <a href="${gmapUrl}" target="_blank" class="btn btn-maps btn-sm"><i class="fas fa-map-marker-alt"></i> View on Google Maps</a>
          <a href="${navUrl}" target="_blank" class="btn btn-success btn-sm"><i class="fas fa-directions"></i> Get Directions</a>
        </div>`;
    }

    // Assigned Technician Card for Modal
    let techCardModalHtml = '';
    if (job.claimedByName || job.claimedBy) {
      let techPhoto = job.claimedByPhoto || '';
      if (!techPhoto && job.claimedBy) {
        try {
          const uDoc = await db.collection('users').doc(job.claimedBy).get();
          if (uDoc.exists && uDoc.data().photoUrl) {
            techPhoto = uDoc.data().photoUrl;
          }
        } catch (e) {}
      }

      const techName = job.claimedByName || 'Technician';
      const techPhone = job.claimedByPhone || '';
      const cleanTechPhone = cleanPhone(techPhone);

      const avatarHtml = techPhoto
        ? `<img src="${techPhoto}" class="assigned-tech-img" alt="${esc(techName)}" onclick="previewPhoto('${techPhoto}','${esc(techName)} - Technician Selfie')" />`
        : `<div class="assigned-tech-initial">${(techName || 'T').charAt(0).toUpperCase()}</div>`;

      techCardModalHtml = `
        <div class="modal-tech-card">
          <div class="modal-tech-photo-wrap" onclick="if('${techPhoto}') previewPhoto('${techPhoto}','${esc(techName)} - Technician Selfie')">
            ${avatarHtml}
            <div class="assigned-tech-verify-badge" title="Verified Technician"><i class="fas fa-check"></i></div>
          </div>
          ${techPhoto ? `<div class="modal-tech-zoom-hint" onclick="previewPhoto('${techPhoto}','${esc(techName)} - Technician Selfie')"><i class="fas fa-search-plus"></i> Photo එක විශාල කර බලන්න (Click to enlarge)</div>` : ''}
          <div>
            <div class="assigned-tech-lbl"><i class="fas fa-user-check"></i> භාරගත් Technician (Assigned Technician)</div>
            <div style="font-size:1.15rem;font-weight:800;color:var(--txt);margin-top:2px">${esc(techName)}</div>
            ${techPhone ? `<div style="font-size:.92rem;font-weight:700;color:var(--success);font-family:monospace;margin-top:4px"><i class="fas fa-phone"></i> ${esc(techPhone)}</div>` : ''}
          </div>
          ${techPhone ? `
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;width:100%">
            <a href="tel:${esc(techPhone)}" class="btn btn-success btn-sm"><i class="fas fa-phone"></i> Call Technician</a>
            <a href="https://wa.me/94${cleanTechPhone}" target="_blank" class="btn btn-whatsapp btn-sm"><i class="fab fa-whatsapp"></i> WhatsApp Chat</a>
          </div>` : ''}
          <div style="font-size:.78rem;color:var(--txt2);background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:8px;padding:8px 12px;width:100%">
            <i class="fas fa-info-circle" style="color:var(--primary-l)"></i> මෙම Technician ඔබගේ Job එක භාරගෙන ඇති අතර ඉතා ඉක්මනින් ඔබව සම්බන්ධ කරගනු ඇත.
          </div>
        </div>`;
    }

    document.getElementById('modal-job-body').innerHTML = `
      <h2 style="margin-bottom:8px;padding-right:28px">${esc(job.title)}</h2>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px">
        <span class="type-badge ${esc(job.type)}"><i class="fas fa-${job.type === 'CCTV' ? 'video' : 'satellite-dish'}"></i> ${esc(job.type)}</span>
        <span class="status-badge s-${esc(job.status)}">${statusLabel(job.status)}</span>
      </div>
      ${mapHtml}
      ${techCardModalHtml}
      <div style="display:grid;gap:10px">
        <div class="detail-box"><div class="dl">Description</div><div class="dv">${esc(job.description)}</div></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div class="detail-box"><div class="dl">District / City</div><div class="dv">${esc(job.city ? `${job.district}, ${job.city}` : job.district)}</div></div>
          <div class="detail-box"><div class="dl">Customer</div><div class="dv">${esc(job.customerName || 'N/A')}</div></div>
        </div>
        <div class="detail-box" style="background:${showPhone ? 'rgba(16,185,129,.07)' : 'rgba(255,255,255,.03)'};border-color:${showPhone ? 'rgba(16,185,129,.2)' : 'var(--border)'}">
          <div class="dl"><i class="fas fa-phone"></i> Phone Number</div>
          ${phoneHtml}
        </div>
        ${!techCardModalHtml && job.claimedByName ? `<div class="detail-box" style="background:rgba(245,158,11,.07);border-color:rgba(245,158,11,.2)"><div class="dl">Claimed by</div><div class="dv" style="color:var(--accent)">${esc(job.claimedByName)}</div></div>` : ''}
        ${isAdmin ? `<button class="btn btn-warning btn-full" onclick="closeModal('modal-job');openEditJobModal('${jobId}')"><i class="fas fa-edit"></i> Edit This Job</button>` : ''}
      </div>`;

    document.getElementById('modal-job').classList.remove('hidden');

    if (job.location?.lat) {
      setTimeout(() => {
        if (modalMap) { modalMap.remove(); modalMap = null; }
        modalMap = L.map('modal-map-el').setView([job.location.lat, job.location.lng], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(modalMap);
        L.marker([job.location.lat, job.location.lng]).addTo(modalMap);
      }, 120);
    }
  } catch (err) { console.error(err); }
}

function closeModal(id) {
  document.getElementById(id)?.classList.add('hidden');
  if (id === 'modal-job' || id === 'all') {
    if (modalMap) { modalMap.remove(); modalMap = null; }
  }
}

// ── ADMIN EDIT JOB ────────────────────────────────────────────
async function openEditJobModal(jobId) {
  try {
    const doc = await db.collection('jobs').doc(jobId).get();
    if (!doc.exists) return;
    const j = doc.data();

    document.getElementById('edit-job-id').value = jobId;
    document.getElementById('edit-title').value = j.title || '';
    document.getElementById('edit-desc').value = j.description || '';
    document.getElementById('edit-district').value = j.district || '';
    onEditDistrictChange(j.city || '');
    document.getElementById('edit-cust-name').value = j.customerName || '';
    document.getElementById('edit-cust-phone').value = j.customerPhone || '';
    document.getElementById('edit-status').value = j.status || 'open';

    const typeRadio = document.querySelector(`input[name="edit-job-type"][value="${j.type}"]`);
    if (typeRadio) typeRadio.checked = true;

    document.getElementById('edit-job-error').classList.add('hidden');
    document.getElementById('modal-edit-job').classList.remove('hidden');
  } catch (err) { console.error(err); showToast('Failed to load job', 'error'); }
}

async function handleEditJobSubmit(e) {
  e.preventDefault();
  const jobId = document.getElementById('edit-job-id').value;
  const title = document.getElementById('edit-title').value.trim();
  const desc  = document.getElementById('edit-desc').value.trim();
  const district = document.getElementById('edit-district').value;
  const editCitySelect = document.getElementById('edit-city');
  let city = editCitySelect?.value || '';
  if (city === '__other__') {
    city = document.getElementById('edit-city-custom')?.value.trim() || '';
  }
  const custName  = document.getElementById('edit-cust-name').value.trim();
  const custPhone = document.getElementById('edit-cust-phone').value.trim();
  const status    = document.getElementById('edit-status').value;
  const jobType   = document.querySelector('input[name="edit-job-type"]:checked')?.value;
  const errEl = document.getElementById('edit-job-error');
  const btn   = document.getElementById('edit-job-btn');
  errEl.classList.add('hidden');

  if (!jobType) { errEl.textContent = 'Job Type select කරන්න.'; errEl.classList.remove('hidden'); return; }
  if (!district) { errEl.textContent = 'District select කරන්න.'; errEl.classList.remove('hidden'); return; }

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

  try {
    await db.collection('jobs').doc(jobId).update({
      title, description: desc, type: jobType, district,
      city: city || '',
      customerName: custName, customerPhone: custPhone,
      status, updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    showToast('Job update කළා! ✅', 'success');
    closeModal('modal-edit-job');
    loadAllJobsAdmin();
    loadAdminStats();
  } catch (err) {
    errEl.textContent = 'Failed to save. Try again.';
    errEl.classList.remove('hidden');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
  }
}

// ── ADMIN EDIT TECHNICIAN ─────────────────────────────────────
async function openEditTechModal(uid) {
  try {
    const doc = await db.collection('users').doc(uid).get();
    if (!doc.exists) return;
    const t = doc.data();

    document.getElementById('edit-tech-id').value = uid;
    document.getElementById('edit-tech-name').value = t.name || '';
    document.getElementById('edit-tech-phone').value = t.phone || '';
    document.getElementById('edit-tech-district').value = t.district || '';
    onEditTechDistrictChange(t.city || '');
    document.getElementById('edit-tech-status').value = t.status || 'pending';

    const svcRadio = document.querySelector(`input[name="edit-svc"][value="${t.serviceType}"]`);
    if (svcRadio) svcRadio.checked = true;

    document.getElementById('edit-tech-error').classList.add('hidden');
    document.getElementById('modal-edit-tech').classList.remove('hidden');
  } catch (err) { console.error(err); showToast('Failed to load tech', 'error'); }
}

async function handleEditTechSubmit(e) {
  e.preventDefault();
  const uid = document.getElementById('edit-tech-id').value;
  const name = document.getElementById('edit-tech-name').value.trim();
  const phone = document.getElementById('edit-tech-phone').value.trim();
  const district = document.getElementById('edit-tech-district').value;
  const editCitySelect = document.getElementById('edit-tech-city');
  let city = editCitySelect?.value || '';
  if (city === '__other__') {
    city = document.getElementById('edit-tech-city-custom')?.value.trim() || '';
  }
  const serviceType = document.querySelector('input[name="edit-svc"]:checked')?.value;
  const status = document.getElementById('edit-tech-status').value;
  const errEl = document.getElementById('edit-tech-error');
  errEl.classList.add('hidden');

  if (!serviceType) { errEl.textContent = 'Service type select කරන්න.'; errEl.classList.remove('hidden'); return; }

  try {
    await db.collection('users').doc(uid).update({
      name, phone, district, city, serviceType, status,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    showToast('Technician update කළා! ✅', 'success');
    closeModal('modal-edit-tech');
    loadAllTechs();
    loadAdminStats();
  } catch (err) {
    errEl.textContent = 'Failed to save.';
    errEl.classList.remove('hidden');
  }
}

// ── POST JOB ──────────────────────────────────────────────────
function updatePostJobScreen() {
  const gs = document.getElementById('guest-section');
  if (gs) gs.classList.toggle('hidden', !!(currentUser && currentUserData));
}

function initPostJobMap() {
  const el = document.getElementById('post-job-map');
  if (!el) return;
  if (postJobMap) { postJobMap.remove(); postJobMap = null; }

  postJobMap = L.map('post-job-map').setView([7.8731, 80.7718], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(postJobMap);

  let marker = null;
  postJobMap.on('click', ev => {
    const { lat, lng } = ev.latlng;
    selectedLoc = { lat, lng };
    if (marker) marker.remove();
    marker = L.marker([lat, lng]).addTo(postJobMap);
    const ld = document.getElementById('loc-display');
    const lt = document.getElementById('loc-text');
    if (ld && lt) {
      ld.classList.remove('hidden');
      lt.textContent = `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`;
    }
  });
}

function onDistrictChange() {
  const d = document.getElementById('job-district').value;
  const group = document.getElementById('job-city-group');
  const citySelect = document.getElementById('job-city');
  const customInput = document.getElementById('job-city-custom');

  if (d && DISTRICT_COORDS[d] && postJobMap) {
    postJobMap.setView(DISTRICT_COORDS[d], 11);
  }

  if (d && DISTRICT_CITIES[d]) {
    citySelect.innerHTML = '<option value="">City / Town තෝරන්න</option>';
    DISTRICT_CITIES[d].forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      citySelect.appendChild(opt);
    });
    const otherOpt = document.createElement('option');
    otherOpt.value = '__other__';
    otherOpt.textContent = '✏️ වෙනත් (Other Town)...';
    citySelect.appendChild(otherOpt);

    group?.classList.remove('hidden');
    citySelect.value = '';
    customInput?.classList.add('hidden');
    if (customInput) customInput.value = '';
  } else {
    group?.classList.add('hidden');
    customInput?.classList.add('hidden');
    if (citySelect) citySelect.innerHTML = '<option value="">City / Town තෝරන්න</option>';
  }
}

function onCityChange() {
  const citySelect = document.getElementById('job-city');
  const customInput = document.getElementById('job-city-custom');
  if (!citySelect) return;

  if (citySelect.value === '__other__') {
    customInput?.classList.remove('hidden');
    customInput?.focus();
  } else {
    customInput?.classList.add('hidden');
    if (customInput) customInput.value = '';
  }

  const c = citySelect.value;
  if (c && CITY_COORDS[c] && postJobMap) {
    postJobMap.setView(CITY_COORDS[c], 13);
  }
}

function onTechDistrictChange() {
  const d = document.getElementById('tech-district').value;
  const group = document.getElementById('tech-city-group');
  const citySelect = document.getElementById('tech-city');
  const customInput = document.getElementById('tech-city-custom');

  if (d && DISTRICT_CITIES[d]) {
    citySelect.innerHTML = '<option value="">City / Town තෝරන්න</option>';
    DISTRICT_CITIES[d].forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      citySelect.appendChild(opt);
    });
    const otherOpt = document.createElement('option');
    otherOpt.value = '__other__';
    otherOpt.textContent = '✏️ වෙනත් (Other Town)...';
    citySelect.appendChild(otherOpt);

    group?.classList.remove('hidden');
    citySelect.value = '';
    customInput?.classList.add('hidden');
    if (customInput) customInput.value = '';
  } else {
    group?.classList.add('hidden');
    customInput?.classList.add('hidden');
    if (citySelect) citySelect.innerHTML = '<option value="">City / Town තෝරන්න</option>';
  }
}

function onTechCityChange() {
  const citySelect = document.getElementById('tech-city');
  const customInput = document.getElementById('tech-city-custom');
  if (!citySelect) return;

  if (citySelect.value === '__other__') {
    customInput?.classList.remove('hidden');
    customInput?.focus();
  } else {
    customInput?.classList.add('hidden');
    if (customInput) customInput.value = '';
  }
}

function onEditTechDistrictChange(selectedCity = '') {
  const d = document.getElementById('edit-tech-district').value;
  const group = document.getElementById('edit-tech-city-group');
  const citySelect = document.getElementById('edit-tech-city');
  const customInput = document.getElementById('edit-tech-city-custom');

  if (d && DISTRICT_CITIES[d]) {
    citySelect.innerHTML = '<option value="">Select City / Town</option>';
    let cityFound = false;
    DISTRICT_CITIES[d].forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      citySelect.appendChild(opt);
      if (c === selectedCity) cityFound = true;
    });
    const otherOpt = document.createElement('option');
    otherOpt.value = '__other__';
    otherOpt.textContent = '✏️ Other...';
    citySelect.appendChild(otherOpt);

    group?.classList.remove('hidden');

    if (selectedCity) {
      if (cityFound) {
        citySelect.value = selectedCity;
        customInput?.classList.add('hidden');
      } else {
        citySelect.value = '__other__';
        customInput?.classList.remove('hidden');
        if (customInput) customInput.value = selectedCity;
      }
    } else {
      citySelect.value = '';
      customInput?.classList.add('hidden');
      if (customInput) customInput.value = '';
    }
  } else {
    group?.classList.add('hidden');
    customInput?.classList.add('hidden');
    if (citySelect) citySelect.innerHTML = '<option value="">Select City / Town</option>';
  }
}

function onEditTechCityChange() {
  const citySelect = document.getElementById('edit-tech-city');
  const customInput = document.getElementById('edit-tech-city-custom');
  if (!citySelect) return;

  if (citySelect.value === '__other__') {
    customInput?.classList.remove('hidden');
    customInput?.focus();
  } else {
    customInput?.classList.add('hidden');
    if (customInput) customInput.value = '';
  }
}

function onEditDistrictChange(selectedCity = '') {
  const d = document.getElementById('edit-district').value;
  const group = document.getElementById('edit-city-group');
  const citySelect = document.getElementById('edit-city');
  const customInput = document.getElementById('edit-city-custom');

  if (d && DISTRICT_CITIES[d]) {
    citySelect.innerHTML = '<option value="">Select City / Town</option>';
    let cityFound = false;
    DISTRICT_CITIES[d].forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      citySelect.appendChild(opt);
      if (c === selectedCity) cityFound = true;
    });
    const otherOpt = document.createElement('option');
    otherOpt.value = '__other__';
    otherOpt.textContent = '✏️ Other...';
    citySelect.appendChild(otherOpt);

    group?.classList.remove('hidden');

    if (selectedCity) {
      if (cityFound) {
        citySelect.value = selectedCity;
        customInput?.classList.add('hidden');
      } else {
        citySelect.value = '__other__';
        customInput?.classList.remove('hidden');
        if (customInput) customInput.value = selectedCity;
      }
    } else {
      citySelect.value = '';
      customInput?.classList.add('hidden');
      if (customInput) customInput.value = '';
    }
  } else {
    group?.classList.add('hidden');
    customInput?.classList.add('hidden');
    if (citySelect) citySelect.innerHTML = '<option value="">Select City / Town</option>';
  }
}

function onEditCityChange() {
  const citySelect = document.getElementById('edit-city');
  const customInput = document.getElementById('edit-city-custom');
  if (!citySelect) return;

  if (citySelect.value === '__other__') {
    customInput?.classList.remove('hidden');
    customInput?.focus();
  } else {
    customInput?.classList.add('hidden');
    if (customInput) customInput.value = '';
  }
}

async function handlePostJob(e) {
  e.preventDefault();
  const jobType   = document.querySelector('input[name="job-type"]:checked')?.value;
  const title     = document.getElementById('job-title').value.trim();
  const desc      = document.getElementById('job-desc').value.trim();
  const district  = document.getElementById('job-district').value;
  const citySelect = document.getElementById('job-city');
  let city = citySelect?.value || '';
  if (city === '__other__') {
    city = document.getElementById('job-city-custom')?.value.trim() || '';
  }
  const custName  = document.getElementById('cust-name-job').value.trim();
  const custPhone = document.getElementById('cust-phone-job').value.trim();
  const guestEmail = document.getElementById('guest-email')?.value.trim() || '';
  const customerEmail = currentUser?.email || guestEmail;
  const errEl = document.getElementById('post-job-error');
  errEl.classList.add('hidden');

  if (!jobType)    { errEl.textContent = 'CCTV හෝ Satellite select කරන්න.'; errEl.classList.remove('hidden'); return; }
  if (!district)   { errEl.textContent = 'District select කරන්න.'; errEl.classList.remove('hidden'); return; }
  if (!selectedLoc){ errEl.textContent = 'Map එකෙන් location pin කරන්න.'; errEl.classList.remove('hidden'); return; }

  let posterName = currentUserData?.name || '';
  let postedBy   = currentUser?.uid || 'guest';

  if (!currentUser) {
    const gn = document.getElementById('guest-name')?.value.trim();
    const gp = document.getElementById('guest-phone')?.value.trim();
    if (!gn || !gp) { errEl.textContent = 'ඔබේ නම සහ phone number ඇතුළු කරන්න.'; errEl.classList.remove('hidden'); return; }
    posterName = gn;
  }

  const btn = document.getElementById('post-job-btn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting...';

  try {
    const newJobData = {
      title, description: desc, type: jobType, district,
      city: city || '',
      location: { lat: selectedLoc.lat, lng: selectedLoc.lng },
      customerName:  custName || posterName,
      customerPhone: custPhone,
      customerEmail: customerEmail || '',
      postedBy, postedByName: posterName,
      status: 'open',
      claimedBy: null, claimedByName: null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('jobs').add(newJobData);

    showToast('Job post කළා! 🎉', 'success');
    notifyNewJobPosted(newJobData);
    e.target.reset();
    selectedLoc = null;
    document.getElementById('job-city-group')?.classList.add('hidden');
    document.getElementById('job-city-custom')?.classList.add('hidden');
    document.getElementById('loc-display')?.classList.add('hidden');
    setTimeout(goBack, 800);
  } catch (err) {
    console.error('Post job error:', err);
    const msg = err.code === 'permission-denied'
      ? 'Firebase Permission Error: Firestore rules allow නොකරයි. Firebase Console → Firestore → Rules update කරන්න.'
      : (err.message || 'Failed to post job. Try again.');
    errEl.textContent = msg;
    errEl.classList.remove('hidden');
    showToast(err.code || 'Post failed', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Job Post කරන්න';
  }
}

// ── ADMIN DASHBOARD ───────────────────────────────────────────
function initAdminDashboard() {
  const isMain = (currentUser?.email === MAIN_ADMIN_EMAIL) || !!currentUserData?.isMainAdmin;
  const pill = document.querySelector('.admin-pill');
  if (pill) {
    pill.innerHTML = isMain 
      ? '<i class="fas fa-crown" style="color:#fbbf24"></i> Main Admin' 
      : '<i class="fas fa-shield-alt"></i> Admin';
  }
  loadAdminStats();
  loadPendingTechs();
  loadAllJobsAdmin();
  loadAllTechs();
  loadAllAdmins();
  showAdminTab('overview');
}

async function loadAdminStats() {
  try {
    const [pendSnap, openSnap, techSnap, doneSnap] = await Promise.all([
      db.collection('users').where('role', '==', 'technician').where('status', '==', 'pending').get(),
      db.collection('jobs').where('status', '==', 'open').get(),
      db.collection('users').where('role', '==', 'technician').where('status', '==', 'approved').get(),
      db.collection('jobs').where('status', '==', 'completed').get()
    ]);
    document.getElementById('st-pending').textContent = pendSnap.size;
    document.getElementById('st-open').textContent    = openSnap.size;
    document.getElementById('st-techs').textContent   = techSnap.size;
    document.getElementById('st-done').textContent    = doneSnap.size;
    document.getElementById('pending-count').textContent = pendSnap.size;

    const recentSnap = await db.collection('jobs').get();
    const recent = recentSnap.docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0))
      .slice(0, 8);

    const el = document.getElementById('recent-jobs-list');
    if (!el) return;
    if (!recent.length) { el.innerHTML = '<div class="empty-state"><i class="fas fa-briefcase"></i><p>Jobs නැත</p></div>'; return; }
    el.innerHTML = recent.map(j => `
      <div class="recent-row">
        <div>
          <div class="recent-row-title">${esc(j.title)}</div>
          <div class="recent-row-meta">
            <span class="type-badge ${esc(j.type)}" style="font-size:.7rem;padding:2px 8px">${esc(j.type)}</span>
            ${esc(j.city ? `${j.district}, ${j.city}` : j.district)} · ${timeAgo(j.createdAt?.toDate?.())}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="status-badge s-${esc(j.status)}">${statusLabel(j.status)}</span>
          <button class="btn btn-ghost btn-sm" onclick="openJobModal('${j.id}')"><i class="fas fa-eye"></i></button>
        </div>
      </div>`).join('');
  } catch (err) { console.error(err); }
}

async function loadPendingTechs() {
  try {
    const snap = await db.collection('users').where('role', '==', 'technician').where('status', '==', 'pending').get();
    const el = document.getElementById('pending-list');
    if (!el) return;
    if (snap.empty) { el.innerHTML = '<div class="empty-state"><i class="fas fa-check-circle" style="color:var(--success)"></i><p>Pending applications නැත</p></div>'; return; }
    el.innerHTML = snap.docs.map(d => techCardHtml(d.id, d.data(), 'pending')).join('');
  } catch (err) { console.error(err); }
}

async function loadAllJobsAdmin() {
  try {
    const snap = await db.collection('jobs').get();
    allAdminJobs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
    renderAdminJobs(allAdminJobs);
  } catch (err) { console.error(err); }
}

function filterAdminJobs() {
  const st  = document.getElementById('adm-filter-status').value;
  const typ = document.getElementById('adm-filter-type').value;
  const dis = document.getElementById('adm-filter-district').value;
  const filtered = allAdminJobs.filter(j =>
    (st  === 'all' || j.status   === st)  &&
    (typ === 'all' || j.type     === typ) &&
    (dis === 'all' || j.district === dis)
  );
  renderAdminJobs(filtered);
}

function renderAdminJobs(jobs) {
  const el = document.getElementById('admin-jobs-list');
  if (!el) return;
  if (!jobs.length) { el.innerHTML = '<div class="empty-state"><i class="fas fa-briefcase"></i><p>Jobs නැත</p></div>'; return; }
  el.innerHTML = jobs.map(j => `
    <div class="adm-job-row">
      <div>
        <div style="font-weight:700;font-size:.9rem">${esc(j.title)}</div>
        <div style="font-size:.76rem;color:var(--txt3);margin-top:3px">
          <i class="fas fa-user"></i> ${esc(j.customerName || 'N/A')} &nbsp;|&nbsp;
          <i class="fas fa-phone" style="color:var(--success)"></i>
          <span class="adm-phone">${esc(j.customerPhone)}</span>
        </div>
      </div>
      <div>
        <span class="type-badge ${esc(j.type)}" style="font-size:.73rem">${esc(j.type)}</span>
        <div style="font-size:.73rem;color:var(--txt3);margin-top:3px">${esc(j.city ? `${j.district}, ${j.city}` : j.district)}</div>
      </div>
      <div>
        <span class="status-badge s-${esc(j.status)}">${statusLabel(j.status)}</span>
        ${j.claimedByName ? `<div style="font-size:.7rem;color:var(--txt3);margin-top:3px">${esc(j.claimedByName)}</div>` : ''}
      </div>
      <div style="font-size:.75rem;color:var(--txt3)">${timeAgo(j.createdAt?.toDate?.())}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <button class="btn btn-ghost btn-sm" onclick="openJobModal('${j.id}')"><i class="fas fa-eye"></i></button>
        <button class="btn btn-warning btn-sm" onclick="openEditJobModal('${j.id}')"><i class="fas fa-edit"></i></button>
        <button class="btn btn-danger btn-sm" onclick="deleteJob('${j.id}')"><i class="fas fa-trash"></i></button>
        ${j.location?.lat ? `<button class="btn btn-maps btn-sm" onclick="openJobModal('${j.id}')"><i class="fas fa-map-marker-alt"></i></button>` : ''}
      </div>
    </div>`).join('');
}

async function deleteJob(jobId) {
  if (!confirm('Job delete කරන්නද? Undo කළ නොහැකිය.')) return;
  try {
    await db.collection('jobs').doc(jobId).delete();
    showToast('Job delete කළා', 'info');
    loadAllJobsAdmin(); loadAdminStats();
  } catch (err) { showToast('Failed to delete', 'error'); }
}

async function loadAllTechs() {
  try {
    const snap = await db.collection('users').where('role', '==', 'technician').get();
    allTechs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
    renderTechs(allTechs);
  } catch (err) { console.error(err); }
}

function filterTechnicians() {
  const st  = document.getElementById('adm-tech-filter').value;
  const svc = document.getElementById('adm-tech-svc').value;
  const filtered = allTechs.filter(t =>
    (st  === 'all' || t.status      === st) &&
    (svc === 'all' || t.serviceType === svc)
  );
  renderTechs(filtered);
}

function renderTechs(techs) {
  const el = document.getElementById('technicians-list');
  if (!el) return;
  if (!techs.length) { el.innerHTML = '<div class="empty-state"><i class="fas fa-users"></i><p>Technicians නැත</p></div>'; return; }
  el.innerHTML = techs.map(t => techCardHtml(t.id, t, 'admin')).join('');
}

function techCardHtml(id, t, context) {
  const statusColor = t.status === 'approved' ? 'var(--success)' : t.status === 'pending' ? 'var(--warning)' : 'var(--danger)';
  const statusIcon  = t.status === 'approved' ? '✅' : t.status === 'pending' ? '⏳' : '❌';

  let actions = '';
  if (context === 'pending') {
    actions = `
      <button class="btn btn-success btn-sm" onclick="approveTech('${id}')"><i class="fas fa-check"></i> Approve</button>
      <button class="btn btn-danger btn-sm" onclick="rejectTech('${id}')"><i class="fas fa-times"></i> Reject</button>
      <button class="btn btn-warning btn-sm" onclick="openEditTechModal('${id}')"><i class="fas fa-edit"></i> Edit</button>`;
  } else {
    if (t.status !== 'approved') actions += `<button class="btn btn-success btn-sm" onclick="approveTech('${id}')"><i class="fas fa-check"></i> Approve</button>`;
    if (t.status === 'approved') actions += `<button class="btn btn-warning btn-sm" onclick="suspendTech('${id}')"><i class="fas fa-ban"></i> Suspend</button>`;
    actions += `<button class="btn btn-ghost btn-sm" onclick="openEditTechModal('${id}')"><i class="fas fa-edit"></i> Edit</button>`;
    actions += `<button class="btn btn-danger btn-sm" onclick="deleteTech('${id}')"><i class="fas fa-trash"></i></button>`;
  }

  const avHtml = t.photoUrl
    ? `<img src="${t.photoUrl}" alt="${esc(t.name)}" onclick="previewPhoto('${t.photoUrl}','${esc(t.name)} - Technician Selfie')" title="Click to enlarge selfie" />`
    : `${(t.name || 'T').charAt(0).toUpperCase()}`;

  return `
  <div class="tech-card" id="tc-${id}">
    <div class="tech-info">
      <div class="tech-av" ${t.photoUrl ? `onclick="previewPhoto('${t.photoUrl}','${esc(t.name)} - Technician Selfie')"` : ''}>${avHtml}</div>
      <div style="flex:1">
        <div class="tech-name">${esc(t.name)} <span style="font-size:.72rem;color:${statusColor};font-weight:700">${statusIcon} ${t.status}</span></div>
        <div class="tech-meta">
          <span><i class="fas fa-phone"></i> ${esc(t.phone)}</span>
          <span><i class="fas fa-envelope"></i> ${esc(t.email)}</span>
          <span><i class="fas fa-map-marker-alt"></i> ${esc(t.city ? `${t.district}, ${t.city}` : t.district)}</span>
          <span class="type-badge ${esc(t.serviceType)}" style="font-size:.7rem;padding:2px 8px">${esc(t.serviceType)}</span>
          ${t.photoUrl ? `<span style="color:#34d399;font-weight:700;cursor:pointer" onclick="previewPhoto('${t.photoUrl}','${esc(t.name)} - Selfie')"><i class="fas fa-camera"></i> Selfie Verified</span>` : ''}
        </div>
        <div style="font-size:.7rem;color:var(--txt3);margin-top:3px">Applied: ${timeAgo(t.createdAt?.toDate?.())}</div>
      </div>
    </div>
    <div class="tech-actions">${actions}</div>
  </div>`;
}

async function approveTech(uid) {
  try {
    const doc = await db.collection('users').doc(uid).get();
    const techData = doc.exists ? doc.data() : null;

    await db.collection('users').doc(uid).update({ status: 'approved', approvedAt: firebase.firestore.FieldValue.serverTimestamp() });
    showToast('Technician approved! ✅', 'success');
    document.getElementById(`tc-${uid}`)?.remove();
    loadAdminStats(); loadAllTechs();

    if (techData && techData.email) {
      notifyTechApproved(techData);
    }
  } catch (err) { showToast('Failed to approve', 'error'); }
}

async function rejectTech(uid) {
  if (!confirm('Reject this application?')) return;
  try {
    await db.collection('users').doc(uid).update({ status: 'rejected', rejectedAt: firebase.firestore.FieldValue.serverTimestamp() });
    showToast('Application rejected', 'info');
    document.getElementById(`tc-${uid}`)?.remove();
    loadAdminStats(); loadAllTechs();
  } catch (err) { showToast('Failed to reject', 'error'); }
}

async function suspendTech(uid) {
  if (!confirm('Suspend this technician?')) return;
  try {
    await db.collection('users').doc(uid).update({ status: 'rejected' });
    showToast('Technician suspended', 'warning');
    loadAllTechs(); loadAdminStats();
  } catch (err) { showToast('Failed to suspend', 'error'); }
}

async function deleteTech(uid) {
  if (!confirm('Technician account permanently delete කරන්නද?')) return;
  try {
    await db.collection('users').doc(uid).delete();
    showToast('Technician deleted', 'info');
    loadAllTechs(); loadAdminStats();
  } catch (err) { showToast('Failed to delete', 'error'); }
}

function showAdminTab(tab) {
  document.querySelectorAll('.admin-tabs .tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.atab').forEach(c => c.classList.remove('active'));
  document.getElementById(`atab-${tab}`)?.classList.add('active');
  if (tab === 'admins') {
    loadAllAdmins();
  }
}

// ── ADMIN MANAGEMENT ──────────────────────────────────────────
async function loadAllAdmins() {
  const el = document.getElementById('admins-list');
  if (!el) return;
  try {
    const snap = await db.collection('users').where('role', '==', 'admin').get();
    let admins = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    // Sort: Main Admin first, then alphabetical or by date
    admins.sort((a, b) => {
      const aIsMain = (a.email === MAIN_ADMIN_EMAIL || a.isMainAdmin) ? 1 : 0;
      const bIsMain = (b.email === MAIN_ADMIN_EMAIL || b.isMainAdmin) ? 1 : 0;
      if (aIsMain !== bIsMain) return bIsMain - aIsMain;
      return (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0);
    });

    if (!admins.length) {
      el.innerHTML = '<div class="empty-state"><i class="fas fa-users-cog"></i><p>Admins නැත</p></div>';
      return;
    }

    el.innerHTML = admins.map(a => {
      const isMain = a.email === MAIN_ADMIN_EMAIL || a.isMainAdmin;
      const isSelf = currentUser && (a.id === currentUser.uid || a.email === currentUser.email);
      const roleBadge = isMain
        ? `<span class="badge" style="background:rgba(245,158,11,0.18);color:#fbbf24;border:1px solid rgba(245,158,11,0.4);font-size:.74rem;padding:3px 10px"><i class="fas fa-crown"></i> Main Admin</span>`
        : `<span class="badge" style="background:rgba(59,130,246,0.15);color:#60a5fa;border:1px solid rgba(59,130,246,0.3);font-size:.74rem;padding:3px 10px"><i class="fas fa-shield-alt"></i> Sub-Admin</span>`;

      let actionBtn = '';
      if (isMain) {
        actionBtn = `<span style="font-size:.75rem;color:#f59e0b;font-weight:700;display:flex;align-items:center;gap:5px"><i class="fas fa-lock"></i> Protected</span>`;
      } else if (isSelf) {
        actionBtn = `<span style="font-size:.75rem;color:var(--txt3);font-weight:600">(ඔබගේ ගිණුම)</span>`;
      } else {
        actionBtn = `<button class="btn btn-danger btn-sm" onclick="deleteAdminUser('${a.id}','${esc(a.email)}')"><i class="fas fa-trash"></i> Remove</button>`;
      }

      return `
        <div class="admin-card ${isMain ? 'is-main' : ''}">
          <div style="display:flex;align-items:center;gap:14px;min-width:0">
            <div class="admin-av">${isMain ? '👑' : (a.name || 'A').charAt(0).toUpperCase()}</div>
            <div style="min-width:0">
              <div class="admin-title">
                <span>${esc(a.name || 'Admin')}</span>
                ${roleBadge}
              </div>
              <div class="admin-meta">
                <span><i class="fas fa-envelope"></i> ${esc(a.email)}</span>
                ${a.createdAt ? `<span><i class="fas fa-calendar-alt"></i> Added: ${timeAgo(a.createdAt?.toDate?.())}</span>` : ''}
                ${a.createdBy ? `<span><i class="fas fa-user-plus"></i> By: ${esc(a.createdBy)}</span>` : ''}
              </div>
            </div>
          </div>
          <div>${actionBtn}</div>
        </div>`;
    }).join('');
  } catch (err) {
    console.error('loadAllAdmins error:', err);
    el.innerHTML = `<div class="empty-state" style="color:var(--danger)"><i class="fas fa-exclamation-triangle"></i><p>Admins load error: ${esc(err.message)}</p></div>`;
  }
}

function openCreateAdminModal() {
  document.getElementById('create-admin-form')?.reset();
  document.getElementById('create-admin-error')?.classList.add('hidden');
  document.getElementById('modal-create-admin')?.classList.remove('hidden');
}

async function handleCreateAdminSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('new-admin-name').value.trim();
  const email = document.getElementById('new-admin-email').value.trim();
  const password = document.getElementById('new-admin-password').value;
  const errEl = document.getElementById('create-admin-error');
  const btn = document.getElementById('create-admin-btn');
  errEl.classList.add('hidden');

  if (!name || !email || !password) {
    errEl.textContent = 'සියලු තොරතුරු ඇතුලත් කරන්න.';
    errEl.classList.remove('hidden');
    return;
  }
  if (password.length < 6) {
    errEl.textContent = 'Password එක අවම වශයෙන් characters 6ක් විය යුතුය.';
    errEl.classList.remove('hidden');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> සාදමින් පවතී...';

  try {
    const res = await fetch('/api/create-admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Admin ගිණුම සෑදීම අසාර්ථක විය.');
    }

    const newUid = data.uid;

    // Save to Firestore under users/{uid}
    await db.collection('users').doc(newUid).set({
      name,
      email,
      role: 'admin',
      isMainAdmin: false,
      createdBy: currentUser?.email || 'lankavisionadmin@gmail.com',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    showToast(`නව Admin (${email}) සාර්ථකව සාදන ලදී! 🎉`, 'success');

    // Send Welcome Email
    sendEmailNotification({
      to: email,
      subject: '🛡️ LankaVision Pro Admin Access Granted',
      html: emailWrapper('Admin Account Created', `
        <h2 style="color:#60a5fa;margin-top:0">🛡️ New Admin Account</h2>
        <p>ආයුබෝවන් <strong>${esc(name)}</strong>, ඔබව LankaVision Pro පද්ධතියේ Administrator කෙනෙකු ලෙස පත් කර ඇත.</p>
        <div class="detail-card">
          <div class="row"><span class="lbl">Email</span><span class="val">${esc(email)}</span></div>
          <div class="row"><span class="lbl">Password</span><span class="val" style="font-family:monospace;color:#38bdf8">${esc(password)}</span></div>
          <div class="row"><span class="lbl">Role</span><span class="val">Administrator</span></div>
        </div>
        <p style="color:#94a3b8;font-size:13px">පද්ධතියට Log වී ඔබගේ කළමනාකරණ කටයුතු සිදු කළ හැකිය.</p>
        <div style="text-align:center;margin-top:20px">
          <a href="http://localhost:8080/index.html" class="btn-link">Login to Admin Panel</a>
        </div>
      `),
      text: `Your LankaVision Pro Admin account has been created. Email: ${email}, Password: ${password}`
    });

    closeModal('modal-create-admin');
    loadAllAdmins();
  } catch (err) {
    console.error('handleCreateAdminSubmit error:', err);
    errEl.textContent = err.message || 'Error occurred while creating admin.';
    errEl.classList.remove('hidden');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-check"></i> Account එක හදන්න';
  }
}

async function deleteAdminUser(uid, email) {
  if (email === MAIN_ADMIN_EMAIL) {
    showToast('Main Admin account එක delete කළ නොහැක!', 'error');
    return;
  }
  if (currentUser && (uid === currentUser.uid || email === currentUser.email)) {
    showToast('ඔබගේම Admin ගිණුම delete කළ නොහැක.', 'error');
    return;
  }
  if (!confirm(`Admin ගිණුම (${email}) පද්ධතියෙන් ඉවත් කිරීමට අවශ්‍යද?`)) return;

  try {
    await db.collection('users').doc(uid).delete();
    showToast('Admin ගිණුම ඉවත් කරන ලදී.', 'info');
    loadAllAdmins();
  } catch (err) {
    console.error('deleteAdminUser error:', err);
    showToast('Admin ඉවත් කිරීම අසාර්ථකයි: ' + err.message, 'error');
  }
}

// ── PROFILE ───────────────────────────────────────────────────
function renderProfileCard() {
  if (!currentUserData) return '';
  const u = currentUserData;
  const statusColor = u.status === 'approved' ? 'var(--success)' : u.status === 'pending' ? 'var(--warning)' : 'var(--danger)';
  const avStyle = u.photoUrl
    ? `background-image:url(${u.photoUrl});background-size:cover;background-position:center;border:2.5px solid var(--primary-l);cursor:pointer;`
    : '';
  return `
  <div class="profile-wrap">
    <div class="panel">
      <div class="profile-av" style="${avStyle}" ${u.photoUrl ? `onclick="previewPhoto('${u.photoUrl}','${esc(u.name)} - Selfie')"` : ''}>
        ${u.photoUrl ? '' : (u.name || 'U').charAt(0).toUpperCase()}
      </div>
      <h2 style="text-align:center;margin-bottom:24px">${esc(u.name)}</h2>
      <div class="profile-row"><label><i class="fas fa-envelope"></i> Email</label><span>${esc(u.email)}</span></div>
      ${u.phone ? `<div class="profile-row"><label><i class="fas fa-phone"></i> Phone</label><span>${esc(u.phone)}</span></div>` : ''}
      <div class="profile-row"><label><i class="fas fa-user-tag"></i> Role</label><span style="text-transform:capitalize">${esc(u.role)}</span></div>
      ${u.district ? `<div class="profile-row"><label><i class="fas fa-map-marker-alt"></i> District / City</label><span>${esc(u.city ? `${u.district}, ${u.city}` : u.district)}</span></div>` : ''}
      ${u.serviceType ? `<div class="profile-row"><label><i class="fas fa-tools"></i> Service</label><span class="type-badge ${esc(u.serviceType)}" style="font-size:.85rem">${esc(u.serviceType)}</span></div>` : ''}
      ${u.status ? `<div class="profile-row"><label><i class="fas fa-circle"></i> Status</label><span style="color:${statusColor};font-weight:700">${u.status}</span></div>` : ''}
      ${u.photoUrl ? `<div class="profile-row"><label><i class="fas fa-camera"></i> Live Selfie</label><span style="color:var(--success);font-weight:700;cursor:pointer" onclick="previewPhoto('${u.photoUrl}','${esc(u.name)}')"><i class="fas fa-check-circle"></i> Verified (View)</span></div>` : ''}
      <div style="margin-top:20px"><button class="btn btn-outline btn-full" onclick="handleLogout()"><i class="fas fa-sign-out-alt"></i> Logout</button></div>
    </div>
  </div>`;
}

// ── HELPERS ───────────────────────────────────────────────────
function setActiveTab(containerId, tab) {
  document.querySelectorAll(`#${containerId} .tab-btn`).forEach(b =>
    b.classList.toggle('active', b.dataset.tab === tab)
  );
}

function toggleMenu() {
  document.getElementById('nav-dropdown')?.classList.toggle('hidden');
}

function togglePwd(inputId, btn) {
  const el = document.getElementById(inputId);
  if (!el) return;
  el.type = el.type === 'password' ? 'text' : 'password';
  btn.innerHTML = el.type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
}

function showToast(msg, type = 'info') {
  const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${esc(msg)}</span>`;
  document.getElementById('toast-wrap').appendChild(t);
  setTimeout(() => {
    t.style.transition = 'all .3s ease';
    t.style.opacity = '0';
    t.style.transform = 'translateX(100%)';
    setTimeout(() => t.remove(), 320);
  }, 3500);
}

function timeAgo(date) {
  if (!date) return 'just now';
  const s = Math.floor((new Date() - date) / 1000);
  if (s < 60)    return 'just now';
  if (s < 3600)  return Math.floor(s / 60) + 'm ago';
  if (s < 86400) return Math.floor(s / 3600) + 'h ago';
  return Math.floor(s / 86400) + 'd ago';
}

function esc(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function authErr(code) {
  const m = {
    'auth/user-not-found':       'Email සමඟ account නැත',
    'auth/wrong-password':       'Password incorrect',
    'auth/email-already-in-use': 'Email already registered',
    'auth/weak-password':        'Password min 6 characters',
    'auth/invalid-email':        'Invalid email address',
    'auth/too-many-requests':    'Too many attempts. Try again later',
    'auth/network-request-failed':'Network error. Check connection',
    'auth/invalid-credential':   'Invalid email or password'
  };
  return m[code] || 'An error occurred. Please try again.';
}
