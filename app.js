// =============================================================
// LankaVision Pro — app.js v3
// Complete Application Logic
// =============================================================

const ADMIN_CODE = 'LANKAVISION2024';

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
    const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 5000));
    const doc = await Promise.race([fetchDoc, timeout]);
    if (!doc.exists) { showScreen('screen-landing'); return; }
    currentUserData = { id: doc.id, ...doc.data() };

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
    showScreen('screen-landing');
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');
  const btn = document.getElementById('login-btn');

  errEl.classList.add('hidden');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';

  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
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

async function handleTechRegister(e) {
  e.preventDefault();
  const name = document.getElementById('tech-name').value.trim();
  const phone = document.getElementById('tech-phone').value.trim();
  const email = document.getElementById('tech-email').value.trim();
  const password = document.getElementById('tech-password').value;
  const district = document.getElementById('tech-district').value;
  const serviceType = document.querySelector('input[name="svc-type"]:checked')?.value;
  const errEl = document.getElementById('tech-error');
  errEl.classList.add('hidden');

  if (!district) { errEl.textContent = 'District Select කරන්න.'; errEl.classList.remove('hidden'); return; }
  if (!serviceType) { errEl.textContent = 'Service Type Select කරන්න.'; errEl.classList.remove('hidden'); return; }

  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection('users').doc(cred.user.uid).set({
      name, phone, email, role: 'technician',
      district, serviceType, status: 'pending',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    showToast('Application submit කළා! Admin approve වෙනතුරු wait කරන්න.', 'success');
  } catch (err) {
    errEl.textContent = authErr(err.code);
    errEl.classList.remove('hidden');
  }
}

async function handleAdminRegister(e) {
  e.preventDefault();
  const name = document.getElementById('admin-name').value.trim();
  const email = document.getElementById('admin-email').value.trim();
  const password = document.getElementById('admin-password').value;
  const code = document.getElementById('admin-code').value.trim();
  const errEl = document.getElementById('admin-error');
  errEl.classList.add('hidden');

  if (code !== ADMIN_CODE) {
    errEl.textContent = 'Admin code invalid.';
    errEl.classList.remove('hidden');
    return;
  }

  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection('users').doc(cred.user.uid).set({
      name, email, role: 'admin',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    showToast('Admin account හදාගත්තා! 🎉', 'success');
  } catch (err) {
    errEl.textContent = authErr(err.code);
    errEl.classList.remove('hidden');
  }
}

async function handleLogout() {
  await auth.signOut();
  currentUser = null; currentUserData = null;
  showScreen('screen-landing');
}

// ── REGISTER NAV ──────────────────────────────────────────────
function showRegisterOptions() { showScreen('screen-register'); showRegisterRoleSelect(); }
function showRegisterRoleSelect() {
  document.getElementById('reg-role-select').classList.remove('hidden');
  ['reg-cust-form','reg-tech-form','reg-admin-form'].forEach(id => document.getElementById(id)?.classList.add('hidden'));
}
function showRegisterForm(type) {
  document.getElementById('reg-role-select').classList.add('hidden');
  document.getElementById('reg-cust-form').classList.toggle('hidden', type !== 'customer');
  document.getElementById('reg-tech-form').classList.toggle('hidden', type !== 'technician');
  document.getElementById('reg-admin-form').classList.toggle('hidden', type !== 'admin');
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
      <div class="filter-bar">
        <div style="flex:1">
          <h2 style="font-size:1rem;font-weight:800;margin:0"><i class="fas fa-map-marker-alt" style="color:var(--primary-l)"></i> Jobs in ${esc(currentUserData.district)}</h2>
          <p style="font-size:.78rem;color:var(--txt3);margin-top:2px"><span class="type-badge ${esc(currentUserData.serviceType)}">${esc(currentUserData.serviceType)}</span> jobs · ඔබේ district only</p>
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
    // Index-free: fetch all open jobs in district, filter by type in JS
    const snap = await db.collection('jobs')
      .where('district', '==', currentUserData.district)
      .where('status', '==', 'open')
      .get();

    let docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    // Filter by service type
    if (currentUserData.serviceType !== 'Both') {
      docs = docs.filter(j => j.type === currentUserData.serviceType);
    }

    // Sort by createdAt desc (client-side)
    docs.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));

    const el = document.getElementById('tech-avail');
    if (!el) return;
    if (!docs.length) {
      el.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-search"></i><p>ඔබේ area හි open jobs නැත.</p></div>`;
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
      <span class="type-badge ${esc(job.type)}"><i class="fas fa-${job.type === 'CCTV' ? 'video' : 'satellite-dish'}"></i> ${esc(job.type)}</span>
      <span class="status-badge s-${esc(job.status)}">${statusLabel(job.status)}</span>
    </div>
    <div class="jc-title">${esc(job.title)}</div>
    <div class="jc-desc">${esc(job.description)}</div>
    <div class="jc-meta">
      <span class="meta-item"><i class="fas fa-map-marker-alt"></i>${esc(job.district)}</span>
      <span class="meta-item"><i class="fas fa-user"></i>${esc(job.customerName || 'Customer')}</span>
      <span class="meta-item"><i class="fas fa-clock"></i>${ago}</span>
      ${job.claimedByName ? `<span class="meta-item"><i class="fas fa-tools"></i>${esc(job.claimedByName)}</span>` : ''}
    </div>
    ${phoneHtml}
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

    await ref.update({
      status: 'claimed',
      claimedBy: currentUser.uid,
      claimedByName: currentUserData.name,
      claimedByPhone: currentUserData.phone || '',
      claimedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    showToast('Job Accept! 🎉 Phone number reveal වෙලා!', 'success');
    openJobModal(jobId);
    if (document.getElementById('tech-avail')) loadTechJobs();
  } catch (err) {
    console.error(err);
    showToast('Failed to accept job. Try again.', 'error');
  }
}

async function markComplete(jobId) {
  try {
    await db.collection('jobs').doc(jobId).update({
      status: 'completed',
      completedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    showToast('Job complete! ✅', 'success');
    if (document.getElementById('tech-claims')) loadTechClaims();
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

    document.getElementById('modal-job-body').innerHTML = `
      <h2 style="margin-bottom:8px;padding-right:28px">${esc(job.title)}</h2>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px">
        <span class="type-badge ${esc(job.type)}"><i class="fas fa-${job.type === 'CCTV' ? 'video' : 'satellite-dish'}"></i> ${esc(job.type)}</span>
        <span class="status-badge s-${esc(job.status)}">${statusLabel(job.status)}</span>
      </div>
      ${mapHtml}
      <div style="display:grid;gap:10px">
        <div class="detail-box"><div class="dl">Description</div><div class="dv">${esc(job.description)}</div></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div class="detail-box"><div class="dl">District</div><div class="dv">${esc(job.district)}</div></div>
          <div class="detail-box"><div class="dl">Customer</div><div class="dv">${esc(job.customerName || 'N/A')}</div></div>
        </div>
        <div class="detail-box" style="background:${showPhone ? 'rgba(16,185,129,.07)' : 'rgba(255,255,255,.03)'};border-color:${showPhone ? 'rgba(16,185,129,.2)' : 'var(--border)'}">
          <div class="dl"><i class="fas fa-phone"></i> Phone Number</div>
          ${phoneHtml}
        </div>
        ${job.claimedByName ? `<div class="detail-box" style="background:rgba(245,158,11,.07);border-color:rgba(245,158,11,.2)"><div class="dl">Claimed by</div><div class="dv" style="color:var(--accent)">${esc(job.claimedByName)}</div></div>` : ''}
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
  const serviceType = document.querySelector('input[name="edit-svc"]:checked')?.value;
  const status = document.getElementById('edit-tech-status').value;
  const errEl = document.getElementById('edit-tech-error');
  errEl.classList.add('hidden');

  if (!serviceType) { errEl.textContent = 'Service type select කරන්න.'; errEl.classList.remove('hidden'); return; }

  try {
    await db.collection('users').doc(uid).update({
      name, phone, district, serviceType, status,
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
  if (d && DISTRICT_COORDS[d] && postJobMap) {
    postJobMap.setView(DISTRICT_COORDS[d], 11);
  }
}

async function handlePostJob(e) {
  e.preventDefault();
  const jobType   = document.querySelector('input[name="job-type"]:checked')?.value;
  const title     = document.getElementById('job-title').value.trim();
  const desc      = document.getElementById('job-desc').value.trim();
  const district  = document.getElementById('job-district').value;
  const custName  = document.getElementById('cust-name-job').value.trim();
  const custPhone = document.getElementById('cust-phone-job').value.trim();
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
    await db.collection('jobs').add({
      title, description: desc, type: jobType, district,
      location: { lat: selectedLoc.lat, lng: selectedLoc.lng },
      customerName:  custName || posterName,
      customerPhone: custPhone,
      postedBy, postedByName: posterName,
      status: 'open',
      claimedBy: null, claimedByName: null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    showToast('Job post කළා! 🎉', 'success');
    e.target.reset();
    selectedLoc = null;
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
  loadAdminStats();
  loadPendingTechs();
  loadAllJobsAdmin();
  loadAllTechs();
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
            ${esc(j.district)} · ${timeAgo(j.createdAt?.toDate?.())}
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
        <div style="font-size:.73rem;color:var(--txt3);margin-top:3px">${esc(j.district)}</div>
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

  return `
  <div class="tech-card" id="tc-${id}">
    <div class="tech-info">
      <div class="tech-av">${(t.name || 'T').charAt(0).toUpperCase()}</div>
      <div style="flex:1">
        <div class="tech-name">${esc(t.name)} <span style="font-size:.72rem;color:${statusColor};font-weight:700">${statusIcon} ${t.status}</span></div>
        <div class="tech-meta">
          <span><i class="fas fa-phone"></i> ${esc(t.phone)}</span>
          <span><i class="fas fa-envelope"></i> ${esc(t.email)}</span>
          <span><i class="fas fa-map-marker-alt"></i> ${esc(t.district)}</span>
          <span class="type-badge ${esc(t.serviceType)}" style="font-size:.7rem;padding:2px 8px">${esc(t.serviceType)}</span>
        </div>
        <div style="font-size:.7rem;color:var(--txt3);margin-top:3px">Applied: ${timeAgo(t.createdAt?.toDate?.())}</div>
      </div>
    </div>
    <div class="tech-actions">${actions}</div>
  </div>`;
}

async function approveTech(uid) {
  try {
    await db.collection('users').doc(uid).update({ status: 'approved', approvedAt: firebase.firestore.FieldValue.serverTimestamp() });
    showToast('Technician approved! ✅', 'success');
    document.getElementById(`tc-${uid}`)?.remove();
    loadAdminStats(); loadAllTechs();
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
}

// ── PROFILE ───────────────────────────────────────────────────
function renderProfileCard() {
  if (!currentUserData) return '';
  const u = currentUserData;
  const statusColor = u.status === 'approved' ? 'var(--success)' : u.status === 'pending' ? 'var(--warning)' : 'var(--danger)';
  return `
  <div class="profile-wrap">
    <div class="panel">
      <div class="profile-av">${(u.name || 'U').charAt(0).toUpperCase()}</div>
      <h2 style="text-align:center;margin-bottom:24px">${esc(u.name)}</h2>
      <div class="profile-row"><label><i class="fas fa-envelope"></i> Email</label><span>${esc(u.email)}</span></div>
      ${u.phone ? `<div class="profile-row"><label><i class="fas fa-phone"></i> Phone</label><span>${esc(u.phone)}</span></div>` : ''}
      <div class="profile-row"><label><i class="fas fa-user-tag"></i> Role</label><span style="text-transform:capitalize">${esc(u.role)}</span></div>
      ${u.district ? `<div class="profile-row"><label><i class="fas fa-map-marker-alt"></i> District</label><span>${esc(u.district)}</span></div>` : ''}
      ${u.serviceType ? `<div class="profile-row"><label><i class="fas fa-tools"></i> Service</label><span class="type-badge ${esc(u.serviceType)}" style="font-size:.85rem">${esc(u.serviceType)}</span></div>` : ''}
      ${u.status ? `<div class="profile-row"><label><i class="fas fa-circle"></i> Status</label><span style="color:${statusColor};font-weight:700">${u.status}</span></div>` : ''}
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
