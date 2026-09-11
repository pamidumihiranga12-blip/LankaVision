// ================================================================
// LankaVision Pro - Internationalization (i18n) Engine
// Supported Languages: Sinhala ('si'), English ('en'), Tamil ('ta')
// ================================================================

const I18N = {
  // ── SINHALA 🇱🇰 ───────────────────────────────────────────────
  si: {
    lang_name: 'සිංහල',
    lang_flag: '🇱🇰',

    // Brand & Nav
    brand_name: 'LankaVision Pro',
    brand_sub: 'CCTV සහ Satellite Job Platform',
    nav_login: 'Login',
    nav_register: 'Register',
    nav_home: 'මුල් පිටුව',
    nav_account: 'ගිණුම',
    nav_logout: 'Logout',
    nav_my_jobs: 'මගේ Jobs',
    nav_profile: 'Profile',
    back_to_home: '← මුල් පිටුවට',

    // Landing Hero
    hero_badge: 'දිවයින පුරා සේවාව (25 Districts)',
    hero_title_1: "Sri Lanka's #1",
    hero_title_2: 'CCTV & Satellite',
    hero_title_3: 'Job Platform',
    hero_subtitle: 'CCTV සහ Satellite Technician ලාව Customer ලා සමඟ real-time හි සම්බන්ධ කරන ශ්‍රී ලංකාවේ #1 platform.',
    btn_post_job: 'Job එකක් දාන්න',
    btn_join_tech: 'Technician කෙනෙක් වෙන්න',
    stat_districts: 'දිස්ත්‍රික්ක 25',
    stat_service: '24/7 සේවාව',
    stat_privacy: 'පූර්ණ ආරක්ෂිතයි',

    // Features
    feat_dist: 'දිස්ත්‍රික්ක අනුව (District Smart)',
    feat_dist_desc: 'ඔබේ දිස්ත්‍රික්කයේ jobs පමණක් technician ලාට පෙනේ.',
    feat_priv: 'දුරකථන ආරක්ෂාව (Phone Privacy)',
    feat_priv_desc: 'Job accept කරන තෙක් customer ගේ phone number සැඟවී ඇත.',
    feat_maps: 'Google Maps Navigation',
    feat_maps_desc: 'Job location pin කර Google Maps හරහා directly navigate කරන්න.',
    feat_wa: 'WhatsApp සෘජුවම (WhatsApp Direct)',
    feat_wa_desc: 'Job accept කළ පසු customer ගේ WhatsApp chat direct open වේ.',
    feat_rt: 'ක්ෂණික දැනුම්දීම් (Real-time)',
    feat_rt_desc: 'දිවයින පුරා ක්ෂණික job updates.',
    feat_ratings: 'තරු 5 Rating ක්‍රමය (5-Star Ratings)',
    feat_ratings_desc: 'පාරිභෝගිකයින්ගෙන් 5-star ratings සහ reviews ලබාගෙන විශ්වාසය දිනාගන්න.',

    // Login & Register
    login_title: 'Welcome Back 👋',
    login_sub: 'ඔබේ account එකට login කරන්න',
    email_label: 'Email ලිපිනය',
    password_label: 'මුරපදය (Password)',
    btn_login: 'Login වන්න',
    forgot_password_link: 'මුරපදය අමතකද? (Forgot Password?)',
    modal_forgot_title: 'මුරපදය නැවත සකසන්න (Reset Password)',
    modal_forgot_desc: 'ඔබගේ ලියාපදිංචි Email ලිපිනයට OTP කේතයක් එවනු ඇත.',
    btn_get_otp: 'OTP කේතය ලබාගන්න 📨',
    lbl_otp_code: 'ඉලක්කම් 6ක OTP කේතය',
    lbl_new_password: 'නව මුරපදය (New Password)',
    lbl_confirm_new_password: 'නව මුරපදය තහවුරු කරන්න',
    btn_save_new_pwd: 'මුරපදය වෙනස් කරන්න 🔒',
    btn_send_reset: 'Reset Link එක එවන්න 📨',
    reset_email_sent: 'Password reset OTP කේතය සාර්ථකව ඔබගේ email ලිපිනයට යවන ලදී! කරුණාකර Inbox හෝ Spam පරීක්ෂා කරන්න.',
    no_account: 'Account නැද්ද?',
    register_link: 'Register කරන්න',

    reg_role_title: 'LankaVision හා එක්වන්න ✨',
    reg_role_sub: 'ඔබ ලියාපදිංචි වන ආකාරය තෝරන්න',
    role_customer: 'මට සේවාවක් අවශ්‍යයි (Customer)',
    role_customer_desc: 'CCTV / Satellite සවිකිරීම් හෝ අලුත්වැඩියා සඳහා technician ලා සොයාගන්න',
    role_technician: 'මම Technician කෙනෙක්',
    role_technician_desc: 'Jobs භාරගෙන අමතර ආදායමක් උපයන්න',

    cust_reg_title: 'Customer ලියාපදිංචිය',
    tech_reg_title: 'Technician ලියාපදිංචිය',
    name_label: 'සම්පූර්ණ නම',
    phone_label: 'දුරකථන අංකය',
    district_label: 'දිස්ත්‍රික්කය',
    city_label: 'නගරය (City / Town)',
    service_type_label: 'ඔබේ ප්‍රවීණතාව (Service Type)',
    select_district: 'දිස්ත්‍රික්කය තෝරන්න',
    btn_create_account: 'Account එක හදන්න',
    btn_submit_app: 'Application Submit කරන්න',

    // Camera & Selfie
    selfie_title: 'Live Selfie තහවුරු කිරීම',
    selfie_desc: 'Device Camera එකෙන් ඔබගේ මුහුණේ Live Selfie එකක් ගන්න (Gallery upload තහනම් වේ)',
    btn_cam_on: 'Camera එක On කරන්න',
    btn_cam_capture: 'Photo එක ගන්න',
    btn_cam_retake: 'නැවත ගන්න (Retake)',
    btn_cam_switch: 'Camera මාරු කරන්න',
    selfie_success: 'Live Selfie එක සාර්ථකයි!',
    cam_oval_guide: 'මුහුණ කවය තුළ තබා ගන්න',

    // Mandatory Selfie Modal
    mandatory_selfie_badge: 'Live Selfie එක ලබා දීම අනිවාර්ය වේ 🔒',
    mandatory_selfie_desc: 'ගරු Technician තුමනි, ඔබ මීට පෙර අපගේ පද්ධතිය සමඟ සම්බන්ධ වූ අයෙකි. පාරිභෝගික ආරක්ෂාව තහවුරු කිරීමට සහ Jobs ලබා ගැනීමට ඔබගේ Live Selfie එක Camera එකෙන්ම ලබා දීම අනිවාර්ය වේ.',
    mandatory_selfie_warning: '⚠️ Gallery / Photos upload කිරීම සපුරා තහනම් කර ඇත.',
    btn_save_selfie: 'Selfie එක Save කර ඉදිරියට යන්න',
    btn_logout_cancel: 'දැන්ම බැහැ (Log Out වන්න)',

    // Post a Job
    post_job_title: 'New Job Request',
    job_type_label: 'Job Type (කාණ්ඩය)',
    job_title_label: 'Job Title (මාතෘකාව)',
    job_desc_label: 'විස්තරය (Description)',
    btn_post_submit: 'Job Post කරන්න',
    guest_info_title: 'ඔබේ විස්තර (Your Details)',

    // Dashboard Tabs
    tab_available: 'Available Jobs',
    tab_claimed: 'My Claimed Jobs',
    tab_completed: 'සම්පූර්ණ කළ (Completed)',
    tab_my_jobs: 'My Posted Jobs',
    tab_post_job: 'Post Job',
    tab_profile: 'Profile',
    filter_36km: '🎯 ළඟම Jobs (36 km ඇතුළත)',
    filter_50km: '🚗 50 km ඇතුළත',
    filter_my_dist: '📍 මගේ දිස්ත්‍රික්කය පමණක්',
    filter_all: '🌐 සියලුම Jobs (All)',
    dist_away: 'දුර',

    // Job Actions & Statuses
    btn_accept_job: 'භාරගන්න (Accept)',
    btn_complete_job: 'වැඩ අවසන් (Complete)',
    btn_rate_tech: 'Technician ට Rate කරන්න',
    btn_view_map: 'සිතියම බලන්න',
    btn_call: 'Call',
    btn_whatsapp: 'WhatsApp',
    assigned_tech_lbl: 'භාරගත් Technician',
    verified_tech: 'Verified Technician',
    status_open: 'විවෘතයි (Open)',
    status_claimed: 'භාරගෙන ඇත (In Progress)',
    status_completed: 'අවසන් කළා (Completed)',
    status_cancelled: 'අවලංගුයි (Cancelled)',

    // Work Proof Modal
    work_proof_modal_title: 'Job Complete කරන්න',
    work_proof_modal_sub: 'වැඩේ අවසන් කළ බව තහවුරු කිරීමට ස්ථානයේ / උපකරණවල Live Photo එකක් Camera එකෙන්ම ගන්න.',
    work_notes_label: 'Completion Notes (අමතර විස්තර - Optional)',
    btn_confirm_complete: 'Confirm කර අවසන් කරන්න',

    // Visit Scheduling
    btn_schedule: 'දිනය/වේලාව Schedule කරන්න',
    btn_reschedule: 'දිනය/වේලාව වෙනස් කරන්න (Reschedule)',
    schedule_modal_title: 'Customer Visit එක Schedule කරන්න',
    schedule_modal_subtitle: 'Customer රැඳී සිටින දිනය සහ වේලාව තෝරා Visit එක Schedule කරන්න.',
    visit_date_label: 'පැමිණෙන දිනය (Visit Date)',
    visit_time_label: 'පැමිණෙන වේලාව (Visit Time)',
    schedule_notes_label: 'සටහන් / Customer සමඟ කතා කළ විස්තර',
    btn_confirm_schedule: 'Visit එක Schedule කරන්න',
    scheduled_visit: 'නියමිත Visit දිනය/වේලාව',
    cust_preferred_time: 'පාරිභෝගිකයා කැමති දිනය/වේලාව',
    pref_time_title: 'පැමිණීමට කැමති දිනය සහ වේලාව (අමතර)',
    pref_date_label: 'කැමති දිනය',
    pref_time_label: 'කැමති වේලාව',
    pref_notes_label: 'ඔබ සිටින වේලාව පිළිබඳ සටහනක්',

    // Feedback & Rating Modal
    rate_modal_title: 'Technician සඳහා Rating දෙන්න',
    rate_modal_sub: 'ඔබගේ Technician ගේ සේවාව පිළිබඳව තරු (Rating) සහ අදහස් ලබා දෙන්න',
    select_stars_lbl: 'තරු ගණන තෝරන්න (Select Rating):',
    feedback_notes_lbl: 'ඔබේ අදහස (Feedback / Review)',
    btn_submit_feedback: 'Review එක Submit කරන්න',

    // Rating Texts
    star_1: '⭐ 1/5 - දුර්වලයි (Poor)',
    star_2: '⭐⭐ 2/5 - සාමාන්‍යයි (Fair)',
    star_3: '⭐⭐⭐ 3/5 - හොඳයි (Good)',
    star_4: '⭐⭐⭐⭐ 4/5 - ඉතා හොඳයි (Very Good)',
    star_5: '⭐⭐⭐⭐⭐ 5/5 - විශිෂ්ටයි (Excellent)',
    reviews_count: 'reviews',

    // Admin Panel
    admin_panel_title: 'Admin Panel (පරිපාලක)',
    adm_btn_test_email: 'Test Email',
    adm_pill_main: 'Main Admin',
    adm_pill_sub: 'Admin',
    adm_pill_sub_badge: 'Sub-Admin',

    // Admin Tabs
    adm_tab_overview: 'Overview (දළ විශ්ලේෂණය)',
    adm_tab_pending: 'Pending (අනුමත කිරීමට)',
    adm_tab_jobs: 'All Jobs (සියලු Jobs)',
    adm_tab_techs: 'Technicians ලා',
    adm_tab_customers: 'Customers (පාරිභෝගිකයින්)',
    adm_tab_admins: 'Admins ලා',

    // Stats Grid
    adm_stat_pending_techs: 'Pending Technicians',
    adm_stat_open_jobs: 'Open Jobs (විවෘත)',
    adm_stat_active_techs: 'Active Technicians',
    adm_stat_completed_jobs: 'Completed (අවසන් කළ)',

    // Section Headings & Buttons
    adm_recent_jobs: 'Recent Jobs (මෑතකදී ලැබුණු)',
    adm_heading_admins: 'පද්ධති පරිපාලකවරුන් (System Administrators)',
    adm_btn_test_admin_email: 'Test Admin Email',
    adm_btn_new_admin: '+ New Admin සාදන්න',

    // Filters & Statuses
    opt_all_status: 'සියලුම තත්වයන් (All Status)',
    opt_all_types: 'සියලුම වර්ග (All Types)',
    opt_all_districts: 'සියලුම දිස්ත්‍රික්ක (All Districts)',
    adm_tech_pending: 'Pending (අනුමත නොවූ)',
    adm_tech_approved: 'Approved (අනුමත)',
    adm_tech_rejected: 'Rejected (ප්‍රතික්ෂේපිත)',
    svc_both: 'දෙකම (Both CCTV & Satellite)',

    // Action Buttons & Labels
    btn_approve: 'Approve (අනුමත)',
    btn_reject: 'Reject (ප්‍රතික්ෂේප)',
    btn_edit: 'Edit (වෙනස් කරන්න)',
    btn_suspend: 'Suspend (අත්හිටුවන්න)',
    btn_delete: 'Delete (මකන්න)',
    selfie_verified_badge: 'Selfie Verified 🔒',
    applied_lbl: 'අයදුම් කළේ',
    empty_no_jobs: 'Jobs නැත',
    empty_no_pending: 'Pending අයදුම්පත් නැත',
    empty_no_techs: 'Technicians ලා නැත',
    empty_no_admins: 'Admins ලා නැත',
    admin_protected: 'ආරක්ෂිතයි (Protected)',
    admin_your_account: '(ඔබගේ ගිණුම)',
    loading: 'Loading...',

    // Admin Modals
    modal_edit_job_title: 'Job එක සංස්කරණය කරන්න (Edit Job)',
    modal_edit_tech_title: 'Technician සංස්කරණය කරන්න (Edit Technician)',
    adm_modal_create_title: 'New Admin සාදන්න',
    adm_modal_create_sub: 'නව Admin ගිණුමක් සාදා access ලබා දෙන්න',
    adm_name_label: 'Admin නම',
    btn_create_admin_account: 'Account එක හදන්න',
    btn_cancel: 'Cancel (අවලංගු)',
    btn_save_changes: 'Save Changes (සුරකින්න)',
    cust_name_label: 'පාරිභෝගික නම (Customer Name)',
    cust_phone_label: 'දුරකථන අංකය (Customer Phone)',
    status_label: 'තත්වය (Status)',

    // Router Installation & Multi-services
    svc_router: 'Router Installation',
    job_type_router: 'Router Installation',
    svc_multi_hint: 'සේවා 1ක්, 2ක් හෝ 3ම තෝරාගත හැක (Select 1, 2, or all 3)',
    adm_tech_loc_search_title: 'Technician Location සහ 36 km Radius Search',
    adm_tech_loc_search_placeholder: '🔍 ස්ථානයක් Search කරන්න (උදා: Padaviya, Kekirawa, Colombo)...',
    active_job_lock_title: 'ක්‍රියාකාරී Job එකක් භාරගෙන ඇත (Active Job Lock)',
    active_job_lock_warning: 'ඔබ දැනටමත් Job එකක් භාරගෙන ඇත. නව Job එකක් භාරගැනීමට පෙර එම Job එක සම්පූර්ණ කරන්න (Complete) හෝ Visit එක Schedule කරන්න.',
    btn_add_router: 'Router Installation එකතු කරන්න',
    btn_not_now: 'දැන්ම එපා',
    router_prompt_title: '🚀 නව සේවා අවස්ථාව: Router Installation!',
    router_prompt_desc: 'ඔබ Wi-Fi Routers සහ Network උපකරණ සවිකිරීම සිදුකරනවාද? ඔබගේ ප්‍රදේශයේ Router jobs ලබා ගැනීමට ඔබගේ Profile එකට Router Installation එකතු කරගන්න!',
    router_added_success: 'Router Installation සේවාව ඔබගේ profile එකට සාර්ථකව එකතු විය! 🎉',
    offline_banner_msg: 'ඔබ මේ වන විට Offline සිටී. කරුණාකර Mobile Data හෝ Wi-Fi සම්බන්ධ කරන්න.',
    offline_online_msg: '✅ Internet සම්බන්ධ විය! (Back Online)',
    offline_job_post_error: '⚠️ ඔබ Offline සිටී. Job එකක් Post කිරීමට කරුණාකර Internet සම්බන්ධ කරන්න.',
    offline_action_error: '⚠️ ඔබ Offline සිටී. මෙම ක්‍රියාව සඳහා Internet සම්බන්ධතාවයක් අවශ්‍ය වේ.',
    notif_center_title: 'දැනුම්දීම් (Notifications)',
    clear_all: 'මකන්න',
    no_notifs: 'දැනුම්දීම් නොමැත',

    // Help & Visual Guide
    btn_help_guide: '💡 භාවිතා කරන හැටි',
    help_modal_title: 'LankaVision Pro භාවිතා කරන ආකාරය',
    help_modal_sub: 'පාරිභෝගිකයින්ට සහ Technicians ලාට පහසුවෙන්ම වැඩ කිරීමට සරල උපදෙස්',
    help_tab_customer: '👤 මම Customer කෙනෙක් (පාරිභෝගික)',
    help_tab_tech: '🔧 මම Technician කෙනෙක් (කාර්මික)',
    help_cust_step1_t: '1. සරලව Job එකක් දාන්න',
    help_cust_step1_d: 'ඔබේ නම, දුරකථන අංකය, අවශ්‍ය සේවාව (CCTV / Satellite / Router) සහ දිස්ත්‍රික්කය තෝරා Job එක Post කරන්න. අවශ්‍ය නම් නිතර ඇතිවන ගැටලු (Quick Problem) එක ක්ලික් එකෙන් තෝරන්න.',
    help_cust_step2_t: '2. Technician කෙනෙක් භාරගැනීම',
    help_cust_step2_d: 'ඔබේ ප්‍රදේශයේ ලියාපදිංචි verified technician කෙනෙක් ඔබේ Job එක භාරගත් සැණින් ඔබට දැනුම්දීමක් ලැබේ. Technician ගේ නම, Photo එක සහ දුරකථන අංකය දිස්වේ.',
    help_cust_step3_t: '3. පැමිණෙන වේලාව සහ හැඳුනුම්පත',
    help_cust_step3_d: 'Technician ඔබ අමතා පැමිණෙන වේලාව තහවුරු කරනු ඇත. නිවසට පැමිණි විට LankaVision Verified Digital ID කාඩ්පත පරීක්ෂා කර බැලිය හැක.',
    help_cust_step4_t: '4. වැඩ අවසන් වීම සහ ඩිජිටල් බිල',
    help_cust_step4_d: 'වැඩ අවසන් වූ පසු Technician විසින් Live Photo එකක් දමා තහවුරු කරයි. ඉන්පසු WhatsApp හරහා නිල ඩිජිටල් බිල (Invoice) ලබාගෙන, ඔබගේ තරු 5 Rating එක ලබා දෙන්න.',
    help_tech_step1_t: '1. ළඟම ඇති Jobs බලන්න (36 km)',
    help_tech_step1_d: 'ඔබ සිටින ස්ථානයේ සිට 36 km ඇතුළත ඇති නව Jobs ඔබට පෙනේ. සිතියම (Map) මඟින් Job එක ඇති ස්ථානය පහසුවෙන් බලාගත හැක.',
    help_tech_step2_t: '2. Job එකක් භාරගැනීම (Accept)',
    help_tech_step2_d: 'Job එක භාරගත් සැණින් Customer ගේ දුරකථන අංකය සහ WhatsApp Unlock වේ. පාරිභෝගිකයාට කතා කර පැමිණෙන දිනය/වේලාව Schedule කරන්න.',
    help_tech_step3_t: '3. Active Job අගුල (Next Job Unlock)',
    help_tech_step3_d: 'ඔබ භාරගත් Job එකට Visit එකක් Schedule කළ පසු හෝ Complete කළ පසු ඔබට ඊළඟ Jobs භාරගැනීමට ඉඩ ලැබේ.',
    help_tech_step4_t: '4. Live Photo එකෙන් Complete කර බිල යවන්න',
    help_tech_step4_d: 'වැඩ අවසන් වූ ස්ථානයේ Live Photo එකක් ගෙන Job එක Complete කරන්න. ඉන්පසු Digital Invoice එක සකසා Customer ගේ WhatsApp එකට කෙලින්ම බිල යවන්න.',

    // Digital Invoice / Bill
    btn_create_invoice: 'ඩිජිටල් බිල සාදන්න (Invoice)',
    btn_view_invoice: 'ඩිජිටල් බිල බලන්න (View Invoice)',
    modal_invoice_title: 'LankaVision ඩිජිටල් සේවා බිල (Invoice)',
    modal_invoice_sub: 'පාරිභෝගිකයාට ලබා දෙන නිල ගාස්තු විස්තරය සහ රිසිට්පත',
    inv_job_details: 'Job විස්තර',
    inv_labour_fee: 'සේවා ගාස්තුව / වැඩ කුලිය (Labour Fee - රු.)',
    inv_parts_cost: 'අමතර කොටස් / උපකරණ වියදම (Parts Cost - රු.)',
    inv_parts_desc: 'යෙදූ උපකරණ විස්තර (උදා: Wire 20m, BNC, Power Supply)',
    inv_warranty: 'වගකීම් කාලය (Warranty Period)',
    inv_opt_no_warranty: 'වගකීමක් නැත (No Warranty)',
    inv_opt_1m: 'මාස 1ක Service Warranty',
    inv_opt_3m: 'මාස 3ක Service Warranty',
    inv_opt_6m: 'මාස 6ක Service Warranty',
    inv_opt_1y: 'අවුරුදු 1ක Warranty',
    inv_total: 'මුළු මුදල (Total Amount - රු.)',
    btn_send_invoice_wa: 'WhatsApp හරහා පාරිභෝගිකයාට යවන්න 📲',
    btn_save_invoice: 'බිල Save කරන්න 💾',

    // Technician Digital ID Pass
    btn_view_tech_id: 'ඩිජිටල් හැඳුනුම්පත (Digital ID)',
    tech_id_modal_title: 'LankaVision Pro - කාර්මික ශිල්පී හැඳුනුම්පත',
    tech_id_badge_verified: 'CERTIFIED & VERIFIED TECHNICIAN',
    tech_id_tagline: 'දිවයින පුරා පාරිභෝගික ආරක්ෂාව තහවුරු කළ කාර්මික ශිල්පී',
    tech_id_issued_by: 'LankaVision Pro Network Verification',
    tech_id_show_hint: '💡 පාරිභෝගික නිවසට පැමිණි පසු මෙම ඩිජිටල් හැඳුනුම්පත පෙන්වා අනන්‍යතාවය තහවුරු කරන්න.',
    tech_id_jobs_completed: 'Jobs Completed (සාර්ථකව නිමකළ)',
    tech_id_lanyard_hint: 'Official Smart PVC Credential · Island-wide Verified',
    tech_id_share: 'හැඳුනුම්පත Share කරන්න 📲',
    tech_id_security_id: 'SECURITY BADGE ID',

    // Job Tracking
    track_job_heading: 'Track Your Job (Job එක Track කරන්න)',
    track_job_sub: 'ඔබේ Job Tracking ID එක (උදා: LV-JOB-49821) හෝ දුරකථන අංකය ඇතුළත් කර තත්ත්වය පරීක්ෂා කරන්න.',
    track_job_placeholder: 'Job Tracking ID (LV-JOB-XXXXX) හෝ Phone...',
    btn_track_job: 'Track Job',
    track_job_not_found: 'මෙම Tracking ID එකට හෝ දුරකථන අංකයට අදාළ Job එකක් සොයාගත නොහැකි විය.',
    job_id_copied: 'Job Tracking ID Copy කරගත්තා! 📋',

    // Quick Problem Selector
    quick_issues_title: '⚡ නිතර ඇතිවන ගැටලු (එක Click එකකින් තෝරන්න):',
    quick_cctv_1: 'කැමරා පේන්නේ නෑ (No Display)',
    quick_cctv_2: 'Hard Disk Error (රෙකෝඩ් වෙන්නේ නෑ)',
    quick_cctv_3: 'අලුතින් CCTV සවිකිරීමට (New Setup)',
    quick_cctv_4: 'Mobile App එකට Online දාගන්න',
    quick_cctv_5: 'Wire කැඩිලා / Power Issue',
    quick_sat_1: 'No Signal (සිග්නල් නෑ)',
    quick_sat_2: 'Dish එක හෙලවිලා (Alignment)',
    quick_sat_3: 'අලුත් Dish එකක් සවිකිරීම',
    quick_sat_4: 'Receiver එකේ ප්‍රශ්නයක්',
    quick_router_1: 'Wi-Fi Range මදි (Coverage)',
    quick_router_2: 'Internet නිතර Disconnect වෙනවා',
    quick_router_3: 'අලුත් Wi-Fi Router එකක් සවිකිරීම',

    // Urgent Job Request
    lbl_urgent_job: '🔴 හදිසි සේවාවක් (අදම අවශ්‍යයි - Urgent)',
    urgent_job_hint: 'හදිසි breakdown හෝ security ගැටලුවක් නම් මෙය තෝරන්න. අවට Technicians ලාට ක්ෂණික Alert ලැබේ.',
    badge_urgent: '🔴 හදිසි (URGENT)',

    // Progress Steps Tracker
    step_posted: 'Job දැම්මා',
    step_claimed: 'භාරගත්තා',
    step_scheduled: 'දිනය දැම්මා',
    step_completed: 'වැඩ අවසන්',
    step_rated: 'Review කළා',

    // Direct Hotline
    hotline_text: 'App එකෙන් Job එකක් දාන්න අමාරුද? අපට කෙලින්ම කතා කරන්න (Hotline)',
    btn_call_hotline: 'Hotline: 078 680 0086',

    // In-App Updates
    adm_tab_updates: 'App Updates',
    update_modal_title: '🚀 නව App Update එකක් ඇත!',
    update_modal_sub: 'වඩාත් හොඳ සේවාවක් සහ නව පහසුකම් ලබාගැනීමට කරුණාකර අලුත්ම Version එක Install කරගන්න.',
    update_whats_new: 'අලුතින් එක්කළ දේවල් (What\'s New):',
    update_btn_download: '📲 දැන්ම Update එක Download කරන්න',
    update_btn_later: 'පසුව කරන්න (Later)',
    update_mandatory_alert: '⚠️ මෙම Update එක අනිවාර්ය වේ. සේවාවන් දිගටම ලබාගැනීමට කරුණාකර Update කරන්න.',
    adm_update_title: 'App Version & APK කළමනාකරණය',
    adm_update_save_btn: 'Update එක සක්‍රීය කරන්න 🚀',

    // Technician Selfie Change & Approval
    btn_change_selfie: '📸 Selfie ඡායාරූපය වෙනස් කරන්න',
    modal_change_selfie_title: '📸 Live Camera Selfie යාවත්කාලීන කිරීම',
    modal_change_selfie_desc: 'කරුණාකර ඔබගේ මුහුණ පැහැදිලිව පෙනෙන පරිදි Camera එකෙන් සජීවී ඡායාරූපයක් ලබාගන්න. Admin අනුමත කළ පසු Profile එකට එක්වේ.',
    selfie_pending_review_banner: '⏳ නව Selfie ඡායාරූපය Admin අනුමැතිය අපේක්ෂාවෙන් (Under Review)',
    adm_pending_selfies_title: '📸 Technician Selfie වෙනස්කිරීම් අනුමැතිය',
    adm_current_selfie: 'පවතින ඡායාරූපය (Current)',
    adm_new_selfie: 'ඉල්ලුම් කළ නව ඡායාරූපය (New Request)',
    adm_btn_accept_selfie: 'අනුමත කර මාරු කරන්න ✅',
    adm_btn_decline_selfie: 'ප්‍රතික්ෂේප කරන්න ❌'
  },

  // ── ENGLISH 🇬🇧 ───────────────────────────────────────────────
  en: {
    lang_name: 'English',
    lang_flag: '🇬🇧',

    // Brand & Nav
    brand_name: 'LankaVision Pro',
    brand_sub: 'CCTV & Satellite Job Platform',
    nav_login: 'Login',
    nav_register: 'Register',
    nav_home: 'Home',
    nav_account: 'Account',
    nav_logout: 'Logout',
    nav_my_jobs: 'My Jobs',
    nav_profile: 'Profile',
    back_to_home: '← Back to Home',

    // Landing Hero
    hero_badge: 'Island-wide Coverage (25 Districts)',
    hero_title_1: "Sri Lanka's #1",
    hero_title_2: 'CCTV & Satellite',
    hero_title_3: 'Job Platform',
    hero_subtitle: 'Connecting certified CCTV & Satellite Technicians with Customers in real-time across all 25 districts.',
    btn_post_job: 'Post a Job',
    btn_join_tech: 'Join as Technician',
    stat_districts: '25 Districts',
    stat_service: '24/7 Service',
    stat_privacy: 'Privacy Safe',

    // Features
    feat_dist: 'District Smart Matching',
    feat_dist_desc: 'Technicians instantly see jobs available only within their home district or nearby regions.',
    feat_priv: 'Phone Privacy Protected',
    feat_priv_desc: 'Customer phone number is hidden until a technician accepts the job.',
    feat_maps: 'Google Maps Navigation',
    feat_maps_desc: 'Pin exact job locations and get turn-by-turn navigation via Google Maps.',
    feat_wa: 'WhatsApp Direct Chat',
    feat_wa_desc: 'Instantly start a WhatsApp chat with the customer upon claiming a job.',
    feat_rt: 'Real-time Updates',
    feat_rt_desc: 'Real-time job postings and instant status notifications island-wide.',
    feat_ratings: '5-Star Ratings & Reviews',
    feat_ratings_desc: 'Build your reputation and win more work with verified customer star ratings.',

    // Login & Register
    login_title: 'Welcome Back 👋',
    login_sub: 'Log in to your LankaVision account',
    email_label: 'Email Address',
    password_label: 'Password',
    btn_login: 'Login',
    forgot_password_link: 'Forgot Password?',
    modal_forgot_title: 'Reset Password',
    modal_forgot_desc: "We'll send a 6-digit OTP code to your registered email address.",
    btn_get_otp: 'Get OTP Code 📨',
    lbl_otp_code: '6-Digit OTP Code',
    lbl_new_password: 'New Password',
    lbl_confirm_new_password: 'Confirm New Password',
    btn_save_new_pwd: 'Change Password 🔒',
    btn_send_reset: 'Send Reset Link 📨',
    reset_email_sent: 'Password reset OTP has been sent to your email! Please check your Inbox or Spam folder.',
    no_account: "Don't have an account?",
    register_link: 'Register here',

    reg_role_title: 'Join LankaVision Pro ✨',
    reg_role_sub: 'Choose how you would like to register',
    role_customer: 'I Need a Service (Customer)',
    role_customer_desc: 'Find reliable technicians for CCTV and Satellite dish installation or repairs',
    role_technician: 'I am a Technician',
    role_technician_desc: 'Accept local jobs and grow your technician business',

    cust_reg_title: 'Customer Registration',
    tech_reg_title: 'Technician Registration',
    name_label: 'Full Name',
    phone_label: 'Phone Number',
    district_label: 'District',
    city_label: 'City / Town',
    service_type_label: 'Your Specialty (Service Type)',
    select_district: 'Select District',
    btn_create_account: 'Create Account',
    btn_submit_app: 'Submit Application',

    // Camera & Selfie
    selfie_title: 'Live Selfie Verification',
    selfie_desc: 'Take a live selfie using your device camera (Gallery upload is disallowed)',
    btn_cam_on: 'Turn on Camera',
    btn_cam_capture: 'Capture Photo',
    btn_cam_retake: 'Retake Photo',
    btn_cam_switch: 'Switch Camera',
    selfie_success: 'Live Selfie captured successfully!',
    cam_oval_guide: 'Position face within oval guide',

    // Mandatory Selfie Modal
    mandatory_selfie_badge: 'Live Selfie Required 🔒',
    mandatory_selfie_desc: 'Dear Technician, to protect customers and guarantee verification, capturing a live selfie from your device camera is required before viewing or accepting jobs.',
    mandatory_selfie_warning: '⚠️ Gallery upload is strictly disabled for security.',
    btn_save_selfie: 'Save Selfie & Continue',
    btn_logout_cancel: 'Not Now (Log Out)',

    // Post a Job
    post_job_title: 'New Job Request',
    job_type_label: 'Job Type',
    job_title_label: 'Job Title',
    job_desc_label: 'Description',
    btn_post_submit: 'Post Job Now',
    guest_info_title: 'Your Contact Information',

    // Dashboard Tabs
    tab_available: 'Available Jobs',
    tab_claimed: 'My Claimed Jobs',
    tab_completed: 'Completed Jobs',
    tab_my_jobs: 'My Posted Jobs',
    tab_post_job: 'Post Job',
    tab_profile: 'Profile',
    filter_36km: '🎯 Nearby Jobs (Within 36 km)',
    filter_50km: '🚗 Within 50 km',
    filter_my_dist: '📍 My District Only',
    filter_all: '🌐 All Available Jobs',
    dist_away: 'away',

    // Job Actions & Statuses
    btn_accept_job: 'Accept Job',
    btn_complete_job: 'Complete Job',
    btn_rate_tech: 'Rate Technician',
    btn_view_map: 'View on Map',
    btn_call: 'Call',
    btn_whatsapp: 'WhatsApp',
    assigned_tech_lbl: 'Assigned Technician',
    verified_tech: 'Verified Technician',
    status_open: 'Open',
    status_claimed: 'In Progress',
    status_completed: 'Completed',
    status_cancelled: 'Cancelled',

    // Work Proof Modal
    work_proof_modal_title: 'Confirm Job Completion',
    work_proof_modal_sub: 'Capture a live camera photo of the completed installation/work as proof of completion.',
    work_notes_label: 'Completion Notes (Optional)',
    btn_confirm_complete: 'Confirm & Complete Job',

    // Visit Scheduling
    btn_schedule: 'Schedule Visit',
    btn_reschedule: 'Reschedule Visit',
    schedule_modal_title: 'Schedule Customer Visit',
    schedule_modal_subtitle: 'Select the date and time when the customer is available to visit them.',
    visit_date_label: 'Visit Date',
    visit_time_label: 'Visit Time',
    schedule_notes_label: 'Visit Notes / Coordination',
    btn_confirm_schedule: 'Schedule Visit',
    scheduled_visit: 'Scheduled Visit',
    cust_preferred_time: 'Customer Preferred Date/Time',
    pref_time_title: 'Preferred Visit Date & Time (Optional)',
    pref_date_label: 'Preferred Date',
    pref_time_label: 'Preferred Time',
    pref_notes_label: 'Customer Availability Note',

    // Feedback & Rating Modal
    rate_modal_title: 'Rate Your Technician',
    rate_modal_sub: 'Give a star rating (1-5) and feedback on your technician’s service',
    select_stars_lbl: 'Select Star Rating (1 to 5):',
    feedback_notes_lbl: 'Your Feedback / Review',
    btn_submit_feedback: 'Submit Review',

    // Rating Texts
    star_1: '⭐ 1/5 - Poor',
    star_2: '⭐⭐ 2/5 - Fair',
    star_3: '⭐⭐⭐ 3/5 - Good',
    star_4: '⭐⭐⭐⭐ 4/5 - Very Good',
    star_5: '⭐⭐⭐⭐⭐ 5/5 - Excellent',
    reviews_count: 'reviews',

    // Admin Panel
    admin_panel_title: 'Admin Panel',
    adm_btn_test_email: 'Test Email',
    adm_pill_main: 'Main Admin',
    adm_pill_sub: 'Admin',
    adm_pill_sub_badge: 'Sub-Admin',

    // Admin Tabs
    adm_tab_overview: 'Overview',
    adm_tab_pending: 'Pending',
    adm_tab_jobs: 'All Jobs',
    adm_tab_techs: 'Technicians',
    adm_tab_customers: 'Customers',
    adm_tab_admins: 'Admins',

    // Stats Grid
    adm_stat_pending_techs: 'Pending Techs',
    adm_stat_open_jobs: 'Open Jobs',
    adm_stat_active_techs: 'Active Techs',
    adm_stat_completed_jobs: 'Completed',

    // Section Headings & Buttons
    adm_recent_jobs: 'Recent Jobs',
    adm_heading_admins: 'System Administrators',
    adm_btn_test_admin_email: 'Test Admin Email',
    adm_btn_new_admin: '+ Create New Admin',

    // Filters & Statuses
    opt_all_status: 'All Status',
    opt_all_types: 'All Types',
    opt_all_districts: 'All Districts',
    adm_tech_pending: 'Pending',
    adm_tech_approved: 'Approved',
    adm_tech_rejected: 'Rejected',
    svc_both: 'Both (CCTV & Satellite)',

    // Action Buttons & Labels
    btn_approve: 'Approve',
    btn_reject: 'Reject',
    btn_edit: 'Edit',
    btn_suspend: 'Suspend',
    btn_delete: 'Delete',
    selfie_verified_badge: 'Selfie Verified 🔒',
    applied_lbl: 'Applied',
    empty_no_jobs: 'No Jobs Found',
    empty_no_pending: 'No Pending Applications',
    empty_no_techs: 'No Technicians Found',
    empty_no_admins: 'No Admins Found',
    admin_protected: 'Protected',
    admin_your_account: '(Your Account)',
    loading: 'Loading...',

    // Admin Modals
    modal_edit_job_title: 'Edit Job',
    modal_edit_tech_title: 'Edit Technician',
    adm_modal_create_title: 'Create New Admin',
    adm_modal_create_sub: 'Create a new Admin account and grant access',
    adm_name_label: 'Admin Name',
    btn_create_admin_account: 'Create Admin Account',
    btn_cancel: 'Cancel',
    btn_save_changes: 'Save Changes',
    cust_name_label: 'Customer Name',
    cust_phone_label: 'Customer Phone',
    status_label: 'Status',

    // Router Installation & Multi-services
    svc_router: 'Router Installation',
    job_type_router: 'Router Installation',
    svc_multi_hint: 'You can select 1, 2, or all 3 services',
    adm_tech_loc_search_title: 'Technician Location & 36 km Radius Search',
    adm_tech_loc_search_placeholder: '🔍 Search location (e.g. Padaviya, Kekirawa, Colombo)...',
    active_job_lock_title: 'Active Job In Progress',
    active_job_lock_warning: 'You already have an active claimed job. Complete it or schedule a visit before accepting another job.',
    btn_add_router: 'Add Router Installation',
    btn_not_now: 'Not Now',
    router_prompt_title: '🚀 New Service Opportunity: Router Installation!',
    router_prompt_desc: 'Do you install Wi-Fi routers and network equipment? Add Router Installation to your profile to receive router jobs in your area!',
    router_added_success: 'Router Installation service added to your profile! 🎉',
    offline_banner_msg: 'You are currently offline. Please connect to Mobile Data or Wi-Fi.',
    offline_online_msg: '✅ Connected to Internet! (Back Online)',
    offline_job_post_error: '⚠️ You are offline. Please connect to the internet to post a job.',
    offline_action_error: '⚠️ You are offline. Internet connection is required for this action.',
    notif_center_title: 'Notifications',
    clear_all: 'Clear All',
    no_notifs: 'No notifications yet',

    // Help & Visual Guide
    btn_help_guide: '💡 How to Use',
    help_modal_title: 'How to Use LankaVision Pro',
    help_modal_sub: 'Easy visual guide for customers and field technicians',
    help_tab_customer: '👤 I am a Customer',
    help_tab_tech: '🔧 I am a Technician',
    help_cust_step1_t: '1. Post a Job Easily',
    help_cust_step1_d: 'Fill in your name, contact phone, service type (CCTV / Satellite / Router) and district. You can also tap a common quick issue to auto-fill description.',
    help_cust_step2_t: '2. Certified Technician Accepts',
    help_cust_step2_d: 'A verified technician in your district accepts your job. You instantly receive notification with technician photo, name, and phone number.',
    help_cust_step3_t: '3. Visit Scheduling & Verification',
    help_cust_step3_d: 'The technician contacts you to schedule an exact arrival time. Upon arrival, you can inspect their official LankaVision Verified Digital ID Pass.',
    help_cust_step4_t: '4. Completion & Digital Invoice',
    help_cust_step4_d: 'Technician takes live camera photo proof to verify completion. You receive an official Digital Invoice on WhatsApp and can submit a 5-star review.',
    help_tech_step1_t: '1. View Nearby Jobs (36 km Radius)',
    help_tech_step1_d: 'You see jobs within 36 km of your location on a live interactive map. Nearest jobs appear first.',
    help_tech_step2_t: '2. Accept Job & Contact Customer',
    help_tech_step2_d: 'Accepting unlocks customer phone and WhatsApp. Call customer right away to coordinate and schedule the visit.',
    help_tech_step3_t: '3. Schedule to Unlock Next Jobs',
    help_tech_step3_d: 'Once you schedule your visit date/time or complete the job, your active job lock clears and you can accept more jobs.',
    help_tech_step4_t: '4. Live Photo Proof & Digital Bill',
    help_tech_step4_d: 'Capture a live camera snapshot of the completed installation, generate a professional Digital Invoice, and send it to customer on WhatsApp.',

    // Digital Invoice / Bill
    btn_create_invoice: 'Create Digital Invoice',
    btn_view_invoice: 'View Digital Invoice',
    modal_invoice_title: 'LankaVision Pro - Digital Service Invoice',
    modal_invoice_sub: 'Official itemized bill and warranty receipt for customer',
    inv_job_details: 'Job Details',
    inv_labour_fee: 'Labour / Service Fee (Rs.)',
    inv_parts_cost: 'Spare Parts & Materials (Rs.)',
    inv_parts_desc: 'Parts Used (e.g. 20m RG6 Cable, BNC Connectors, 12V Adapter)',
    inv_warranty: 'Warranty Period',
    inv_opt_no_warranty: 'No Warranty',
    inv_opt_1m: '1 Month Service Warranty',
    inv_opt_3m: '3 Months Service Warranty',
    inv_opt_6m: '6 Months Service Warranty',
    inv_opt_1y: '1 Year Warranty',
    inv_total: 'Total Amount (Rs.)',
    btn_send_invoice_wa: 'Send Invoice to Customer on WhatsApp 📲',
    btn_save_invoice: 'Save Invoice 💾',

    // Technician Digital ID Pass
    btn_view_tech_id: 'Digital ID Pass',
    tech_id_modal_title: 'LankaVision Pro - Technician Digital ID',
    tech_id_badge_verified: 'CERTIFIED & VERIFIED TECHNICIAN',
    tech_id_tagline: 'Island-wide Certified CCTV & Satellite Professional',
    tech_id_issued_by: 'LankaVision Pro Network Verification',
    tech_id_show_hint: '💡 Show this verified digital credential to the customer upon arrival.',
    tech_id_jobs_completed: 'Jobs Completed',
    tech_id_lanyard_hint: 'Official Smart PVC Credential · Island-wide Verified',
    tech_id_share: 'Share ID Pass 📲',
    tech_id_security_id: 'SECURITY BADGE ID',

    // Job Tracking
    track_job_heading: 'Track Your Job Status',
    track_job_sub: 'Enter your Job Tracking ID (e.g. LV-JOB-49821) or phone number to check live progress.',
    track_job_placeholder: 'Job Tracking ID (LV-JOB-XXXXX) or Phone...',
    btn_track_job: 'Track Job',
    track_job_not_found: 'No job found with this Tracking ID or Phone number.',
    job_id_copied: 'Job Tracking ID copied to clipboard! 📋',

    // Quick Problem Selector
    quick_issues_title: '⚡ Common Issues (Tap to select):',
    quick_cctv_1: 'No Display on Monitor / Cameras Blank',
    quick_cctv_2: 'Hard Disk Error / Not Recording',
    quick_cctv_3: 'New CCTV Setup & Installation',
    quick_cctv_4: 'Configure Mobile Phone App View',
    quick_cctv_5: 'Broken Wiring / Power Supply Issue',
    quick_sat_1: 'No Signal / Dish Misaligned',
    quick_sat_2: 'Dish Moved due to Wind / Rain',
    quick_sat_3: 'New Satellite Dish Installation',
    quick_sat_4: 'Receiver Box or LNB Repair',
    quick_router_1: 'Poor Wi-Fi Range / Weak Signal',
    quick_router_2: 'Frequent Internet Disconnections',
    quick_router_3: 'New Wi-Fi Router Setup',

    // Urgent Job Request
    lbl_urgent_job: '🔴 Urgent Service Request (Needed today)',
    urgent_job_hint: 'Select if you have a security breakdown or urgent issue. Nearby technicians receive high-priority alert.',
    badge_urgent: '🔴 URGENT',

    // Progress Steps Tracker
    step_posted: 'Job Posted',
    step_claimed: 'Claimed',
    step_scheduled: 'Scheduled',
    step_completed: 'Completed',
    step_rated: 'Reviewed',

    // Direct Hotline
    hotline_text: 'Need help posting a job? Call our customer hotline directly',
    btn_call_hotline: 'Hotline: +94 78 680 0086',

    // In-App Updates
    adm_tab_updates: 'App Updates',
    update_modal_title: '🚀 New App Update Available!',
    update_modal_sub: 'Please install the latest version for the best experience and new features.',
    update_whats_new: 'What\'s New in this Version:',
    update_btn_download: '📲 Download Update Now',
    update_btn_later: 'Later',
    update_mandatory_alert: '⚠️ This update is required to continue using LankaVision Pro.',
    adm_update_title: 'App Version & APK Manager',
    adm_update_save_btn: 'Publish App Update 🚀',

    // Technician Selfie Change & Approval
    btn_change_selfie: '📸 Change Verification Selfie',
    modal_change_selfie_title: '📸 Update Verification Selfie',
    modal_change_selfie_desc: 'Please capture a clear live selfie using your camera. It will update your profile once approved by Admin.',
    selfie_pending_review_banner: '⏳ New Selfie Pending Admin Review',
    adm_pending_selfies_title: '📸 Technician Selfie Change Requests',
    adm_current_selfie: 'Current Approved Selfie',
    adm_new_selfie: 'New Requested Selfie',
    adm_btn_accept_selfie: 'Accept & Replace ✅',
    adm_btn_decline_selfie: 'Decline Request ❌'
  },

  // ── TAMIL 🇱🇰 ─────────────────────────────────────────────────
  ta: {
    lang_name: 'தமிழ்',
    lang_flag: '🇱🇰',

    // Brand & Nav
    brand_name: 'LankaVision Pro',
    brand_sub: 'CCTV & Satellite வேலை தளம்',
    nav_login: 'உள்நுழைக',
    nav_register: 'பதிவு செய்க',
    nav_home: 'முகப்பு',
    nav_account: 'கணக்கு',
    nav_logout: 'வெளியேறு',
    nav_my_jobs: 'எனது வேலைகள்',
    nav_profile: 'சுயவிவரம்',
    back_to_home: '← முகப்புக்கு செல்க',

    // Landing Hero
    hero_badge: 'இலங்கை முழுவதுமான சேவை (25 மாவட்டங்கள்)',
    hero_title_1: "இலங்கையின் #1",
    hero_title_2: 'CCTV & Satellite',
    hero_title_3: 'வேலை தளம்',
    hero_subtitle: 'இலங்கை முழுவதும் CCTV மற்றும் Satellite தொழில்நுட்ப வல்லுநர்களை வாடிக்கையாளர்களுடன் நேரடியாக இணைக்கும் தளம்.',
    btn_post_job: 'வேலையை பதிவு செய்க',
    btn_join_tech: 'தொழில்நுட்ப வல்லுநராக இணைக',
    stat_districts: '25 மாவட்டங்கள்',
    stat_service: '24/7 சேவை',
    stat_privacy: 'முழுமையான பாதுகாப்பு',

    // Features
    feat_dist: 'மாவட்ட வாரியாக வேலைகள்',
    feat_dist_desc: 'தொழில்நுட்ப வல்லுநர்கள் தங்கள் மாவட்ட வேலைகளை மட்டுமே பார்க்க முடியும்.',
    feat_priv: 'தொலைபேசி எண் பாதுகாப்பு',
    feat_priv_desc: 'வேலை ஏற்றுக்கொள்ளப்படும் வரை வாடிக்கையாளர் எண் பாதுகாப்பாக மறைக்கப்பட்டிருக்கும்.',
    feat_maps: 'Google Maps வழிசெலுத்தல்',
    feat_maps_desc: 'வேலை உள்ள இடத்தை Google Maps மூலம் நேரடியாக அடைந்து கொள்ளலாம்.',
    feat_wa: 'நேரடி WhatsApp அரட்டை',
    feat_wa_desc: 'வேலையை ஏற்றதும் வாடிக்கையாளருடன் நேரடியாக WhatsApp மூலம் தொடர்பு கொள்ளலாம்.',
    feat_rt: 'உடனடி அறிவிப்புகள்',
    feat_rt_desc: 'நாடு முழுவதும் புதிய வேலைகள் பற்றிய உடனடி நேரடி அறிவிப்புகள்.',
    feat_ratings: '5-நட்சத்திர மதிப்பீடு முறை',
    feat_ratings_desc: 'வாடிக்கையாளர் மதிப்பீடுகள் மூலம் உங்கள் நற்பெயரையும் வேலைகளையும் அதிகரிக்கவும்.',

    // Login & Register
    login_title: 'மீண்டும் வருக 👋',
    login_sub: 'உங்கள் LankaVision கணக்கில் உள்நுழையவும்',
    email_label: 'மின்னஞ்சல் (Email)',
    password_label: 'கடவுச்சொல் (Password)',
    btn_login: 'உள்நுழைக',
    forgot_password_link: 'கடவுச்சொல் மறந்துவிட்டதா?',
    modal_forgot_title: 'கடவுச்சொல்லை மீட்டமைக்கவும்',
    modal_forgot_desc: 'உங்கள் பதிவுசெய்த மின்னஞ்சல் முகவரிக்கு ஒரு OTP குறியீடு அனுப்பப்படும்.',
    btn_get_otp: 'OTP குறியீட்டைப் பெறுங்கள் 📨',
    lbl_otp_code: '6 இலக்க OTP குறியீடு',
    lbl_new_password: 'புதிய கடவுச்சொல்',
    lbl_confirm_new_password: 'புதிய கடவுச்சொல்லை உறுதிப்படுத்தவும்',
    btn_save_new_pwd: 'கடவுச்சொல்லை மாற்றவும் 🔒',
    btn_send_reset: 'மீட்டமைப்பு இணைப்பை அனுப்பு 📨',
    reset_email_sent: 'கடவுச்சொல் மீட்டமைப்பு OTP உங்கள் மின்னஞ்சலுக்கு அனுப்பப்பட்டது! இன்பாக்ஸ் அல்லது ஸ்பேம் கோப்புறையை சரிபார்க்கவும்.',
    no_account: 'கணக்கு இல்லையா?',
    register_link: 'இங்கே பதிவு செய்க',

    reg_role_title: 'LankaVision உடன் இணைக ✨',
    reg_role_sub: 'உங்கள் பதிவு வகையை தேர்ந்தெடுக்கவும்',
    role_customer: 'எனக்கு சேவை தேவை (Customer)',
    role_customer_desc: 'CCTV / Satellite பொருத்துதல் அல்லது பழுதுபார்க்க சிறந்த வல்லுநர்களை கண்டறியவும்',
    role_technician: 'நான் ஒரு தொழில்நுட்ப வல்லுநர் (Technician)',
    role_technician_desc: 'வேலைகளை ஏற்று கூடுதல் வருமானம் ஈட்டவும்',

    cust_reg_title: 'வாடிக்கையாளர் பதிவு',
    tech_reg_title: 'தொழில்நுட்ப வல்லுநர் பதிவு',
    name_label: 'முழு பெயர்',
    phone_label: 'தொலைபேசி எண்',
    district_label: 'மாவட்டம்',
    city_label: 'நகரம் (City / Town)',
    service_type_label: 'சேவை வகை',
    select_district: 'மாவட்டத்தைத் தேர்ந்தெடுக்கவும்',
    btn_create_account: 'கணக்கை உருவாக்கு',
    btn_submit_app: 'விண்ணப்பத்தை சமர்ப்பிக்கவும்',

    // Camera & Selfie
    selfie_title: 'நேரடி Selfie சரிபார்ப்பு',
    selfie_desc: 'கேமரா மூலம் உங்கள் நேரடி செல்ஃபி எடுக்கவும் (Gallery upload அனுமதிக்கப்படாது)',
    btn_cam_on: 'கேமராவை ஆன் செய்க',
    btn_cam_capture: 'படம் எடுக்கவும்',
    btn_cam_retake: 'மீண்டும் எடுக்கவும்',
    btn_cam_switch: 'கேமராவை மாற்றுக',
    selfie_success: 'நேரடி செல்ஃபி வெற்றிகரமாக எடுக்கப்பட்டது!',
    cam_oval_guide: 'முகத்தை வட்டத்திற்குள் வைக்கவும்',

    // Mandatory Selfie Modal
    mandatory_selfie_badge: 'நேரடி Selfie கட்டாயமானது 🔒',
    mandatory_selfie_desc: 'அன்புள்ள தொழில்நுட்ப வல்லுநரே, வாடிக்கையாளர் பாதுகாப்பை உறுதிப்படுத்த வேலைகளை பார்க்கும் முன் உங்கள் நேரடி செல்ஃபி எடுப்பது கட்டாயமாகும்.',
    mandatory_selfie_warning: '⚠️ Gallery படங்கள் பதிவேற்ற முடியாது.',
    btn_save_selfie: 'Selfie ஐ சேமித்து தொடரவும்',
    btn_logout_cancel: 'இப்போது வேண்டாம் (வெளியேறு)',

    // Post a Job
    post_job_title: 'புதிய வேலை கோரிக்கை',
    job_type_label: 'வேலை வகை',
    job_title_label: 'வேலை தலைப்பு',
    job_desc_label: 'விவரம்',
    btn_post_submit: 'வேலையை சமர்ப்பிக்கவும்',
    guest_info_title: 'உங்கள் தொடர்பு விவரங்கள்',

    // Dashboard Tabs
    tab_available: 'கிடைக்கும் வேலைகள்',
    tab_claimed: 'ஏற்றுக்கொண்ட வேலைகள்',
    tab_completed: 'முடிக்கப்பட்டவை (Completed)',
    tab_my_jobs: 'என் வேலைகள்',
    tab_post_job: 'வேலை பதிவிடுக',
    tab_profile: 'சுயவிவரம்',
    filter_36km: '🎯 அருகிலுள்ள வேலைகள் (36 km)',
    filter_50km: '🚗 50 km எல்லைக்குள்',
    filter_my_dist: '📍 எனது மாவட்டம் மட்டும்',
    filter_all: '🌐 அனைத்து வேலைகளும்',
    dist_away: 'தூரம்',

    // Job Actions & Statuses
    btn_accept_job: 'ஏற்றுக்கொள் (Accept)',
    btn_complete_job: 'வேலை முடிந்தது',
    btn_rate_tech: 'மதிப்பீடு அளிக்கவும்',
    btn_view_map: 'வரைபடத்தில் காண்க',
    btn_call: 'அழைக்க',
    btn_whatsapp: 'WhatsApp',
    assigned_tech_lbl: 'ஒதுக்கப்பட்ட வல்லுநர்',
    verified_tech: 'சரிபார்க்கப்பட்ட வல்லுநர்',
    status_open: 'திறந்துள்ளது (Open)',
    status_claimed: 'செயல்பாட்டில் உள்ளது',
    status_completed: 'முடிந்தது (Completed)',
    status_cancelled: 'ரத்து செய்யப்பட்டது',

    // Work Proof Modal
    work_proof_modal_title: 'வேலை முடிவை உறுதிசெய்க',
    work_proof_modal_sub: 'முடிந்த வேலையின் நேரடி புகைப்படத்தை கேமரா மூலம் ஆதாரமாக எடுக்கவும்.',
    work_notes_label: 'முடிவு குறிப்புகள் (விருப்பமானது)',
    btn_confirm_complete: 'உறுதிசெய்து முடிக்க',

    // Visit Scheduling
    btn_schedule: 'நேரத்தை திட்டமிடுக (Schedule)',
    btn_reschedule: 'தேதியை மாற்றுக (Reschedule)',
    schedule_modal_title: 'வாடிக்கையாளர் சந்திப்பை திட்டமிடுக',
    schedule_modal_subtitle: 'வாடிக்கையாளர் இருக்கும் தேதி மற்றும் நேரத்தை தேர்வு செய்து திட்டமிடுங்கள்.',
    visit_date_label: 'வருகை தரும் தேதி (Visit Date)',
    visit_time_label: 'வருகை தரும் நேரம் (Visit Time)',
    schedule_notes_label: 'குறிப்புகள் (Notes)',
    btn_confirm_schedule: 'திட்டமிடலை உறுதிசெய்',
    scheduled_visit: 'திட்டமிடப்பட்ட சந்திப்பு நேரம்',
    cust_preferred_time: 'வாடிக்கையாளர் விரும்பும் நேரம்',
    pref_time_title: 'விரும்பும் தேதி மற்றும் நேரம் (விருப்பத்தேர்வு)',
    pref_date_label: 'விரும்பும் தேதி',
    pref_time_label: 'விரும்பும் நேரம்',
    pref_notes_label: 'கிடைக்கும் நேரம் பற்றிய குறிப்பு',

    // Feedback & Rating Modal
    rate_modal_title: 'தொழில்நுட்ப வல்லுநருக்கு மதிப்பீடு',
    rate_modal_sub: 'வல்லுநரின் சேவைக்கு நட்சத்திர மதிப்பீடு (1-5) மற்றும் கருத்துக்களை வழங்கவும்',
    select_stars_lbl: 'மதிப்பீட்டைத் தேர்ந்தெடுக்கவும் (1 முதல் 5 வரை):',
    feedback_notes_lbl: 'உங்கள் கருத்து (Feedback)',
    btn_submit_feedback: 'மதிப்பீட்டை சமர்ப்பிக்கவும்',

    // Rating Texts
    star_1: '⭐ 1/5 - மோசம் (Poor)',
    star_2: '⭐⭐ 2/5 - சுமார் (Fair)',
    star_3: '⭐⭐⭐ 3/5 - நன்று (Good)',
    star_4: '⭐⭐⭐⭐ 4/5 - மிக நன்று (Very Good)',
    star_5: '⭐⭐⭐⭐⭐ 5/5 - அற்புதம் (Excellent)',
    reviews_count: 'மதிப்பீடுகள்',

    // Admin Panel
    admin_panel_title: 'நிர்வாக குழு (Admin Panel)',
    adm_btn_test_email: 'மின்னஞ்சல் சோதனை (Test Email)',
    adm_pill_main: 'முதன்மை நிர்வாகி (Main Admin)',
    adm_pill_sub: 'நிர்வாகி (Admin)',
    adm_pill_sub_badge: 'துணை நிர்வாகி (Sub-Admin)',

    // Admin Tabs
    adm_tab_overview: 'கண்ணோட்டம் (Overview)',
    adm_tab_pending: 'நிலுவையில் உள்ளவை (Pending)',
    adm_tab_jobs: 'அனைத்து வேலைகள் (All Jobs)',
    adm_tab_techs: 'தொழில்நுட்ப வல்லுநர்கள் (Technicians)',
    adm_tab_customers: 'வாடிக்கையாளர்கள் (Customers)',
    adm_tab_admins: 'நிர்வாகிகள் (Admins)',

    // Stats Grid
    adm_stat_pending_techs: 'நிலுவை Technicians',
    adm_stat_open_jobs: 'திறந்த வேலைகள் (Open Jobs)',
    adm_stat_active_techs: 'செயலில் உள்ள Technicians',
    adm_stat_completed_jobs: 'முடிக்கப்பட்டவை (Completed)',

    // Section Headings & Buttons
    adm_recent_jobs: 'சமீபத்திய வேலைகள் (Recent Jobs)',
    adm_heading_admins: 'கணினி நிர்வாகிகள் (System Administrators)',
    adm_btn_test_admin_email: 'நிர்வாக மின்னஞ்சல் சோதனை',
    adm_btn_new_admin: '+ புதிய நிர்வாகி உருவாக்கு',

    // Filters & Statuses
    opt_all_status: 'அனைத்து நிலைகள் (All Status)',
    opt_all_types: 'அனைத்து வகைகள் (All Types)',
    opt_all_districts: 'அனைத்து மாவட்டங்கள் (All Districts)',
    adm_tech_pending: 'நிலுவையில் உள்ளது (Pending)',
    adm_tech_approved: 'அங்கீகரிக்கப்பட்டது (Approved)',
    adm_tech_rejected: 'நிராகரிக்கப்பட்டது (Rejected)',
    svc_both: 'இரண்டும் (Both CCTV & Satellite)',

    // Action Buttons & Labels
    btn_approve: 'அங்கீகரிக்கவும் (Approve)',
    btn_reject: 'நிராகரி (Reject)',
    btn_edit: 'திருத்து (Edit)',
    btn_suspend: 'இடைநிறுத்து (Suspend)',
    btn_delete: 'நீக்கு (Delete)',
    selfie_verified_badge: 'சுயபடம் சரிபார்க்கப்பட்டது 🔒',
    applied_lbl: 'விண்ணப்பித்தது',
    empty_no_jobs: 'வேலைகள் இல்லை (No Jobs)',
    empty_no_pending: 'நிலுவையில் உள்ள விண்ணப்பங்கள் இல்லை',
    empty_no_techs: 'தொழில்நுட்ப வல்லுநர்கள் இல்லை',
    empty_no_admins: 'நிர்வாகிகள் இல்லை',
    admin_protected: 'பாதுகாக்கப்பட்டது (Protected)',
    admin_your_account: '(உங்கள் கணக்கு)',
    loading: 'ஏற்றுகிறது (Loading)...',

    // Admin Modals
    modal_edit_job_title: 'வேலையை திருத்தவும் (Edit Job)',
    modal_edit_tech_title: 'தொழில்நுட்ப வல்லுநரை திருத்தவும் (Edit Technician)',
    adm_modal_create_title: 'புதிய நிர்வாகியை உருவாக்கவும்',
    adm_modal_create_sub: 'புதிய நிர்வாகி கணக்கை உருவாக்கி அனுமதி வழங்கவும்',
    adm_name_label: 'நிர்வாகி பெயர்',
    btn_create_admin_account: 'நிர்வாகி கணக்கை உருவாக்கவும்',
    btn_cancel: 'ரத்து செய் (Cancel)',
    btn_save_changes: 'மாற்றங்களை சேமி (Save Changes)',
    cust_name_label: 'வாடிக்கையாளர் பெயர்',
    cust_phone_label: 'தொலைபேசி எண்',
    status_label: 'நிலை (Status)',

    // Router Installation & Multi-services
    svc_router: 'Router Installation',
    job_type_router: 'Router Installation',
    svc_multi_hint: '1, 2 அல்லது 3 சேவைகளையும் தேர்ந்தெடுக்கலாம்',
    adm_tech_loc_search_title: 'Technician இடம் மற்றும் 36 km Radius தேடல்',
    adm_tech_loc_search_placeholder: '🔍 இடத்தை தேடவும் (உதா: Padaviya, Kekirawa)...',
    active_job_lock_title: 'செயலில் உள்ள வேலை உள்ளது',
    active_job_lock_warning: 'நீங்கள் ஏற்கனவே ஒரு வேலையை ஏற்றுக்கொண்டுள்ளீர்கள். புதிய வேலையை ஏற்கும் முன் அதை முடிக்கவும் அல்லது நேரத்தை திட்டமிடவும்.',
    btn_add_router: 'Router Installation சேர்க்கவும்',
    btn_not_now: 'இப்போது வேண்டாம்',
    router_prompt_title: '🚀 புதிய சேவை வாய்ப்பு: Router Installation!',
    router_prompt_desc: 'நீங்கள் Wi-Fi Routers மற்றும் நெட்வொர்க் உபகரணங்களை பொருத்துகிறீர்களா? உங்கள் பகுதியில் Router வேலைகளைப் பெற உங்கள் சுயவிவரத்தில் சேர்க்கவும்!',
    router_added_success: 'Router Installation வெற்றிகரமாக சேர்க்கப்பட்டது! 🎉',
    offline_banner_msg: 'நீங்கள் ஆஃப்லைனில் உள்ளீர்கள். மொபைல் டேட்டா அல்லது வைஃபை இணைக்கவும்.',
    offline_online_msg: '✅ இணைய இணைப்பு மீட்டெடுக்கப்பட்டது! (Back Online)',
    offline_job_post_error: '⚠️ நீங்கள் ஆஃப்லைனில் உள்ளீர்கள். பணியை இடுகையிட இணையத்தை இணைக்கவும்.',
    offline_action_error: '⚠️ நீங்கள் ஆஃப்லைனில் உள்ளீர்கள். இந்தச் செயலுக்கு இணையம் தேவை.',
    notif_center_title: 'அறிவிப்புகள்',
    clear_all: 'அனைத்தையும் அழிக்கவும்',
    no_notifs: 'அறிவிப்புகள் எதுவும் இல்லை',

    // Help & Visual Guide
    btn_help_guide: '💡 எப்படி பயன்படுத்துவது',
    help_modal_title: 'LankaVision Pro - பயன்பாட்டு வழிகாட்டி',
    help_modal_sub: 'வாடிக்கையாளர்கள் மற்றும் தொழில்நுட்ப வல்லுநர்களுக்கான எளிய வழிகாட்டி',
    help_tab_customer: '👤 நான் ஒரு வாடிக்கையாளர்',
    help_tab_tech: '🔧 நான் ஒரு தொழில்நுட்ப வல்லுநர்',
    help_cust_step1_t: '1. எளிதாக பணியை இடுகையிடவும்',
    help_cust_step1_d: 'உங்கள் பெயர், தொலைபேசி எண், சேவை வகை மற்றும் மாவட்டத்தைத் தேர்ந்தெடுத்து பணியை இடுகையிடவும்.',
    help_cust_step2_t: '2. தொழில்நுட்ப வல்லுநர் ஏற்றுக்கொள்வார்',
    help_cust_step2_d: 'சான்றளிக்கப்பட்ட தொழில்நுட்ப வல்லுநர் உங்கள் பணியை ஏற்றவுடன் அறிவிப்பு கிடைக்கும்.',
    help_cust_step3_t: '3. வருகை நேரம் மற்றும் சரிபார்ப்பு',
    help_cust_step3_d: 'தொழில்நுட்ப வல்லுநரின் டிஜிட்டல் அடையாள அட்டையை நீங்கள் சரிபார்க்கலாம்.',
    help_cust_step4_t: '4. பணி நிறைவு மற்றும் டிஜிட்டல் பில்',
    help_cust_step4_d: 'பணி முடிந்ததும் WhatsApp மூலம் அதிகாரப்பூர்வ பில் பெற்று 5-நட்சத்திர மதிப்பீடு வழங்கவும்.',
    help_tech_step1_t: '1. அருகிலுள்ள பணிகளைப் பார்க்கவும் (36 km)',
    help_tech_step1_d: 'உங்கள் இடத்திலிருந்து 36 கிமீக்குள் உள்ள பணிகளை வரைபடத்தில் பார்க்கலாம்.',
    help_tech_step2_t: '2. பணியை ஏற்றுக்கொண்டு வாடிக்கையாளரை தொடர்பு கொள்ளவும்',
    help_tech_step2_d: 'ஏற்றுக்கொண்டவுடன் WhatsApp மற்றும் தொலைபேசி எண் திறக்கப்படும்.',
    help_tech_step3_t: '3. வருகை நேரத்தை திட்டமிடவும்',
    help_tech_step3_d: 'வருகை நேரத்தை உள்ளிட்ட பிறகு அடுத்த பணிகளை ஏற்கலாம்.',
    help_tech_step4_t: '4. லைவ் புகைப்படத்துடன் பில் அனுப்பவும்',
    help_tech_step4_d: 'நிறைவு செய்த புகைப்படத்தை எடுத்து டிஜிட்டல் பில்லை WhatsApp-இல் அனுப்பவும்.',

    // Digital Invoice / Bill
    btn_create_invoice: 'டிஜிட்டல் பில் உருவாக்கவும்',
    btn_view_invoice: 'டிஜிட்டல் பில் பார்க்கவும்',
    modal_invoice_title: 'LankaVision Pro - டிஜிட்டல் சேவை பில்',
    modal_invoice_sub: 'வாடிக்கையாளருக்கான அதிகாரப்பூர்வ கட்டண விவரம் மற்றும் ரசீது',
    inv_job_details: 'பணி விவரங்கள்',
    inv_labour_fee: 'சேவை கட்டணம் (ரூ.)',
    inv_parts_cost: 'உதிரி பாகங்கள் கட்டணம் (ரூ.)',
    inv_parts_desc: 'பயன்படுத்தப்பட்ட பாகங்கள் விவரம்',
    inv_warranty: 'உத்தரவாத காலம்',
    inv_opt_no_warranty: 'உத்தரவாதம் இல்லை',
    inv_opt_1m: '1 மாத உத்தரவாதம்',
    inv_opt_3m: '3 மாத உத்தரவாதம்',
    inv_opt_6m: '6 மாத உத்தரவாதம்',
    inv_opt_1y: '1 வருட உத்தரவாதம்',
    inv_total: 'மொத்த தொகை (ரூ.)',
    btn_send_invoice_wa: 'வாட்ஸ்அப்பில் வாடிக்கையாளருக்கு அனுப்பவும் 📲',
    btn_save_invoice: 'பில் சேமிக்கவும் 💾',

    // Technician Digital ID Pass
    btn_view_tech_id: 'டிஜிட்டல் அடையாள அட்டை',
    tech_id_modal_title: 'LankaVision Pro - தொழில்நுட்ப வல்லுநர் அடையாள அட்டை',
    tech_id_badge_verified: 'CERTIFIED & VERIFIED TECHNICIAN',
    tech_id_tagline: 'தீவு முழுவதும் சரிபார்க்கப்பட்ட தொழில்நுட்ப வல்லுநர்',
    tech_id_issued_by: 'LankaVision Pro Network Verification',
    tech_id_show_hint: '💡 வாடிக்கையாளரிடம் உங்கள் அடையாளத்தை உறுதிப்படுத்த இந்த அட்டையைக் காட்டுங்கள்.',
    tech_id_jobs_completed: 'முடிக்கப்பட்ட வேலைகள் (Jobs Completed)',
    tech_id_lanyard_hint: 'Official Smart PVC Credential · Island-wide Verified',
    tech_id_share: 'அடையாள அட்டையைப் பகிரவும் 📲',
    tech_id_security_id: 'SECURITY BADGE ID',

    // Job Tracking
    track_job_heading: 'வேலையை கண்காணிக்கவும் (Track Job)',
    track_job_sub: 'உங்கள் Job Tracking ID (எ.கா. LV-JOB-49821) அல்லது தொலைபேசி எண்ணை உள்ளிடவும்.',
    track_job_placeholder: 'Job Tracking ID (LV-JOB-XXXXX) அல்லது Phone...',
    btn_track_job: 'Track Job',
    track_job_not_found: 'இந்த Tracking ID அல்லது தொலைபேசி எண்ணிற்கு வேலை எதுவும் கிடைக்கவில்லை.',
    job_id_copied: 'Job Tracking ID நகலெடுக்கப்பட்டது! 📋',

    // Quick Problem Selector
    quick_issues_title: '⚡ பொதுவான சிக்கல்கள்:',
    quick_cctv_1: 'கேமரா வேலை செய்யவில்லை (No Display)',
    quick_cctv_2: 'Hard Disk Error (பதிவாகவில்லை)',
    quick_cctv_3: 'புதிய CCTV பொருத்துதல் (New Setup)',
    quick_cctv_4: 'மொபைல் போனில் ஆன்லைனில் பார்ப்பது',
    quick_cctv_5: 'வயர் பிரச்சனை / Power Issue',
    quick_sat_1: 'சிக்னல் இல்லை (No Signal)',
    quick_sat_2: 'டிஷ் நகர்ந்துள்ளது (Alignment)',
    quick_sat_3: 'புதிய டிஷ் பொருத்துதல்',
    quick_sat_4: 'ரிசீவர் பிரச்சனை',
    quick_router_1: 'Wi-Fi சிக்னல் பலவீனமாக உள்ளது',
    quick_router_2: 'இணையம் அடிக்கடி துண்டிக்கப்படுகிறது',
    quick_router_3: 'புதிய Wi-Fi Router பொருத்துதல்',

    // Urgent Job Request
    lbl_urgent_job: '🔴 அவசர சேவை (இன்றே தேவை - Urgent)',
    urgent_job_hint: 'அவசர சிக்கல் என்றால் இதைத் தேர்ந்தெடுக்கவும். அருகிலுள்ள வல்லுநர்களுக்கு அறிவிப்பு செல்லும்.',
    badge_urgent: '🔴 அவசரம் (URGENT)',

    // Progress Steps Tracker
    step_posted: 'பதிவிடப்பட்டது',
    step_claimed: 'ஏற்கப்பட்டது',
    step_scheduled: 'திட்டமிடப்பட்டது',
    step_completed: 'நிறைவுற்றது',
    step_rated: 'மதிப்பிடப்பட்டது',

    // Direct Hotline
    hotline_text: 'உதவி தேவையா? எங்கள் வாடிக்கையாளர் சேவைக்கு அழைக்கவும்',
    btn_call_hotline: 'Hotline: +94 78 680 0086',

    // In-App Updates
    adm_tab_updates: 'App Updates',
    update_modal_title: '🚀 புதிய புதுப்பிப்பு கிடைக்கிறது!',
    update_modal_sub: 'சிறந்த சேவைக்கு சமீபத்திய பதிப்பை நிறுவவும்.',
    update_whats_new: 'புதிய அம்சங்கள் (What\'s New):',
    update_btn_download: '📲 இப்போது பதிவிறக்கவும்',
    update_btn_later: 'பின்னர் (Later)',
    update_mandatory_alert: '⚠️ சேவைகளைத் தொடர இந்த புதுப்பிப்பு கட்டாயமாகும்.',
    adm_update_title: 'App பதிப்பு மற்றும் APK மேலாளர்',
    adm_update_save_btn: 'புதுப்பிப்பை வெளியிடவும் 🚀',

    // Technician Selfie Change & Approval
    btn_change_selfie: '📸 செல்பி புகைப்படத்தை மாற்றவும்',
    modal_change_selfie_title: '📸 சரிபார்ப்பு செல்பியைப் புதுப்பிக்கவும்',
    modal_change_selfie_desc: 'உங்கள் கேமராவைப் பயன்படுத்தி நேரடி செல்பி எடுக்கவும். நிர்வாகி அனுமதித்த பிறகு சுயவிவரத்தில் புதுப்பிக்கப்படும்.',
    selfie_pending_review_banner: '⏳ புதிய செல்பி நிர்வாகியின் அனுமதிக்காக காத்திருக்கிறது',
    adm_pending_selfies_title: '📸 தொழில்நுட்பவியலாளர் செல்பி மாற்ற கோரிக்கைகள்',
    adm_current_selfie: 'தற்போதைய செல்பி',
    adm_new_selfie: 'புதிய கோரப்பட்ட செல்பி',
    adm_btn_accept_selfie: 'ஏற்றுக்கொண்டு மாற்றவும் ✅',
    adm_btn_decline_selfie: 'நிராகரிக்கவும் ❌'
  }
};

// Current active language - defaults to 'si' (Sinhala) for Sri Lankan users
let currentLang = (function() {
  try {
    const explicit = localStorage.getItem('app_user_lang');
    if (explicit && I18N[explicit]) return explicit;
    const legacy = localStorage.getItem('app_lang');
    if (legacy && I18N[legacy]) return legacy;
    return 'si'; // Default to Sinhala for Sri Lankan audience
  } catch (e) {
    return 'si';
  }
})();
if (!I18N[currentLang]) currentLang = 'si';

/**
 * Returns translated string for a given key in current active language
 */
function t(key, fallback) {
  const langDict = I18N[currentLang] || I18N['en'];
  if (langDict && langDict[key] !== undefined) {
    return langDict[key];
  }
  // Fallback to English, then Sinhala
  if (I18N['en'] && I18N['en'][key] !== undefined) return I18N['en'][key];
  if (I18N['si'] && I18N['si'][key] !== undefined) return I18N['si'][key];
  return fallback !== undefined ? fallback : key;
}

/**
 * Changes active language, updates localStorage and applies translations across the entire DOM
 */
function setLanguage(lang) {
  if (!I18N[lang]) lang = 'en';
  currentLang = lang;
  try {
    localStorage.setItem('app_user_lang', lang);
    localStorage.setItem('app_lang', lang);
  } catch (e) {}

  document.documentElement.lang = lang;

  // 1. Update textContent for elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && I18N[currentLang][key]) {
      el.textContent = I18N[currentLang][key];
    }
  });

  // 2. Update innerHTML for elements with data-i18n-html
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (key && I18N[currentLang][key]) {
      el.innerHTML = I18N[currentLang][key];
    }
  });

  // 3. Update placeholder for elements with data-i18n-ph
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (key && I18N[currentLang][key]) {
      el.placeholder = I18N[currentLang][key];
    }
  });

  // 4. Update language switcher UI elements
  updateLangSwitcherUI();

  // 5. Trigger app re-renders if available
  if (typeof onLanguageChanged === 'function') {
    onLanguageChanged(lang);
  }
}

/**
 * Generates an interactive language switcher HTML snippet
 */
function renderLangSwitcherHtml(customClass = '') {
  return `
    <div class="lang-switcher ${customClass}" id="lang-switcher">
      <button type="button" class="lang-btn ${currentLang === 'en' ? 'active' : ''}" onclick="setLanguage('en')" title="English">English</button>
      <button type="button" class="lang-btn ${currentLang === 'si' ? 'active' : ''}" onclick="setLanguage('si')" title="Sinhala">සිංහල</button>
      <button type="button" class="lang-btn ${currentLang === 'ta' ? 'active' : ''}" onclick="setLanguage('ta')" title="Tamil">தமிழ்</button>
    </div>
  `;
}

/**
 * Updates active class on all rendered language switchers in DOM
 */
function updateLangSwitcherUI() {
  document.querySelectorAll('.lang-switcher').forEach(wrap => {
    wrap.querySelectorAll('.lang-btn').forEach(btn => {
      const onclickAttr = btn.getAttribute('onclick') || '';
      btn.classList.toggle('active', onclickAttr.includes(`'${currentLang}'`));
    });
  });
}

// Automatically apply initial language on load (defaults to 'en')
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setLanguage(currentLang);
    });
  } else {
    setLanguage(currentLang);
  }
}

// Global scope export for browser and Node.js testing
if (typeof window !== 'undefined') {
  window.I18N = I18N;
  window.t = t;
  window.setLanguage = setLanguage;
} else if (typeof globalThis !== 'undefined') {
  globalThis.I18N = I18N;
  globalThis.t = t;
  globalThis.setLanguage = setLanguage;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { I18N, t, setLanguage, renderLangSwitcherHtml };
}

