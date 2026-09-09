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
    tab_my_jobs: 'My Posted Jobs',
    tab_post_job: 'Post Job',
    tab_profile: 'Profile',

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
    reviews_count: 'reviews'
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
    tab_my_jobs: 'My Posted Jobs',
    tab_post_job: 'Post Job',
    tab_profile: 'Profile',

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
    reviews_count: 'reviews'
  },

  // ── TAMIL 🇮🇳 ─────────────────────────────────────────────────
  ta: {
    lang_name: 'தமிழ்',
    lang_flag: '🇮🇳',

    // Brand & Nav
    brand_name: 'LankaVision Pro',
    brand_sub: 'CCTV & Satellite வேலை தளம்',
    nav_login: 'உள்நுழைக',
    nav_register: 'பதிவு செய்க',
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
    tab_my_jobs: 'என் வேலைகள்',
    tab_post_job: 'வேலை பதிவிடுக',
    tab_profile: 'சுயவிவரம்',

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
    reviews_count: 'மதிப்பீடுகள்'
  }
};

// Current active language - persisted in localStorage (defaults to 'si')
let currentLang = localStorage.getItem('app_lang') || 'si';
if (!I18N[currentLang]) currentLang = 'si';

/**
 * Returns translated string for a given key in current active language
 */
function t(key, fallback) {
  const langDict = I18N[currentLang] || I18N['si'];
  if (langDict && langDict[key] !== undefined) {
    return langDict[key];
  }
  // Fallback to Sinhala or English
  if (I18N['si'] && I18N['si'][key] !== undefined) return I18N['si'][key];
  if (I18N['en'] && I18N['en'][key] !== undefined) return I18N['en'][key];
  return fallback !== undefined ? fallback : key;
}

/**
 * Changes active language, updates localStorage and applies translations across the entire DOM
 */
function setLanguage(lang) {
  if (!I18N[lang]) lang = 'si';
  currentLang = lang;
  try {
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
      <button type="button" class="lang-btn ${currentLang === 'si' ? 'active' : ''}" onclick="setLanguage('si')" title="සිංහල">
        <span class="lang-flag">🇱🇰</span> <span class="lang-label">සිංහල</span>
      </button>
      <button type="button" class="lang-btn ${currentLang === 'en' ? 'active' : ''}" onclick="setLanguage('en')" title="English">
        <span class="lang-flag">🇬🇧</span> <span class="lang-label">Eng</span>
      </button>
      <button type="button" class="lang-btn ${currentLang === 'ta' ? 'active' : ''}" onclick="setLanguage('ta')" title="தமிழ்">
        <span class="lang-flag">🇮🇳</span> <span class="lang-label">தமிழ்</span>
      </button>
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

// Automatically apply initial language on load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
  });
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

