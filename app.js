// =============================================================
// LankaVision Pro — app.js v3
// Complete Application Logic
// =============================================================

const MAIN_ADMIN_EMAIL = 'lankavisionadmin@gmail.com';
const APP_BASE_URL = (typeof window !== 'undefined' && window.location && window.location.origin && !window.location.origin.includes('localhost') && !window.location.origin.includes('127.0.0.1'))
  ? window.location.origin
  : 'https://lanka-vision.vercel.app';

// Application Version Information
const APP_VERSION = '1.0.0';
const APP_VERSION_CODE = 1;
window._currentAppVersion = APP_VERSION;
window._currentAppVersionCode = APP_VERSION_CODE;
let _cachedRemoteAppUpdate = null;
let _updateDismissedThisSession = false;

// Global i18n translation fallback helper
function tFn(k, fb) {
  return (typeof t === 'function') ? t(k, fb) : fb;
}

// Leaflet default icon asset fallback to prevent broken images
if (typeof L !== 'undefined' && L.Icon && L.Icon.Default) {
  try {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  } catch (e) {
    console.warn('Leaflet icon fallback setup error:', e);
  }
}

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
  // ── ANURADHAPURA & NORTH CENTRAL ──
  'Padaviya': [8.8784, 80.7580],
  'Kebithigollewa': [8.6366, 80.6865],
  'Medawachchiya': [8.5434, 80.4958],
  'Horowpathana': [8.5556, 80.8667],
  'Galenbindunuwewa': [8.3846, 80.6587],
  'Kahatagasdigiliya': [8.4239, 80.7183],
  'Rambewa': [8.4500, 80.5167],
  'Mihintale': [8.3512, 80.5042],
  'Anuradhapura': [8.3114, 80.4037],
  'Nochchiyagama': [8.2703, 80.1989],
  'Thalawa': [8.1969, 80.3128],
  'Tambuttegama': [8.1561, 80.3019],
  'Rajanganaya': [8.1833, 80.1833],
  'Eppawala': [8.1408, 80.4136],
  'Thirappane': [8.1500, 80.5500],
  'Kekirawa': [8.0441, 80.5960],
  'Habarana': [8.0338, 80.7511],
  'Galnewa': [8.0667, 80.3667],
  'Ipalogama': [8.0833, 80.5000],

  // ── VAVUNIYA (BORDERING PADAVIYA) ──
  'Vavuniya': [8.7514, 80.4972],
  'Nedunkeni': [8.9833, 80.6833],
  'Omanthai': [8.8500, 80.5000],
  'Cheddikulam': [8.6667, 80.3167],

  // ── TRINCOMALEE (BORDERING PADAVIYA) ──
  'Trincomalee': [8.5874, 81.2152],
  'Kuchchaveli': [8.8167, 81.0833],
  'Pulmoddai': [8.9500, 80.9500],
  'Nilaveli': [8.6833, 81.1833],
  'Kinniya': [8.4833, 81.1833],
  'Kantale': [8.3667, 80.9833],
  'Muttur': [8.4500, 81.2667],
  'Serunuwara': [8.3167, 81.2833],

  // ── MULLAITIVU (BORDERING PADAVIYA) ──
  'Mullaitivu': [9.2671, 80.8142],
  'Oddusuddan': [9.1500, 80.6500],
  'Puthukkudiyiruppu': [9.3167, 80.7000],
  'Mankulam': [9.1333, 80.4333],
  'Mallavi': [9.1333, 80.3000],

  // ── POLONNARUWA ──
  'Polonnaruwa': [7.9403, 81.0188],
  'Kaduruwela': [7.9333, 81.0167],
  'Hingurakgoda': [8.0500, 80.9667],
  'Medirigiriya': [8.1500, 80.9833],
  'Giritale': [7.9833, 80.9167],
  'Welikanda': [7.9833, 81.2500],
  'Aralaganwila': [7.8833, 81.1500],
  'Dimbulagala': [7.8667, 81.1333],

  // ── MANNAR ──
  'Mannar': [8.9786, 79.9044],
  'Madhu': [8.8500, 80.2000],
  'Murunkan': [8.8333, 80.0333],
  'Nanaddan': [8.8333, 79.9500],
  'Pesalai': [9.0833, 79.8167],
  'Thalaimannar': [9.1000, 79.7167],

  // ── MATALE ──
  'Matale': [7.4675, 80.6234],
  'Dambulla': [7.8742, 80.6511],
  'Galewela': [7.8167, 80.5667],
  'Sigiriya': [7.9542, 80.7553],
  'Naula': [7.7000, 80.6500],
  'Ukuwela': [7.4333, 80.6333],
  'Rattota': [7.5167, 80.6667],
  'Yatawatta': [7.5333, 80.5833],

  // ── KURUNEGALA ──
  'Kurunegala': [7.4867, 80.3647],
  'Kuliyapitiya': [7.4689, 80.0400],
  'Narammala': [7.4333, 80.2167],
  'Wariyapola': [7.6333, 80.2667],
  'Pannala': [7.3333, 80.0167],
  'Giriulla': [7.3667, 80.1333],
  'Polgahawela': [7.3333, 80.3000],
  'Ibbagamuwa': [7.5500, 80.4500],
  'Alawwa': [7.3000, 80.2500],
  'Mawathagama': [7.4333, 80.4333],
  'Nikaweratiya': [7.7500, 80.1167],
  'Maho': [7.8167, 80.2833],
  'Galgamuwa': [7.9833, 80.2833],

  // ── PUTTALAM ──
  'Puttalam': [8.0362, 79.8283],
  'Chilaw': [7.5758, 79.7953],
  'Wennappuwa': [7.3500, 79.8500],
  'Marawila': [7.4167, 79.8167],
  'Dankotuwa': [7.3000, 79.8833],
  'Anamaduwa': [7.9000, 80.0167],
  'Nattandiya': [7.4167, 79.8667],
  'Kalpitiya': [8.2333, 79.7667],
  'Mahawewa': [7.4500, 79.8333],

  // ── COLOMBO ──
  'Colombo 1-15': [6.9271, 79.8612],
  'Dehiwala': [6.8533, 79.8656],
  'Mount Lavinia': [6.8380, 79.8660],
  'Moratuwa': [6.7730, 79.8816],
  'Kotte': [6.8914, 79.9044],
  'Maharagama': [6.8480, 79.9267],
  'Kesbewa': [6.7833, 79.9500],
  'Homagama': [6.8444, 80.0028],
  'Nugegoda': [6.8649, 79.8997],
  'Kotikawatta': [6.9333, 79.9000],
  'Mulleriyawa': [6.9333, 79.9167],
  'Kolonnawa': [6.9333, 79.8833],
  'Malabe': [6.9044, 79.9547],
  'Kaduwela': [6.9333, 79.9833],
  'Piliyandala': [6.8019, 79.9228],
  'Battaramulla': [6.8970, 79.9223],
  'Rajagiriya': [6.9089, 79.8919],
  'Athurugiriya': [6.8708, 79.9889],
  'Padukka': [6.8444, 80.1000],
  'Hanwella': [6.8944, 80.0833],
  'Boralesgamuwa': [6.8417, 79.9028],

  // ── GAMPAHA ──
  'Gampaha': [7.0917, 80.0106],
  'Negombo': [7.2008, 79.8736],
  'Kelaniya': [6.9553, 79.9225],
  'Wattala': [6.9897, 79.8919],
  'Ja-Ela': [7.0767, 79.8919],
  'Kandana': [7.0472, 79.8919],
  'Minuwangoda': [7.1667, 79.9500],
  'Katunayake': [7.1694, 79.8878],
  'Ragama': [7.0278, 79.9222],
  'Divulapitiya': [7.2167, 80.0333],
  'Mirigama': [7.2444, 80.1306],
  'Kiribathgoda': [6.9806, 79.9278],
  'Kadawatha': [7.0000, 79.9500],
  'Veyangoda': [7.1556, 80.0583],
  'Nittambuwa': [7.1444, 80.1000],

  // ── KALUTARA ──
  'Kalutara': [6.5854, 79.9607],
  'Panadura': [6.7130, 79.9074],
  'Horana': [6.7153, 80.0631],
  'Beruwala': [6.4789, 79.9828],
  'Aluthgama': [6.4333, 80.0000],
  'Matugama': [6.5222, 80.1167],
  'Wadduwa': [6.6667, 79.9333],
  'Bandaragama': [6.7167, 79.9833],
  'Ingiriya': [6.7500, 80.1667],
  'Bulathsinhala': [6.6500, 80.1833],

  // ── KANDY ──
  'Kandy': [7.2906, 80.6337],
  'Peradeniya': [7.2667, 80.6000],
  'Katugastota': [7.3167, 80.6167],
  'Gampola': [7.1667, 80.5667],
  'Nawalapitiya': [7.0500, 80.5333],
  'Kundasale': [7.2833, 80.6833],
  'Digana': [7.3000, 80.7333],
  'Akurana': [7.3667, 80.6167],
  'Teldeniya': [7.3000, 80.7667],
  'Gelioya': [7.2000, 80.5833],
  'Pilimathalawa': [7.2667, 80.5667],
  'Wattegama': [7.3500, 80.6833],

  // ── GALLE ──
  'Galle': [6.0328, 80.2170],
  'Karapitiya': [6.0667, 80.2333],
  'Ambalangoda': [6.2333, 80.0500],
  'Hikkaduwa': [6.1394, 80.1064],
  'Elpitiya': [6.2556, 80.1472],
  'Bentota': [6.4250, 79.9972],
  'Baddegama': [6.1833, 80.1833],
  'Ahangama': [5.9722, 80.3667],
  'Habaraduwa': [6.0000, 80.3000],
  'Neluwa': [6.3667, 80.4333],
  'Batapola': [6.2333, 80.1167],

  // ── MATARA ──
  'Matara': [5.9549, 80.5550],
  'Weligama': [5.9722, 80.4278],
  'Akuressa': [6.1000, 80.4667],
  'Dikwella': [5.9667, 80.7000],
  'Deniyaya': [6.3333, 80.5500],
  'Hakmana': [6.0833, 80.6500],
  'Kamburupitiya': [6.0667, 80.5667],
  'Devinuwara': [5.9333, 80.5833],
  'Gandara': [5.9333, 80.6167],

  // ── HAMBANTOTA ──
  'Hambantota': [6.1240, 81.1185],
  'Tangalle': [6.0240, 80.7941],
  'Beliatta': [6.0500, 80.7167],
  'Tissamaharama': [6.2833, 81.2833],
  'Ambalantota': [6.1167, 81.0167],
  'Walasmulla': [6.1500, 80.6833],
  'Weeraketiya': [6.1500, 80.7667],
  'Middeniya': [6.2333, 80.7667],
  'Suriyawewa': [6.3167, 81.0000],

  // ── JAFFNA & KILINOCHCHI ──
  'Jaffna': [9.6615, 80.0255],
  'Nallur': [9.6667, 80.0333],
  'Chavakachcheri': [9.6500, 80.1500],
  'Point Pedro': [9.8167, 80.2333],
  'Karainagar': [9.7500, 79.8833],
  'Velanai': [9.6500, 79.9167],
  'Chunnakam': [9.7500, 80.0167],
  'Manipay': [9.7167, 79.9833],
  'Kopay': [9.6833, 80.0500],
  'Tellippalai': [9.7833, 80.0333],
  'Kilinochchi': [9.3803, 80.4003],
  'Paranthan': [9.4333, 80.4000],
  'Pallai': [9.5833, 80.3000],
  'Pooneryn': [9.5000, 80.2000],
  'Kandavalai': [9.4167, 80.4833],

  // ── BATTICALOA & AMPARA ──
  'Batticaloa': [7.7102, 81.6924],
  'Eravur': [7.7667, 81.6000],
  'Kattankudy': [7.6833, 81.7167],
  'Valachchenai': [7.9167, 81.5333],
  'Kaluwanchikudy': [7.5333, 81.7833],
  'Vakarai': [8.1333, 81.4333],
  'Chenkalady': [7.7833, 81.5833],
  'Oddamavadi': [7.9167, 81.5167],
  'Ampara': [7.2948, 81.6727],
  'Akkaraipattu': [7.2167, 81.8500],
  'Kalmunai': [7.4167, 81.8333],
  'Sammanthurai': [7.3667, 81.8000],
  'Pottuvil': [6.8667, 81.8333],
  'Dehiattakandiya': [7.7000, 81.0500],
  'Uhana': [7.3833, 81.6333],
  'Mahaoya': [7.5333, 81.3500],
  'Damana': [7.2000, 81.6500],
  'Padiyathalawa': [7.4000, 81.2000],
  'Sainthamaruthu': [7.3833, 81.8500],

  // ── BADULLA & MONARAGALA ──
  'Badulla': [6.9934, 81.0550],
  'Bandarawela': [6.8259, 80.9982],
  'Hali Ela': [6.9500, 81.0333],
  'Ella': [6.8667, 81.0500],
  'Haputale': [6.7667, 80.9500],
  'Welimada': [6.9000, 80.9000],
  'Mahiyanganaya': [7.3167, 81.0000],
  'Passara': [6.9333, 81.1500],
  'Diyatalawa': [6.8167, 80.9667],
  'Demodara': [6.9000, 81.0667],
  'Monaragala': [6.8728, 81.3507],
  'Wellawaya': [6.7333, 81.1000],
  'Buttala': [6.7500, 81.2500],
  'Bibile': [7.1667, 81.2167],
  'Kataragama': [6.4167, 81.3333],
  'Siyambalanduwa': [6.9000, 81.5500],
  'Medagama': [7.1000, 81.3000],

  // ── KEGALLE & RATNAPURA ──
  'Kegalle': [7.2513, 80.3464],
  'Mawanella': [7.2500, 80.4500],
  'Warakapola': [7.2333, 80.2000],
  'Rambukkana': [7.3167, 80.4000],
  'Ruwanwella': [7.0500, 80.2500],
  'Dehiowita': [6.9833, 80.2833],
  'Deraniyagala': [6.9333, 80.3333],
  'Yatiyantota': [7.0333, 80.3000],
  'Galigamuwa': [7.2333, 80.3000],
  'Ratnapura': [6.7056, 80.3847],
  'Embilipitiya': [6.3333, 80.8500],
  'Balangoda': [6.6500, 80.7000],
  'Pelmadulla': [6.6167, 80.5500],
  'Kuruwita': [6.7667, 80.3667],
  'Kahawatta': [6.5833, 80.5833],
  'Eheliyagoda': [6.8500, 80.2667],
  'Godakawela': [6.5333, 80.6333],
  'Nivithigala': [6.6000, 80.4833],

  // ── NUWARA ELIYA ──
  'Nuwara Eliya': [6.9497, 80.7891],
  'Hatton': [6.9000, 80.6000],
  'Talawakelle': [6.9333, 80.6500],
  'Kotagala': [6.9333, 80.6000],
  'Ginigathena': [6.9833, 80.4833],
  'Maskeliya': [6.8333, 80.5667],
  'Ragala': [6.9833, 80.8500],
  'Walapane': [7.0500, 80.8667],
  'Norwood': [6.8333, 80.6167]
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

// ── SERVICE TYPES & MULTI-SELECT HELPERS ──────────────────────
function getTechServices(tech) {
  if (!tech) return [];
  if (Array.isArray(tech.services) && tech.services.length) return tech.services;
  if (typeof tech.serviceType === 'string') {
    if (tech.serviceType === 'Both') return ['CCTV', 'Satellite'];
    if (tech.serviceType.includes(',')) return tech.serviceType.split(',').map(s => s.trim()).filter(Boolean);
    if (tech.serviceType.includes('+')) return tech.serviceType.split('+').map(s => s.trim()).filter(Boolean);
    return [tech.serviceType];
  }
  return [];
}

function techProvidesService(tech, jobType) {
  if (!tech || !jobType) return false;
  const svcs = getTechServices(tech);
  return svcs.includes(jobType) || svcs.includes('Both');
}

// ── EMAIL NOTIFICATIONS (via LankaVision SMTP) ────────────────
const ADMIN_EMAIL = MAIN_ADMIN_EMAIL; // lankavisionadmin@gmail.com
const ADMIN_EMAILS = [MAIN_ADMIN_EMAIL];

function getAllAdminEmails() {
  return [MAIN_ADMIN_EMAIL];
}

async function sendEmailNotification({ to, subject, html, text }) {
  if (!to) return;
  const isFileProto = (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:');
  const primaryEndpoint = isFileProto ? 'https://lanka-vision.vercel.app/api/send-email' : '/api/send-email';

  try {
    const res = await fetch(primaryEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, html, text })
    });
    const data = await res.json();
    if (data && data.success) return data;
    throw new Error(data?.error || 'Primary endpoint failed');
  } catch (err) {
    console.warn('[EMAIL PRIMARY FAILED, TRYING FALLBACK]', err.message);
    if (primaryEndpoint !== 'https://lanka-vision.vercel.app/api/send-email') {
      try {
        const resFallback = await fetch('https://lanka-vision.vercel.app/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to, subject, html, text })
        });
        const dataFallback = await resFallback.json();
        return dataFallback;
      } catch (fbErr) {
        console.warn('[EMAIL FALLBACK ALSO FAILED]', fbErr.message);
      }
    }
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
          <a href="${APP_BASE_URL}" class="btn-link">Open Admin Panel</a>
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

// =============================================================
// LANKAVISION NOTIFICATION CENTER & REAL-TIME ALERTS
// Multi-channel: Android System Tray, Web Push, In-App Floating Banner,
// Synthesized Audio Chime, and Local Notification History Panel.
// =============================================================

const NOTIF_STORAGE_KEY = 'lankavision_app_notifications';
let activeNotificationAction = null;
let popupDismissTimer = null;
let unsubJobsRealtime = null;
let realtimeListenerInitializedAt = 0;

function playNotificationChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    const now = ctx.currentTime;

    // Tone 1: 587.33 Hz (D5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.22, now + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.3);

    // Tone 2: 880 Hz (A5)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.14);
    gain2.gain.setValueAtTime(0, now + 0.14);
    gain2.gain.linearRampToValueAtTime(0.28, now + 0.18);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.14);
    osc2.stop(now + 0.58);
  } catch (e) {
    console.warn('Notification chime audio error:', e);
  }
}

function getStoredNotifications() {
  try {
    const data = localStorage.getItem(NOTIF_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function saveNotification(notif) {
  try {
    const list = getStoredNotifications();
    list.unshift({
      id: notif.id || ('notif_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7)),
      title: notif.title || 'LankaVision Notification',
      message: notif.message || '',
      type: notif.type || 'info',
      targetTab: notif.targetTab || null,
      timestamp: Date.now(),
      read: false
    });
    if (list.length > 40) list.length = 40;
    localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(list));
    updateNotificationBadge();
    renderNotificationList();
  } catch (e) {
    console.warn('Save notification error:', e);
  }
}

function updateNotificationBadge() {
  const list = getStoredNotifications();
  const unreadCount = list.filter(n => !n.read).length;
  ['notif-badge-landing', 'notif-badge-dash', 'notif-badge-admin'].forEach(id => {
    const badge = document.getElementById(id);
    if (!badge) return;
    if (unreadCount > 0) {
      badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });
}

function showInAppNotificationBanner(title, message, type, onClickAction) {
  const popup = document.getElementById('app-notif-popup');
  const titleEl = document.getElementById('anp-title');
  const msgEl = document.getElementById('anp-msg');
  const iconEl = document.getElementById('anp-icon');
  if (!popup || !titleEl || !msgEl) return;

  activeNotificationAction = onClickAction || null;

  titleEl.textContent = title;
  msgEl.textContent = message;

  if (iconEl) {
    let iconHtml = '<i class="fas fa-bell"></i>';
    if (type === 'job_new') iconHtml = '<i class="fas fa-bolt" style="color:#fbbf24"></i>';
    else if (type === 'job_claimed') iconHtml = '<i class="fas fa-handshake" style="color:#38bdf8"></i>';
    else if (type === 'job_scheduled') iconHtml = '<i class="fas fa-calendar-check" style="color:#a78bfa"></i>';
    else if (type === 'job_completed') iconHtml = '<i class="fas fa-check-circle" style="color:#34d399"></i>';
    else if (type === 'job_posted') iconHtml = '<i class="fas fa-paper-plane" style="color:#60a5fa"></i>';
    iconEl.innerHTML = iconHtml;
  }

  popup.classList.remove('hidden');
  void popup.offsetWidth;
  popup.classList.add('show');

  if (popupDismissTimer) clearTimeout(popupDismissTimer);
  popupDismissTimer = setTimeout(() => {
    closeNotificationPopup();
  }, 6000);
}

function closeNotificationPopup() {
  const popup = document.getElementById('app-notif-popup');
  if (!popup) return;
  popup.classList.remove('show');
  setTimeout(() => {
    popup.classList.add('hidden');
    activeNotificationAction = null;
  }, 300);
}

function handleNotificationPopupClick() {
  if (typeof activeNotificationAction === 'function') {
    activeNotificationAction();
  } else if (typeof activeNotificationAction === 'string') {
    switchDashTab(activeNotificationAction);
  }
  closeNotificationPopup();
}

function toggleNotificationPanel() {
  const panel = document.getElementById('notif-panel');
  if (!panel) return;
  const isHidden = panel.classList.contains('hidden');
  if (isHidden) {
    markAllNotificationsAsRead();
    renderNotificationList();
    panel.classList.remove('hidden');
  } else {
    panel.classList.add('hidden');
  }
}

function markAllNotificationsAsRead() {
  try {
    const list = getStoredNotifications();
    let updated = false;
    list.forEach(n => {
      if (!n.read) {
        n.read = true;
        updated = true;
      }
    });
    if (updated) {
      localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(list));
      updateNotificationBadge();
    }
  } catch (e) {}
}

function clearAllNotifications() {
  try {
    localStorage.removeItem(NOTIF_STORAGE_KEY);
    renderNotificationList();
    updateNotificationBadge();
    showToast('සියලු Notifications ඉවත් කරන ලදී', 'info');
  } catch (e) {}
}

function formatNotifTime(ts) {
  if (!ts) return '';
  const diffSec = Math.floor((Date.now() - ts) / 1000);
  if (diffSec < 60) return 'දැන් (Just now)';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m පෙර`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h පෙර`;
  return new Date(ts).toLocaleDateString('en-GB');
}

function renderNotificationList() {
  const listEl = document.getElementById('notif-list');
  if (!listEl) return;
  const list = getStoredNotifications();
  const tFn = (typeof t === 'function') ? t : (k, fb) => fb;
  if (!list || list.length === 0) {
    listEl.innerHTML = `<div class="notif-empty"><i class="fas fa-bell-slash"></i><p>${tFn('no_notifs', 'No notifications yet')}</p></div>`;
    return;
  }

  let html = '';
  list.forEach(item => {
    let iconClass = 'fa-bell';
    let iconColor = 'var(--accent)';
    if (item.type === 'job_new') { iconClass = 'fa-bolt'; iconColor = '#fbbf24'; }
    else if (item.type === 'job_claimed') { iconClass = 'fa-handshake'; iconColor = '#38bdf8'; }
    else if (item.type === 'job_scheduled') { iconClass = 'fa-calendar-check'; iconColor = '#a78bfa'; }
    else if (item.type === 'job_completed') { iconClass = 'fa-check-circle'; iconColor = '#34d399'; }
    else if (item.type === 'job_posted') { iconClass = 'fa-paper-plane'; iconColor = '#60a5fa'; }

    const timeAgo = formatNotifTime(item.timestamp);
    const clickAttr = item.targetTab ? `onclick="switchDashTab('${item.targetTab}'); toggleNotificationPanel();"` : '';

    html += `
      <div class="notif-item ${item.read ? '' : 'unread'}" ${clickAttr} style="${item.targetTab ? 'cursor:pointer' : ''}">
        <div class="notif-icon-col" style="color:${iconColor};font-size:1.15rem;display:flex;align-items:center;justify-content:center;width:28px">
          <i class="fas ${iconClass}"></i>
        </div>
        <div class="notif-content-col" style="flex:1;min-width:0">
          <div class="notif-item-title" style="font-weight:700;font-size:.85rem;color:#fff">${esc(item.title)}</div>
          <div class="notif-item-msg" style="font-size:.76rem;color:var(--txt2);margin-top:2px;line-height:1.3">${esc(item.message)}</div>
          <div class="notif-item-time" style="font-size:.68rem;color:var(--txt3);margin-top:4px">${timeAgo}</div>
        </div>
      </div>
    `;
  });
  listEl.innerHTML = html;
}

function switchDashTab(tab) {
  if (!currentUserData) return;
  if (currentUserData.role === 'admin') {
    showScreen('screen-admin');
    if (tab && typeof switchAdminTab === 'function') switchAdminTab(tab);
  } else if (currentUserData.role === 'technician') {
    showScreen('screen-dashboard');
    if (tab === 'jobs' || tab === 'avail') showTechTab('avail');
    else if (tab === 'claims') showTechTab('claims');
    else if (tab === 'profile') showTechTab('profile');
    else if (tab === 'post') showScreen('screen-post-job');
  } else {
    showScreen('screen-dashboard');
    if (tab === 'jobs' || tab === 'cust-jobs') showCustTab('jobs');
    else if (tab === 'profile') showCustTab('profile');
    else if (tab === 'post') showScreen('screen-post-job');
  }
}

function triggerAppNotification(options) {
  if (!options) return;
  const title = options.title || 'LankaVision Pro';
  const message = options.message || '';
  const type = options.type || 'info';
  const targetTab = options.targetTab || null;
  const tag = options.tag || ('lv_' + Date.now());

  // 1. Play synthesized audio chime
  playNotificationChime();

  // 2. Android Native Notification (System status bar + sound + vibration)
  try {
    if (window.AndroidApp && typeof window.AndroidApp.triggerNativeNotification === 'function') {
      window.AndroidApp.triggerNativeNotification(title, message, tag);
    }
  } catch (e) {
    console.warn('Android native notification error:', e);
  }

  // 3. Web Push / Browser Notification
  try {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      new Notification(title, {
        body: message,
        icon: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        tag: tag
      });
    }
  } catch (e) {}

  // 4. In-App Floating Top Banner
  showInAppNotificationBanner(title, message, type, targetTab ? () => switchDashTab(targetTab) : null);

  // 5. Save to local Notification Center tray
  saveNotification({
    title,
    message,
    type,
    targetTab
  });
}

function setupRealtimeJobNotifications() {
  cleanupRealtimeJobNotifications();
  if (typeof db === 'undefined' || !db || !currentUser || !currentUserData) return;

  realtimeListenerInitializedAt = Date.now();
  const role = currentUserData.role;

  try {
    if (role === 'technician') {
      const techDistrict = currentUserData.district;
      unsubJobsRealtime = db.collection('jobs')
        .where('status', '==', 'open')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            const job = { id: change.doc.id, ...change.doc.data() };
            window._jobsMap = window._jobsMap || {};
            window._jobsMap[job.id] = job;
            if (change.type === 'added') {
              const createdAtMs = job.createdAt && job.createdAt.toMillis ? job.createdAt.toMillis() : Date.now();
              if (createdAtMs >= realtimeListenerInitializedAt - 15000) {
                if (techProvidesService(currentUserData, job.type)) {
                  const isHome = job.district === techDistrict;
                  const nearby = (NEARBY_DISTRICTS[techDistrict] || []).includes(job.district);
                  if (isHome || nearby) {
                    const loc = job.city ? `${job.district}, ${job.city}` : job.district;
                    triggerAppNotification({
                      title: `⚡ අලුත් ${job.type} Job එකක්!`,
                      message: `${loc} - ${job.title}`,
                      type: 'job_new',
                      targetTab: 'jobs'
                    });
                    if (document.getElementById('screen-dashboard')?.classList.contains('active')) {
                      loadTechJobs();
                    }
                  }
                }
              }
            }
          });
        }, err => {
          console.warn('Technician realtime jobs listener notice:', err.message);
        });

    } else if (role === 'customer') {
      unsubJobsRealtime = db.collection('jobs')
        .where('postedBy', '==', currentUser.uid)
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            const job = { id: change.doc.id, ...change.doc.data() };
            window._jobsMap = window._jobsMap || {};
            window._jobsMap[job.id] = job;
            if (change.type === 'modified') {
              if (job.status === 'claimed' && job.claimedByName) {
                triggerAppNotification({
                  title: '🤝 Technician Accepted Your Job!',
                  message: `${job.claimedByName} විසින් ඔබගේ "${job.title}" job එක භාරගන්නා ලදී.`,
                  type: 'job_claimed',
                  targetTab: 'jobs'
                });
              } else if (job.isScheduled && job.scheduledDate) {
                triggerAppNotification({
                  title: '📅 Service Visit Scheduled!',
                  message: `"${job.title}" සඳහා Technician පැමිණෙන දිනය: ${job.scheduledDate} ${job.scheduledTime || ''}`,
                  type: 'job_scheduled',
                  targetTab: 'jobs'
                });
              } else if (job.status === 'completed') {
                triggerAppNotification({
                  title: '🎉 Job Completed Successfully!',
                  message: `ඔබගේ "${job.title}" job එක සාර්ථකව අවසන් කර ඇත. කරුණාකර Review එකක් ලබා දෙන්න.`,
                  type: 'job_completed',
                  targetTab: 'jobs'
                });
              }
              if (document.getElementById('screen-dashboard')?.classList.contains('active')) {
                loadCustomerJobs();
              }
            }
          });
        }, err => {
          console.warn('Customer realtime jobs listener notice:', err.message);
        });

    } else if (role === 'admin') {
      unsubJobsRealtime = db.collection('jobs')
        .where('status', '==', 'open')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            const job = { id: change.doc.id, ...change.doc.data() };
            window._jobsMap = window._jobsMap || {};
            window._jobsMap[job.id] = job;
            if (change.type === 'added') {
              const createdAtMs = job.createdAt && job.createdAt.toMillis ? job.createdAt.toMillis() : Date.now();
              if (createdAtMs >= realtimeListenerInitializedAt - 15000) {
                const loc = job.city ? `${job.district}, ${job.city}` : job.district;
                triggerAppNotification({
                  title: `🔔 New Job: ${job.title}`,
                  message: `${loc} • ${job.type} • ${job.customerName || 'Customer'}`,
                  type: 'job_new'
                });
                if (document.getElementById('screen-admin')?.classList.contains('active')) {
                  loadAdminStats();
                }
              }
            }
          });
        }, err => {
          console.warn('Admin realtime jobs listener notice:', err.message);
        });
    }
  } catch (e) {
    console.warn('setupRealtimeJobNotifications error:', e);
  }
}

function cleanupRealtimeJobNotifications() {
  if (typeof unsubJobsRealtime === 'function') {
    try {
      unsubJobsRealtime();
    } catch (e) {}
    unsubJobsRealtime = null;
  }
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
      <a href="${APP_BASE_URL}" class="btn-link">Open Admin Panel</a>
    </div>
  `);

  sendEmailNotification({
    to: ADMIN_EMAILS,
    subject: `🔔 New Job: ${job.title} (${loc})`,
    html: adminHtml,
    text: `New Job: ${job.title} in ${loc}. Type: ${job.type}. Phone: ${job.customerPhone}`
  });

  // Instant In-App & Native Notification for Customer or Admin
  try {
    const isPoster = currentUser && (currentUser.uid === job.customerId || currentUser.uid === job.postedBy);
    if (isPoster) {
      triggerAppNotification({
        title: '✅ Job Posted Successfully!',
        message: `ඔබගේ "${job.title}" (${loc}) job එක සාර්ථකව පද්ධතියට ලැබී ඇත.`,
        type: 'job_posted',
        targetTab: 'jobs'
      });
    } else if (currentUserData && currentUserData.role === 'admin') {
      triggerAppNotification({
        title: `🔔 New Job Posted: ${job.title}`,
        message: `${loc} • ${job.type} • ${job.customerName || 'Customer'}`,
        type: 'job_new'
      });
    }
  } catch (e) {
    console.warn('In-app job post alert error:', e);
  }

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

      // Check service type match using multi-service helper
      if (!techProvidesService(t, job.type)) return;

      const isHome = t.district === jobDistrict;
      const isNeighbor = nearbyDistricts.includes(t.district);

      if (!isHome && !isNeighbor) return;

      let distanceKm = null;
      const techCoords = (t.location?.lat && t.location?.lng) 
        ? [t.location.lat, t.location.lng] 
        : ((t.city && CITY_COORDS[t.city]) || (t.district && DISTRICT_COORDS[t.district]));

      if (techCoords && jobLat && jobLng) {
        distanceKm = calcDistanceKm(techCoords[0], techCoords[1], jobLat, jobLng);
      }

      // STRICT 36 KM RADIUS RULE:
      // If distance can be calculated, only notify if within 36 km (never send alerts for jobs further away)
      if (distanceKm !== null && distanceKm > 36) {
        return;
      }
      // Fallback if coordinates missing: only notify home district
      if (distanceKm === null && !isHome) {
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
          <a href="${APP_BASE_URL}" class="btn-link">View & Accept Job</a>
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

    triggerAppNotification({
      title: '👤 New Technician Registered',
      message: `${tech.name} (${techLoc}) applied for approval`,
      type: 'info'
    });

    // 1. To Admin (Clean HTML without heavy base64 to ensure 100% email deliverability)
    const adminHtml = emailWrapper('New Technician Application', `
      <h2 style="color:#60a5fa;margin-top:0;font-size:18px">👤 New Technician Registration!</h2>
      <p>නව Technician කෙනෙක් system එකට register වී ඇත. Review කර approve කරන්න.</p>
      <div style="text-align:center;margin:12px 0">
        <span style="display:inline-block;padding:5px 14px;background:rgba(59,130,246,0.15);color:#38bdf8;border:1px solid #3b82f6;border-radius:999px;font-size:12px;font-weight:700">
          📸 Live Selfie Verified 🔒
        </span>
      </div>
      <div class="detail-card">
        <div class="row"><span class="lbl">Name</span><span class="val">${esc(tech.name)}</span></div>
        <div class="row"><span class="lbl">Phone</span><span class="val" style="color:#34d399;font-family:monospace">${esc(tech.phone)}</span></div>
        <div class="row"><span class="lbl">Email</span><span class="val">${esc(tech.email)}</span></div>
        <div class="row"><span class="lbl">District / City</span><span class="val">${esc(techLoc)}</span></div>
        <div class="row"><span class="lbl">Service</span><span class="val">${esc(tech.serviceType)}</span></div>
      </div>
      <div style="text-align:center;margin-top:18px">
        <a href="${APP_BASE_URL}" class="btn-link">Review in Admin Panel</a>
      </div>
    `);

    const adminEmailRes = await sendEmailNotification({
      to: ADMIN_EMAILS,
      subject: `👤 New Technician Application: ${tech.name} (${techLoc})`,
      html: adminHtml,
      text: `LankaVision Pro - New Technician Application!\n\nName: ${tech.name}\nPhone: ${tech.phone}\nEmail: ${tech.email}\nLocation: ${techLoc}\nServices: ${tech.serviceType || 'All'}\nStatus: Pending Approval\n\nReview in Admin Panel: ${APP_BASE_URL}`
    });
    console.log('[EMAIL TO ADMIN RESULT]', adminEmailRes);

    // 2. To Technician (Wait 2s to respect host rate limit)
    if (tech.email) {
      await new Promise(r => setTimeout(r, 2000));
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
      const techEmailRes = await sendEmailNotification({
        to: tech.email,
        subject: `⏳ Application Received - LankaVision Pro`,
        html: techHtml,
        text: `LankaVision Pro - Application Received!\n\nHello ${tech.name},\nThank you for applying to join the LankaVision Pro technician network.\n\nLocation: ${techLoc}\nServices: ${tech.serviceType || 'All'}\nStatus: Pending Admin Review\n\nOur team will review your application within 24-48 hours.`
      });
      console.log('[EMAIL TO TECH RESULT]', techEmailRes);
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
      <a href="${APP_BASE_URL}" class="btn-link">Login & View Jobs</a>
    </div>
  `);
  sendEmailNotification({
    to: tech.email,
    subject: `🎉 Congratulations! Your Account is Approved - LankaVision Pro`,
    html,
    text: `Your technician account is approved. Login to view jobs.`
  });

  triggerAppNotification({
    title: '✅ Technician Account Approved!',
    message: 'ඔබගේ Technician ගිණුම අනුමත කර ඇත. දැන් ඔබට Jobs භාරගත හැක.',
    type: 'job_claimed',
    targetTab: 'jobs'
  });
}

// Trigger 4: Job Claimed / Accepted -> Notify Customer & Admin
async function notifyJobClaimed(job, tech) {
  const loc = job.city ? `${job.district}, ${job.city}` : job.district;

  triggerAppNotification({
    title: '🤝 Technician Accepted Job!',
    message: `${tech.name || 'Technician'} accepted ${job.title} (${loc})`,
    type: 'job_claimed',
    targetTab: currentUserData?.role === 'customer' ? 'jobs' : 'claims'
  });

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

// Trigger 4.5: Job Scheduled -> Notify Customer
async function notifyJobScheduled(job, tech, date, time, notes) {
  triggerAppNotification({
    title: '📅 Service Visit Scheduled!',
    message: `${job.title} scheduled on ${date} at ${time} by ${tech?.name || 'Technician'}`,
    type: 'job_scheduled',
    targetTab: 'jobs'
  });

  let custEmail = job.customerEmail || '';
  if (!custEmail && job.postedBy && job.postedBy !== 'guest') {
    try {
      const uDoc = await db.collection('users').doc(job.postedBy).get();
      if (uDoc.exists) custEmail = uDoc.data().email || '';
    } catch (e) {}
  }

  if (custEmail) {
    const custHtml = emailWrapper('Visit Scheduled', `
      <h2 style="color:#3b82f6;margin-top:0;font-size:18px">📅 Technician Scheduled Your Service Visit!</h2>
      <p>ආයුබෝවන් <strong>${esc(job.customerName || 'Customer')}</strong>, ඔබගේ <strong>${esc(job.title)}</strong> සඳහා Technician පැමිණෙන දිනය සහ වේලාව නියම කර ඇත.</p>
      <div class="detail-card" style="border-left:4px solid #3b82f6">
        <div class="row"><span class="lbl">📅 Visit Date</span><span class="val" style="color:#60a5fa;font-weight:700">${esc(date)}</span></div>
        <div class="row"><span class="lbl">⏰ Visit Time</span><span class="val" style="color:#60a5fa;font-weight:700">${esc(time)}</span></div>
        <div class="row"><span class="lbl">Technician</span><span class="val">${esc(tech?.name || 'Technician')}</span></div>
        <div class="row"><span class="lbl">Technician Phone</span><span class="val" style="color:#34d399;font-family:monospace">${esc(tech?.phone || 'N/A')}</span></div>
        ${notes ? `<div class="row"><span class="lbl">Notes</span><span class="val">${esc(notes)}</span></div>` : ''}
      </div>
      <p>කරුණාකර ඉහත දිනයේ සහ වේලාවේදී Technician පැමිණීමට සූදානම්ව සිටින්න. අවශ්‍ය නම් Technician අමතා වෙනස්කම් සිදු කර ගත හැක.</p>
    `);

    sendEmailNotification({
      to: custEmail,
      subject: `📅 Visit Scheduled: ${job.title} on ${date} at ${time} - LankaVision Pro`,
      html: custHtml,
      text: `Technician ${tech?.name} (${tech?.phone}) scheduled your visit on ${date} at ${time} for job: ${job.title}`
    });
  }
}

// Trigger 5: Job Completed -> Notify Customer
async function notifyJobCompleted(job) {
  triggerAppNotification({
    title: '🎉 Job Completed Successfully!',
    message: `"${job.title}" job එක අවසන් කර ඇත. කරුණාකර Technician සඳහා Review එකක් ලබා දෙන්න.`,
    type: 'job_completed',
    targetTab: 'jobs'
  });

  let custEmail = job.customerEmail || '';
  if (!custEmail && job.postedBy && job.postedBy !== 'guest') {
    try {
      const uDoc = await db.collection('users').doc(job.postedBy).get();
      if (uDoc.exists) custEmail = uDoc.data().email || '';
    } catch (e) {}
  }

  if (custEmail) {
    const custHtml = emailWrapper('Job Completed', `
      <h2 style="color:#10b981;margin-top:0;font-size:18px">🎉 Job Completed Successfully!</h2>
      <p>ආයුබෝවන් <strong>${esc(job.customerName || 'Customer')}</strong>, ඔබගේ <strong>${esc(job.title)}</strong> job එක Technician විසින් සාර්ථකව අවසන් කර ඇත.</p>
      ${job.claimedByName ? `<p style="font-size:14px"><strong>භාරගත් Technician:</strong> ${esc(job.claimedByName)}</p>` : ''}
      ${job.completionPhoto ? `
      <div style="margin:16px 0;text-align:center">
        <div style="font-size:12px;color:#94a3b8;margin-bottom:6px">📸 Work Completion Proof (වැඩ අවසන් කළ ඡායාරූපය):</div>
        <img src="${job.completionPhoto}" style="max-width:100%;max-height:280px;border-radius:10px;border:2px solid #10b981" alt="Work Completion Proof" />
      </div>` : ''}
      ${job.completionNotes ? `<p style="background:rgba(255,255,255,0.05);padding:10px;border-radius:6px;font-size:13px"><strong>Technician Notes:</strong> ${esc(job.completionNotes)}</p>` : ''}
      <div style="text-align:center;margin:20px 0;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.3);border-radius:10px;padding:16px">
        <h3 style="color:#fbbf24;margin-top:0;font-size:16px">⭐ Technician සඳහා Rating & Review ලබා දෙන්න</h3>
        <p style="font-size:13px;color:#94a3b8;margin-bottom:12px">කරුණාකර LankaVision Pro වෙත පිවිස Technician හට තරු 1-5 අතර Rating එකක් සහ ඔබගේ අදහස් (Feedback) ලබා දෙන්න.</p>
        <a href="${APP_BASE_URL}" style="display:inline-block;background:#f59e0b;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold">Review Technician Now</a>
      </div>
      <p>LankaVision Pro සේවාව භාවිත කළාට ස්තූතියි!</p>
    `);
    sendEmailNotification({
      to: custEmail,
      subject: `✅ Job Completed: ${job.title} - LankaVision Pro`,
      html: custHtml,
      text: `Your job ${job.title} has been completed. Review the work proof photo and rate your technician on LankaVision Pro.`
    });
  }

  // 2. To Admin (Always alert admin of completed jobs)
  const adminCompletedHtml = emailWrapper('Job Completed', `
    <h2 style="color:#10b981;margin-top:0;font-size:18px">✅ Job Completed: ${esc(job.title)}</h2>
    <p>Technician කෙනෙක් Job එකක් සාර්ථකව අවසන් කර ඇත (Job marked as Completed with work proof).</p>
    <div class="detail-card">
      <div class="row"><span class="lbl">Job Title</span><span class="val">${esc(job.title)}</span></div>
      <div class="row"><span class="lbl">Service</span><span class="val">${esc(job.type)}</span></div>
      <div class="row"><span class="lbl">Technician</span><span class="val" style="color:#38bdf8">${esc(job.claimedByName || 'N/A')}</span></div>
      <div class="row"><span class="lbl">Customer</span><span class="val">${esc(job.customerName || 'N/A')} (${esc(job.customerPhone || '')})</span></div>
      ${job.completionNotes ? `<div class="row"><span class="lbl">Notes</span><span class="val">${esc(job.completionNotes)}</span></div>` : ''}
    </div>
    <div style="text-align:center;margin-top:18px">
      <a href="${APP_BASE_URL}" class="btn-link">View in Admin Panel</a>
    </div>
  `);

  sendEmailNotification({
    to: ADMIN_EMAILS,
    subject: `✅ Job Completed: ${job.title} by ${job.claimedByName || 'Technician'}`,
    html: adminCompletedHtml,
    text: `Job ${job.title} completed by ${job.claimedByName}. Customer: ${job.customerName}.`
  });
}

// Trigger 6: Customer Registered -> Notify Customer & Admin
async function notifyCustomerRegistered(cust) {
  if (!cust || !cust.email) return;

  triggerAppNotification({
    title: '🎉 Welcome to LankaVision Pro!',
    message: `ආයුබෝවන් ${cust.name || 'Customer'}! ඔබගේ ගිණුම සාර්ථකව සාදන ලදී.`,
    type: 'info'
  });

  // 1. Welcome to Customer
  const custWelcomeHtml = emailWrapper('Welcome to LankaVision', `
    <h2 style="color:#38bdf8;margin-top:0;font-size:18px">🎉 Welcome to LankaVision Pro!</h2>
    <p>ආයුබෝවන් <strong>${esc(cust.name || 'Customer')}</strong>, LankaVision Pro පද්ධතියට සාදරයෙන් පිළිගනිමු.</p>
    <div class="detail-card">
      <div class="row"><span class="lbl">Account Name</span><span class="val">${esc(cust.name)}</span></div>
      <div class="row"><span class="lbl">Phone Number</span><span class="val" style="color:#34d399">${esc(cust.phone)}</span></div>
      <div class="row"><span class="lbl">Email</span><span class="val">${esc(cust.email)}</span></div>
      <div class="row"><span class="lbl">Account Type</span><span class="val">Customer (පාරිභෝගික)</span></div>
    </div>
    <p>දැන් ඔබට ඕනෑම වේලාවක CCTV, Satellite සහ Router Installation සේවාවන් සඳහා Jobs පහසුවෙන් පළ කර ඔබගේ ප්‍රදේශයේ හොඳම Technicians ලාගේ සේවාව ලබාගත හැක.</p>
    <div style="text-align:center;margin-top:18px">
      <a href="${APP_BASE_URL}" class="btn-link">Post a Job Now</a>
    </div>
  `);

  sendEmailNotification({
    to: cust.email,
    subject: `🎉 Welcome to LankaVision Pro, ${cust.name || 'Customer'}!`,
    html: custWelcomeHtml,
    text: `Welcome to LankaVision Pro, ${cust.name}! You can now post CCTV, Satellite, and Router jobs.`
  });

  // 2. Alert Admin (Wait 2s to respect host rate limit)
  setTimeout(() => {
    const adminAlertHtml = emailWrapper('New Customer Registered', `
      <h2 style="color:#38bdf8;margin-top:0;font-size:18px">👤 New Customer Registered!</h2>
      <p>අලුත් පාරිභෝගිකයෙකු (Customer) පද්ධතියේ ලියාපදිංචි වී ඇත.</p>
      <div class="detail-card">
        <div class="row"><span class="lbl">Name</span><span class="val">${esc(cust.name)}</span></div>
        <div class="row"><span class="lbl">Phone</span><span class="val" style="color:#34d399">${esc(cust.phone)}</span></div>
        <div class="row"><span class="lbl">Email</span><span class="val">${esc(cust.email)}</span></div>
      </div>
      <div style="text-align:center;margin-top:18px">
        <a href="${APP_BASE_URL}" class="btn-link">View in Admin Panel</a>
      </div>
    `);

    sendEmailNotification({
      to: ADMIN_EMAILS,
      subject: `👤 New Customer: ${cust.name} (${cust.phone})`,
      html: adminAlertHtml,
      text: `New Customer registered: ${cust.name}, Phone: ${cust.phone}, Email: ${cust.email}`
    });
  }, 2000);
}

// ── PERSISTENT SESSION RESTORATION (Instant Account Resume) ──
const SESSION_STORAGE_KEY = 'lankavision_active_session';

function saveCachedSession(uid, userData) {
  try {
    if (!uid || !userData) return;
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
      uid: uid,
      role: userData.role,
      data: userData,
      savedAt: Date.now()
    }));
  } catch (e) {
    console.warn('saveCachedSession error:', e);
  }
}

function getCachedSession() {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.data && parsed.uid) {
      return parsed;
    }
    return null;
  } catch (e) {
    return null;
  }
}

function clearCachedSession() {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (e) {}
}

function dismissLoadingScreen() {
  const loadingEl = document.getElementById('screen-loading');
  if (!loadingEl) return;
  loadingEl.classList.add('fade-out');
  setTimeout(() => {
    loadingEl.style.display = 'none';
  }, 400);
}

// ── INIT ───────────────────────────────────────────────────────
function initApp() {
  if (appInitialized) return;
  appInitialized = true;

  populateAllDistricts();

  // Instant zero-delay session restoration:
  // If the user was previously logged in, immediately activate their account screen
  // behind the launch overlay so that the website home (landing page) is NEVER flashed!
  const cached = getCachedSession();
  if (cached && cached.data) {
    currentUserData = cached.data;
    if (cached.data.role === 'admin') {
      showScreen('screen-admin');
      initAdminDashboard();
    } else if (cached.data.role === 'technician') {
      if (cached.data.status === 'pending') {
        showScreen('screen-pending');
      } else {
        showScreen('screen-dashboard');
        initTechDashboard();
      }
    } else {
      showScreen('screen-dashboard');
      initCustomerDashboard();
    }
    setupRealtimeJobNotifications();
    // Smoothly dismiss the loading overlay within 300ms since dashboard is already pre-rendered
    setTimeout(dismissLoadingScreen, 300);
  } else {
    // If no cached user, prepare landing screen
    showScreen('screen-landing');
  }

  // Automatic In-App Update Check on every app launch / open
  checkForAppUpdates();

  // Safety fallback if network or auth hangs
  setTimeout(() => {
    if (!authResolved) {
      authResolved = true;
      if (!currentUserData) {
        showScreen('screen-landing');
      }
      dismissLoadingScreen();
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
        clearCachedSession();
        cleanupRealtimeJobNotifications();
        showScreen('screen-landing');
      }
      dismissLoadingScreen();
    }, (error) => {
      console.error('Auth error:', error);
      authResolved = true;
      if (!currentUserData) {
        showScreen('screen-landing');
      }
      dismissLoadingScreen();
    });
  } else {
    authResolved = true;
    if (!currentUserData) {
      showScreen('screen-landing');
    }
    dismissLoadingScreen();
  }

  document.addEventListener('click', e => {
    const dd = document.getElementById('nav-dropdown');
    const btn = document.getElementById('menu-btn');
    if (dd && btn && !dd.contains(e.target) && !btn.contains(e.target)) {
      dd.classList.add('hidden');
    }
    const np = document.getElementById('notif-panel');
    const notifBtns = document.querySelectorAll('.notif-bell-btn');
    let clickedBell = false;
    notifBtns.forEach(b => { if (b.contains(e.target)) clickedBell = true; });
    if (np && !np.classList.contains('hidden') && !np.contains(e.target) && !clickedBell) {
      np.classList.add('hidden');
    }
  });

  updateOnlineStatusUI();
  setInterval(updateOnlineStatusUI, 4000);
  updateNotificationBadge();
  renderNotificationList();

  if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
    try {
      Notification.requestPermission().catch(() => {});
    } catch (e) {}
  }
}

// ── NETWORK STATUS & SCROLL UTILITIES ──────────────────────────
function isDeviceOnline() {
  try {
    if (window.AndroidApp && typeof window.AndroidApp.isOnline === 'function') {
      return window.AndroidApp.isOnline();
    }
  } catch (e) {}
  return navigator.onLine !== false;
}

function updateOnlineStatusUI() {
  const banner = document.getElementById('offline-network-banner');
  const bannerText = document.getElementById('offline-banner-text');
  if (!banner) return;

  const online = isDeviceOnline();
  if (!online) {
    banner.classList.remove('hidden', 'online-recovered');
    if (bannerText) {
      bannerText.textContent = typeof t === 'function' ? t('offline_banner_msg', 'ඔබ මේ වන විට Offline සිටී. කරුණාකර Mobile Data හෝ Wi-Fi සම්බන්ධ කරන්න.') : 'ඔබ මේ වන විට Offline සිටී. කරුණාකර Mobile Data හෝ Wi-Fi සම්බන්ධ කරන්න.';
    }
  } else {
    if (!banner.classList.contains('hidden') && !banner.classList.contains('online-recovered')) {
      banner.classList.add('online-recovered');
      if (bannerText) {
        bannerText.textContent = typeof t === 'function' ? t('offline_online_msg', '✅ Internet සම්බන්ධ විය! (Back Online)') : '✅ Internet සම්බන්ධ විය! (Back Online)';
      }
      setTimeout(() => {
        banner.classList.add('hidden');
        banner.classList.remove('online-recovered');
      }, 2400);
    }
  }
}

window.addEventListener('online', updateOnlineStatusUI);
window.addEventListener('offline', updateOnlineStatusUI);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  const btn = document.getElementById('scroll-to-top-btn');
  if (!btn) return;
  const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  if (scrollY > 260) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
}, { passive: true });

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
  stopWorkCamera();
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) { el.classList.add('active'); }
  window.scrollTo(0, 0);

  if (id === 'screen-post-job') {
    setTimeout(initPostJobMap, 200);
    updatePostJobScreen();
    const checkedType = document.querySelector('input[name="job-type"]:checked')?.value || null;
    if (typeof renderQuickIssuesForType === 'function') renderQuickIssuesForType(checkedType);
  }
  updateMobileNavState(id);
}

// ── MOBILE BOTTOM BAR NAVIGATION ──────────────────────────────
function handleBrandNav() {
  if (currentUser && currentUserData) {
    handleMobileHomeNav();
  } else {
    showScreen('screen-landing');
  }
}

function handleMobileHomeNav() {
  if (currentUser && currentUserData) {
    if (currentUserData.role === 'admin') {
      showScreen('screen-admin');
      if (typeof showAdminTab === 'function') showAdminTab('overview');
    } else if (currentUserData.role === 'technician') {
      showScreen('screen-dashboard');
      if (typeof showTechTab === 'function') showTechTab('avail');
    } else {
      showScreen('screen-dashboard');
      if (typeof showCustTab === 'function') showCustTab('jobs');
    }
  } else {
    showScreen('screen-landing');
  }
}

function handleMobileThirdNav() {
  if (currentUser && currentUserData) {
    goToMyJobs();
  } else {
    showRegisterOptions();
  }
}

function handleMobileAuthNav() {
  if (currentUser && currentUserData) {
    goToProfile();
  } else {
    showScreen('screen-login');
  }
}

function updateMobileNavState(id) {
  const nav = document.getElementById('mobile-bottom-nav');
  if (!nav) return;

  if (!id) {
    const activeScreen = document.querySelector('.screen.active');
    id = activeScreen ? activeScreen.id : (currentUser && currentUserData ? (currentUserData.role === 'admin' ? 'screen-admin' : 'screen-dashboard') : 'screen-landing');
  }

  const homeBtn = document.getElementById('mbn-home');
  const postBtn = document.getElementById('mbn-post');
  const techBtn = document.getElementById('mbn-tech');
  const loginBtn = document.getElementById('mbn-login');

  nav.querySelectorAll('.mbn-item').forEach(item => item.classList.remove('active'));

  if (id === 'screen-landing') {
    if (homeBtn) homeBtn.classList.add('active');
  } else if (id === 'screen-post-job') {
    if (postBtn) postBtn.classList.add('active');
  } else if (id === 'screen-register' || id === 'screen-register-role') {
    if (techBtn) techBtn.classList.add('active');
  } else if (id === 'screen-login') {
    if (loginBtn) loginBtn.classList.add('active');
  } else if (id === 'screen-dashboard') {
    const activeDashTab = document.querySelector('#dash-tabs .tab-btn.active')?.dataset.tab;
    if (activeDashTab === 'profile') {
      if (loginBtn) loginBtn.classList.add('active');
    } else if (activeDashTab === 'claims' || (currentUserData?.role === 'customer' && activeDashTab === 'jobs')) {
      if (techBtn) techBtn.classList.add('active');
    } else {
      if (homeBtn) homeBtn.classList.add('active');
    }
  } else if (id === 'screen-admin') {
    const activeAdminTab = document.querySelector('#admin-sidebar .admin-nav-item.active, #admin-tabs .tab-btn.active')?.dataset.tab;
    if (activeAdminTab === 'settings') {
      if (loginBtn) loginBtn.classList.add('active');
    } else if (activeAdminTab === 'techs') {
      if (techBtn) techBtn.classList.add('active');
    } else {
      if (homeBtn) homeBtn.classList.add('active');
    }
  }

  // Update button 3 (Tech / My Jobs)
  const techText = document.getElementById('mbn-tech-text');
  const techIcon = document.getElementById('mbn-tech-icon') || techBtn?.querySelector('i');
  if (techBtn && techText) {
    if (currentUser && currentUserData) {
      if (currentUserData.role === 'admin') {
        techText.setAttribute('data-i18n', 'admin_tab_techs');
        techText.textContent = (typeof t === 'function') ? t('admin_tab_techs', 'Technicians') : 'Technicians';
        if (techIcon) techIcon.className = 'fas fa-users-cog';
      } else {
        techText.setAttribute('data-i18n', 'nav_my_jobs');
        techText.textContent = (typeof t === 'function') ? t('nav_my_jobs', 'My Jobs') : 'My Jobs';
        if (techIcon) techIcon.className = 'fas fa-clipboard-list';
      }
    } else {
      techText.setAttribute('data-i18n', 'btn_join_tech');
      techText.textContent = (typeof t === 'function') ? t('btn_join_tech', 'Technician') : 'Technician';
      if (techIcon) techIcon.className = 'fas fa-tools';
    }
  }

  // Update button 4 (Login / Account)
  const loginText = document.getElementById('mbn-login-text');
  const loginIcon = document.getElementById('mbn-login-icon') || loginBtn?.querySelector('i');
  if (loginBtn && loginText) {
    if (currentUser && currentUserData) {
      loginText.setAttribute('data-i18n', 'nav_account');
      loginText.textContent = (typeof t === 'function') ? t('nav_account', 'Account') : 'Account';
      if (loginIcon) {
        loginIcon.className = currentUserData.role === 'admin' ? 'fas fa-shield-alt' : 'fas fa-user-circle';
      }
    } else {
      loginText.setAttribute('data-i18n', 'nav_login');
      loginText.textContent = (typeof t === 'function') ? t('nav_login', 'Login') : 'Login';
      if (loginIcon) {
        loginIcon.className = 'fas fa-sign-in-alt';
      }
    }
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
        saveCachedSession(uid, currentUserData);
        showScreen('screen-admin');
        initAdminDashboard();
        setupRealtimeJobNotifications();
        dismissLoadingScreen();
        return;
      }
      clearCachedSession();
      showScreen('screen-landing');
      dismissLoadingScreen();
      return;
    }

    currentUserData = { id: doc.id, ...doc.data() };

    // Extra safety: ensure Main Admin always gets admin screen
    if (currentUser && currentUser.email && currentUser.email.toLowerCase() === MAIN_ADMIN_EMAIL.toLowerCase()) {
      currentUserData.role = 'admin';
      currentUserData.isMainAdmin = true;
    }

    saveCachedSession(uid, currentUserData);

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
          if (!currentUserData.photoUrl) {
            promptMandatoryTechSelfie();
          }
        }
        break;
      default:
        showScreen('screen-dashboard');
        initCustomerDashboard();
    }
    setupRealtimeJobNotifications();
    dismissLoadingScreen();
  } catch (err) {
    console.error('loadUserData error:', err);
    if (currentUser && currentUser.email && currentUser.email.toLowerCase() === MAIN_ADMIN_EMAIL.toLowerCase()) {
      currentUserData = { id: uid, name: 'Main Administrator', email: currentUser.email, role: 'admin', isMainAdmin: true };
      saveCachedSession(uid, currentUserData);
      showScreen('screen-admin');
      initAdminDashboard();
      setupRealtimeJobNotifications();
      dismissLoadingScreen();
      return;
    }
    const cached = getCachedSession();
    if (cached && cached.data) {
      console.warn('Network issue loading fresh user data; retaining cached session');
      dismissLoadingScreen();
      return;
    }
    showScreen('screen-landing');
    dismissLoadingScreen();
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

  if (!isDeviceOnline()) {
    errEl.textContent = '⚠️ ඔබ Offline සිටී. Login වීමට කරුණාකර Mobile Data හෝ Wi-Fi සම්බන්ධ කරන්න.';
    errEl.classList.remove('hidden');
    showToast('⚠️ Offline: Internet සම්බන්ධ කරන්න', 'warning');
    updateOnlineStatusUI();
    return;
  }

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

// ── FORGOT PASSWORD (OTP DRIVEN) ──────────────────────────────
let activePasswordResetEmail = '';
let activePasswordResetOtp = '';
let otpResendCooldownTimer = null;

function openForgotPasswordModal() {
  activePasswordResetEmail = '';
  activePasswordResetOtp = '';
  if (otpResendCooldownTimer) {
    clearInterval(otpResendCooldownTimer);
    otpResendCooldownTimer = null;
  }

  const loginEmail = document.getElementById('login-email')?.value?.trim() || '';
  const forgotEmailInput = document.getElementById('forgot-email');
  if (forgotEmailInput) {
    forgotEmailInput.value = loginEmail;
  }

  // Reset to Step 1
  document.getElementById('forgot-step-1')?.classList.remove('hidden');
  document.getElementById('forgot-step-2')?.classList.add('hidden');

  const err1 = document.getElementById('forgot-step1-error');
  if (err1) { err1.textContent = ''; err1.classList.add('hidden'); }
  const err2 = document.getElementById('forgot-step2-error');
  if (err2) { err2.textContent = ''; err2.classList.add('hidden'); }
  const succ2 = document.getElementById('forgot-step2-success');
  if (succ2) { succ2.classList.add('hidden'); }

  const btnGet = document.getElementById('btn-get-otp');
  if (btnGet) {
    btnGet.disabled = false;
    const tFn = (typeof t === 'function') ? t : (k, fb) => fb;
    btnGet.innerHTML = `<i class="fas fa-paper-plane"></i> <span data-i18n="btn_get_otp">${tFn('btn_get_otp', 'Get OTP Code 📨')}</span>`;
  }

  openModal('modal-forgot-password');
}

function closeForgotPasswordModal() {
  closeModal('modal-forgot-password');
  if (otpResendCooldownTimer) {
    clearInterval(otpResendCooldownTimer);
    otpResendCooldownTimer = null;
  }
}

function backToStep1() {
  document.getElementById('forgot-step-2')?.classList.add('hidden');
  document.getElementById('forgot-step-1')?.classList.remove('hidden');
}

async function handleRequestPasswordOtp(e) {
  if (e) e.preventDefault();
  const emailInput = document.getElementById('forgot-email');
  const email = emailInput?.value?.trim().toLowerCase() || '';
  const errEl = document.getElementById('forgot-step1-error');
  const btn = document.getElementById('btn-get-otp');
  const tFn = (typeof t === 'function') ? t : (k, fb) => fb;

  if (errEl) { errEl.textContent = ''; errEl.classList.add('hidden'); }

  if (!email || !email.includes('@')) {
    if (errEl) {
      errEl.textContent = 'කරුණාකර නිවැරදි Email ලිපිනයක් ඇතුළත් කරන්න.';
      errEl.classList.remove('hidden');
    }
    return;
  }

  if (!isDeviceOnline()) {
    if (errEl) {
      errEl.textContent = '⚠️ ඔබ Offline සිටී. කරුණාකර Internet සම්බන්ධ කරන්න.';
      errEl.classList.remove('hidden');
    }
    showToast('⚠️ Offline: Internet සම්බන්ධ කරන්න', 'warning');
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> OTP කේතය යවමින් පවතී...';
  }

  try {
    // Generate secure 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    activePasswordResetEmail = email;
    activePasswordResetOtp = otp;

    // Save to Firestore password_resets collection
    try {
      await db.collection('password_resets').doc(email).set({
        email: email,
        otp: otp,
        expiresAt: Date.now() + 15 * 60 * 1000, // 15 mins
        used: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (fsErr) {
      console.warn('Firestore password_resets save notice:', fsErr.message);
    }

    // Send email from LankaVision custom SMTP
    await sendEmailNotification({
      to: email,
      subject: `🔒 LankaVision Pro - Password Reset OTP Code: ${otp}`,
      html: emailWrapper('Password Reset OTP', `
        <div style="text-align:center;padding:10px 0">
          <div style="width:60px;height:60px;background:rgba(59,130,246,0.15);border:2px solid #3b82f6;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin:0 auto 14px auto">
            <span style="font-size:26px">🔐</span>
          </div>
          <h2 style="color:#60a5fa;margin:0 0 6px 0;font-size:20px">මුරපදය අලුත් කිරීමේ OTP කේතය</h2>
          <p style="color:#94a3b8;font-size:14px;margin:0 0 20px 0;line-height:1.5">
            ඔබගේ LankaVision Pro ගිණුමේ මුරපදය අලුත් කිරීම සඳහා පහත රහස්‍ය OTP කේතය (Verification Code) ඇතුළත් කරන්න:
          </p>
          <div style="background:#0f172a;border:2px dashed #3b82f6;border-radius:12px;padding:16px 28px;display:inline-block;margin-bottom:20px">
            <span style="font-family:monospace;font-size:34px;font-weight:900;letter-spacing:10px;color:#38bdf8">${otp}</span>
          </div>
          <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.3);border-radius:8px;padding:10px 14px;margin-bottom:18px;display:inline-block">
            <span style="color:#fbbf24;font-size:13px;font-weight:700">⏰ මෙම කේතය මිනිත්තු 15ක් සඳහා වලංගු වේ.</span>
          </div>
          <p style="color:#64748b;font-size:12px;margin:0">
            ඔබ විසින් මුරපදය වෙනස් කිරීමට ඉල්ලුම් නොකළේ නම් මෙම ඊමේල් පණිවිඩය නොසලකා හරින්න. කිසිවෙකුට මෙම කේතය ලබා නොදෙන්න.
          </p>
        </div>
      `),
      text: `LankaVision Pro Password Reset OTP Code: ${otp}. Valid for 15 minutes. Enter this code to set your new password.`
    });

    // Move to Step 2
    document.getElementById('forgot-step-1')?.classList.add('hidden');
    document.getElementById('forgot-step-2')?.classList.remove('hidden');

    const sentTarget = document.getElementById('forgot-sent-target');
    if (sentTarget) sentTarget.textContent = email;

    const otpInput = document.getElementById('forgot-otp-input');
    if (otpInput) {
      otpInput.value = '';
      setTimeout(() => otpInput.focus(), 150);
    }

    const newPwdInput = document.getElementById('forgot-new-pwd');
    if (newPwdInput) newPwdInput.value = '';
    const confirmPwdInput = document.getElementById('forgot-confirm-pwd');
    if (confirmPwdInput) confirmPwdInput.value = '';

    startOtpResendTimer();
    showToast(tFn('reset_email_sent', 'OTP කේතය ඔබගේ email එකට යවන ලදී!'), 'info');

  } catch (err) {
    console.error('handleRequestPasswordOtp error:', err);
    if (errEl) {
      errEl.textContent = 'OTP කේතය යැවීම අසාර්ථක විය: ' + err.message;
      errEl.classList.remove('hidden');
    }
    showToast('Failed to send OTP: ' + err.message, 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i class="fas fa-paper-plane"></i> <span data-i18n="btn_get_otp">${tFn('btn_get_otp', 'Get OTP Code 📨')}</span>`;
    }
  }
}

function startOtpResendTimer() {
  const btnResend = document.getElementById('btn-resend-otp');
  if (!btnResend) return;
  if (otpResendCooldownTimer) clearInterval(otpResendCooldownTimer);

  let seconds = 60;
  btnResend.style.pointerEvents = 'none';
  btnResend.style.opacity = '0.5';
  btnResend.textContent = `Resend in ${seconds}s`;

  otpResendCooldownTimer = setInterval(() => {
    seconds--;
    if (seconds <= 0) {
      clearInterval(otpResendCooldownTimer);
      otpResendCooldownTimer = null;
      btnResend.style.pointerEvents = 'auto';
      btnResend.style.opacity = '1';
      btnResend.textContent = 'Resend OTP 🔄';
    } else {
      btnResend.textContent = `Resend in ${seconds}s`;
    }
  }, 1000);
}

function resendPasswordOtp() {
  if (activePasswordResetEmail) {
    const emailInput = document.getElementById('forgot-email');
    if (emailInput) emailInput.value = activePasswordResetEmail;
    handleRequestPasswordOtp();
  }
}

async function handleVerifyOtpAndResetPassword(e) {
  if (e) e.preventDefault();
  const enteredOtp = document.getElementById('forgot-otp-input')?.value?.trim() || '';
  const newPassword = document.getElementById('forgot-new-pwd')?.value || '';
  const confirmPassword = document.getElementById('forgot-confirm-pwd')?.value || '';
  const errEl = document.getElementById('forgot-step2-error');
  const succEl = document.getElementById('forgot-step2-success');
  const succText = document.getElementById('forgot-step2-success-text');
  const btn = document.getElementById('btn-submit-new-pwd');
  const tFn = (typeof t === 'function') ? t : (k, fb) => fb;

  if (errEl) { errEl.textContent = ''; errEl.classList.add('hidden'); }
  if (succEl) { succEl.classList.add('hidden'); }

  if (!enteredOtp || enteredOtp.length !== 6) {
    if (errEl) {
      errEl.textContent = 'කරුණාකර නිවැරදි ඉලක්කම් 6ක OTP කේතය ඇතුළත් කරන්න.';
      errEl.classList.remove('hidden');
    }
    return;
  }

  if (!newPassword || newPassword.length < 6) {
    if (errEl) {
      errEl.textContent = 'මුරපදය අවම වශයෙන් අකුරු 6ක් විය යුතුය (Min 6 characters).';
      errEl.classList.remove('hidden');
    }
    return;
  }

  if (newPassword !== confirmPassword) {
    if (errEl) {
      errEl.textContent = 'නව මුරපද එකිනෙකට නොගැලපේ (Passwords do not match).';
      errEl.classList.remove('hidden');
    }
    return;
  }

  if (!isDeviceOnline()) {
    if (errEl) {
      errEl.textContent = '⚠️ ඔබ Offline සිටී. කරුණාකර Internet සම්බන්ධ කරන්න.';
      errEl.classList.remove('hidden');
    }
    showToast('⚠️ Offline: Internet සම්බන්ධ කරන්න', 'warning');
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> මුරපදය වෙනස් කරමින් පවතී...';
  }

  try {
    const email = activePasswordResetEmail;

    // 1. Verify OTP
    let isOtpValid = false;
    if (activePasswordResetOtp && enteredOtp === activePasswordResetOtp) {
      isOtpValid = true;
    } else {
      try {
        const snap = await db.collection('password_resets').doc(email).get();
        if (snap.exists) {
          const d = snap.data();
          if (d.otp === enteredOtp && !d.used && Date.now() <= (d.expiresAt || 0)) {
            isOtpValid = true;
          }
        }
      } catch (eFs) {
        console.warn('Firestore OTP verify fallback:', eFs.message);
      }
    }

    if (!isOtpValid) {
      throw new Error('ඇතුළත් කළ OTP කේතය වැරදියි හෝ කල් ඉකුත් වී ඇත (Invalid or expired OTP).');
    }

    // 2. Call backend reset-password endpoint
    const isFileProto = (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:');
    const primaryEndpoint = isFileProto ? 'https://lanka-vision.vercel.app/api/reset-password' : '/api/reset-password';

    let resetSuccess = false;
    let resetErrorMsg = '';

    try {
      const resp = await fetch(primaryEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });
      const data = await resp.json();
      if (data && data.success) {
        resetSuccess = true;
      } else if (data && data.error === 'server_key_missing') {
        resetErrorMsg = 'Server Error: backend එකේ serviceAccountKey.json නොමැත. කරුණාකර Administrator අමතන්න.';
      } else {
        resetErrorMsg = data?.error || 'Failed to update password';
      }
    } catch (apiErr) {
      console.warn('Primary reset-password API error, trying fallback:', apiErr.message);
      if (primaryEndpoint !== 'https://lanka-vision.vercel.app/api/reset-password') {
        try {
          const respFb = await fetch('https://lanka-vision.vercel.app/api/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, newPassword })
          });
          const dataFb = await respFb.json();
          if (dataFb && dataFb.success) {
            resetSuccess = true;
          } else {
            resetErrorMsg = dataFb?.error || 'Failed to update password';
          }
        } catch (e2) {
          resetErrorMsg = e2.message;
        }
      } else {
        resetErrorMsg = apiErr.message;
      }
    }

    if (!resetSuccess) {
      throw new Error(resetErrorMsg || 'මුරපදය වෙනස් කිරීම අසාර්ථක විය.');
    }

    // Mark OTP as used in Firestore
    try {
      await db.collection('password_resets').doc(email).update({ used: true });
    } catch (eU) {}

    // Success UI
    const successMsg = 'මුරපදය සාර්ථකව වෙනස් කරන ලදී! කරුණාකර නව මුරපදයෙන් Login වන්න. 🎉';
    if (succText) succText.textContent = successMsg;
    if (succEl) succEl.classList.remove('hidden');
    showToast(successMsg, 'success');

    // Pre-fill on login screen
    const loginEmailInput = document.getElementById('login-email');
    if (loginEmailInput) loginEmailInput.value = email;
    const loginPwdInput = document.getElementById('login-password');
    if (loginPwdInput) loginPwdInput.value = newPassword;

    if (btn) {
      btn.innerHTML = '<i class="fas fa-check"></i> සාර්ථකයි (Success)';
    }

    setTimeout(() => {
      closeForgotPasswordModal();
      showToast('දැන් Login බටනය ක්ලික් කර ඇතුල් වන්න!', 'info');
    }, 2800);

  } catch (err) {
    console.error('handleVerifyOtpAndResetPassword error:', err);
    if (errEl) {
      errEl.textContent = err.message || 'දෝෂයක් ඇති විය.';
      errEl.classList.remove('hidden');
    }
    showToast(err.message || 'Error changing password', 'error');
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i class="fas fa-save"></i> <span data-i18n="btn_save_new_pwd">${tFn('btn_save_new_pwd', 'Change Password 🔒')}</span>`;
    }
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

  if (!isDeviceOnline()) {
    errEl.textContent = '⚠️ ඔබ Offline සිටී. Register වීමට කරුණාකර Mobile Data හෝ Wi-Fi සම්බන්ධ කරන්න.';
    errEl.classList.remove('hidden');
    showToast('⚠️ Offline: Internet සම්බන්ධ කරන්න', 'warning');
    updateOnlineStatusUI();
    return;
  }

  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection('users').doc(cred.user.uid).set({
      name, phone, email, role: 'customer',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    showToast('Account හදාගත්තා! 🎉', 'success');
    notifyCustomerRegistered({ name, phone, email });
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

  if (window.AndroidApp && typeof window.AndroidApp.requestCameraPermission === 'function') {
    try { window.AndroidApp.requestCameraPermission(); } catch(e) {}
  }

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
  openModal('modal-photo-preview');
}

// ── MANDATORY LIVE SELFIE FOR EXISTING TECHNICIANS ────────────
let mandatoryCameraStream = null;
let mandatoryCameraFacingMode = 'user';
let capturedMandatorySelfieDataUrl = null;

function promptMandatoryTechSelfie() {
  capturedMandatorySelfieDataUrl = null;
  const modal = document.getElementById('modal-mandatory-selfie');
  if (!modal) return;

  const errEl = document.getElementById('mandatory-selfie-error');
  if (errEl) errEl.classList.add('hidden');

  const previewImg = document.getElementById('mandatory-selfie-preview-img');
  if (previewImg) previewImg.src = '';
  document.getElementById('mandatory-preview-wrap')?.classList.add('hidden');
  document.getElementById('mandatory-camera-wrap')?.classList.add('hidden');
  document.getElementById('mandatory-idle')?.classList.remove('hidden');

  openModal('modal-mandatory-selfie');
  startMandatoryCamera();
}

async function startMandatoryCamera() {
  const errEl = document.getElementById('mandatory-selfie-error');
  if (errEl) errEl.classList.add('hidden');

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (errEl) {
      errEl.textContent = 'ඔබගේ Browser එක කැමරා භාවිතයට සහය නොදක්වයි.';
      errEl.classList.remove('hidden');
    }
    showToast('Camera not supported', 'error');
    return;
  }

  stopMandatoryCamera();

  const constraints = {
    video: {
      facingMode: mandatoryCameraFacingMode,
      width: { ideal: 640 },
      height: { ideal: 640 }
    },
    audio: false
  };

  try {
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch(e1) {
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    }

    mandatoryCameraStream = stream;
    const video = document.getElementById('mandatory-selfie-video');
    if (video) {
      video.srcObject = stream;
      await video.play().catch(() => {});
    }

    document.getElementById('mandatory-idle')?.classList.add('hidden');
    document.getElementById('mandatory-camera-wrap')?.classList.remove('hidden');
    document.getElementById('mandatory-preview-wrap')?.classList.add('hidden');
  } catch (err) {
    console.error('Mandatory camera error:', err);
    if (errEl) {
      errEl.textContent = 'කැමරාව On කිරීමට අවසර නොලැබුණි (Permission Denied). කරුණාකර Camera access ලබා දෙන්න.';
      errEl.classList.remove('hidden');
    }
  }
}

function stopMandatoryCamera() {
  if (mandatoryCameraStream) {
    mandatoryCameraStream.getTracks().forEach(track => {
      try { track.stop(); } catch(e) {}
    });
    mandatoryCameraStream = null;
  }
  const video = document.getElementById('mandatory-selfie-video');
  if (video) video.srcObject = null;
}

async function switchMandatoryCamera() {
  mandatoryCameraFacingMode = (mandatoryCameraFacingMode === 'user') ? 'environment' : 'user';
  await startMandatoryCamera();
}

function captureMandatorySelfie() {
  const video = document.getElementById('mandatory-selfie-video');
  const canvas = document.getElementById('mandatory-selfie-canvas');
  const errEl = document.getElementById('mandatory-selfie-error');
  if (errEl) errEl.classList.add('hidden');

  if (!video || !canvas || !video.videoWidth) {
    showToast('Camera not ready', 'error');
    return;
  }

  const vW = video.videoWidth;
  const vH = video.videoHeight;
  const size = Math.min(vW, vH);
  const startX = (vW - size) / 2;
  const startY = (vH - size) / 2;
  const targetSize = 400;

  canvas.width = targetSize;
  canvas.height = targetSize;
  const ctx = canvas.getContext('2d');

  if (mandatoryCameraFacingMode === 'user') {
    ctx.translate(targetSize, 0);
    ctx.scale(-1, 1);
  }

  ctx.drawImage(video, startX, startY, size, size, 0, 0, targetSize, targetSize);
  const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
  capturedMandatorySelfieDataUrl = dataUrl;

  const previewImg = document.getElementById('mandatory-selfie-preview-img');
  if (previewImg) previewImg.src = dataUrl;

  stopMandatoryCamera();

  document.getElementById('mandatory-camera-wrap')?.classList.add('hidden');
  document.getElementById('mandatory-idle')?.classList.add('hidden');
  document.getElementById('mandatory-preview-wrap')?.classList.remove('hidden');

  showToast('Selfie Capture සාර්ථකයි! 📸 කරුණාකර Save කරන්න.', 'success');
}

function retakeMandatorySelfie() {
  capturedMandatorySelfieDataUrl = null;
  const previewImg = document.getElementById('mandatory-selfie-preview-img');
  if (previewImg) previewImg.src = '';
  document.getElementById('mandatory-preview-wrap')?.classList.add('hidden');
  startMandatoryCamera();
}

async function saveMandatorySelfie() {
  const errEl = document.getElementById('mandatory-selfie-error');
  if (errEl) errEl.classList.add('hidden');

  if (!capturedMandatorySelfieDataUrl) {
    if (errEl) {
      errEl.textContent = 'කරුණාකර Camera එකෙන් ඔබගේ Live Selfie එක Capture කර ගන්න.';
      errEl.classList.remove('hidden');
    }
    showToast('Please capture your selfie first', 'error');
    return;
  }

  if (!currentUser) return;

  const btn = document.getElementById('btn-save-mandatory-selfie');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving Selfie...';
  }

  try {
    await db.collection('users').doc(currentUser.uid).update({
      photoUrl: capturedMandatorySelfieDataUrl,
      selfieUpdatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    if (currentUserData) {
      currentUserData.photoUrl = capturedMandatorySelfieDataUrl;
    }

    closeModal('modal-mandatory-selfie');

    showToast('Live Selfie සාර්ථකව සුරක්ෂිත විය! ✅ දැන් ඔබට Jobs ලබාගත හැක.', 'success');

    if (document.getElementById('tech-avail')) loadTechJobs();
    if (document.getElementById('tech-claims')) loadTechClaims();
  } catch (err) {
    console.error('saveMandatorySelfie error:', err);
    if (errEl) {
      errEl.textContent = 'සුරැකීමේදී දෝෂයක් සිදුවිය: ' + (err.message || 'Error');
      errEl.classList.remove('hidden');
    }
    showToast('Failed to save selfie', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-check-double"></i> Selfie එක Save කර ඉදිරියට යන්න';
    }
  }
}

// ── 📸 TECHNICIAN LIVE SELFIE CHANGE & ADMIN APPROVAL ────────
let changeSelfieStream = null;
let changeSelfieFacingMode = 'user';
let capturedChangeSelfieDataUrl = null;

function openTechChangeSelfieModal() {
  capturedChangeSelfieDataUrl = null;
  const modal = document.getElementById('modal-change-selfie');
  if (!modal) return;

  const errEl = document.getElementById('change-selfie-error');
  if (errEl) errEl.classList.add('hidden');

  const previewImg = document.getElementById('change-selfie-preview-img');
  if (previewImg) previewImg.src = '';
  document.getElementById('change-selfie-preview-wrap')?.classList.add('hidden');
  document.getElementById('change-selfie-camera-wrap')?.classList.add('hidden');
  document.getElementById('change-selfie-idle')?.classList.remove('hidden');

  openModal('modal-change-selfie');
}

function closeChangeSelfieModal() {
  stopChangeSelfieCamera();
  capturedChangeSelfieDataUrl = null;
  closeModal('modal-change-selfie');
}

async function startChangeSelfieCamera() {
  const errEl = document.getElementById('change-selfie-error');
  if (errEl) errEl.classList.add('hidden');

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (errEl) {
      errEl.textContent = 'ඔබගේ Browser එක කැමරා භාවිතයට සහය නොදක්වයි.';
      errEl.classList.remove('hidden');
    }
    showToast('Camera not supported', 'error');
    return;
  }

  stopChangeSelfieCamera();

  const constraints = {
    video: {
      facingMode: changeSelfieFacingMode,
      width: { ideal: 640 },
      height: { ideal: 640 }
    },
    audio: false
  };

  try {
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch(e1) {
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    }

    changeSelfieStream = stream;
    const video = document.getElementById('change-selfie-video');
    if (video) {
      video.srcObject = stream;
      await video.play().catch(() => {});
    }

    document.getElementById('change-selfie-idle')?.classList.add('hidden');
    document.getElementById('change-selfie-camera-wrap')?.classList.remove('hidden');
    document.getElementById('change-selfie-preview-wrap')?.classList.add('hidden');
  } catch (err) {
    console.error('Change selfie camera error:', err);
    if (errEl) {
      errEl.textContent = 'කැමරාව On කිරීමට අවසර නොලැබුණි (Permission Denied). කරුණාකර Camera access ලබා දෙන්න.';
      errEl.classList.remove('hidden');
    }
  }
}

function stopChangeSelfieCamera() {
  if (changeSelfieStream) {
    changeSelfieStream.getTracks().forEach(track => {
      try { track.stop(); } catch(e) {}
    });
    changeSelfieStream = null;
  }
  const video = document.getElementById('change-selfie-video');
  if (video) video.srcObject = null;
}

async function switchChangeSelfieCamera() {
  changeSelfieFacingMode = (changeSelfieFacingMode === 'user') ? 'environment' : 'user';
  await startChangeSelfieCamera();
}

function captureChangeSelfie() {
  const video = document.getElementById('change-selfie-video');
  const canvas = document.getElementById('change-selfie-canvas');
  const errEl = document.getElementById('change-selfie-error');
  if (errEl) errEl.classList.add('hidden');

  if (!video || !canvas || !video.videoWidth) {
    showToast('Camera not ready', 'error');
    return;
  }

  const vW = video.videoWidth;
  const vH = video.videoHeight;
  const size = Math.min(vW, vH);
  const startX = (vW - size) / 2;
  const startY = (vH - size) / 2;
  const targetSize = 400;

  canvas.width = targetSize;
  canvas.height = targetSize;
  const ctx = canvas.getContext('2d');

  if (changeSelfieFacingMode === 'user') {
    ctx.translate(targetSize, 0);
    ctx.scale(-1, 1);
  }

  ctx.drawImage(video, startX, startY, size, size, 0, 0, targetSize, targetSize);
  const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
  capturedChangeSelfieDataUrl = dataUrl;

  const previewImg = document.getElementById('change-selfie-preview-img');
  if (previewImg) previewImg.src = dataUrl;

  stopChangeSelfieCamera();

  document.getElementById('change-selfie-camera-wrap')?.classList.add('hidden');
  document.getElementById('change-selfie-idle')?.classList.add('hidden');
  document.getElementById('change-selfie-preview-wrap')?.classList.remove('hidden');

  showToast('Selfie Capture සාර්ථකයි! 📸 කරුණාකර Admin අනුමැතියට යවන්න.', 'success');
}

function retakeChangeSelfie() {
  capturedChangeSelfieDataUrl = null;
  const previewImg = document.getElementById('change-selfie-preview-img');
  if (previewImg) previewImg.src = '';
  document.getElementById('change-selfie-preview-wrap')?.classList.add('hidden');
  startChangeSelfieCamera();
}

async function submitTechChangeSelfie() {
  if (!capturedChangeSelfieDataUrl) {
    showToast('කරුණාකර පළමුව සජීවී Selfie ඡායාරූපයක් ගන්න.', 'warning');
    return;
  }
  if (!currentUser || !currentUserData) {
    showToast('Please login first', 'error');
    return;
  }

  const btn = document.getElementById('btn-submit-change-selfie');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>යවමින් පවතී...</span>';
  }

  try {
    const techUid = currentUser.uid;
    const now = firebase.firestore.FieldValue.serverTimestamp();

    await db.collection('users').doc(techUid).update({
      pendingPhotoUrl: capturedChangeSelfieDataUrl,
      pendingPhotoStatus: 'pending',
      pendingPhotoSubmittedAt: now
    });

    currentUserData.pendingPhotoUrl = capturedChangeSelfieDataUrl;
    currentUserData.pendingPhotoStatus = 'pending';
    currentUserData.pendingPhotoSubmittedAt = new Date();

    closeChangeSelfieModal();

    const profileView = document.getElementById('screen-profile');
    if (profileView && !profileView.classList.contains('hidden')) {
      const el = document.getElementById('profile-content');
      if (el) el.innerHTML = renderProfileCard();
    }

    showToast('නව Selfie ඡායාරූපය සාර්ථකව Admin වෙත යවන ලදී! Admin අනුමත කළ පසු මාරු වේ.', 'success');

    notifyAdminSelfieChangeRequest({
      uid: techUid,
      name: currentUserData.name || 'Technician',
      email: currentUserData.email || '',
      phone: currentUserData.phone || '',
      district: currentUserData.district || '',
      city: currentUserData.city || '',
      services: getTechServices(currentUserData)
    }).catch(e => console.warn('Admin notification warning:', e));

  } catch (err) {
    console.error('Error submitting selfie change:', err);
    showToast('ඡායාරූපය යැවීම අසාර්ථක විය: ' + err.message, 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Admin අනුමැතියට යවන්න 🚀</span>';
    }
  }
}

async function notifyAdminSelfieChangeRequest(tech) {
  try {
    const adminRecipients = await getAllAdminEmails();
    const subject = `📸 Technician Selfie Change Request: ${tech.name} (${tech.district || 'All Island'})`;
    const servicesList = (tech.services && tech.services.length) ? tech.services.join(', ') : 'All Services';

    const html = emailWrapper('Technician Selfie Change Request', `
      <div style="text-align:center;margin-bottom:18px">
        <span style="background:rgba(56,189,248,0.2);color:#38bdf8;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:700">
          📸 LIVE SELFIE CHANGE REQUEST
        </span>
      </div>
      <h2 style="color:#60a5fa;margin-top:4px;text-align:center">Technician Selfie Change Request</h2>
      <p style="text-align:center;color:#cbd5e1;font-size:14px">
        Technician <strong>${esc(tech.name)}</strong> විසින් සිය Profile Selfie ඡායාරූපය සජීවීව Phone Camera එකෙන් යාවත්කාලීන කර Admin අනුමැතිය සඳහා යොමු කර ඇත.
      </p>

      <div class="detail-card">
        <div class="row">
          <span class="lbl">Technician Name</span>
          <span class="val">${esc(tech.name)}</span>
        </div>
        <div class="row">
          <span class="lbl">Phone Number</span>
          <span class="val"><a href="tel:${esc(tech.phone)}" style="color:#34d399;text-decoration:none">${esc(tech.phone)}</a></span>
        </div>
        <div class="row">
          <span class="lbl">District / City</span>
          <span class="val">${esc(tech.district || 'N/A')}${tech.city ? ' / ' + esc(tech.city) : ''}</span>
        </div>
        <div class="row">
          <span class="lbl">Services</span>
          <span class="val">${esc(servicesList)}</span>
        </div>
        <div class="row">
          <span class="lbl">Verification Type</span>
          <span class="val" style="color:#38bdf8">🔒 Verified Live Camera Capture</span>
        </div>
      </div>

      <div style="background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.3);border-radius:10px;padding:12px;margin:16px 0;font-size:13px;color:#fbbf24">
        ⚠️ <strong>Admin Review:</strong> පැරණි ඡායාරූපය සහ නව සජීවී ඡායාරූපය සංසන්දනය කර අනුමත (Accept) හෝ ප්‍රතික්ෂේප (Decline) කිරීමට Admin Panel වෙත පිවිසෙන්න.
      </div>

      <div style="text-align:center;margin-top:24px">
        <a href="https://lanka-vision.vercel.app/" class="btn-link" target="_blank" rel="noopener noreferrer">
          Admin Panel එකෙන් Review කරන්න 🚀
        </a>
      </div>
    `);

    await sendEmailNotification({
      to: adminRecipients,
      subject,
      html,
      text: `Technician Selfie Change Request from ${tech.name} (${tech.phone}, ${tech.district}). Review at Admin Panel.`
    });

    if (typeof triggerAppNotification === 'function') {
      triggerAppNotification({
        title: '📸 New Selfie Request',
        message: `${tech.name} technician selfie change request එකක් දමා ඇත.`,
        type: 'info'
      });
    }
  } catch (err) {
    console.error('Error in notifyAdminSelfieChangeRequest:', err);
  }
}

// ── WORK COMPLETION LIVE CAMERA CAPTURE ───────────────────────
let workCameraStream = null;
let workCameraFacingMode = 'environment'; // default rear camera for physical equipment
let capturedWorkPhotoDataUrl = null;
let activeCompletingJobId = null;

function openCompleteJobModal(jobId) {
  activeCompletingJobId = jobId;
  capturedWorkPhotoDataUrl = null;
  document.getElementById('complete-target-job-id').value = jobId;
  document.getElementById('complete-job-notes').value = '';
  document.getElementById('work-proof-error')?.classList.add('hidden');

  const previewImg = document.getElementById('work-proof-preview-img');
  if (previewImg) previewImg.src = '';
  document.getElementById('work-preview-wrap')?.classList.add('hidden');
  document.getElementById('work-camera-wrap')?.classList.add('hidden');
  document.getElementById('work-idle')?.classList.remove('hidden');

  openModal('modal-complete-job');
  startWorkCamera();
}

function closeCompleteJobModal() {
  activeCompletingJobId = null;
  capturedWorkPhotoDataUrl = null;
  closeModal('modal-complete-job');
}

async function startWorkCamera() {
  const errEl = document.getElementById('work-proof-error');
  if (errEl) errEl.classList.add('hidden');

  if (window.AndroidApp && typeof window.AndroidApp.requestCameraPermission === 'function') {
    try { window.AndroidApp.requestCameraPermission(); } catch(e) {}
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (errEl) {
      errEl.textContent = 'ඔබගේ Browser එක කැමරා භාවිතයට සහය නොදක්වයි.';
      errEl.classList.remove('hidden');
    }
    showToast('Camera not supported', 'error');
    return;
  }

  stopWorkCamera();

  const constraints = {
    video: {
      facingMode: workCameraFacingMode,
      width: { ideal: 1280 },
      height: { ideal: 720 }
    },
    audio: false
  };

  try {
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch(e1) {
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    }

    workCameraStream = stream;
    const video = document.getElementById('work-proof-video');
    if (video) {
      video.srcObject = stream;
      await video.play().catch(() => {});
    }

    document.getElementById('work-idle')?.classList.add('hidden');
    document.getElementById('work-camera-wrap')?.classList.remove('hidden');
    document.getElementById('work-preview-wrap')?.classList.add('hidden');
  } catch (err) {
    console.error('Work camera error:', err);
    if (errEl) {
      errEl.textContent = 'කැමරාව On කිරීමට අවසර නොලැබුණි (Permission Denied). කරුණාකර Camera access ලබා දෙන්න.';
      errEl.classList.remove('hidden');
    }
  }
}

function stopWorkCamera() {
  if (workCameraStream) {
    workCameraStream.getTracks().forEach(track => {
      try { track.stop(); } catch(e) {}
    });
    workCameraStream = null;
  }
  const video = document.getElementById('work-proof-video');
  if (video) video.srcObject = null;
}

async function switchWorkCamera() {
  workCameraFacingMode = (workCameraFacingMode === 'environment') ? 'user' : 'environment';
  await startWorkCamera();
}

function captureWorkProof() {
  const video = document.getElementById('work-proof-video');
  const canvas = document.getElementById('work-proof-canvas');
  const errEl = document.getElementById('work-proof-error');
  if (errEl) errEl.classList.add('hidden');

  if (!video || !canvas || !video.videoWidth) {
    showToast('Camera not ready', 'error');
    return;
  }

  const targetW = 640;
  const targetH = Math.round((video.videoHeight / video.videoWidth) * targetW) || 480;
  canvas.width = targetW;
  canvas.height = targetH;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, targetW, targetH);

  const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
  capturedWorkPhotoDataUrl = dataUrl;

  const previewImg = document.getElementById('work-proof-preview-img');
  if (previewImg) previewImg.src = dataUrl;

  stopWorkCamera();

  document.getElementById('work-camera-wrap')?.classList.add('hidden');
  document.getElementById('work-idle')?.classList.add('hidden');
  document.getElementById('work-preview-wrap')?.classList.remove('hidden');

  showToast('Work Proof Photo Capture කළා! 📸', 'success');
}

function retakeWorkProof() {
  capturedWorkPhotoDataUrl = null;
  const previewImg = document.getElementById('work-proof-preview-img');
  if (previewImg) previewImg.src = '';
  document.getElementById('work-preview-wrap')?.classList.add('hidden');
  startWorkCamera();
}

async function confirmJobCompletion() {
  if (!activeCompletingJobId) return;
  const errEl = document.getElementById('work-proof-error');
  if (errEl) errEl.classList.add('hidden');

  if (!capturedWorkPhotoDataUrl) {
    if (errEl) {
      errEl.textContent = 'කරුණාකර වැඩ අවසන් කළ බව තහවුරු කිරීමට Camera එකෙන් Live Photo එකක් ලබාගන්න (Work photo proof required).';
      errEl.classList.remove('hidden');
    }
    showToast('Work completion photo is required', 'error');
    return;
  }

  const notes = document.getElementById('complete-job-notes')?.value.trim() || '';
  const confirmBtn = document.getElementById('btn-confirm-complete');
  if (confirmBtn) {
    confirmBtn.disabled = true;
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Completing...';
  }

  try {
    const ref = db.collection('jobs').doc(activeCompletingJobId);
    const doc = await ref.get();
    const jobData = doc.exists ? doc.data() : null;

    await ref.update({
      status: 'completed',
      completionPhoto: capturedWorkPhotoDataUrl,
      completionNotes: notes,
      completedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    showToast('Job Complete කළා! ✅ Work proof photo සුරක්ෂිත විය.', 'success');
    closeCompleteJobModal();

    if (document.getElementById('tech-claims')) loadTechClaims();

    if (jobData) {
      notifyJobCompleted({
        ...jobData,
        completionPhoto: capturedWorkPhotoDataUrl,
        completionNotes: notes
      });
    }
  } catch (err) {
    console.error('Job completion error:', err);
    showToast('Failed to complete job: ' + (err.message || ''), 'error');
  } finally {
    if (confirmBtn) {
      confirmBtn.disabled = false;
      confirmBtn.innerHTML = '<i class="fas fa-check-double"></i> Confirm & Complete';
    }
  }
}

// ── STAR RATING & FEEDBACK SYSTEM ─────────────────────────────
function renderStarRating(rating, count) {
  const r = Number(rating);
  const c = Number(count || 0);
  const tFn = (typeof t === 'function') ? t : (k, fb) => fb;
  if (!r || isNaN(r) || c === 0) {
    return `<span class="star-rating-badge" title="New"><i class="fas fa-star"></i> <strong>New</strong></span>`;
  }
  const revText = tFn('reviews_count', 'reviews');
  return `<span class="star-rating-badge" title="${r.toFixed(1)} / 5 (${c} ${revText})"><i class="fas fa-star"></i> <strong>${r.toFixed(1)}</strong>/5 <small style="color:var(--txt3);margin-left:2px">(${c})</small></span>`;
}

async function openFeedbackModal(jobId) {
  try {
    const doc = await db.collection('jobs').doc(jobId).get();
    if (!doc.exists) return;
    const job = doc.data();

    document.getElementById('feedback-job-id').value = jobId;
    document.getElementById('feedback-tech-id').value = job.claimedBy || '';
    document.getElementById('feedback-tech-name').textContent = job.claimedByName || 'Technician';
    document.getElementById('feedback-job-title').textContent = job.title || 'Job';

    const avEl = document.getElementById('feedback-tech-av');
    if (avEl) {
      if (job.claimedByPhoto) {
        avEl.innerHTML = `<img src="${job.claimedByPhoto}" alt="Technician" />`;
      } else {
        avEl.innerHTML = `${(job.claimedByName || 'T').charAt(0).toUpperCase()}`;
      }
    }

    setStarRating(5);
    const commentInput = document.getElementById('feedback-comment');
    if (commentInput) commentInput.value = job.feedback || '';
    document.getElementById('feedback-error')?.classList.add('hidden');

    openModal('modal-feedback');
  } catch (err) {
    console.error('openFeedbackModal error:', err);
  }
}

function setStarRating(val) {
  document.getElementById('selected-rating-val').value = val;
  const stars = document.querySelectorAll('#star-picker i');
  stars.forEach(s => {
    const sVal = Number(s.dataset.val);
    s.classList.toggle('active', sVal <= val);
  });
  const tFn = (typeof t === 'function') ? t : (k, fb) => fb;
  const labels = {
    1: tFn('star_1', '⭐ 1/5 - Poor'),
    2: tFn('star_2', '⭐⭐ 2/5 - Fair'),
    3: tFn('star_3', '⭐⭐⭐ 3/5 - Good'),
    4: tFn('star_4', '⭐⭐⭐⭐ 4/5 - Very Good'),
    5: tFn('star_5', '⭐⭐⭐⭐⭐ 5/5 - Excellent')
  };
  const labelEl = document.getElementById('star-label');
  if (labelEl) labelEl.textContent = labels[val] || `${val}/5 Stars`;
}

function previewStars(val) {
  const stars = document.querySelectorAll('#star-picker i');
  stars.forEach(s => {
    const sVal = Number(s.dataset.val);
    s.classList.toggle('active', sVal <= val);
  });
}

function resetStarPreview() {
  const currentVal = Number(document.getElementById('selected-rating-val')?.value || 5);
  setStarRating(currentVal);
}

async function submitFeedback() {
  const jobId = document.getElementById('feedback-job-id')?.value;
  const techId = document.getElementById('feedback-tech-id')?.value;
  const rating = Number(document.getElementById('selected-rating-val')?.value || 5);
  const comment = document.getElementById('feedback-comment')?.value.trim() || '';
  const errEl = document.getElementById('feedback-error');
  if (errEl) errEl.classList.add('hidden');

  if (!jobId) return;

  const btn = document.getElementById('btn-submit-feedback');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
  }

  try {
    // 1. Update Job Document with Rating
    await db.collection('jobs').doc(jobId).update({
      rating: rating,
      feedback: comment,
      ratedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // 2. Update Technician aggregate stats
    if (techId) {
      try {
        const techRef = db.collection('users').doc(techId);
        const techDoc = await techRef.get();
        if (techDoc.exists) {
          const tData = techDoc.data();
          const oldCount = Number(tData.ratingCount || 0);
          const oldTotal = Number(tData.ratingTotal || 0);
          const newCount = oldCount + 1;
          const newTotal = oldTotal + rating;
          const newAvg = Number(newTotal / newCount).toFixed(1);

          await techRef.update({
            ratingCount: newCount,
            ratingTotal: newTotal,
            avgRating: Number(newAvg)
          });
        }
      } catch (e) {
        console.warn('Could not update tech rating profile:', e);
      }
    }

    // 3. Save to reviews collection
    try {
      await db.collection('reviews').add({
        jobId,
        techId: techId || '',
        customerId: currentUser ? currentUser.uid : 'guest',
        customerName: currentUserData ? currentUserData.name : 'Customer',
        rating,
        feedback: comment,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch(e) {}

    showToast('Feedback එක සාර්ථකව Submit කළා! ස්තූතියි! ⭐', 'success');
    closeModal('modal-feedback');

    // Refresh views
    if (document.getElementById('cust-jobs')) loadCustomerJobs();
    openJobModal(jobId);
  } catch (err) {
    console.error('Feedback submit error:', err);
    if (errEl) {
      errEl.textContent = 'Feedback submit කිරීමේදී දෝෂයක්: ' + (err.message || '');
      errEl.classList.remove('hidden');
    }
    showToast('Failed to submit feedback', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Review එක Submit කරන්න';
    }
  }
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
  const checkedBoxes = document.querySelectorAll('input[name="tech-svc-opt"]:checked');
  const services = Array.from(checkedBoxes).map(cb => cb.value);
  const serviceType = services.join(', ');
  const errEl = document.getElementById('tech-error');
  errEl.classList.add('hidden');

  if (!isDeviceOnline()) {
    errEl.textContent = '⚠️ ඔබ Offline සිටී. Register වීමට කරුණාකර Mobile Data හෝ Wi-Fi සම්බන්ධ කරන්න.';
    errEl.classList.remove('hidden');
    showToast('⚠️ Offline: Internet සම්බන්ධ කරන්න', 'warning');
    updateOnlineStatusUI();
    return;
  }

  if (!district) { errEl.textContent = 'District Select කරන්න.'; errEl.classList.remove('hidden'); return; }
  if (!services.length) { errEl.textContent = 'සේවා වර්ගයක් (CCTV, Satellite හෝ Router) Select කරන්න.'; errEl.classList.remove('hidden'); return; }

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
      district, city, services, serviceType,
      photoUrl: capturedTechSelfieDataUrl,
      status: 'pending',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    const selfieData = capturedTechSelfieDataUrl;
    stopTechCamera();
    capturedTechSelfieDataUrl = null;
    showToast('Application submit කළා! Admin approve වෙනතුරු wait කරන්න.', 'success');
    await notifyTechRegistered({ name, phone, email, district, city, services, serviceType, photoUrl: selfieData });
  } catch (err) {
    console.error('handleTechRegister error:', err);
    errEl.textContent = authErr(err.code);
    errEl.classList.remove('hidden');
  }
}

async function handleLogout() {
  clearCachedSession();
  cleanupRealtimeJobNotifications();
  stopTechCamera();
  const fab = document.getElementById('fab-post');
  if (fab) fab.classList.add('hidden');
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

  const tFn = (typeof t === 'function') ? t : (k, fb) => fb;
  document.getElementById('dash-tabs').innerHTML = `
    <button class="tab-btn active" data-tab="jobs" onclick="showCustTab('jobs')"><i class="fas fa-briefcase"></i> ${tFn('tab_my_jobs', 'My Posted Jobs')}</button>
    <button class="tab-btn" data-tab="post" onclick="showCustTab('post')"><i class="fas fa-plus"></i> ${tFn('tab_post_job', 'Post Job')}</button>
    <button class="tab-btn" data-tab="profile" onclick="showCustTab('profile')"><i class="fas fa-user"></i> ${tFn('tab_profile', 'Profile')}</button>`;
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
  updateMobileNavState('screen-dashboard');
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
  } catch (err) {
    console.error('loadCustomerJobs error:', err);
    const el = document.getElementById('cust-jobs');
    if (el) el.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-exclamation-triangle" style="color:var(--danger)"></i><p>Jobs load කිරීමේදී දෝෂයක් ඇති විය. <a href="#" onclick="loadCustomerJobs()" style="color:var(--primary-l)">Retry</a></p></div>`;
  }
}

function goToMyJobs() {
  document.getElementById('nav-dropdown')?.classList.add('hidden');
  if (!currentUserData) {
    showScreen('screen-login');
    return;
  }
  if (currentUserData.role === 'technician') {
    showScreen('screen-dashboard');
    showTechTab('claims');
  } else if (currentUserData.role === 'admin') {
    showScreen('screen-admin');
    showAdminTab('techs');
  } else {
    showScreen('screen-dashboard');
    showCustTab('jobs');
  }
}

function goToProfile() {
  document.getElementById('nav-dropdown')?.classList.add('hidden');
  if (!currentUserData) {
    showScreen('screen-login');
    return;
  }
  if (currentUserData.role === 'technician') {
    showScreen('screen-dashboard');
    showTechTab('profile');
  } else if (currentUserData.role === 'admin') {
    showScreen('screen-admin');
    showAdminTab('settings');
  } else {
    showScreen('screen-dashboard');
    showCustTab('profile');
  }
}

// ── TECHNICIAN DASHBOARD ──────────────────────────────────────
function initTechDashboard() {
  document.getElementById('nav-user-name').textContent = currentUserData.name;
  document.getElementById('fab-post').classList.remove('hidden');

  const tFn = (typeof t === 'function') ? t : (k, fb) => fb;
  document.getElementById('dash-tabs').innerHTML = `
    <button class="tab-btn active" data-tab="avail" onclick="showTechTab('avail')"><i class="fas fa-list"></i> ${tFn('tab_available', 'Available Jobs')}</button>
    <button class="tab-btn" data-tab="claims" onclick="showTechTab('claims')"><i class="fas fa-handshake"></i> ${tFn('tab_claimed', 'My Claimed')}</button>
    <button class="tab-btn" data-tab="post" onclick="showTechTab('post')"><i class="fas fa-plus"></i> ${tFn('tab_post_job', 'Post Job')}</button>
    <button class="tab-btn" data-tab="profile" onclick="showTechTab('profile')"><i class="fas fa-user"></i> ${tFn('tab_profile', 'Profile')}</button>`;
  showTechTab('avail');
}

let techLiveLocation = null;

function useTechLiveGps() {
  const btn = document.getElementById('btn-tech-gps');
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    showToast('GPS is not supported on this device', 'warning');
    return;
  }
  if (btn) {
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Locating...';
  }
  navigator.geolocation.getCurrentPosition(
    pos => {
      techLiveLocation = [pos.coords.latitude, pos.coords.longitude];
      if (btn) {
        btn.innerHTML = '<i class="fas fa-crosshairs" style="color:var(--success)"></i> GPS Active';
        btn.style.borderColor = 'var(--success)';
      }
      showToast('ඔබ සිටින ස්ථානය (Live GPS) හඳුනාගත්තා! 36 km පරාසය යාවත්කාලීන විය.', 'success');
      loadTechJobs();
    },
    err => {
      console.warn('Geolocation error:', err);
      if (btn) {
        btn.innerHTML = '<i class="fas fa-crosshairs"></i> Live GPS';
      }
      showToast('GPS ලබාගත නොහැකි විය. Location permissions allow කරන්න.', 'warning');
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
  );
}

// ── TECHNICIAN ROUTER UPGRADE & MAP LOGIC ─────────────────────
let techAvailableJobsMap = null;
let techMapMarkersLayer = null;
let techJobMarkersMap = {};
let techHasActiveUnscheduledJob = false;

async function addRouterServiceToCurrentTech() {
  if (!currentUser || !currentUserData) return;
  try {
    const curServices = getTechServices(currentUserData);
    if (!curServices.includes('Router')) {
      curServices.push('Router');
    }
    await db.collection('users').doc(currentUser.uid).update({
      services: curServices,
      serviceType: curServices.join(', '),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    currentUserData.services = curServices;
    currentUserData.serviceType = curServices.join(', ');
    document.getElementById('banner-router-upgrade')?.remove();
    showToast('Router Installation සේවාව profile එකට සාර්ථකව එකතු විය! 🎉', 'success');
    loadTechJobs();
  } catch (err) {
    console.error('Error adding router service:', err);
    showToast('Failed to add service: ' + err.message, 'error');
  }
}

function dismissRouterUpgradePrompt() {
  if (currentUser) {
    localStorage.setItem('dismiss_router_prompt_' + currentUser.uid, '1');
  }
  document.getElementById('banner-router-upgrade')?.remove();
}

function getJobCoordinates(j) {
  if (!j) return null;
  if (j.location && typeof j.location.lat === 'number' && typeof j.location.lng === 'number') {
    return [j.location.lat, j.location.lng];
  }
  if (j.location && j.location.lat && j.location.lng) {
    const pLat = parseFloat(j.location.lat);
    const pLng = parseFloat(j.location.lng);
    if (!isNaN(pLat) && !isNaN(pLng)) return [pLat, pLng];
  }
  if (j.city && CITY_COORDS[j.city]) {
    return [CITY_COORDS[j.city][0], CITY_COORDS[j.city][1]];
  }
  if (j.district && DISTRICT_COORDS[j.district]) {
    return [DISTRICT_COORDS[j.district][0], DISTRICT_COORDS[j.district][1]];
  }
  return null;
}

function toggleTechJobsMap() {
  const mapPanel = document.getElementById('tech-map-panel');
  if (!mapPanel) return;

  mapPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => {
    try {
      techAvailableJobsMap?.invalidateSize();
    } catch(e) {}
  }, 250);
}

function focusJobOnTechMap(jobId) {
  const mapPanel = document.getElementById('tech-map-panel');
  if (mapPanel) {
    mapPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      try {
        techAvailableJobsMap?.invalidateSize();
        const j = window._jobsMap?.[jobId];
        const coords = getJobCoordinates(j);
        if (coords && techAvailableJobsMap) {
          techAvailableJobsMap.setView(coords, 14);
        }
        if (techJobMarkersMap && techJobMarkersMap[jobId]) {
          techJobMarkersMap[jobId].openPopup();
        }
      } catch(e) {}
    }, 300);
  }
}

function renderTechJobsMap(jobs, techCoords) {
  const mapEl = document.getElementById('tech-available-jobs-map');
  if (!mapEl || typeof L === 'undefined') return;

  // Always cleanly reset previous instance to prevent detached DOM memory leaks and black tiles
  if (techAvailableJobsMap) {
    try {
      techAvailableJobsMap.off();
      techAvailableJobsMap.remove();
    } catch(e) {}
    techAvailableJobsMap = null;
    techMapMarkersLayer = null;
  }
  techJobMarkersMap = {};

  const defaultCenter = techCoords || (jobs[0] ? getJobCoordinates(jobs[0]) : null) || [7.8731, 80.7718];

  try {
    techAvailableJobsMap = L.map('tech-available-jobs-map', {
      zoomControl: true,
      scrollWheelZoom: true
    }).setView(defaultCenter, 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      subdomains: ['a', 'b', 'c'],
      attribution: '© OpenStreetMap contributors'
    }).addTo(techAvailableJobsMap);

    techMapMarkersLayer = L.layerGroup().addTo(techAvailableJobsMap);

    setTimeout(() => { try { techAvailableJobsMap?.invalidateSize(); } catch(e) {} }, 150);
    setTimeout(() => { try { techAvailableJobsMap?.invalidateSize(); } catch(e) {} }, 450);
  } catch (err) {
    console.warn('Leaflet map initialization warning:', err);
    return;
  }

  const coordsMap = {};
  const boundsPoints = [];

  // 1. Technician's Location Marker (Beacon pin + 36km radius boundary)
  if (techCoords && Array.isArray(techCoords) && techCoords.length === 2) {
    const techPinHtml = `
      <div class="job-marker-pin marker-tech" title="ඔබ සිටින ස්ථානය (Your Location)">
        <i class="fas fa-user-shield"></i>
      </div>`;
    const techMarker = L.marker(techCoords, {
      icon: L.divIcon({
        className: 'custom-job-marker',
        html: techPinHtml,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
      }),
      zIndexOffset: 1000
    }).bindPopup(`
      <div style="font-weight:800;font-size:.9rem;color:#1d4ed8;margin-bottom:2px">
        <i class="fas fa-user-shield"></i> ඔබ සිටින ස්ථානය (Your Location)
      </div>
      <div style="font-size:.8rem;color:#334155">Base: ${esc(currentUserData?.city ? `${currentUserData.district}, ${currentUserData.city}` : currentUserData?.district || '')}</div>
      <div style="font-size:.75rem;color:#059669;font-weight:700;margin-top:4px">🎯 36 km Radius Active</div>
    `);
    techMapMarkersLayer.addLayer(techMarker);
    boundsPoints.push(techCoords);

    try {
      L.circle(techCoords, {
        radius: 36000,
        color: '#3b82f6',
        weight: 1.5,
        opacity: 0.6,
        fillColor: '#3b82f6',
        fillOpacity: 0.05,
        dashArray: '5, 8'
      }).addTo(techMapMarkersLayer);
    } catch(e) {}
  }

  // Update map counter badges
  const countBadge = document.getElementById('tech-map-count');
  if (countBadge) countBadge.textContent = `${jobs.length} open jobs`;
  const quickBadge = document.getElementById('tech-map-quick-badge');
  if (quickBadge) quickBadge.textContent = jobs.length;

  // 2. Open Job Pins with Distinct Icons (Satellite, CCTV, Router, Urgent)
  jobs.forEach((j, idx) => {
    let coords = getJobCoordinates(j);
    if (!coords) return;

    let [lat, lng] = coords;

    // Sprintf jitter if multiple jobs have identical coordinates (e.g. same city/district center)
    const key = `${lat.toFixed(4)},${lng.toFixed(4)}`;
    if (coordsMap[key]) {
      const count = coordsMap[key];
      coordsMap[key]++;
      const angle = count * (Math.PI / 3);
      const offset = 0.003 * Math.sqrt(count);
      lat += Math.cos(angle) * offset;
      lng += Math.sin(angle) * offset;
    } else {
      coordsMap[key] = 1;
    }

    let markerClass = 'marker-cctv';
    let iconClass = 'fas fa-video';
    let typeName = 'CCTV';
    if (j.type === 'Satellite') {
      markerClass = 'marker-satellite';
      iconClass = 'fas fa-satellite-dish';
      typeName = 'Satellite';
    } else if (j.type === 'Router') {
      markerClass = 'marker-router';
      iconClass = 'fas fa-wifi';
      typeName = 'Router';
    }

    const isUrgent = !!(j.isUrgent || j.urgent);
    if (isUrgent) {
      markerClass += ' marker-urgent';
    }

    const pinHtml = `
      <div class="job-marker-pin ${markerClass}" title="${esc(j.title)} (${esc(typeName)})">
        <i class="${iconClass}"></i>
      </div>`;

    const distHtml = j._distanceKm != null ? `<span style="color:#059669;font-weight:700;font-size:.78rem">🎯 ${j._distanceKm} km දුරින්</span>` : '';
    const acceptBtnHtml = techHasActiveUnscheduledJob
      ? `<button class="btn btn-primary btn-sm btn-full" disabled style="opacity:.6;cursor:not-allowed;margin-top:8px;font-size:.76rem" title="කලින් භාරගත් Job එක අවසන් කරන්න හෝ Schedule කරන්න"><i class="fas fa-lock"></i> Active Job In Progress</button>`
      : `<button class="btn btn-primary btn-sm btn-full" onclick="claimJob('${j.id}')" style="margin-top:8px;font-size:.78rem;font-weight:800"><i class="fas fa-handshake"></i> භාරගන්න (Accept)</button>`;

    const popupHtml = `
      <div style="min-width:200px;max-width:260px;font-family:var(--font);color:#0f172a;padding:4px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;gap:6px">
          <span class="type-badge ${esc(j.type)}" style="font-size:.68rem;padding:2px 8px">${esc(typeName)}</span>
          ${isUrgent ? `<span class="badge" style="background:#ef4444;color:#fff;font-size:.68rem;padding:2px 6px">⚡ URGENT</span>` : ''}
          ${distHtml}
        </div>
        <div style="font-weight:800;font-size:.9rem;margin-bottom:4px;color:#1e293b;line-height:1.3">${esc(j.title)}</div>
        <div style="font-size:.76rem;color:#64748b;margin-bottom:4px">
          <i class="fas fa-map-marker-alt" style="color:#ef4444"></i> ${esc(j.city ? `${j.district}, ${j.city}` : j.district)}
        </div>
        ${j.customerName ? `<div style="font-size:.74rem;color:#475569;margin-bottom:6px"><i class="fas fa-user"></i> ${esc(j.customerName)}</div>` : ''}
        <div style="display:flex;gap:6px;margin-top:8px">
          <button type="button" class="btn btn-ghost btn-sm" onclick="openJobModal('${j.id}')" style="flex:1;padding:6px;font-size:.75rem;border:1px solid #cbd5e1;color:#1e293b">
            <i class="fas fa-eye"></i> විස්තර
          </button>
          <div style="flex:1">${acceptBtnHtml}</div>
        </div>
      </div>
    `;

    const jobMarker = L.marker([lat, lng], {
      icon: L.divIcon({
        className: 'custom-job-marker',
        html: pinHtml,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
      })
    }).bindPopup(popupHtml);

    techMapMarkersLayer.addLayer(jobMarker);
    techJobMarkersMap[j.id] = jobMarker;
    boundsPoints.push([lat, lng]);
  });

  if (boundsPoints.length > 1) {
    try {
      techAvailableJobsMap.fitBounds(boundsPoints, { padding: [40, 40], maxZoom: 13 });
    } catch(e){}
  } else if (boundsPoints.length === 1) {
    try {
      techAvailableJobsMap.setView(boundsPoints[0], 12);
    } catch(e){}
  }
}

function showTechTab(tab) {
  setActiveTab('dash-tabs', tab);
  const c = document.getElementById('dash-content');
  if (tab === 'avail') {
    const tFn = (typeof t === 'function') ? t : (k, fb) => fb;
    const opt36 = tFn('filter_36km', '🎯 ළඟම Jobs (36 km ඇතුළත)');
    const opt50 = tFn('filter_50km', '🚗 50 km ඇතුළත');
    const optDist = `${tFn('filter_my_dist', '📍 මගේ දිස්ත්‍රික්කය පමණක්')} (${esc(currentUserData.district)})`;
    const optAll = tFn('filter_all', '🌐 සියලුම Jobs (All)');

    // Router upgrade banner if applicable
    let routerPromptHtml = '';
    const curServices = getTechServices(currentUserData);
    const dismissed = currentUser ? localStorage.getItem('dismiss_router_prompt_' + currentUser.uid) : null;
    if (!curServices.includes('Router') && !dismissed) {
      routerPromptHtml = `
        <div class="router-upgrade-banner" id="banner-router-upgrade">
          <div style="display:flex;align-items:center;gap:14px">
            <div style="width:44px;height:44px;border-radius:50%;background:rgba(168,85,247,0.2);border:1.5px solid #a855f7;display:flex;align-items:center;justify-content:center;color:#c084fc;font-size:1.3rem;flex-shrink:0">
              <i class="fas fa-wifi"></i>
            </div>
            <div>
              <div style="font-weight:800;font-size:.92rem;color:#fff;margin-bottom:2px">
                🚀 නව සේවා අවස්ථාව: Router Installation!
              </div>
              <div style="font-size:.8rem;color:var(--txt2);line-height:1.4">
                ඔබ Wi-Fi Routers සහ Network උපකරණ සවිකිරීම සිදුකරනවාද? ඔබගේ ප්‍රදේශයේ Router jobs ලබා ගැනීමට ඔබගේ Profile එකට Router Installation එකතු කරගන්න!
              </div>
            </div>
          </div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <button type="button" class="btn btn-primary btn-sm" onclick="addRouterServiceToCurrentTech()" style="background:linear-gradient(135deg,#a855f7,#7c3aed);box-shadow:0 4px 14px rgba(168,85,247,0.4)">
              <i class="fas fa-plus-circle"></i> Router Installation එකතු කරන්න
            </button>
            <button type="button" class="btn btn-ghost btn-sm" onclick="dismissRouterUpgradePrompt()">
              දැන්ම එපා
            </button>
          </div>
        </div>
      `;
    }

    c.innerHTML = `
      ${routerPromptHtml}
      <div class="filter-bar" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
        <div>
          <h2 style="font-size:1rem;font-weight:800;margin:0"><i class="fas fa-briefcase" style="color:var(--primary-l)"></i> Available Jobs</h2>
          <p style="font-size:.78rem;color:var(--txt3);margin-top:2px">
            <span class="type-badge ${esc(currentUserData.serviceType)}">${esc(currentUserData.serviceType)}</span>
            · Base: <strong>${esc(currentUserData.city ? `${currentUserData.district}, ${currentUserData.city}` : currentUserData.district)}</strong>
            · <span style="display:inline-flex;align-items:center;gap:4px;color:#34d399;font-weight:700"><i class="fas fa-bullseye"></i> 36 km Radius Active</span>
          </p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <select id="tech-scope-filter" onchange="loadTechJobs()" style="background:var(--card);border:1px solid var(--border);color:var(--txt);padding:7px 14px;border-radius:8px;font-size:.82rem;font-weight:600;cursor:pointer">
            <option value="radius_36km" selected>${opt36}</option>
            <option value="radius_50km">${opt50}</option>
            <option value="my_district">${optDist}</option>
            <option value="all_jobs">${optAll}</option>
          </select>
          <button type="button" class="btn btn-outline btn-sm" id="btn-tech-gps" onclick="useTechLiveGps()" title="Use live phone GPS" style="padding:7px 12px;font-size:.78rem">
            <i class="fas fa-crosshairs"></i> <span>Live GPS</span>
          </button>
          <button type="button" class="btn btn-primary btn-sm" id="btn-toggle-tech-map" onclick="toggleTechJobsMap()" style="padding:7px 14px;font-size:.8rem;font-weight:700;display:inline-flex;align-items:center;gap:6px">
            <i class="fas fa-map-marked-alt"></i>
            <span id="tech-map-toggle-text">🗺️ Map එක බලන්න</span>
            <span class="badge" id="tech-map-quick-badge" style="background:#ffffff;color:#1d4ed8;font-size:.72rem;padding:2px 7px;border-radius:10px;font-weight:800">0</span>
          </button>
        </div>
      </div>

      <!-- 1. AVAILABLE JOBS LIST (FIRST & PROMINENT AT TOP!) -->
      <div id="tech-avail" class="jobs-grid">
        <div class="empty-state" style="grid-column:1/-1"><i class="fas fa-spinner fa-spin"></i><p>Loading jobs...</p></div>
      </div>

      <!-- 2. JOBS MAP SECTION (POSITIONED BELOW JOBS GRID & DIRECTLY ACCESSIBLE) -->
      <div class="panel" id="tech-map-panel" style="margin-top:24px;padding:14px 16px;background:var(--card);border:1px solid var(--border);border-radius:var(--r-l)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
          <div style="font-weight:800;font-size:.92rem;display:flex;align-items:center;gap:8px">
            <i class="fas fa-map-marked-alt" style="color:var(--primary-l);font-size:1.1rem"></i>
            <span>Jobs Map (ලැබී ඇති සියලුම Jobs සිතියම)</span>
            <span class="badge" id="tech-map-count" style="font-size:.74rem;background:#0284c7">0 open jobs</span>
          </div>
          <div style="display:flex;gap:12px;font-size:.74rem;font-weight:700;color:var(--txt2);flex-wrap:wrap;align-items:center">
            <span><i class="fas fa-video" style="color:#06b6d4"></i> CCTV</span>
            <span><i class="fas fa-satellite-dish" style="color:#f59e0b"></i> Satellite</span>
            <span><i class="fas fa-wifi" style="color:#a855f7"></i> Router</span>
            <span><i class="fas fa-fire-alt" style="color:#ef4444"></i> Urgent</span>
            <span><i class="fas fa-user-shield" style="color:#3b82f6"></i> ඔබ සිටින ස්ථානය</span>
          </div>
        </div>
        <div id="tech-available-jobs-map" style="width:100%;height:360px;border-radius:var(--r-m);border:1px solid var(--border);background:#0b101b;overflow:hidden"></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;font-size:.76rem;color:var(--txt3);flex-wrap:wrap;gap:8px">
          <span><i class="fas fa-info-circle" style="color:var(--primary-l)"></i> ඕනෑම Job Icon එකක් මත Click කර Job එක භාරගන්න (Accept) හෝ විස්තර බලන්න.</span>
          <button type="button" class="btn btn-ghost btn-sm" onclick="window.scrollTo({top:0,behavior:'smooth'})" style="padding:4px 10px;font-size:.75rem">
            <i class="fas fa-arrow-up"></i> මුලට යන්න (Top)
          </button>
        </div>
      </div>`;
    loadTechJobs();
  } else if (tab === 'claims') {
    c.innerHTML = `<div class="filter-bar"><h2 style="font-size:1rem;font-weight:800;margin:0"><i class="fas fa-handshake" style="color:var(--success)"></i> My Claimed Jobs</h2></div><div id="tech-claims" class="jobs-grid"><div class="empty-state" style="grid-column:1/-1"><i class="fas fa-spinner fa-spin"></i><p>Loading...</p></div></div>`;
    loadTechClaims();
  } else if (tab === 'post') {
    showScreen('screen-post-job');
  } else {
    c.innerHTML = renderProfileCard();
  }
  updateMobileNavState('screen-dashboard');
}

async function loadTechJobs() {
  try {
    const scope = document.getElementById('tech-scope-filter')?.value || 'radius_36km';
    const techDistrict = currentUserData.district;
    const techCity = currentUserData.city;
    const techCoords = techLiveLocation || ((currentUserData.location?.lat && currentUserData.location?.lng)
      ? [currentUserData.location.lat, currentUserData.location.lng]
      : ((techCity && CITY_COORDS[techCity]) || (techDistrict && DISTRICT_COORDS[techDistrict])));

    // Check if technician currently has an active claimed job that is UNSCHEDULED
    let activeLockBannerHtml = '';
    techHasActiveUnscheduledJob = false;

    if (currentUser) {
      try {
        const activeClaimsSnap = await db.collection('jobs')
          .where('claimedBy', '==', currentUser.uid)
          .where('status', '==', 'claimed')
          .get();

        const unscheduledJobDoc = activeClaimsSnap.docs.find(d => {
          const data = d.data();
          return !data.isScheduled && !data.scheduledDate;
        });

        if (unscheduledJobDoc) {
          techHasActiveUnscheduledJob = true;
          const uj = unscheduledJobDoc.data();
          activeLockBannerHtml = `
            <div class="active-job-lock-banner" style="grid-column:1/-1">
              <div style="font-size:1.6rem;color:var(--warning);flex-shrink:0"><i class="fas fa-lock"></i></div>
              <div style="flex:1">
                <div style="font-weight:800;font-size:.92rem;color:#fbbf24;margin-bottom:2px">
                  ⚠️ ක්‍රියාකාරී Job එකක් භාරගෙන ඇත (Active Job Lock)
                </div>
                <div style="font-size:.82rem;color:var(--txt2);line-height:1.4">
                  ඔබ විසින් <strong>"${esc(uj.title)}"</strong> Job එක භාරගෙන ඇත. නව Job එකක් භාරගැනීමට පෙර මෙම Job එක <strong>Complete කරන්න</strong> හෝ Customer Visit එක <strong>Schedule කරන්න</strong>.
                </div>
              </div>
              <button type="button" class="btn btn-warning btn-sm" onclick="showTechTab('claims')" style="flex-shrink:0">
                <i class="fas fa-briefcase"></i> View Claimed
              </button>
            </div>
          `;
        }
      } catch (eActive) {
        console.warn('Error checking active claims:', eActive);
      }
    }

    // Fetch open jobs
    const snap = await db.collection('jobs')
      .where('status', '==', 'open')
      .get();

    let docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    // Filter by service type (multi-service support via techProvidesService)
    docs = docs.filter(j => techProvidesService(currentUserData, j.type));

    // Compute distance in KM for every job relative to the technician's location
    docs.forEach(j => {
      const jobLat = j.location?.lat || (j.city && CITY_COORDS[j.city]?.[0]) || (j.district && DISTRICT_COORDS[j.district]?.[0]);
      const jobLng = j.location?.lng || (j.city && CITY_COORDS[j.city]?.[1]) || (j.district && DISTRICT_COORDS[j.district]?.[1]);
      if (techCoords && jobLat && jobLng) {
        j._distanceKm = calcDistanceKm(techCoords[0], techCoords[1], jobLat, jobLng);
      } else {
        j._distanceKm = null;
      }
    });

    // Filter jobs strictly based on distance radius requirement
    docs = docs.filter(j => {
      if (scope === 'radius_36km') {
        if (j._distanceKm !== null && j._distanceKm !== undefined) return j._distanceKm <= 36;
        return j.district === techDistrict;
      }
      if (scope === 'radius_50km') {
        if (j._distanceKm !== null && j._distanceKm !== undefined) return j._distanceKm <= 50;
        return j.district === techDistrict;
      }
      if (scope === 'my_district') return j.district === techDistrict;
      if (scope === 'all_jobs') return true;
      if (j._distanceKm !== null && j._distanceKm !== undefined) return j._distanceKm <= 36;
      return j.district === techDistrict;
    });

    // Sort: Nearest first, then latest date
    docs.sort((a, b) => {
      if (a._distanceKm != null && b._distanceKm != null && a._distanceKm !== b._distanceKm) {
        return a._distanceKm - b._distanceKm;
      }
      if (a._distanceKm != null && b._distanceKm == null) return -1;
      if (a._distanceKm == null && b._distanceKm != null) return 1;
      return (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0);
    });

    // Render Leaflet Map with Custom Pins
    window._jobsMap = window._jobsMap || {};
    docs.forEach(j => { window._jobsMap[j.id] = j; });
    renderTechJobsMap(docs, techCoords);

    const el = document.getElementById('tech-avail');
    if (!el) return;
    if (!docs.length) {
      const scopeDesc = scope === 'radius_36km'
        ? 'ඔබ සිටින ස්ථානයේ සිට 36 km ඇතුළත'
        : (scope === 'radius_50km' ? 'ඔබ සිටින ස්ථානයේ සිට 50 km ඇතුළත' : 'ඔබේ ප්‍රදේශයේ');
      el.innerHTML = `
        ${activeLockBannerHtml}
        <div class="empty-state" style="grid-column:1/-1;padding:36px 20px">
          <i class="fas fa-radar" style="font-size:2.4rem;color:var(--primary-l);margin-bottom:12px"></i>
          <h3 style="font-size:1.05rem;font-weight:700;margin-bottom:6px">දැනට ${scopeDesc} open jobs නැත</h3>
          <p style="font-size:.84rem;color:var(--txt2);max-width:420px;margin:0 auto 16px">ඔබ සිටින ස්ථානයෙන් දුර වැඩි jobs මෙහි නොපෙන්වයි. අලුත් Job එකක් 36 km ඇතුළත post වූ වහාම ඔබට Email alert එකක් ලැබෙනු ඇත.</p>
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
            <button class="btn btn-outline btn-sm" onclick="document.getElementById('tech-scope-filter').value='radius_50km';loadTechJobs()">
              <i class="fas fa-expand-arrows-alt"></i> 50 km දක්වා බලන්න
            </button>
            <button class="btn btn-ghost btn-sm" onclick="document.getElementById('tech-scope-filter').value='all_jobs';loadTechJobs()">
              <i class="fas fa-globe"></i> සියලුම ප්‍රදේශ
            </button>
          </div>
        </div>`;
      return;
    }
    el.innerHTML = activeLockBannerHtml + docs.map(j => jobCard(j.id, j, 'tech')).join('');
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
  } catch (err) {
    console.error('loadTechClaims error:', err);
    const el = document.getElementById('tech-claims');
    if (el) el.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-exclamation-triangle" style="color:var(--danger)"></i><p>Jobs load කිරීමේදී දෝෂයක් ඇති විය. <a href="#" onclick="loadTechClaims()" style="color:var(--primary-l)">නැවත උත්සාහ කරන්න (Retry)</a></p></div>`;
  }
}

// ── JOB CARD ──────────────────────────────────────────────────
function jobCard(id, job, view) {
  const tFn = (typeof t === 'function') ? t : (k, fb) => fb;
  const ago = timeAgo(job.createdAt?.toDate?.());
  const myJob = job.claimedBy === currentUser?.uid;
  const showPhone = view === 'customer' || view === 'tech-claimed' || myJob || view === 'admin';

  let locationBadge = '';
  if (view === 'tech' && currentUserData?.role === 'technician') {
    const isHome = job.district === currentUserData.district;
    if (job._distanceKm != null) {
      const isWithin36 = job._distanceKm <= 36;
      locationBadge = `<span class="badge" style="background:${isWithin36 ? 'rgba(16,185,129,0.18)' : 'rgba(59,130,246,0.15)'};color:${isWithin36 ? '#34d399' : '#60a5fa'};font-size:.74rem;padding:3px 9px;border-radius:6px;font-weight:700"><i class="fas ${isWithin36 ? 'fa-bullseye' : 'fa-car-side'}"></i> ~${job._distanceKm} km දුර ${isWithin36 ? '(36km ඇතුළත)' : ''}</span>`;
    } else if (isHome) {
      locationBadge = `<span class="badge" style="background:rgba(16,185,129,0.15);color:#34d399;font-size:.72rem;padding:2px 8px;border-radius:6px"><i class="fas fa-map-pin"></i> ඔබේ දිස්ත්‍රික්කය</span>`;
    } else {
      locationBadge = `<span class="badge" style="background:rgba(59,130,246,0.15);color:#60a5fa;font-size:.72rem;padding:2px 8px;border-radius:6px"><i class="fas fa-car-side"></i> ළඟම ප්‍රදේශය</span>`;
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
    const techRatingHtml = renderStarRating(job.claimedByRating, job.claimedByRatingCount);

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
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:4px">
          <div class="assigned-tech-lbl"><i class="fas fa-user-check"></i> භාරගත් Technician</div>
          ${techRatingHtml}
        </div>
        <div class="assigned-tech-name">${esc(techName)}</div>
        <div class="assigned-tech-actions">
          ${techPhone ? `
          <a href="tel:${esc(techPhone)}" class="btn btn-success btn-sm" onclick="event.stopPropagation()"><i class="fas fa-phone"></i> Call</a>
          <a href="https://wa.me/94${cleanTechPhone}" target="_blank" class="btn btn-whatsapp btn-sm" onclick="event.stopPropagation()"><i class="fab fa-whatsapp"></i> WhatsApp</a>` : ''}
          ${job.claimedBy ? `<button type="button" class="btn btn-outline btn-sm" onclick="event.stopPropagation();openTechDigitalId('${job.claimedBy}')" style="font-size:0.74rem;padding:3px 8px;border:1px solid rgba(255,255,255,0.2)" title="Technician Verified Digital ID"><i class="fas fa-id-card"></i> ${tFn('btn_view_id', 'Digital ID')}</button>` : ''}
        </div>
      </div>
    </div>`;
  }

  // Work completion & rating prompts for Customer
  let customerCompletionExtraHtml = '';
  if (view === 'customer' && job.status === 'completed') {
    if (!job.rating) {
      customerCompletionExtraHtml = `
        <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.3);border-radius:var(--r-m);padding:10px 12px;margin:8px 0;display:flex;align-items:center;justify-content:space-between;gap:8px">
          <div style="font-size:.78rem;font-weight:700;color:var(--accent)"><i class="fas fa-star"></i> Technician සඳහා Feedback දෙන්න</div>
          <button class="btn btn-rate-tech btn-sm" onclick="event.stopPropagation();openFeedbackModal('${id}')"><i class="fas fa-star"></i> Rate Now</button>
        </div>`;
    } else {
      customerCompletionExtraHtml = `
        <div class="customer-review-card" style="margin:8px 0;padding:8px 12px">
          <div style="font-size:.78rem;font-weight:800;color:#fbbf24;display:flex;align-items:center;gap:6px">
            <span>${'⭐'.repeat(job.rating)} (${job.rating}/5)</span>
            <span style="font-size:.7rem;color:var(--txt3);font-weight:500">ඔබගේ Feedback</span>
          </div>
          ${job.feedback ? `<div style="font-size:.8rem;color:var(--txt2);margin-top:3px;font-style:italic">"${esc(job.feedback)}"</div>` : ''}
        </div>`;
    }
  }

  // Scheduled or Preferred Visit Card display
  let scheduleVisitCardHtml = '';
  if (job.scheduledDate) {
    scheduleVisitCardHtml = `
      <div class="scheduled-visit-card">
        <div class="sched-title">
          <span><i class="fas fa-calendar-check"></i> ${tFn('scheduled_visit', 'Scheduled Visit')}</span>
          ${(view === 'tech-claimed' || myJob) ? `<span style="font-size:0.75rem;color:var(--primary-l);cursor:pointer;font-weight:700" onclick="event.stopPropagation();openScheduleModal('${id}')"><i class="fas fa-edit"></i> ${tFn('btn_reschedule', 'Edit')}</span>` : ''}
        </div>
        <div class="sched-time">
          <span>📅 ${esc(job.scheduledDate)}</span>
          ${job.scheduledTime ? `<span>⏰ ${esc(job.scheduledTime)}</span>` : ''}
        </div>
        ${job.scheduledNotes ? `<div class="sched-notes"><i class="fas fa-comment-dots"></i> ${esc(job.scheduledNotes)}</div>` : ''}
      </div>`;
  } else if (job.preferredDate) {
    scheduleVisitCardHtml = `
      <div class="preferred-visit-card">
        <div style="font-weight:700;color:var(--accent);display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:2px">
          <span><i class="fas fa-clock"></i> ${tFn('cust_preferred_time', 'Customer Preferred Time')}</span>
          ${(view === 'tech-claimed' || myJob) ? `<span style="font-size:0.75rem;color:var(--primary-l);cursor:pointer;font-weight:700" onclick="event.stopPropagation();openScheduleModal('${id}')"><i class="fas fa-calendar-plus"></i> ${tFn('btn_schedule', 'Schedule')}</span>` : ''}
        </div>
        <div>📅 ${esc(job.preferredDate)} ${job.preferredTime ? `⏰ ${esc(job.preferredTime)}` : ''}</div>
        ${job.preferredNotes ? `<div style="font-size:0.75rem;color:var(--txt3);margin-top:2px"><i class="fas fa-sticky-note"></i> ${esc(job.preferredNotes)}</div>` : ''}
      </div>`;
  }

  let actions = '';
  if (view === 'tech' && job.status === 'open') {
    const hasJobCoords = !!getJobCoordinates(job);
    const mapBtn = hasJobCoords
      ? `<button class="btn btn-maps btn-sm" onclick="event.stopPropagation();focusJobOnTechMap('${id}')"><i class="fas fa-map-marker-alt"></i> ${tFn('btn_view_map', 'සිතියම')}</button>`
      : '';
    if (techHasActiveUnscheduledJob) {
      actions = `<button class="btn btn-primary btn-sm" disabled style="opacity:.6;cursor:not-allowed" title="කලින් භාරගත් Job එක සම්පූර්ණ කරන්න හෝ Schedule කරන්න"><i class="fas fa-lock"></i> ${tFn('btn_accept_job', 'Accept Job')}</button>${mapBtn}`;
    } else {
      actions = `<button class="btn btn-primary btn-sm" onclick="claimJob('${id}',event)"><i class="fas fa-handshake"></i> ${tFn('btn_accept_job', 'Accept Job')}</button>${mapBtn}`;
    }
  } else if (view === 'tech-claimed' || (myJob && view !== 'customer')) {
    const hasJobCoords = !!getJobCoordinates(job);
    const mapBtn = hasJobCoords ? `<button class="btn btn-maps btn-sm" onclick="event.stopPropagation();openJobModal('${id}')"><i class="fas fa-map-marker-alt"></i> ${tFn('btn_view_map', 'Map')}</button>` : '';
    if (job.status === 'completed') {
      const invBtn = job.invoice
        ? `<button class="btn btn-invoice btn-sm" onclick="event.stopPropagation();viewDigitalInvoice('${id}')"><i class="fas fa-file-invoice"></i> ${tFn('btn_view_invoice', 'Bill')}</button>`
        : `<button class="btn btn-invoice btn-sm" onclick="event.stopPropagation();openDigitalInvoiceModal('${id}')"><i class="fas fa-file-invoice-dollar"></i> ${tFn('btn_make_invoice', 'Bill හදන්න')}</button>`;
      actions = `${invBtn}<button class="btn btn-ghost btn-sm" onclick="openJobModal('${id}')"><i class="fas fa-eye"></i> View</button>${mapBtn}`;
    } else {
      const schedBtn = `<button class="btn btn-primary btn-sm" onclick="event.stopPropagation();openScheduleModal('${id}')"><i class="fas fa-calendar-alt"></i> ${job.scheduledDate ? tFn('btn_reschedule', 'Reschedule') : tFn('btn_schedule', 'Schedule')}</button>`;
      actions = `${schedBtn}<button class="btn btn-success btn-sm" onclick="openCompleteJobModal('${id}')"><i class="fas fa-camera"></i> ${tFn('btn_complete_job', 'Complete Job')}</button>${mapBtn}`;
    }
  } else if (view === 'customer') {
    const mapBtn = job.location?.lat ? `<button class="btn btn-maps btn-sm" onclick="openJobModal('${id}')"><i class="fas fa-map-marker-alt"></i> ${tFn('btn_view_map', 'View Map')}</button>` : '';
    const rateBtn = (job.status === 'completed' && !job.rating)
      ? `<button class="btn btn-rate-tech btn-sm" onclick="openFeedbackModal('${id}')"><i class="fas fa-star"></i> ${tFn('btn_rate_tech', 'Rate')}</button>`
      : '';
    const invBtn = (job.status === 'completed' && job.invoice)
      ? `<button class="btn btn-invoice btn-sm" onclick="event.stopPropagation();viewDigitalInvoice('${id}')"><i class="fas fa-file-invoice"></i> ${tFn('btn_view_invoice', 'Bill')}</button>`
      : '';
    actions = `<button class="btn btn-ghost btn-sm" onclick="openJobModal('${id}')"><i class="fas fa-eye"></i> View</button>${invBtn}${rateBtn}${mapBtn}`;
  } else if (view === 'admin') {
    const mapBtn = job.location?.lat ? `<button class="btn btn-maps btn-sm" onclick="openJobModal('${id}')"><i class="fas fa-map-marker-alt"></i> Map</button>` : '';
    const invBtn = job.invoice
      ? `<button class="btn btn-invoice btn-sm" onclick="event.stopPropagation();viewDigitalInvoice('${id}')"><i class="fas fa-file-invoice"></i> Bill</button>`
      : '';
    actions = `<button class="btn btn-ghost btn-sm" onclick="openJobModal('${id}')"><i class="fas fa-eye"></i> View</button>
               ${invBtn}
               <button class="btn btn-warning btn-sm" onclick="openEditJobModal('${id}')"><i class="fas fa-edit"></i> Edit</button>
               <button class="btn btn-danger btn-sm" onclick="deleteJob('${id}')"><i class="fas fa-trash"></i></button>
               ${mapBtn}`;
  }

  const jobTypeIcon = job.type === 'CCTV' ? 'video' : (job.type === 'Router' ? 'wifi' : 'satellite-dish');

  return `
  <div class="job-card type-${esc(job.type)}" id="jc-${id}">
    <div class="jc-header">
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
        <span class="type-badge ${esc(job.type)}"><i class="fas fa-${jobTypeIcon}"></i> ${esc(job.type)}</span>
        ${job.isUrgent ? `<span class="badge-urgent"><i class="fas fa-bolt"></i> ${tFn('badge_urgent', 'URGENT')}</span>` : ''}
        ${locationBadge}
      </div>
      <span class="status-badge s-${esc(job.status)}">${statusLabel(job.status)}</span>
    </div>
    <div class="jc-title">${esc(job.title)}</div>
    <div class="jc-desc">${esc(job.description)}</div>
    ${typeof renderJobStepTracker === 'function' ? renderJobStepTracker(job) : ''}
    <div class="jc-meta">
      <span class="meta-item"><i class="fas fa-map-marker-alt"></i>${esc(job.city ? `${job.district}, ${job.city}` : job.district)}</span>
      ${job._distanceKm && (!currentUserData || job.district !== currentUserData.district) ? `<span class="meta-item" style="color:var(--primary-l)"><i class="fas fa-route"></i>~${job._distanceKm} km දුර</span>` : ''}
      <span class="meta-item"><i class="fas fa-user"></i>${esc(job.customerName || 'Customer')}</span>
      <span class="meta-item"><i class="fas fa-clock"></i>${ago}</span>
      ${job.claimedByName ? `<span class="meta-item"><i class="fas fa-tools"></i>${esc(job.claimedByName)}</span>` : ''}
      ${job.scheduledDate ? `<span class="meta-item" style="color:var(--primary-l);font-weight:700"><i class="fas fa-calendar-check"></i> ${esc(job.scheduledDate)} ${job.scheduledTime ? esc(job.scheduledTime) : ''}</span>` : ''}
      ${job.completionPhoto ? `<span class="meta-item" style="color:#34d399;font-weight:700"><i class="fas fa-camera"></i> Proof Verified</span>` : ''}
      ${job.invoice ? `<span class="meta-item" style="color:#38bdf8;font-weight:700"><i class="fas fa-file-invoice"></i> Bill Rs. ${(job.invoice.totalAmount || 0).toLocaleString()}</span>` : ''}
    </div>
    ${view === 'customer' && assignedTechCardHtml ? assignedTechCardHtml : phoneHtml}
    ${scheduleVisitCardHtml}
    ${customerCompletionExtraHtml}
    <div class="jc-actions">${actions}</div>
  </div>`;
}

function statusLabel(s) {
  const tFn = (typeof t === 'function') ? t : (k, fb) => fb;
  const labels = {
    open: '🟢 ' + tFn('status_open', 'Open'),
    claimed: '🟡 ' + tFn('status_claimed', 'In Progress'),
    completed: '✅ ' + tFn('status_completed', 'Completed'),
    cancelled: '🔴 ' + tFn('status_cancelled', 'Cancelled')
  };
  return labels[s] || s;
}

// ── LANGUAGE CHANGE LISTENER ──────────────────────────────────
function onLanguageChanged(lang) {
  const adminScreen = document.getElementById('screen-admin');
  const isAdminActive = (adminScreen && adminScreen.classList.contains('active')) || (currentUserData && currentUserData.role === 'admin');

  if (isAdminActive) {
    const isMain = (currentUser?.email === MAIN_ADMIN_EMAIL) || !!currentUserData?.isMainAdmin;
    const pill = document.querySelector('.admin-pill');
    if (pill) {
      const lbl = isMain 
        ? (typeof t === 'function' ? t('adm_pill_main', 'Main Admin') : 'Main Admin')
        : (typeof t === 'function' ? t('adm_pill_sub', 'Admin') : 'Admin');
      const ico = isMain 
        ? '<i class="fas fa-crown" style="color:#fbbf24"></i>'
        : '<i class="fas fa-shield-alt"></i>';
      pill.innerHTML = `${ico} <span class="adm-pill-txt">${lbl}</span>`;
    }
    const activeBtn = document.querySelector('.admin-tabs .tab-btn.active');
    const curTab = activeBtn ? activeBtn.dataset.tab : 'overview';
    loadAdminStats();
    if (curTab === 'pending') {
      loadPendingTechs();
    } else if (curTab === 'jobs') {
      if (typeof allAdminJobs !== 'undefined' && allAdminJobs.length) renderAdminJobs(allAdminJobs);
      else loadAllJobsAdmin();
    } else if (curTab === 'technicians') {
      if (typeof allTechs !== 'undefined' && allTechs.length) renderTechs(allTechs);
      else loadAllTechs();
    } else if (curTab === 'customers') {
      if (typeof allAdminCustomers !== 'undefined' && allAdminCustomers.length) renderAdminCustomers(allAdminCustomers);
      else loadAllCustomersAdmin();
    } else if (curTab === 'admins') {
      loadAllAdmins();
    }
    showAdminTab(curTab);
    updateMobileNavState('screen-admin');
    return;
  }

  updateMobileNavState();
  if (!currentUserData) return;
  if (currentUserData.role === 'technician') {
    const activeBtn = document.querySelector('#dash-tabs .tab-btn.active');
    const curTab = activeBtn ? activeBtn.dataset.tab : 'avail';
    initTechDashboard();
    showTechTab(curTab);
  } else if (currentUserData.role === 'customer') {
    const activeBtn = document.querySelector('#dash-tabs .tab-btn.active');
    const curTab = activeBtn ? activeBtn.dataset.tab : 'jobs';
    initCustomerDashboard();
    showCustTab(curTab);
  }
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

  if (!isDeviceOnline()) {
    showToast('⚠️ ඔබ Offline සිටී. Job එකක් භාර ගැනීමට Internet සම්බන්ධ කරන්න.', 'warning');
    updateOnlineStatusUI();
    return;
  }

  // Strict guard: Enforce live selfie for technicians who have not yet added one
  if (currentUserData.role === 'technician' && !currentUserData.photoUrl) {
    showToast('Jobs භාරගැනීමට පෙර කරුණාකර Live Selfie එක ලබා දෙන්න', 'warning');
    promptMandatoryTechSelfie();
    return;
  }

  // Active Job Lock Rule: Must complete or schedule current active job before taking another
  try {
    const activeClaimsSnap = await db.collection('jobs')
      .where('claimedBy', '==', currentUser.uid)
      .where('status', '==', 'claimed')
      .get();
    const unscheduledJobDoc = activeClaimsSnap.docs.find(d => {
      const data = d.data();
      return !data.isScheduled && !data.scheduledDate;
    });
    if (unscheduledJobDoc) {
      const uj = unscheduledJobDoc.data();
      showToast(`ඔබ විසින් දැනට භාරගත් "${uj.title || 'Job'}" එක අවසන් කර නැත! වෙනත් Job එකක් භාරගැනීමට පෙර එය Schedule කරන්න හෝ Complete කරන්න.`, 'warning', 6000);
      openScheduleModal(unscheduledJobDoc.id, uj);
      return;
    }
  } catch (lockErr) {
    console.warn('Error verifying active job lock in claimJob:', lockErr);
  }

  try {
    const ref = db.collection('jobs').doc(jobId);
    const doc = await ref.get();
    if (!doc.exists || doc.data().status !== 'open') {
      showToast('Job no longer available', 'error'); return;
    }
    const jobData = doc.data();

    const techRating = Number(currentUserData.avgRating || 0);
    const techRatingCount = Number(currentUserData.ratingCount || 0);

    await ref.update({
      status: 'claimed',
      claimedBy: currentUser.uid,
      claimedByName: currentUserData.name,
      claimedByPhone: currentUserData.phone || '',
      claimedByPhoto: currentUserData.photoUrl || '',
      claimedByRating: techRating,
      claimedByRatingCount: techRatingCount,
      claimedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    showToast('Job Accept! 🎉 Phone number reveal වෙලා!', 'success');
    if (document.getElementById('tech-avail')) loadTechJobs();
    if (typeof loadTechClaims === 'function') loadTechClaims();

    notifyJobClaimed(jobData, currentUserData);

    // Open schedule modal immediately so technician can set the visit date & time
    openScheduleModal(jobId, jobData);
  } catch (err) {
    console.error(err);
    showToast('Failed to accept job. Try again.', 'error');
  }
}

async function markComplete(jobId) {
  // Enforce live camera work proof modal (gallery upload disabled)
  openCompleteJobModal(jobId);
}

// ── VISIT SCHEDULING SYSTEM ──────────────────────────────────
let currentSchedulingJobId = null;

async function openScheduleModal(jobId, preloadedData) {
  currentSchedulingJobId = jobId;
  const idEl = document.getElementById('schedule-job-id');
  if (idEl) idEl.value = jobId;

  let job = preloadedData;
  if (!job) {
    try {
      const snap = await db.collection('jobs').doc(jobId).get();
      if (snap.exists) job = snap.data();
    } catch (err) {
      console.error('Error fetching job for schedule:', err);
    }
  }

  const dateInput = document.getElementById('schedule-date');
  const timeInput = document.getElementById('schedule-time');
  const notesInput = document.getElementById('schedule-notes');
  const prefBox = document.getElementById('schedule-cust-pref-box');
  const prefText = document.getElementById('schedule-cust-pref-text');

  if (job) {
    if (job.preferredDate || job.preferredTime || job.preferredNotes) {
      const parts = [];
      if (job.preferredDate) parts.push(`📅 ${job.preferredDate}`);
      if (job.preferredTime) parts.push(`⏰ ${job.preferredTime}`);
      if (job.preferredNotes) parts.push(`"${job.preferredNotes}"`);
      if (prefText) prefText.textContent = parts.join(' • ');
      if (prefBox) prefBox.classList.remove('hidden');
    } else {
      if (prefBox) prefBox.classList.add('hidden');
    }

    if (dateInput) {
      dateInput.value = job.scheduledDate || job.preferredDate || new Date().toISOString().split('T')[0];
    }
    if (timeInput) {
      timeInput.value = job.scheduledTime || job.preferredTime || '10:00';
    }
    if (notesInput) {
      notesInput.value = job.scheduledNotes || job.preferredNotes || '';
    }
  }

  openModal('modal-schedule-visit');
}

async function saveScheduleVisit(e) {
  if (e) e.preventDefault();
  const jobId = document.getElementById('schedule-job-id')?.value || currentSchedulingJobId;
  const scheduledDate = document.getElementById('schedule-date')?.value;
  const scheduledTime = document.getElementById('schedule-time')?.value;
  const scheduledNotes = document.getElementById('schedule-notes')?.value.trim() || '';

  if (!jobId) { showToast('Invalid Job ID', 'error'); return; }
  if (!scheduledDate || !scheduledTime) {
    showToast('කරුණාකර දිනය සහ වේලාව තෝරන්න (Select Date & Time)', 'warning');
    return;
  }

  const btn = document.getElementById('btn-save-schedule');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scheduling...';
  }

  try {
    const jobRef = db.collection('jobs').doc(jobId);
    const snap = await jobRef.get();
    const jobData = snap.exists ? snap.data() : {};

    await jobRef.update({
      scheduledDate,
      scheduledTime,
      scheduledNotes,
      scheduledAt: firebase.firestore.FieldValue.serverTimestamp(),
      isScheduled: true
    });

    showToast(`Visit Scheduled for ${scheduledDate} at ${scheduledTime}! 📅`, 'success');
    closeModal('modal-schedule-visit');

    // Send email notification to customer
    notifyJobScheduled(jobData, currentUserData, scheduledDate, scheduledTime, scheduledNotes);

    // Refresh job lists
    if (typeof loadTechClaims === 'function') loadTechClaims();
    if (typeof loadCustomerJobs === 'function') loadCustomerJobs();
    if (typeof loadAdminJobs === 'function') loadAdminJobs();

    // If job modal was open, refresh it
    const modalJob = document.getElementById('modal-job');
    if (modalJob && !modalJob.classList.contains('hidden')) {
      openJobModal(jobId);
    }
  } catch (err) {
    console.error('Error saving schedule:', err);
    showToast('Failed to schedule visit. Try again.', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      const tFn = (typeof t === 'function') ? t : (k, fb) => fb;
      btn.innerHTML = `<i class="fas fa-calendar-check"></i> <span data-i18n="btn_confirm_schedule">${tFn('btn_confirm_schedule', 'Schedule Visit')}</span>`;
    }
  }
}

// ── JOB MODAL ─────────────────────────────────────────────────
async function openJobModal(jobId) {
  try {
    const tFn = (typeof t === 'function') ? t : (k, fb) => fb;

    // Check memory caches first for 0ms instantaneous display
    let job = (window._jobsMap && window._jobsMap[jobId]) ||
              (typeof allAdminJobs !== 'undefined' && allAdminJobs && allAdminJobs.find(x => x.id === jobId)) ||
              (typeof allJobs !== 'undefined' && allJobs && allJobs.find(x => x.id === jobId)) || null;

    if (!job) {
      // Show loading modal immediately so the user gets instant visual confirmation
      document.getElementById('modal-job-body').innerHTML = `
        <div style="text-align:center;padding:48px 20px">
          <i class="fas fa-spinner fa-spin fa-2x" style="color:var(--primary-l)"></i>
          <p style="margin-top:12px;color:var(--txt2);font-weight:600">Job details loading...</p>
        </div>`;
      openModal('modal-job');

      let doc = null;
      try {
        doc = await db.collection('jobs').doc(jobId).get();
      } catch (netErr) {
        try {
          doc = await db.collection('jobs').doc(jobId).get({ source: 'cache' });
        } catch (cErr) {}
      }

      if (!doc || !doc.exists) {
        showToast('Job details not found', 'error');
        closeModal('modal-job');
        return;
      }
      job = { id: doc.id, ...doc.data() };
      window._jobsMap = window._jobsMap || {};
      window._jobsMap[jobId] = job;
    } else {
      window._jobsMap = window._jobsMap || {};
      window._jobsMap[jobId] = job;
      openModal('modal-job');
    }

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
    const rawLat = job.location?.lat;
    const rawLng = job.location?.lng;
    const parsedLat = (rawLat !== undefined && rawLat !== null) ? parseFloat(rawLat) : NaN;
    const parsedLng = (rawLng !== undefined && rawLng !== null) ? parseFloat(rawLng) : NaN;
    const hasValidCoords = !isNaN(parsedLat) && !isNaN(parsedLng);

    if (hasValidCoords) {
      const gmapUrl = `https://www.google.com/maps?q=${parsedLat},${parsedLng}`;
      const navUrl  = `https://www.google.com/maps/dir/?api=1&destination=${parsedLat},${parsedLng}`;
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
      let techRating = job.claimedByRating || 0;
      let techRatingCount = job.claimedByRatingCount || 0;

      if (job.claimedBy) {
        try {
          const uDoc = await db.collection('users').doc(job.claimedBy).get();
          if (uDoc.exists) {
            const uData = uDoc.data();
            if (!techPhoto && uData.photoUrl) techPhoto = uData.photoUrl;
            if (!techRating && uData.avgRating) techRating = uData.avgRating;
            if (!techRatingCount && uData.ratingCount) techRatingCount = uData.ratingCount;
          }
        } catch (e) {}
      }

      const techName = job.claimedByName || 'Technician';
      const techPhone = job.claimedByPhone || '';
      const cleanTechPhone = cleanPhone(techPhone);
      const starBadge = renderStarRating(techRating, techRatingCount);

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
            <div style="font-size:1.15rem;font-weight:800;color:var(--txt);margin-top:2px;display:flex;align-items:center;justify-content:center;gap:8px">
              <span>${esc(techName)}</span>
              ${starBadge}
            </div>
            ${techPhone ? `<div style="font-size:.92rem;font-weight:700;color:var(--success);font-family:monospace;margin-top:4px"><i class="fas fa-phone"></i> ${esc(techPhone)}</div>` : ''}
          </div>
          ${techPhone ? `
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;width:100%">
            <a href="tel:${esc(techPhone)}" class="btn btn-success btn-sm"><i class="fas fa-phone"></i> Call Technician</a>
            <a href="https://wa.me/94${cleanTechPhone}" target="_blank" class="btn btn-whatsapp btn-sm"><i class="fab fa-whatsapp"></i> WhatsApp Chat</a>
          </div>` : ''}
          ${job.claimedBy ? `<div style="display:flex;justify-content:center;width:100%;margin-top:4px"><button type="button" class="btn btn-outline btn-sm" onclick="openTechDigitalId('${job.claimedBy}')" style="border:1px solid rgba(255,255,255,0.2)"><i class="fas fa-id-card"></i> ${tFn('btn_view_id', 'Technician Official Digital ID බලන්න')}</button></div>` : ''}
          <div style="font-size:.78rem;color:var(--txt2);background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:8px;padding:8px 12px;width:100%">
            <i class="fas fa-info-circle" style="color:var(--primary-l)"></i> මෙම Technician ඔබගේ Job එක භාරගෙන ඇති අතර ඉතා ඉක්මනින් ඔබව සම්බන්ධ කරගනු ඇත.
          </div>
        </div>`;
    }

    // Work completion photo display in modal
    let completionProofModalHtml = '';
    if (job.completionPhoto) {
      completionProofModalHtml = `
        <div class="completion-proof-card">
          <div class="completion-proof-header"><i class="fas fa-camera"></i> Work Completion Proof (වැඩ අවසන් කළ ඡායාරූපය)</div>
          <img src="${job.completionPhoto}" class="completion-proof-img" onclick="previewPhoto('${job.completionPhoto}', 'Work Completion Proof - ${esc(job.title)}')" title="Click to view full photo" />
          ${job.completionNotes ? `<div class="completion-notes-text"><i class="fas fa-quote-left" style="color:var(--success);margin-right:6px"></i>${esc(job.completionNotes)}</div>` : ''}
        </div>`;
    }

    // Customer review or rating prompt
    let customerFeedbackModalHtml = '';
    if (job.status === 'completed') {
      if (job.rating) {
        customerFeedbackModalHtml = `
          <div class="customer-review-card">
            <div class="customer-review-header">
              <span style="color:#fbbf24;font-weight:800;font-size:.95rem">${'⭐'.repeat(job.rating)} (${job.rating}/5.0)</span>
              <span style="font-size:.74rem;color:var(--txt3)">Customer Feedback</span>
            </div>
            ${job.feedback ? `<div class="customer-review-comment">"${esc(job.feedback)}"</div>` : '<div style="color:var(--txt3);font-size:.8rem;font-style:italic">No written comment provided.</div>'}
          </div>`;
      } else if (isOwner || currentUserData?.role === 'customer') {
        customerFeedbackModalHtml = `
          <div style="background:linear-gradient(135deg,rgba(245,158,11,0.1) 0%,rgba(245,158,11,0.03) 100%);border:1.5px solid rgba(245,158,11,0.35);border-radius:var(--r-l);padding:14px;text-align:center;margin:10px 0">
            <h4 style="margin-bottom:6px;color:#fbbf24"><i class="fas fa-star"></i> Technician සඳහා Feedback ලබා දෙන්න</h4>
            <p style="font-size:.8rem;color:var(--txt2);margin-bottom:12px">ඔබගේ අත්දැකීම අනුව Technician ට තරු 1-5 අතර Rating එකක් ලබා දෙන්න.</p>
            <button class="btn btn-rate-tech btn-full" onclick="closeModal('modal-job');openFeedbackModal('${jobId}')">
              <i class="fas fa-star"></i> Feedback & Rating ලබා දෙන්න
            </button>
          </div>`;
      }
    }

    // Scheduled Visit info in modal
    let scheduledVisitModalHtml = '';
    if (job.scheduledDate) {
      scheduledVisitModalHtml = `
        <div class="scheduled-visit-card" style="margin:12px 0">
          <div class="sched-title">
            <span><i class="fas fa-calendar-check"></i> ${tFn('scheduled_visit', 'Scheduled Visit')}</span>
            ${(isMine && job.status === 'claimed') ? `<button class="btn btn-primary btn-sm" style="padding:2px 8px;font-size:0.75rem" onclick="closeModal('modal-job');openScheduleModal('${jobId}')"><i class="fas fa-edit"></i> ${tFn('btn_reschedule', 'Reschedule')}</button>` : ''}
          </div>
          <div class="sched-time">
            <span>📅 ${esc(job.scheduledDate)}</span>
            ${job.scheduledTime ? `<span>⏰ ${esc(job.scheduledTime)}</span>` : ''}
          </div>
          ${job.scheduledNotes ? `<div class="sched-notes"><i class="fas fa-comment-dots"></i> ${esc(job.scheduledNotes)}</div>` : ''}
        </div>`;
    } else if (job.preferredDate) {
      scheduledVisitModalHtml = `
        <div class="preferred-visit-card" style="margin:12px 0">
          <div style="font-weight:700;color:var(--accent);display:flex;align-items:center;justify-content:space-between">
            <span><i class="fas fa-clock"></i> ${tFn('cust_preferred_time', 'Customer Preferred Time')}</span>
            ${(isMine && job.status === 'claimed') ? `<button class="btn btn-primary btn-sm" style="padding:2px 8px;font-size:0.75rem" onclick="closeModal('modal-job');openScheduleModal('${jobId}')"><i class="fas fa-calendar-plus"></i> ${tFn('btn_schedule', 'Schedule Now')}</button>` : ''}
          </div>
          <div style="font-size:0.95rem;font-weight:700;color:var(--txt);margin-top:4px">📅 ${esc(job.preferredDate)} ${job.preferredTime ? `⏰ ${esc(job.preferredTime)}` : ''}</div>
          ${job.preferredNotes ? `<div style="font-size:0.75rem;color:var(--txt3);margin-top:2px"><i class="fas fa-sticky-note"></i> ${esc(job.preferredNotes)}</div>` : ''}
        </div>`;
    } else if (isMine && job.status === 'claimed') {
      scheduledVisitModalHtml = `
        <div style="background:rgba(59,130,246,0.08);border:1px dashed rgba(59,130,246,0.4);border-radius:var(--r-m);padding:10px 14px;margin:12px 0;display:flex;align-items:center;justify-content:space-between;gap:8px">
          <div style="font-size:0.8rem;color:var(--primary-l);font-weight:600">
            <i class="fas fa-calendar-alt"></i> Visit එක සඳහා දිනය/වේලාව Schedule කරන්න
          </div>
          <button class="btn btn-primary btn-sm" onclick="closeModal('modal-job');openScheduleModal('${jobId}')">
            <i class="fas fa-calendar-plus"></i> ${tFn('btn_schedule', 'Schedule')}
          </button>
        </div>`;
    }

    let invoiceModalBannerHtml = '';
    if (job.status === 'completed') {
      if (job.invoice) {
        invoiceModalBannerHtml = `
          <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.3);border-radius:var(--r-m);padding:12px 14px;margin:12px 0;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap">
            <div>
              <div style="font-size:0.75rem;color:var(--txt3);font-weight:700">LankaVision Digital Invoice (#${esc(job.invoice.invoiceNumber || 'INV')})</div>
              <div style="font-size:1.1rem;font-weight:900;color:var(--success)">රු. ${(job.invoice.totalAmount || 0).toLocaleString()}</div>
            </div>
            <button type="button" class="btn btn-success btn-sm" onclick="closeModal('modal-job');viewDigitalInvoice('${jobId}')"><i class="fas fa-file-invoice"></i> ${tFn('btn_view_invoice', 'බිල (Invoice) බලන්න')}</button>
          </div>`;
      } else if (isMine || isAdmin) {
        invoiceModalBannerHtml = `
          <div style="background:rgba(14,165,233,0.08);border:1px dashed rgba(14,165,233,0.35);border-radius:var(--r-m);padding:12px 14px;margin:12px 0;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap">
            <div style="font-size:0.82rem;color:var(--txt2);font-weight:600">
              <i class="fas fa-file-invoice-dollar" style="color:var(--primary-l)"></i> පාරිභෝගිකයාට Official බිලක් (Digital Invoice) සාදා යවන්න.
            </div>
            <button type="button" class="btn btn-invoice btn-sm" onclick="closeModal('modal-job');openDigitalInvoiceModal('${jobId}')"><i class="fas fa-plus"></i> ${tFn('btn_make_invoice', 'Bill හදන්න')}</button>
          </div>`;
      }
    }

    document.getElementById('modal-job-body').innerHTML = `
      <h2 style="margin-bottom:8px;padding-right:28px">${esc(job.title)}</h2>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;align-items:center">
        <span class="type-badge ${esc(job.type)}"><i class="fas fa-${job.type === 'CCTV' ? 'video' : (job.type === 'Router' ? 'wifi' : 'satellite-dish')}"></i> ${esc(job.type)}</span>
        ${job.isUrgent ? `<span class="badge-urgent"><i class="fas fa-bolt"></i> ${tFn('badge_urgent', 'URGENT')}</span>` : ''}
        <span class="status-badge s-${esc(job.status)}">${statusLabel(job.status)}</span>
      </div>
      ${job.isUrgent ? `<div style="background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.3);color:#fca5a5;padding:8px 12px;border-radius:var(--r-m);font-weight:700;font-size:0.82rem;margin-bottom:14px;display:flex;align-items:center;gap:8px"><i class="fas fa-bolt" style="color:#ef4444"></i> ${tFn('urgent_job_notice', 'හදිසි අවශ්‍යතාවයක් (Express / Urgent Job - පැය 2-4ක් ඇතුළත පැමිණීම අපේක්ෂා කරයි)')}</div>` : ''}
      ${typeof renderJobStepTracker === 'function' ? renderJobStepTracker(job) : ''}
      ${mapHtml}
      ${techCardModalHtml}
      ${scheduledVisitModalHtml}
      ${completionProofModalHtml}
      ${customerFeedbackModalHtml}
      ${invoiceModalBannerHtml}
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
        ${(isMine && job.status === 'claimed') ? `<button class="btn btn-primary btn-full" onclick="closeModal('modal-job');openScheduleModal('${jobId}')" style="margin-top:4px"><i class="fas fa-calendar-alt"></i> ${job.scheduledDate ? tFn('btn_reschedule', 'Reschedule Visit') : tFn('btn_schedule', 'Schedule Visit')} (දිනය/වේලාව)</button>` : ''}
        ${(isMine && job.status === 'claimed') ? `<button class="btn btn-success btn-full" onclick="closeModal('modal-job');openCompleteJobModal('${jobId}')" style="margin-top:4px"><i class="fas fa-camera"></i> Complete Job (වැඩ අවසන් කර Photo එක ගන්න)</button>` : ''}
        ${(job.status === 'completed' && job.invoice) ? `<button class="btn btn-invoice btn-full" onclick="closeModal('modal-job');viewDigitalInvoice('${jobId}')" style="margin-top:4px"><i class="fas fa-file-invoice"></i> ${tFn('btn_view_invoice', 'Digital Invoice / Bill එක බලන්න')}</button>` : ''}
        ${(isMine && job.status === 'completed' && !job.invoice) ? `<button class="btn btn-invoice btn-full" onclick="closeModal('modal-job');openDigitalInvoiceModal('${jobId}')" style="margin-top:4px"><i class="fas fa-file-invoice-dollar"></i> ${tFn('btn_make_invoice', 'Digital Invoice / Bill එක හදන්න')}</button>` : ''}
        <button type="button" class="btn btn-ghost btn-full" onclick="closeModal('modal-job')" style="margin-top:8px;border:1px solid rgba(255,255,255,0.12)">
          <i class="fas fa-times"></i> <span data-i18n="btn_close">Close (වසන්න)</span>
        </button>
        <div style="height:36px"></div>
      </div>`;

    openModal('modal-job');

    if (hasValidCoords) {
      setTimeout(() => {
        try {
          if (modalMap) {
            try { modalMap.remove(); } catch (me) {}
            modalMap = null;
          }
          const container = document.getElementById('modal-map-el');
          if (!container) return;
          container._leaflet_id = null;

          modalMap = L.map('modal-map-el', {
            dragging: false,
            touchZoom: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            boxZoom: false,
            tap: false,
            keyboard: false
          }).setView([parsedLat, parsedLng], 15);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(modalMap);

          container.style.cursor = 'pointer';
          container.title = 'Click to open in Google Maps';
          container.onclick = () => window.open(`https://www.google.com/maps?q=${parsedLat},${parsedLng}`, '_blank');

          let markerClass = 'marker-cctv';
          let iconClass = 'fas fa-video';
          if (job.type === 'Satellite') {
            markerClass = 'marker-satellite';
            iconClass = 'fas fa-satellite-dish';
          } else if (job.type === 'Router') {
            markerClass = 'marker-router';
            iconClass = 'fas fa-wifi';
          }

          const pinHtml = `
            <div class="job-marker-pin ${markerClass}" title="${esc(job.title || '')} (${esc(job.type || '')})">
              <i class="${iconClass}"></i>
            </div>`;

          L.marker([parsedLat, parsedLng], {
            icon: L.divIcon({
              className: 'custom-job-marker',
              html: pinHtml,
              iconSize: [36, 36],
              iconAnchor: [18, 36],
              popupAnchor: [0, -36]
            })
          }).addTo(modalMap);
        } catch (mapErr) {
          console.warn('Modal map rendering warning:', mapErr);
        }
      }, 120);
    }
  } catch (err) {
    console.error('openJobModal error:', err);
    showToast('Failed to open job details: ' + (err.message || 'Error'), 'error');
  }
}

// ── MODAL MANAGEMENT (Universal Smooth Scrolling & Body Lock) ─
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  // Reset scroll to top
  const box = modal.querySelector('.modal-box');
  if (box) box.scrollTop = 0;
  modal.scrollTop = 0;
}

function closeModal(id) {
  if (id === 'all') {
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    if (modalMap) { modalMap.remove(); modalMap = null; }
    stopWorkCamera();
    stopMandatoryCamera();
    document.body.classList.remove('modal-open');
    return;
  }
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
  if (id === 'modal-job') {
    if (modalMap) { modalMap.remove(); modalMap = null; }
  }
  if (id === 'modal-complete-job') {
    stopWorkCamera();
  }
  if (id === 'modal-mandatory-selfie') {
    stopMandatoryCamera();
  }
  // Check if any other modal is still visible
  const anyOpen = Array.from(document.querySelectorAll('.modal')).some(m => !m.classList.contains('hidden'));
  if (!anyOpen) {
    document.body.classList.remove('modal-open');
  }
}

// Close modal on Escape key press (except mandatory selfie)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModals = Array.from(document.querySelectorAll('.modal:not(.hidden)'));
    if (openModals.length > 0) {
      const topModal = openModals[openModals.length - 1];
      if (topModal.id !== 'modal-mandatory-selfie') {
        closeModal(topModal.id);
      }
    }
  }
});

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
    openModal('modal-edit-job');
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

    const curServices = getTechServices(t);
    document.querySelectorAll('input[name="edit-tech-svc-opt"]').forEach(cb => {
      cb.checked = curServices.includes(cb.value);
    });

    document.getElementById('edit-tech-error').classList.add('hidden');
    openModal('modal-edit-tech');
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
  const checkedBoxes = Array.from(document.querySelectorAll('input[name="edit-tech-svc-opt"]:checked'));
  const services = checkedBoxes.map(cb => cb.value);
  const errEl = document.getElementById('edit-tech-error');
  errEl.classList.add('hidden');

  if (!services.length) {
    errEl.textContent = 'අවම වශයෙන් එක් Service එකක්වත් තෝරන්න (Select at least one service: CCTV, Satellite, Router).';
    errEl.classList.remove('hidden');
    return;
  }
  const serviceType = services.join(', ');
  const status = document.getElementById('edit-tech-status').value;

  try {
    await db.collection('users').doc(uid).update({
      name, phone, district, city, services, serviceType, status,
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
  
  document.querySelectorAll('input[name="job-type"]').forEach(r => {
    r.removeEventListener('change', _onJobTypeChangeHandler);
    r.addEventListener('change', _onJobTypeChangeHandler);
  });
}

function _onJobTypeChangeHandler(e) {
  if (e.target.checked && typeof renderQuickIssuesForType === 'function') {
    renderQuickIssuesForType(e.target.value);
  }
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
    const pinHtml = `
      <div class="job-marker-pin marker-pick" title="Selected Location">
        <i class="fas fa-map-marker-alt"></i>
      </div>`;
    marker = L.marker([lat, lng], {
      icon: L.divIcon({
        className: 'custom-job-marker',
        html: pinHtml,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
      })
    }).addTo(postJobMap);
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

  // Strict offline check before proceeding
  if (!isDeviceOnline()) {
    const offlineMsg = typeof t === 'function' ? t('offline_job_post_error', '⚠️ ඔබ Offline සිටී. Job එකක් Post කිරීමට කරුණාකර Internet සම්බන්ධ කරන්න.') : '⚠️ ඔබ Offline සිටී. Job එකක් Post කිරීමට කරුණාකර Internet සම්බන්ධ කරන්න.';
    errEl.textContent = offlineMsg;
    errEl.classList.remove('hidden');
    showToast('⚠️ Offline: කරුණාකර Data හෝ Wi-Fi සම්බන්ධ කරන්න!', 'warning');
    updateOnlineStatusUI();
    return;
  }

  if (!jobType)    { errEl.textContent = 'Service Type (CCTV / Satellite / Router) select කරන්න.'; errEl.classList.remove('hidden'); return; }
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

  const preferredDate = document.getElementById('job-pref-date')?.value || '';
  const preferredTime = document.getElementById('job-pref-time')?.value || '';
  const preferredNotes = document.getElementById('job-pref-notes')?.value.trim() || '';
  const isUrgent = !!document.getElementById('job-is-urgent')?.checked;

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
      customerId: (currentUser && currentUserData?.role === 'customer') ? currentUser.uid : (currentUser?.uid || null),
      postedBy, postedByName: posterName,
      status: 'open',
      claimedBy: null, claimedByName: null,
      isUrgent: isUrgent,
      preferredDate: preferredDate || null,
      preferredTime: preferredTime || null,
      preferredNotes: preferredNotes || null,
      scheduledDate: null,
      scheduledTime: null,
      scheduledNotes: null,
      isScheduled: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    // Timeout protection: If network fails mid-request, reject within 10 seconds rather than hanging indefinitely
    const addPromise = db.collection('jobs').add(newJobData);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Network timeout: කරුණාකර ඔබගේ Internet සම්බන්ධතාවය පරීක්ෂා කර නැවත උත්සාහ කරන්න.')), 10000)
    );
    const addedDocRef = await Promise.race([addPromise, timeoutPromise]);
    window._jobsMap = window._jobsMap || {};
    if (addedDocRef && addedDocRef.id) {
      window._jobsMap[addedDocRef.id] = { id: addedDocRef.id, ...newJobData };
    }

    showToast('Job post කළා! 🎉', 'success');
    notifyNewJobPosted(newJobData);
    e.target.reset();
    selectedLoc = null;
    if (document.getElementById('job-is-urgent')) document.getElementById('job-is-urgent').checked = false;
    renderQuickIssuesForType(null);
    document.querySelectorAll('#quick-problem-chips .q-chip').forEach(c => c.classList.remove('active'));
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

// ── 💡 QUICK PROBLEMS & HELP GUIDE & DIGITAL INVOICE & TECH ID ───
const QUICK_ISSUES_MAP = {
  CCTV: [
    { key: 'quick_cctv_1', default: '🔴 Cameras Offline / No Display' },
    { key: 'quick_cctv_2', default: '⚠️ Hard Disk Error / Beeping' },
    { key: 'quick_cctv_3', default: '📹 New CCTV Setup & Installation' },
    { key: 'quick_cctv_4', default: '📱 Configure Phone App Online' },
    { key: 'quick_cctv_5', default: '🔌 Broken Wiring / Power Issue' }
  ],
  Satellite: [
    { key: 'quick_sat_1', default: '📡 No Signal / Dish Error' },
    { key: 'quick_sat_2', default: '🎯 Dish Alignment / Tuning' },
    { key: 'quick_sat_3', default: '🛰️ New Satellite Dish Setup' },
    { key: 'quick_sat_4', default: '📺 Receiver Box or LNB Repair' }
  ],
  Router: [
    { key: 'quick_router_1', default: '📶 Poor Wi-Fi Range / Weak Signal' },
    { key: 'quick_router_2', default: '🐢 Internet Disconnections' },
    { key: 'quick_router_3', default: '⚙️ New Wi-Fi Router Setup' }
  ]
};

function renderQuickIssuesForType(serviceType) {
  const containerWrap = document.getElementById('quick-problem-container');
  const chipsEl = document.getElementById('quick-problem-chips');
  if (!chipsEl) return;

  if (!serviceType || !QUICK_ISSUES_MAP[serviceType]) {
    if (containerWrap) containerWrap.classList.add('hidden');
    chipsEl.innerHTML = '';
    return;
  }

  if (containerWrap) containerWrap.classList.remove('hidden');
  const list = QUICK_ISSUES_MAP[serviceType];
  const tFn = (typeof t === 'function') ? t : (k, fb) => fb;

  chipsEl.innerHTML = list.map(item => {
    const text = tFn(item.key, item.default);
    return `<button type="button" class="q-chip" onclick="selectQuickIssue(this, '${esc(text)}')">${esc(text)}</button>`;
  }).join('');
}

function selectQuickIssue(btn, text) {
  const titleInput = document.getElementById('job-title');
  const descInput = document.getElementById('job-desc');
  if (!titleInput) return;

  titleInput.value = text;
  document.querySelectorAll('#quick-problem-chips .q-chip').forEach(c => c.classList.remove('active'));
  btn?.classList.add('active');

  if (descInput && !descInput.value.trim()) {
    const tFn = (typeof t === 'function') ? t : (k, fb) => fb;
    descInput.value = text + ' - ' + tFn('quick_desc_placeholder', 'කරුණාකර හැකි ඉක්මනින් පැමිණ පරීක්ෂා කර සාදා දෙන්න.');
  }
}

function renderJobStepTracker(job) {
  const tFn = (typeof t === 'function') ? t : (k, fb) => fb;
  if (!job) return '';
  if (job.status === 'cancelled') {
    return `<div style="padding:6px 12px;border-radius:var(--r-m);background:rgba(239,68,68,0.1);color:#fca5a5;font-size:0.75rem;font-weight:700;margin:6px 0;display:inline-flex;align-items:center;gap:6px"><i class="fas fa-ban"></i> ${tFn('status_cancelled', 'Job Cancelled')}</div>`;
  }

  let activeStep = 1;
  if (job.status === 'open') {
    activeStep = 1;
  } else if (job.status === 'claimed') {
    activeStep = job.scheduledDate ? 3 : 2;
  } else if (job.status === 'completed') {
    activeStep = job.rating ? 5 : 4;
  }

  const steps = [
    { num: 1, icon: 'fa-paper-plane', label: tFn('step_posted', 'Job දැම්මා') },
    { num: 2, icon: 'fa-user-check',  label: tFn('step_claimed', 'භාරගත්තා') },
    { num: 3, icon: 'fa-calendar-alt',label: tFn('step_scheduled', 'දිනය තහවුරුයි') },
    { num: 4, icon: 'fa-tools',       label: tFn('step_completed', 'වැඩ නිමයි') },
    { num: 5, icon: 'fa-star',        label: tFn('step_rated', 'Rating') }
  ];

  const fillPct = Math.round(((activeStep - 1) / (steps.length - 1)) * 100);

  const stepsHtml = steps.map(s => {
    const isDone = s.num < activeStep;
    const isCurrent = s.num === activeStep;
    const cls = isDone ? 'jst-step done' : (isCurrent ? 'jst-step active' : 'jst-step');
    const icon = isDone ? 'fa-check' : s.icon;
    return `
      <div class="${cls}">
        <div class="jst-dot"><i class="fas ${icon}"></i></div>
        <div class="jst-lbl">${esc(s.label)}</div>
      </div>`;
  }).join('');

  return `
    <div class="job-step-tracker">
      <div class="jst-line"><div class="jst-line-fill" style="width:${fillPct}%"></div></div>
      ${stepsHtml}
    </div>`;
}

// Help Guide Modal
function openHelpGuide(defaultRole = 'customer') {
  switchHelpTab(defaultRole);
  openModal('modal-help-guide');
}

function switchHelpTab(role) {
  const custBtn = document.getElementById('tab-help-cust');
  const techBtn = document.getElementById('tab-help-tech');
  const custContent = document.getElementById('help-content-cust');
  const techContent = document.getElementById('help-content-tech');

  const isTech = (role === 'tech' || role === 'technician');
  if (isTech) {
    custBtn?.classList.remove('active');
    techBtn?.classList.add('active');
    custContent?.classList.add('hidden');
    techContent?.classList.remove('hidden');
  } else {
    techBtn?.classList.remove('active');
    custBtn?.classList.add('active');
    techContent?.classList.add('hidden');
    custContent?.classList.remove('hidden');
  }
}

// Technician Digital ID Pass
async function openTechDigitalId(techId) {
  if (!techId) {
    showToast('Technician ID not found', 'error');
    return;
  }

  let techData = null;
  if (currentUser?.uid === techId && currentUserData) {
    techData = currentUserData;
  } else {
    try {
      const doc = await db.collection('users').doc(techId).get();
      if (doc.exists) techData = doc.data();
    } catch (e) {
      console.warn('Error fetching tech data:', e);
    }
  }

  if (!techData) {
    showToast('Technician profile not found', 'error');
    return;
  }

  const nameEl = document.getElementById('dip-tech-name');
  const idEl = document.getElementById('dip-tech-id');
  const distEl = document.getElementById('dip-tech-district');
  const servEl = document.getElementById('dip-tech-services');
  const ratingEl = document.getElementById('dip-tech-rating');
  const avatarImg = document.getElementById('dip-avatar-img');

  if (nameEl) nameEl.textContent = techData.name || 'Technician';
  if (idEl) idEl.textContent = 'LV-PRO-' + techId.slice(0, 5).toUpperCase();
  if (distEl) distEl.textContent = techData.district ? (techData.city ? `${techData.district}, ${techData.city}` : techData.district) : 'Sri Lanka';
  if (servEl) {
    const s = Array.isArray(techData.services) ? techData.services.join(' · ') : (techData.serviceType || 'CCTV & Satellite');
    servEl.textContent = s;
  }
  if (ratingEl) {
    const r = (techData.avgRating || techData.rating || 5.0).toFixed(1);
    const c = techData.ratingCount || techData.reviewsCount || 0;
    ratingEl.innerHTML = `⭐⭐⭐⭐⭐ <strong>${r}</strong> / 5.0 (${c} jobs)`;
  }
  if (avatarImg) {
    if (techData.photoUrl) {
      avatarImg.src = techData.photoUrl;
    } else {
      avatarImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(techData.name || 'Tech')}&background=0284c7&color=fff&bold=true`;
    }
  }

  openModal('modal-tech-id-card');
}

// Digital Invoice Logic
let currentInvoiceJob = null;

function calculateInvoiceTotal() {
  const labour = parseFloat(document.getElementById('inv-input-labour')?.value || 0) || 0;
  const parts = parseFloat(document.getElementById('inv-input-parts')?.value || 0) || 0;
  const total = labour + parts;
  const totalEl = document.getElementById('inv-calc-total');
  if (totalEl) totalEl.textContent = 'රු. ' + total.toLocaleString();
  return total;
}

async function openDigitalInvoiceModal(jobId) {
  let job = (window._jobsMap && window._jobsMap[jobId]) ||
            (typeof allJobs !== 'undefined' && allJobs && allJobs.find(x => x.id === jobId)) ||
            (typeof allAdminJobs !== 'undefined' && allAdminJobs && allAdminJobs.find(x => x.id === jobId));

  if (!job) {
    try {
      const doc = await db.collection('jobs').doc(jobId).get();
      if (doc.exists) {
        job = { id: doc.id, ...doc.data() };
        window._jobsMap = window._jobsMap || {};
        window._jobsMap[jobId] = job;
      }
    } catch (e) {}
  }

  if (!job) {
    showToast('Job details not found', 'error');
    return;
  }

  currentInvoiceJob = job;

  const invNumEl = document.getElementById('inv-job-number');
  const invId = job.invoice?.invoiceNumber || ('INV-#' + (job.id || '').slice(0, 6).toUpperCase());
  if (invNumEl) invNumEl.textContent = invId;

  const editForm = document.getElementById('invoice-edit-form');
  const viewCard = document.getElementById('invoice-view-card');

  const isTechOwner = (currentUser && job.claimedBy === currentUser.uid) || currentUserData?.role === 'admin';

  if (job.invoice) {
    populateInvoiceViewCard(job);
    editForm?.classList.add('hidden');
    viewCard?.classList.remove('hidden');
  } else {
    if (!isTechOwner) {
      showToast('Technician විසින් තවම බිල සාදා නැත (Invoice not generated yet)', 'info');
      return;
    }

    const editJobIdEl = document.getElementById('inv-edit-job-id');
    if (editJobIdEl) editJobIdEl.value = jobId;

    const labourInput = document.getElementById('inv-input-labour');
    const partsInput = document.getElementById('inv-input-parts');
    const partsDescInput = document.getElementById('inv-input-parts-desc');
    const warrantySelect = document.getElementById('inv-input-warranty');

    if (labourInput) labourInput.value = '';
    if (partsInput) partsInput.value = '0';
    if (partsDescInput) partsDescInput.value = '';
    if (warrantySelect) warrantySelect.value = '3 Months';

    calculateInvoiceTotal();

    viewCard?.classList.add('hidden');
    editForm?.classList.remove('hidden');
  }

  openModal('modal-digital-invoice');
}

function viewDigitalInvoice(jobId) {
  openDigitalInvoiceModal(jobId);
}

function populateInvoiceViewCard(job) {
  const inv = job.invoice || {};
  const tTitle = document.getElementById('irp-job-title');
  const tDate = document.getElementById('irp-job-date');
  const tCust = document.getElementById('irp-cust-name');
  const tTech = document.getElementById('irp-tech-name');
  const tLabour = document.getElementById('irp-labour');
  const tParts = document.getElementById('irp-parts');
  const tNote = document.getElementById('irp-parts-note');
  const tWarranty = document.getElementById('irp-warranty');
  const tTotal = document.getElementById('irp-total');

  if (tTitle) tTitle.textContent = `${job.title || 'Service'} (${job.type || 'CCTV'})`;
  if (tDate) tDate.textContent = inv.dateStr || (new Date().toISOString().slice(0, 10));
  if (tCust) tCust.textContent = `${job.customerName || 'Customer'} - ${job.customerPhone || ''}`;
  if (tTech) tTech.textContent = `${job.claimedByName || 'Verified Technician'}`;
  if (tLabour) tLabour.textContent = 'රු. ' + (inv.labourFee || 0).toLocaleString();
  if (tParts) tParts.textContent = 'රු. ' + (inv.partsCost || 0).toLocaleString();
  if (tNote) {
    if (inv.partsDesc) {
      tNote.textContent = '📝 ' + inv.partsDesc;
      tNote.style.display = 'block';
    } else {
      tNote.style.display = 'none';
    }
  }
  if (tWarranty) tWarranty.textContent = inv.warranty || '3 Months Warranty';
  if (tTotal) tTotal.textContent = 'රු. ' + (inv.totalAmount || 0).toLocaleString();
}

async function saveDigitalInvoice(e) {
  if (e) e.preventDefault();
  const jobId = document.getElementById('inv-edit-job-id')?.value;
  if (!jobId) return;

  const labour = parseFloat(document.getElementById('inv-input-labour')?.value || 0) || 0;
  const parts = parseFloat(document.getElementById('inv-input-parts')?.value || 0) || 0;
  const partsDesc = document.getElementById('inv-input-parts-desc')?.value.trim() || '';
  const warranty = document.getElementById('inv-input-warranty')?.value || '3 Months';
  const total = labour + parts;

  if (labour <= 0 && parts <= 0) {
    showToast('කරුණාකර ගාස්තුවක් ඇතුළත් කරන්න (Enter valid fee)', 'warning');
    return;
  }

  const invNumber = 'INV-' + Math.floor(100000 + Math.random() * 900000);
  const dateStr = new Date().toISOString().slice(0, 10);

  const invoiceData = {
    invoiceNumber: invNumber,
    labourFee: labour,
    partsCost: parts,
    partsDesc: partsDesc,
    warranty: warranty,
    totalAmount: total,
    dateStr: dateStr,
    issuedBy: currentUser?.uid || '',
    issuedByName: currentUserData?.name || 'Technician',
    createdAt: new Date().toISOString()
  };

  const btn = document.getElementById('btn-save-inv');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
  }

  try {
    await db.collection('jobs').doc(jobId).update({
      invoice: invoiceData,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    if (window._jobsMap && window._jobsMap[jobId]) {
      window._jobsMap[jobId].invoice = invoiceData;
    }
    if (currentInvoiceJob) {
      currentInvoiceJob.invoice = invoiceData;
    }

    showToast('Invoice සාර්ථකව සකස් කළා! 🧾', 'success');
    populateInvoiceViewCard(currentInvoiceJob || { id: jobId, invoice: invoiceData });
    document.getElementById('invoice-edit-form')?.classList.add('hidden');
    document.getElementById('invoice-view-card')?.classList.remove('hidden');

    if (typeof refreshCurrentTab === 'function') refreshCurrentTab();
  } catch (err) {
    console.error('Invoice save error:', err);
    showToast('Invoice save failed: ' + (err.message || 'Error'), 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-save"></i> <span data-i18n="btn_save_invoice">බිල Save කරන්න 💾</span>';
    }
  }
}

function shareExistingInvoiceWhatsApp() {
  const job = currentInvoiceJob;
  if (!job || !job.invoice) {
    showToast('Invoice විස්තර සොයාගත නොහැක', 'error');
    return;
  }
  sendInvoiceWhatsAppFormatted(job, job.invoice);
}

function sendInvoiceToCustomerWhatsApp() {
  const job = currentInvoiceJob;
  if (!job) {
    showToast('Job තොරතුරු නැත', 'error');
    return;
  }
  const labour = parseFloat(document.getElementById('inv-input-labour')?.value || 0) || 0;
  const parts = parseFloat(document.getElementById('inv-input-parts')?.value || 0) || 0;
  const partsDesc = document.getElementById('inv-input-parts-desc')?.value.trim() || '';
  const warranty = document.getElementById('inv-input-warranty')?.value || '3 Months';
  const total = labour + parts;

  const invoiceData = job.invoice || {
    invoiceNumber: 'INV-' + Math.floor(100000 + Math.random() * 900000),
    labourFee: labour,
    partsCost: parts,
    partsDesc: partsDesc,
    warranty: warranty,
    totalAmount: total,
    dateStr: new Date().toISOString().slice(0, 10)
  };

  sendInvoiceWhatsAppFormatted(job, invoiceData);
}

function sendInvoiceWhatsAppFormatted(job, inv) {
  const cleanPhoneNum = cleanPhone(job.customerPhone || '');
  const techName = job.claimedByName || currentUserData?.name || 'Technician';

  let msg = `🧾 *LANKAVISION PRO - OFFICIAL SERVICE BILL*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `📄 *Invoice No:* ${inv.invoiceNumber || 'INV-001'}\n`;
  msg += `📅 *Date:* ${inv.dateStr || new Date().toISOString().slice(0, 10)}\n`;
  msg += `👤 *Customer:* ${job.customerName || 'Customer'}\n`;
  msg += `📍 *Area:* ${job.city ? `${job.district}, ${job.city}` : job.district}\n`;
  msg += `🔧 *Service:* ${job.title} (${job.type || 'Service'})\n`;
  msg += `👨‍🔧 *Technician:* ${techName}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🛠️ *Labour Fee:* Rs. ${(inv.labourFee || 0).toLocaleString()}\n`;
  if (inv.partsCost > 0) {
    msg += `🔩 *Parts & Materials:* Rs. ${(inv.partsCost || 0).toLocaleString()}${inv.partsDesc ? ` (${inv.partsDesc})` : ''}\n`;
  }
  msg += `💰 *TOTAL AMOUNT:* Rs. ${(inv.totalAmount || 0).toLocaleString()}\n`;
  msg += `🛡️ *Warranty:* ${inv.warranty || '3 Months'}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `✅ *Certified by LankaVision Pro LK*\n`;
  msg += `📞 Support Hotline: +94 78 680 0086 (Smart Zone LK)`;

  const encoded = encodeURIComponent(msg);
  if (cleanPhoneNum) {
    window.open(`https://wa.me/94${cleanPhoneNum}?text=${encoded}`, '_blank');
  } else {
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  }
}

// Global window exposures for event attributes
window.renderQuickIssuesForType = renderQuickIssuesForType;
window.selectQuickIssue = selectQuickIssue;
window.renderJobStepTracker = renderJobStepTracker;
window.openHelpGuide = openHelpGuide;
window.switchHelpTab = switchHelpTab;
window.openTechDigitalId = openTechDigitalId;
window.openDigitalInvoiceModal = openDigitalInvoiceModal;
window.viewDigitalInvoice = viewDigitalInvoice;
window.calculateInvoiceTotal = calculateInvoiceTotal;
window.saveDigitalInvoice = saveDigitalInvoice;
window.sendInvoiceToCustomerWhatsApp = sendInvoiceToCustomerWhatsApp;
window.shareExistingInvoiceWhatsApp = shareExistingInvoiceWhatsApp;

// ── ADMIN DASHBOARD ───────────────────────────────────────────
function initAdminDashboard() {
  const isMain = (currentUser?.email === MAIN_ADMIN_EMAIL) || !!currentUserData?.isMainAdmin;
  const pill = document.querySelector('.admin-pill');
  if (pill) {
    const lbl = isMain 
      ? (typeof t === 'function' ? t('adm_pill_main', 'Main Admin') : 'Main Admin')
      : (typeof t === 'function' ? t('adm_pill_sub', 'Admin') : 'Admin');
    const ico = isMain 
      ? '<i class="fas fa-crown" style="color:#fbbf24"></i>'
      : '<i class="fas fa-shield-alt"></i>';
    pill.innerHTML = `${ico} <span class="adm-pill-txt">${lbl}</span>`;
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
    const [pendSnap, openSnap, techSnap, doneSnap, custSnap] = await Promise.all([
      db.collection('users').where('role', '==', 'technician').where('status', '==', 'pending').get(),
      db.collection('jobs').where('status', '==', 'open').get(),
      db.collection('users').where('role', '==', 'technician').where('status', '==', 'approved').get(),
      db.collection('jobs').where('status', '==', 'completed').get(),
      db.collection('users').where('role', '==', 'customer').get()
    ]);

    let pendingSelfiesCount = 0;
    try {
      const pSelfieSnap = await db.collection('users').where('role', '==', 'technician').where('pendingPhotoStatus', '==', 'pending').get();
      pendingSelfiesCount = pSelfieSnap.size;
      const pSelfieBadge = document.getElementById('pending-selfies-count');
      if (pSelfieBadge) pSelfieBadge.textContent = pendingSelfiesCount;
    } catch(e) {}

    const totalPending = pendSnap.size + pendingSelfiesCount;
    document.getElementById('st-pending').textContent = totalPending;
    document.getElementById('st-open').textContent    = openSnap.size;
    document.getElementById('st-techs').textContent   = techSnap.size;
    document.getElementById('st-done').textContent    = doneSnap.size;
    document.getElementById('pending-count').textContent = totalPending;
    const custBadgeEl = document.getElementById('cust-count');
    if (custBadgeEl) custBadgeEl.textContent = custSnap.size;
    const totalCustEl = document.getElementById('total-cust-count');
    if (totalCustEl) totalCustEl.textContent = custSnap.size;
    const pendingTechSubBadge = document.getElementById('pending-techs-sub-count');
    if (pendingTechSubBadge) pendingTechSubBadge.textContent = pendSnap.size;

    const recentSnap = await db.collection('jobs').get();
    const recent = recentSnap.docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0))
      .slice(0, 8);

    window._jobsMap = window._jobsMap || {};
    recent.forEach(j => { window._jobsMap[j.id] = j; });

    const el = document.getElementById('recent-jobs-list');
    if (!el) return;
    const tFn = (typeof t === 'function') ? t : (k, fb) => fb;
    if (!recent.length) { el.innerHTML = `<div class="empty-state"><i class="fas fa-briefcase"></i><p>${tFn('empty_no_jobs', 'Jobs නැත')}</p></div>`; return; }
    el.innerHTML = recent.map(j => `
      <div class="recent-row" onclick="openJobModal('${j.id}')" style="cursor:pointer" title="Click to view details">
        <div style="flex:1">
          <div class="recent-row-title">${esc(j.title)}</div>
          <div class="recent-row-meta">
            <span class="type-badge ${esc(j.type)}" style="font-size:.7rem;padding:2px 8px">${esc(j.type)}</span>
            ${esc(j.city ? `${j.district}, ${j.city}` : j.district)} · ${timeAgo(j.createdAt?.toDate ? j.createdAt.toDate() : j.createdAt)}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px" onclick="event.stopPropagation()">
          <span class="status-badge s-${esc(j.status)}">${statusLabel(j.status)}</span>
          <button class="btn btn-ghost btn-sm" onclick="openJobModal('${j.id}')" style="min-width:38px;min-height:38px;padding:6px 10px;border-radius:8px"><i class="fas fa-eye"></i></button>
        </div>
      </div>`).join('');
  } catch (err) { console.error(err); }
}

async function loadPendingTechs() {
  try {
    loadPendingSelfiesAdmin();
    const snap = await db.collection('users').where('role', '==', 'technician').where('status', '==', 'pending').get();
    const subCountEl = document.getElementById('pending-techs-sub-count');
    if (subCountEl) subCountEl.textContent = snap.size;

    const el = document.getElementById('pending-list');
    if (!el) return;
    const tFn = (typeof t === 'function') ? t : (k, fb) => fb;
    if (snap.empty) { el.innerHTML = `<div class="empty-state"><i class="fas fa-check-circle" style="color:var(--success)"></i><p>${tFn('empty_no_pending', 'Pending applications නැත')}</p></div>`; return; }
    el.innerHTML = snap.docs.map(d => techCardHtml(d.id, d.data(), 'pending')).join('');
  } catch (err) { console.error(err); }
}

async function loadPendingSelfiesAdmin() {
  const el = document.getElementById('pending-selfies-list');
  const countEl = document.getElementById('pending-selfies-count');
  if (!el) return;

  const tFn = (typeof t === 'function') ? t : (k, fb) => fb;

  try {
    const snap = await db.collection('users')
      .where('role', '==', 'technician')
      .where('pendingPhotoStatus', '==', 'pending')
      .get();

    const count = snap.size;
    if (countEl) countEl.textContent = count;

    if (snap.empty) {
      el.innerHTML = `
        <div class="empty-state" style="padding:24px 12px">
          <i class="fas fa-check-circle" style="color:var(--success)"></i>
          <p>අනුමැතිය සඳහා නව Selfie ඡායාරූප නොමැත (No pending selfie requests)</p>
        </div>`;
      return;
    }

    el.innerHTML = snap.docs.map(doc => {
      const u = doc.data();
      const uid = doc.id;
      const currentPhoto = u.photoUrl || '';
      const newPhoto = u.pendingPhotoUrl || '';
      const timeStr = timeAgo(u.pendingPhotoSubmittedAt?.toDate ? u.pendingPhotoSubmittedAt.toDate() : u.pendingPhotoSubmittedAt);
      const services = getTechServices(u).join(', ') || u.serviceType || 'All';

      return `
        <div class="selfie-comparison-card" id="selfie-card-${uid}">
          <div class="sc-header">
            <div class="sc-tech-info">
              <div class="sc-tech-name">${esc(u.name || 'Technician')}</div>
              <div class="sc-tech-sub">
                <span><i class="fas fa-phone"></i> ${esc(u.phone || 'N/A')}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${esc(u.district || '')}${u.city ? ', ' + esc(u.city) : ''}</span>
                <span><i class="fas fa-tools"></i> ${esc(services)}</span>
                <span><i class="fas fa-clock"></i> ${timeStr}</span>
              </div>
            </div>
            <span class="sc-status-badge">⏳ Pending Review</span>
          </div>

          <div class="selfie-compare-grid">
            <!-- Current Photo -->
            <div class="sc-photo-box sc-box-current">
              <div class="sc-box-label">
                <i class="fas fa-history"></i>
                <span>${tFn('adm_current_selfie', 'පවතින ඡායාරූපය (Current)')}</span>
              </div>
              <div class="sc-img-wrap">
                ${currentPhoto 
                  ? `<img src="${currentPhoto}" alt="Current Selfie" onclick="previewPhoto('${currentPhoto}', '${esc(u.name)} - Current Selfie')" />` 
                  : `<div class="sc-img-placeholder"><i class="fas fa-user"></i><span>No Photo</span></div>`
                }
              </div>
              <div class="sc-photo-note">Active on profile & jobs</div>
            </div>

            <!-- VS Divider -->
            <div class="sc-vs-divider">
              <div class="sc-vs-circle">VS</div>
              <i class="fas fa-arrow-right sc-vs-arrow"></i>
            </div>

            <!-- New Live Selfie Request -->
            <div class="sc-photo-box sc-box-new">
              <div class="sc-box-label highlight">
                <i class="fas fa-camera"></i>
                <span>${tFn('adm_new_selfie', 'ඉල්ලුම් කළ නව ඡායාරූපය (New Request)')}</span>
              </div>
              <div class="sc-img-wrap">
                ${newPhoto 
                  ? `<img src="${newPhoto}" alt="New Requested Selfie" onclick="previewPhoto('${newPhoto}', '${esc(u.name)} - New Selfie Request')" />` 
                  : `<div class="sc-img-placeholder"><i class="fas fa-image"></i><span>No New Photo</span></div>`
                }
                <div class="sc-live-badge"><span class="rec-dot"></span> LIVE CAPTURE</div>
              </div>
              <div class="sc-photo-note sc-note-success">🔒 Live Camera Verified</div>
            </div>
          </div>

          <!-- Actions -->
          <div class="sc-actions">
            <button type="button" class="btn btn-success" onclick="acceptTechSelfie('${uid}')" id="btn-acc-selfie-${uid}">
              <i class="fas fa-check-circle"></i>
              <span>${tFn('adm_btn_accept_selfie', 'අනුමත කර මාරු කරන්න ✅')}</span>
            </button>
            <button type="button" class="btn btn-danger" onclick="declineTechSelfie('${uid}')" id="btn-dec-selfie-${uid}">
              <i class="fas fa-times-circle"></i>
              <span>${tFn('adm_btn_decline_selfie', 'ප්‍රතික්ෂේප කරන්න ❌')}</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

  } catch (err) {
    console.error('Error loading pending selfies:', err);
    el.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-triangle" style="color:var(--danger)"></i><p>Selfie requests load කිරීම අසාර්ථකයි</p></div>`;
  }
}

async function acceptTechSelfie(uid) {
  if (!confirm('ඔබට මෙම Technician ගේ නව Selfie ඡායාරූපය අනුමත කිරීමට සහ පැරණි ඡායාරූපය වෙනුවට මාරු කිරීමට අවශ්‍යද?')) {
    return;
  }

  const btn = document.getElementById(`btn-acc-selfie-${uid}`);
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  }

  try {
    const userDocRef = db.collection('users').doc(uid);
    const userDoc = await userDocRef.get();
    if (!userDoc.exists) {
      showToast('Technician හමු නොවීය', 'error');
      return;
    }

    const data = userDoc.data();
    const newPhotoUrl = data.pendingPhotoUrl;
    if (!newPhotoUrl) {
      showToast('නව Selfie ඡායාරූපයක් හමු නොවීය', 'error');
      return;
    }

    await userDocRef.update({
      photoUrl: newPhotoUrl,
      pendingPhotoUrl: null,
      pendingPhotoStatus: 'approved',
      selfieApprovedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    if (currentUser && currentUser.uid === uid && currentUserData) {
      currentUserData.photoUrl = newPhotoUrl;
      currentUserData.pendingPhotoUrl = null;
      currentUserData.pendingPhotoStatus = 'approved';
    }

    showToast(`✅ ${data.name || 'Technician'} ගේ නව Selfie ඡායාරූපය සාර්ථකව අනුමත කර මාරු කරන ලදී!`, 'success');

    loadPendingSelfiesAdmin();
    loadPendingTechs();
    loadAdminStats();

  } catch (err) {
    console.error('Error accepting tech selfie:', err);
    showToast('Selfie අනුමත කිරීම අසාර්ථකයි: ' + err.message, 'error');
  }
}

async function declineTechSelfie(uid) {
  if (!confirm('ඔබට මෙම Technician ගේ නව Selfie ඉල්ලීම ප්‍රතික්ෂේප කිරීමට අවශ්‍යද? (පැරණි ඡායාරූපය එලෙසම පවතී)')) {
    return;
  }

  const btn = document.getElementById(`btn-dec-selfie-${uid}`);
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  }

  try {
    const userDocRef = db.collection('users').doc(uid);
    const userDoc = await userDocRef.get();
    const data = userDoc.exists ? userDoc.data() : {};

    await userDocRef.update({
      pendingPhotoUrl: null,
      pendingPhotoStatus: 'declined',
      selfieDeclinedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    if (currentUser && currentUser.uid === uid && currentUserData) {
      currentUserData.pendingPhotoUrl = null;
      currentUserData.pendingPhotoStatus = 'declined';
    }

    showToast(`❌ ${data.name || 'Technician'} ගේ නව Selfie ඉල්ලීම ප්‍රතික්ෂේප කරන ලදී. (පැරණි ඡායාරූපය ආරක්ෂිතව පවතී)`, 'info');

    loadPendingSelfiesAdmin();
    loadPendingTechs();
    loadAdminStats();

  } catch (err) {
    console.error('Error declining tech selfie:', err);
    showToast('Selfie ප්‍රතික්ෂේප කිරීම අසාර්ථකයි: ' + err.message, 'error');
  }
}

async function loadAllJobsAdmin() {
  try {
    const snap = await db.collection('jobs').get();
    window._jobsMap = window._jobsMap || {};
    allAdminJobs = snap.docs.map(d => {
      const item = { id: d.id, ...d.data() };
      window._jobsMap[d.id] = item;
      return item;
    }).sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
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
  const tFn = (typeof t === 'function') ? t : (k, fb) => fb;
  if (!jobs.length) { el.innerHTML = `<div class="empty-state"><i class="fas fa-briefcase"></i><p>${tFn('empty_no_jobs', 'Jobs නැත')}</p></div>`; return; }
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
    filterTechnicians();
  } catch (err) { console.error('Error loading techs:', err); }
}

function populateAdminCityDatalist() {
  const dl = document.getElementById('adm-tech-city-list');
  if (!dl || dl.children.length > 0) return;
  const set = new Set();
  Object.keys(CITY_COORDS).forEach(c => set.add(c));
  SL_DISTRICTS.forEach(d => {
    set.add(d);
    (DISTRICT_CITIES[d] || []).forEach(c => set.add(c));
  });
  const sorted = Array.from(set).sort();
  dl.innerHTML = sorted.map(c => `<option value="${esc(c)}">`).join('');
}

function clearTechLocationSearch() {
  const input = document.getElementById('adm-tech-loc-search');
  if (input) input.value = '';
  const banner = document.getElementById('adm-tech-loc-banner');
  if (banner) banner.classList.add('hidden');
  filterTechnicians();
}

function resolveLocationCoords(query) {
  if (!query) return null;
  const qClean = query.trim();
  const qLower = qClean.toLowerCase();

  // 1. Direct match in CITY_COORDS
  for (const [k, coords] of Object.entries(CITY_COORDS)) {
    if (k.toLowerCase() === qLower) return { name: k, coords };
  }
  // 2. Direct match in DISTRICT_COORDS
  for (const [k, coords] of Object.entries(DISTRICT_COORDS)) {
    if (k.toLowerCase() === qLower) return { name: k, coords };
  }
  // 3. Partial match in CITY_COORDS
  for (const [k, coords] of Object.entries(CITY_COORDS)) {
    if (k.toLowerCase().includes(qLower) || qLower.includes(k.toLowerCase())) return { name: k, coords };
  }
  // 4. Partial match in DISTRICT_COORDS
  for (const [k, coords] of Object.entries(DISTRICT_COORDS)) {
    if (k.toLowerCase().includes(qLower) || qLower.includes(k.toLowerCase())) return { name: k, coords };
  }
  return null;
}

function filterTechnicians() {
  populateAdminCityDatalist();
  const st  = document.getElementById('adm-tech-filter')?.value || 'all';
  const svc = document.getElementById('adm-tech-svc')?.value || 'all';
  const locQuery = document.getElementById('adm-tech-loc-search')?.value?.trim() || '';
  const radiusVal = document.getElementById('adm-tech-radius')?.value || '36';
  const radiusKm = radiusVal === 'all' ? Infinity : parseFloat(radiusVal);

  const banner = document.getElementById('adm-tech-loc-banner');
  const bannerText = document.getElementById('adm-tech-loc-banner-text');

  let targetCoords = null;
  let targetName = '';

  if (locQuery) {
    const resolved = resolveLocationCoords(locQuery);
    if (resolved) {
      targetCoords = resolved.coords;
      targetName = resolved.name;
    } else {
      if (banner && bannerText) {
        bannerText.innerHTML = `⚠️ "<strong>${esc(locQuery)}</strong>" සඳහා Coordinates හමු නොවීය. ලැයිස්තුවෙන් නගරයක් තෝරන්න.`;
        banner.classList.remove('hidden');
      }
    }
  } else {
    if (banner) banner.classList.add('hidden');
  }

  let list = allTechs.map(t => {
    const copy = { ...t };
    if (targetCoords) {
      const tLat = copy.lat || (copy.city && CITY_COORDS[copy.city]?.[0]) || (copy.district && DISTRICT_COORDS[copy.district]?.[0]);
      const tLng = copy.lng || (copy.city && CITY_COORDS[copy.city]?.[1]) || (copy.district && DISTRICT_COORDS[copy.district]?.[1]);
      if (tLat != null && tLng != null) {
        copy._distanceKm = calcDistanceKm(targetCoords[0], targetCoords[1], tLat, tLng);
      } else {
        copy._distanceKm = null;
      }
    } else {
      delete copy._distanceKm;
    }
    return copy;
  });

  // Filter status
  if (st !== 'all') {
    list = list.filter(t => t.status === st);
  }

  // Filter service (multi-service aware)
  if (svc !== 'all') {
    if (svc === 'Both') {
      list = list.filter(t => {
        const s = getTechServices(t);
        return s.includes('CCTV') && s.includes('Satellite');
      });
    } else {
      list = list.filter(t => techProvidesService(t, svc));
    }
  }

  // Filter distance
  if (targetCoords) {
    if (radiusKm !== Infinity) {
      list = list.filter(t => t._distanceKm != null && t._distanceKm <= radiusKm);
    }
    // Sort nearest first
    list.sort((a, b) => {
      if (a._distanceKm == null) return 1;
      if (b._distanceKm == null) return -1;
      return a._distanceKm - b._distanceKm;
    });

    if (banner && bannerText) {
      const radLabel = radiusKm === Infinity ? 'සියලුම දුර' : `${radiusKm} km ඇතුළත`;
      bannerText.innerHTML = `🎯 <strong>${esc(targetName || locQuery)}</strong> අසල ${radLabel} Technicians <strong>${list.length}</strong> දෙනෙක් හමුවිය:`;
      banner.classList.remove('hidden');
    }
  }

  renderTechs(list);
}

function renderTechs(techs) {
  const el = document.getElementById('technicians-list');
  if (!el) return;
  const tFn = (typeof t === 'function') ? t : (k, fb) => fb;
  if (!techs.length) { el.innerHTML = `<div class="empty-state"><i class="fas fa-users"></i><p>${tFn('empty_no_techs', 'Technicians නැත')}</p></div>`; return; }
  el.innerHTML = techs.map(t => techCardHtml(t.id, t, 'admin')).join('');
}

function techCardHtml(id, t, context) {
  const tFn = (typeof t === 'function') ? t : (k, fb) => fb;
  const statusColor = t.status === 'approved' ? 'var(--success)' : t.status === 'pending' ? 'var(--warning)' : 'var(--danger)';
  const statusIcon  = t.status === 'approved' ? '✅' : t.status === 'pending' ? '⏳' : '❌';
  const statusTxt   = t.status === 'approved' ? tFn('adm_tech_approved', 'Approved') : t.status === 'pending' ? tFn('adm_tech_pending', 'Pending') : tFn('adm_tech_rejected', 'Rejected');

  let actions = '';
  if (context === 'pending') {
    actions = `
      <button class="btn btn-success btn-sm" onclick="approveTech('${id}')"><i class="fas fa-check"></i> ${tFn('btn_approve', 'Approve')}</button>
      <button class="btn btn-danger btn-sm" onclick="rejectTech('${id}')"><i class="fas fa-times"></i> ${tFn('btn_reject', 'Reject')}</button>
      <button class="btn btn-warning btn-sm" onclick="openEditTechModal('${id}')"><i class="fas fa-edit"></i> ${tFn('btn_edit', 'Edit')}</button>`;
  } else {
    if (t.status !== 'approved') actions += `<button class="btn btn-success btn-sm" onclick="approveTech('${id}')"><i class="fas fa-check"></i> ${tFn('btn_approve', 'Approve')}</button>`;
    if (t.status === 'approved') actions += `<button class="btn btn-warning btn-sm" onclick="suspendTech('${id}')"><i class="fas fa-ban"></i> ${tFn('btn_suspend', 'Suspend')}</button>`;
    actions += `<button class="btn btn-ghost btn-sm" onclick="openEditTechModal('${id}')"><i class="fas fa-edit"></i> ${tFn('btn_edit', 'Edit')}</button>`;
    actions += `<button class="btn btn-danger btn-sm" onclick="deleteTech('${id}')"><i class="fas fa-trash"></i></button>`;
  }

  const avHtml = t.photoUrl
    ? `<img src="${t.photoUrl}" alt="${esc(t.name)}" onclick="previewPhoto('${t.photoUrl}','${esc(t.name)} - Technician Selfie')" title="Click to enlarge selfie" />`
    : `${(t.name || 'T').charAt(0).toUpperCase()}`;

  const services = getTechServices(t);
  const svcBadgesHtml = services.length
    ? services.map(s => {
        const icon = s === 'CCTV' ? 'video' : (s === 'Router' ? 'wifi' : 'satellite-dish');
        return `<span class="type-badge ${esc(s)}" style="font-size:.7rem;padding:2px 8px"><i class="fas fa-${icon}"></i> ${esc(s)}</span>`;
      }).join(' ')
    : `<span class="type-badge ${esc(t.serviceType || '')}" style="font-size:.7rem;padding:2px 8px">${esc(t.serviceType || '')}</span>`;

  return `
  <div class="tech-card" id="tc-${id}">
    <div class="tech-info">
      <div class="tech-av" ${t.photoUrl ? `onclick="previewPhoto('${t.photoUrl}','${esc(t.name)} - Technician Selfie')"` : ''}>${avHtml}</div>
      <div style="flex:1">
        <div class="tech-name">${esc(t.name)} ${renderStarRating(t.avgRating, t.ratingCount)} <span style="font-size:.72rem;color:${statusColor};font-weight:700">${statusIcon} ${statusTxt}</span></div>
        <div class="tech-meta">
          <span><i class="fas fa-phone"></i> ${esc(t.phone)}</span>
          <span><i class="fas fa-envelope"></i> ${esc(t.email)}</span>
          <span><i class="fas fa-map-marker-alt"></i> ${esc(t.city ? `${t.district}, ${t.city}` : t.district)}</span>
          ${t._distanceKm != null ? `<span style="color:#059669;font-weight:700;background:rgba(16,185,129,0.12);padding:2px 8px;border-radius:12px;border:1px solid rgba(16,185,129,0.3)"><i class="fas fa-location-arrow"></i> 🎯 ${t._distanceKm} km දුරින්</span>` : ''}
          ${svcBadgesHtml}
          ${t.photoUrl ? `<span style="color:#34d399;font-weight:700;cursor:pointer" onclick="previewPhoto('${t.photoUrl}','${esc(t.name)} - Selfie')"><i class="fas fa-camera"></i> ${tFn('selfie_verified_badge', 'Selfie Verified 🔒')}</span>` : ''}
          ${t.pendingPhotoStatus === 'pending' ? `<span class="badge" style="background:#0284c7;font-size:.72rem;padding:2px 8px;border-radius:10px;cursor:pointer" onclick="showAdminTab('pending')" title="Selfie change request pending approval"><i class="fas fa-camera"></i> 📸 New Selfie Pending</span>` : ''}
        </div>
        <div style="font-size:.7rem;color:var(--txt3);margin-top:3px">${tFn('applied_lbl', 'Applied')}: ${timeAgo(t.createdAt?.toDate?.())}</div>
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
  document.querySelectorAll('.admin-tabs .tab-btn').forEach(b => {
    const isAct = b.dataset.tab === tab;
    b.classList.toggle('active', isAct);
    if (isAct) {
      try { b.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); } catch(e){}
    }
  });
  document.querySelectorAll('.atab').forEach(c => c.classList.remove('active'));
  document.getElementById(`atab-${tab}`)?.classList.add('active');
  if (tab === 'pending') {
    loadPendingTechs();
  } else if (tab === 'admins') {
    loadAllAdmins();
  } else if (tab === 'customers') {
    loadAllCustomersAdmin();
  } else if (tab === 'technicians') {
    populateAdminCityDatalist();
    if (!allTechs.length) loadAllTechs();
  } else if (tab === 'app-updates') {
    loadAppUpdateConfigAdmin();
  }
  if (typeof updateTabsScrollIndicators === 'function') {
    setTimeout(() => updateTabsScrollIndicators('admin-tabs'), 120);
  }
  updateMobileNavState('screen-admin');
}

// ── ADMIN CUSTOMER MANAGEMENT ─────────────────────────────────
let allAdminCustomers = [];

async function loadAllCustomersAdmin() {
  const el = document.getElementById('customers-list');
  if (!el) return;
  try {
    el.innerHTML = `<div class="empty-state"><i class="fas fa-spinner fa-spin"></i><p>Loading customers...</p></div>`;

    const [custSnap, jobsSnap] = await Promise.all([
      db.collection('users').where('role', '==', 'customer').get(),
      db.collection('jobs').get()
    ]);

    const jobsMap = {};
    jobsSnap.docs.forEach(d => {
      const j = d.data();
      const cId = j.customerId || j.createdBy;
      if (cId) {
        if (!jobsMap[cId]) jobsMap[cId] = [];
        jobsMap[cId].push({ id: d.id, ...j });
      }
      if (j.customerPhone) {
        const clean = cleanPhone(j.customerPhone);
        if (clean) {
          if (!jobsMap[clean]) jobsMap[clean] = [];
          jobsMap[clean].push({ id: d.id, ...j });
        }
      }
    });

    allAdminCustomers = custSnap.docs.map(d => {
      const data = d.data();
      const phoneClean = cleanPhone(data.phone);
      const matchedJobs = [
        ...(jobsMap[d.id] || []),
        ...(phoneClean && jobsMap[phoneClean] ? jobsMap[phoneClean] : [])
      ];
      // Deduplicate jobs by ID
      const uniqueJobsMap = new Map();
      matchedJobs.forEach(j => uniqueJobsMap.set(j.id, j));
      return {
        id: d.id,
        ...data,
        jobCount: uniqueJobsMap.size,
        jobs: Array.from(uniqueJobsMap.values())
      };
    }).sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));

    const totalEl = document.getElementById('total-cust-count');
    const badgeEl = document.getElementById('cust-count');
    if (totalEl) totalEl.textContent = allAdminCustomers.length;
    if (badgeEl) badgeEl.textContent = allAdminCustomers.length;

    renderAdminCustomers(allAdminCustomers);
  } catch (err) {
    console.error('Error loading customers:', err);
    if (el) el.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-triangle" style="color:var(--danger)"></i><p>Failed to load customers</p></div>`;
  }
}

function renderAdminCustomers(custs) {
  const el = document.getElementById('customers-list');
  if (!el) return;
  const tFn = (typeof t === 'function') ? t : (k, fb) => fb;
  if (!custs.length) {
    el.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-user-friends" style="font-size:2.5rem;color:var(--txt3)"></i>
        <h3 style="margin-top:10px;font-size:1rem;color:var(--txt)">Customers හමු නොවීය</h3>
        <p style="font-size:.82rem;color:var(--txt2)">ලියාපදිංචි වූ පාරිභෝගිකයින් කිසිවකු නැත හෝ සෙවුමට ගැලපෙන ප්‍රතිඵල නැත.</p>
      </div>`;
    return;
  }

  el.innerHTML = custs.map(c => {
    const waPhone = cleanPhone(c.phone);
    const waLink = waPhone ? `https://wa.me/94${waPhone}?text=${encodeURIComponent(`ආයුබෝවන් ${c.name || 'Customer'}, LankaVision Pro ආයතනයෙන් අමතන්නේ.`)}` : '';
    const initial = (c.name || 'C').charAt(0).toUpperCase();
    const joinedAgo = timeAgo(c.createdAt?.toDate?.() || c.createdAt);

    return `
      <div class="customer-card" id="cust-card-${c.id}">
        <div class="cust-info-main">
          <div class="cust-avatar">${initial}</div>
          <div style="flex:1;min-width:180px">
            <div class="cust-name-row">
              <span class="cust-name">${esc(c.name || 'Unnamed Customer')}</span>
              <span class="cust-jobs-badge"><i class="fas fa-briefcase"></i> ${c.jobCount || 0} Jobs Posted</span>
            </div>
            <div class="cust-meta-list">
              ${c.phone ? `<span><i class="fas fa-phone"></i> <a href="tel:${esc(c.phone)}" style="color:inherit">${esc(c.phone)}</a></span>` : ''}
              ${c.email ? `<span><i class="fas fa-envelope"></i> ${esc(c.email)}</span>` : ''}
              ${(c.district || c.city) ? `<span><i class="fas fa-map-marker-alt"></i> ${esc(c.city ? `${c.district}, ${c.city}` : c.district)}</span>` : ''}
              <span style="color:var(--txt3)"><i class="fas fa-clock"></i> Joined: ${joinedAgo}</span>
            </div>
          </div>
        </div>
        <div class="cust-actions">
          ${waLink ? `<a href="${waLink}" target="_blank" rel="noopener" class="btn btn-success btn-sm" title="WhatsApp Message"><i class="fab fa-whatsapp"></i> WhatsApp</a>` : ''}
          ${c.phone ? `<a href="tel:${esc(c.phone)}" class="btn btn-outline btn-sm" title="Call Customer"><i class="fas fa-phone"></i> Call</a>` : ''}
          <button class="btn btn-danger btn-sm" onclick="deleteCustomer('${c.id}','${esc(c.name || 'Customer')}')" title="Delete Customer"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `;
  }).join('');
}

function filterAdminCustomers() {
  const query = document.getElementById('adm-cust-search')?.value?.trim().toLowerCase() || '';
  if (!query) {
    renderAdminCustomers(allAdminCustomers);
    return;
  }
  const filtered = allAdminCustomers.filter(c => {
    const nameMatch = (c.name || '').toLowerCase().includes(query);
    const phoneMatch = (c.phone || '').toLowerCase().includes(query);
    const emailMatch = (c.email || '').toLowerCase().includes(query);
    const distMatch = (c.district || '').toLowerCase().includes(query);
    const cityMatch = (c.city || '').toLowerCase().includes(query);
    return nameMatch || phoneMatch || emailMatch || distMatch || cityMatch;
  });
  renderAdminCustomers(filtered);
}

async function deleteCustomer(uid, name) {
  if (!confirm(`"${name}" පාරිභෝගික ගිණුම සම්පූර්ණයෙන්ම Delete කිරීමට අවශ්‍ය බව තහවුරු කරන්නද?`)) return;
  try {
    await db.collection('users').doc(uid).delete();
    showToast('Customer account deleted', 'info');
    document.getElementById(`cust-card-${uid}`)?.remove();
    allAdminCustomers = allAdminCustomers.filter(c => c.id !== uid);
    const totalEl = document.getElementById('total-cust-count');
    const badgeEl = document.getElementById('cust-count');
    if (totalEl) totalEl.textContent = allAdminCustomers.length;
    if (badgeEl) badgeEl.textContent = allAdminCustomers.length;
    loadAdminStats();
  } catch (err) {
    console.error('Error deleting customer:', err);
    showToast('Failed to delete customer: ' + err.message, 'error');
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

    const tFn = (typeof t === 'function') ? t : (k, fb) => fb;
    if (!admins.length) {
      el.innerHTML = `<div class="empty-state"><i class="fas fa-users-cog"></i><p>${tFn('empty_no_admins', 'Admins නැත')}</p></div>`;
      return;
    }

    el.innerHTML = admins.map(a => {
      const isMain = a.email === MAIN_ADMIN_EMAIL || a.isMainAdmin;
      const isSelf = currentUser && (a.id === currentUser.uid || a.email === currentUser.email);
      const roleBadge = isMain
        ? `<span class="badge" style="background:rgba(245,158,11,0.18);color:#fbbf24;border:1px solid rgba(245,158,11,0.4);font-size:.74rem;padding:3px 10px"><i class="fas fa-crown"></i> ${tFn('adm_pill_main', 'Main Admin')}</span>`
        : `<span class="badge" style="background:rgba(59,130,246,0.15);color:#60a5fa;border:1px solid rgba(59,130,246,0.3);font-size:.74rem;padding:3px 10px"><i class="fas fa-shield-alt"></i> ${tFn('adm_pill_sub_badge', 'Sub-Admin')}</span>`;

      let actionBtn = '';
      if (isMain) {
        actionBtn = `<span style="font-size:.75rem;color:#f59e0b;font-weight:700;display:flex;align-items:center;gap:5px"><i class="fas fa-lock"></i> ${tFn('admin_protected', 'Protected')}</span>`;
      } else if (isSelf) {
        actionBtn = `<span style="font-size:.75rem;color:var(--txt3);font-weight:600">${tFn('admin_your_account', '(ඔබගේ ගිණුම)')}</span>`;
      } else {
        actionBtn = `<button class="btn btn-danger btn-sm" onclick="deleteAdminUser('${a.id}','${esc(a.email)}')"><i class="fas fa-trash"></i> ${tFn('btn_delete', 'Delete')}</button>`;
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
  openModal('modal-create-admin');
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
          <a href="${APP_BASE_URL}" class="btn-link">Login to Admin Panel</a>
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
      ${u.role === 'technician' && u.pendingPhotoUrl ? `
      <div class="pending-selfie-alert-banner">
        <i class="fas fa-hourglass-half" style="font-size:1.2rem"></i>
        <div>${typeof t === 'function' ? t('selfie_pending_review_banner', '⏳ නව Selfie ඡායාරූපය Admin අනුමැතිය අපේක්ෂාවෙන් (Under Review)') : '⏳ නව Selfie ඡායාරූපය Admin අනුමැතිය අපේක්ෂාවෙන් (Under Review)'}</div>
      </div>` : ''}
      <div style="margin-top:16px;display:flex;flex-direction:column;gap:8px">
        ${u.role === 'technician' ? `
          <button type="button" class="btn btn-warning btn-full" onclick="openTechChangeSelfieModal()">
            <i class="fas fa-camera"></i> ${typeof t === 'function' ? t('btn_change_selfie', '📸 Selfie ඡායාරූපය වෙනස් කරන්න') : '📸 Selfie ඡායාරූපය වෙනස් කරන්න'}
          </button>
          <button type="button" class="btn btn-primary btn-full" onclick="openTechDigitalId('${currentUser?.uid}')"><i class="fas fa-id-card"></i> ${typeof t === 'function' ? t('btn_view_id', 'මගේ Official Digital ID Pass එක') : 'මගේ Official Digital ID Pass එක'}</button>
        ` : ''}
        <button type="button" class="btn btn-ghost btn-full" onclick="openHelpGuide('${u.role === 'technician' ? 'technician' : 'customer'}')" style="border:1px solid rgba(255,255,255,0.15)"><i class="fas fa-lightbulb" style="color:#fbbf24"></i> ${typeof t === 'function' ? t('btn_help_guide', '💡 භාවිතා කරන හැටි (Help Guide)') : '💡 භාවිතා කරන හැටි (Help Guide)'}</button>
      </div>
      <div style="margin-top:10px"><button class="btn btn-outline btn-full" onclick="handleLogout()"><i class="fas fa-sign-out-alt"></i> Logout</button></div>
      <div style="text-align:center;margin-top:22px;font-size:0.76rem;color:var(--txt3);border-top:1px solid var(--border);padding-top:16px">
        Developed by <strong style="color:var(--primary-l)">SMARTZONE LK</strong> · <a href="https://wa.me/94786800086?text=Hello%20SMARTZONE%20LK" target="_blank" rel="noopener noreferrer" style="color:#38bdf8;text-decoration:none;font-weight:700"><i class="fab fa-whatsapp"></i> +94 78 680 0086</a>
      </div>
    </div>
  </div>`;
}

// ── HELPERS ───────────────────────────────────────────────────
function setActiveTab(containerId, tab) {
  document.querySelectorAll(`#${containerId} .tab-btn`).forEach(b => {
    const isAct = b.dataset.tab === tab;
    b.classList.toggle('active', isAct);
    if (isAct) {
      try { b.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); } catch(e){}
    }
  });
  if (typeof updateTabsScrollIndicators === 'function') {
    setTimeout(() => updateTabsScrollIndicators(containerId), 120);
  }
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

// =============================================================
// 🚀 IN-APP UPDATE SYSTEM & ADMIN APK CONFIGURATION
// =============================================================

async function checkForAppUpdates() {
  if (typeof db === 'undefined' || !db) return;
  try {
    const docRef = db.collection('system_config').doc('app_version');
    const snap = await docRef.get();
    if (!snap.exists) return;
    const data = snap.data();
    _cachedRemoteAppUpdate = data;

    const remoteCode = parseInt(data.versionCode, 10) || 0;
    const currentCode = parseInt(APP_VERSION_CODE, 10) || 1;

    if (remoteCode > currentCode) {
      // If user hasn't dismissed it in THIS session (re-prompts on every app open)
      if (!_updateDismissedThisSession) {
        showAppUpdatePrompt(data);
      }
    }
  } catch (err) {
    console.warn('[checkForAppUpdates] Check failed:', err);
  }
}

function showAppUpdatePrompt(updateData, isPreview = false) {
  if (!updateData) return;
  const modal = document.getElementById('modal-app-update');
  if (!modal) return;

  const versionTag = document.getElementById('app-update-version-tag');
  const notesContent = document.getElementById('app-update-notes-content');
  const mandatoryWarning = document.getElementById('app-update-mandatory-msg');
  const btnClose = document.getElementById('btn-close-app-update');
  const btnLater = document.getElementById('btn-later-app-update');

  const versionName = updateData.versionName || `v${updateData.versionCode || 'New'}`;
  if (versionTag) {
    versionTag.textContent = `${versionName} Available`;
  }

  if (notesContent) {
    const rawNotes = updateData.releaseNotes ? updateData.releaseNotes.trim() : '';
    if (rawNotes) {
      const lines = rawNotes.split('\n').map(l => l.trim()).filter(Boolean);
      const itemsHtml = lines.map(line => {
        const cleanLine = line.replace(/^[•\-\*]\s*/, '');
        return `<li><i class="fas fa-check-circle" style="color:var(--accent);margin-right:8px"></i><span>${esc(cleanLine)}</span></li>`;
      }).join('');
      notesContent.innerHTML = `<ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px">${itemsHtml}</ul>`;
    } else {
      notesContent.innerHTML = `<p style="margin:0;color:var(--txt2);font-size:0.86rem">✨ වඩාත් වේගවත්, ආරක්ෂිත සහ නවතම පහසුකම් රාශියක් ඇතුළත් කර ඇත.</p>`;
    }
  }

  const isMandatory = updateData.isMandatory === true;
  if (mandatoryWarning) {
    if (isMandatory) {
      mandatoryWarning.classList.remove('hidden');
    } else {
      mandatoryWarning.classList.add('hidden');
    }
  }

  // If preview mode, always show close/dismiss so admin can test
  if (isPreview) {
    if (btnClose) btnClose.style.display = 'block';
    if (btnLater) {
      btnLater.style.display = 'block';
      btnLater.textContent = 'Preview Close කරන්න';
    }
  } else {
    if (isMandatory) {
      if (btnClose) btnClose.style.display = 'none';
      if (btnLater) btnLater.style.display = 'none';
    } else {
      if (btnClose) btnClose.style.display = 'block';
      if (btnLater) {
        btnLater.style.display = 'block';
        btnLater.textContent = tFn('update_btn_later', 'පසුව කරන්න (Later)');
      }
    }
  }

  modal.classList.remove('hidden');
}

function dismissAppUpdateModal() {
  if (_cachedRemoteAppUpdate && _cachedRemoteAppUpdate.isMandatory && !_isPreviewModeActive) {
    showToast(tFn('update_mandatory_alert', 'මෙම Update එක අනිවාර්ය වේ. කරුණාකර Update කරන්න.'), 'warning');
    return;
  }
  _updateDismissedThisSession = true;
  _isPreviewModeActive = false;
  const modal = document.getElementById('modal-app-update');
  if (modal) modal.classList.add('hidden');
}

let _isPreviewModeActive = false;
function previewAppUpdateModal() {
  const vName = document.getElementById('adm-update-version-name')?.value.trim() || 'v1.1.0';
  const vCode = parseInt(document.getElementById('adm-update-version-code')?.value, 10) || 2;
  const apkUrl = document.getElementById('adm-update-apk-url')?.value.trim() || 'https://example.com/app.apk';
  const notes = document.getElementById('adm-update-notes')?.value.trim() || '• නව පහසුකම් සහ දෝෂ නිවැරදි කිරීම්\n• Digital Invoice සහ WhatsApp Share';
  const isMandatory = document.getElementById('adm-update-is-mandatory')?.checked || false;

  _isPreviewModeActive = true;
  showAppUpdatePrompt({
    versionName: vName,
    versionCode: vCode,
    apkUrl: apkUrl,
    releaseNotes: notes,
    isMandatory: isMandatory
  }, true);
}

function openDownloadAppUpdate() {
  const url = (_cachedRemoteAppUpdate && _cachedRemoteAppUpdate.apkUrl) ? _cachedRemoteAppUpdate.apkUrl.trim() : '';
  if (!url) {
    showToast('Download link එක ලබාගත නොහැක. කරුණාකර Admin අමතන්න.', 'error');
    return;
  }

  try {
    showToast('Update එක බාගත කිරීම ආරම්භ වේ... 📲', 'info');
    const win = window.open(url, '_blank');
    if (!win) {
      window.location.href = url;
    }
  } catch (err) {
    console.error('Download error:', err);
    window.location.href = url;
  }
}

async function loadAppUpdateConfigAdmin() {
  const nameInp = document.getElementById('adm-update-version-name');
  const codeInp = document.getElementById('adm-update-version-code');
  const urlInp = document.getElementById('adm-update-apk-url');
  const notesInp = document.getElementById('adm-update-notes');
  const mandatoryInp = document.getElementById('adm-update-is-mandatory');
  const liveVerEl = document.getElementById('adm-live-version-text');
  const liveCodeEl = document.getElementById('adm-live-code-text');

  if (liveVerEl) liveVerEl.textContent = `v${APP_VERSION}`;
  if (liveCodeEl) liveCodeEl.textContent = `${APP_VERSION_CODE}`;

  if (typeof db === 'undefined' || !db) return;
  try {
    const docRef = db.collection('system_config').doc('app_version');
    const snap = await docRef.get();
    if (snap.exists) {
      const d = snap.data();
      _cachedRemoteAppUpdate = d;
      if (nameInp) nameInp.value = d.versionName || '';
      if (codeInp) codeInp.value = d.versionCode || 1;
      if (urlInp) urlInp.value = d.apkUrl || '';
      if (notesInp) notesInp.value = d.releaseNotes || '';
      if (mandatoryInp) mandatoryInp.checked = !!d.isMandatory;
      if (liveVerEl && d.versionName) liveVerEl.textContent = d.versionName;
      if (liveCodeEl && d.versionCode) liveCodeEl.textContent = d.versionCode;
    } else {
      if (nameInp && !nameInp.value) nameInp.value = `v${APP_VERSION}`;
      if (codeInp && !codeInp.value) codeInp.value = APP_VERSION_CODE + 1;
    }
  } catch (err) {
    console.warn('[loadAppUpdateConfigAdmin] Error:', err);
  }
}

async function saveAppUpdateConfigAdmin(e) {
  if (e && e.preventDefault) e.preventDefault();
  const nameInp = document.getElementById('adm-update-version-name');
  const codeInp = document.getElementById('adm-update-version-code');
  const urlInp = document.getElementById('adm-update-apk-url');
  const notesInp = document.getElementById('adm-update-notes');
  const mandatoryInp = document.getElementById('adm-update-is-mandatory');
  const saveBtn = document.getElementById('btn-save-app-update');

  const versionName = nameInp ? nameInp.value.trim() : '';
  const versionCode = codeInp ? parseInt(codeInp.value, 10) : 0;
  const apkUrl = urlInp ? urlInp.value.trim() : '';
  const releaseNotes = notesInp ? notesInp.value.trim() : '';
  const isMandatory = mandatoryInp ? mandatoryInp.checked : false;

  if (!versionName) {
    showToast('කරුණාකර Version Name එක ඇතුළත් කරන්න (උදා: v1.1.0)', 'error');
    return;
  }
  if (!versionCode || versionCode < 1) {
    showToast('කරුණාකර වලංගු Version Code අංකයක් ඇතුළත් කරන්න (උදා: 2)', 'error');
    return;
  }
  if (!apkUrl || (!apkUrl.startsWith('http://') && !apkUrl.startsWith('https://'))) {
    showToast('කරුණාකර වලංගු APK Download Link එකක් (http:// හෝ https://) ඇතුළත් කරන්න', 'error');
    return;
  }

  if (typeof db === 'undefined' || !db) {
    showToast('Firebase database සම්බන්ධ වී නැත.', 'error');
    return;
  }

  const origBtnHtml = saveBtn ? saveBtn.innerHTML : '';
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> සුරකිමින් පවතී...';
  }

  try {
    const payload = {
      versionName: versionName,
      versionCode: versionCode,
      apkUrl: apkUrl,
      releaseNotes: releaseNotes,
      isMandatory: isMandatory,
      updatedAt: (typeof firebase !== 'undefined' && firebase.firestore)
        ? firebase.firestore.FieldValue.serverTimestamp()
        : new Date(),
      updatedBy: (currentUser && currentUser.email) ? currentUser.email : 'admin'
    };

    await db.collection('system_config').doc('app_version').set(payload, { merge: true });
    _cachedRemoteAppUpdate = payload;

    const liveVerEl = document.getElementById('adm-live-version-text');
    const liveCodeEl = document.getElementById('adm-live-code-text');
    if (liveVerEl) liveVerEl.textContent = versionName;
    if (liveCodeEl) liveCodeEl.textContent = versionCode;

    showToast('App Version එක සාර්ථකව Update කරන ලදී! 🚀 සියලුම පරණ App භාවිතා කරන්නන්ට Download Prompt එක ලැබෙනු ඇත.', 'success');
  } catch (err) {
    console.error('Save app version error:', err);
    showToast('සුරැකීමේදී දෝෂයක් සිදුවිය: ' + (err.message || err), 'error');
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = origBtnHtml;
    }
  }
}

// Global exposures for HTML event handlers
window.checkForAppUpdates = checkForAppUpdates;
window.showAppUpdatePrompt = showAppUpdatePrompt;
window.dismissAppUpdateModal = dismissAppUpdateModal;
window.previewAppUpdateModal = previewAppUpdateModal;
window.openDownloadAppUpdate = openDownloadAppUpdate;
window.loadAppUpdateConfigAdmin = loadAppUpdateConfigAdmin;
window.saveAppUpdateConfigAdmin = saveAppUpdateConfigAdmin;

// =============================================================
// 📱 HORIZONTAL TABS SCROLL INDICATORS & ARROWS
// =============================================================

function scrollTabsRight(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.scrollBy({ left: 180, behavior: 'smooth' });
  setTimeout(() => updateTabsScrollIndicators(containerId), 250);
}

function scrollTabsLeft(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.scrollBy({ left: -180, behavior: 'smooth' });
  setTimeout(() => updateTabsScrollIndicators(containerId), 250);
}

function updateTabsScrollIndicators(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const wrap = el.closest('.tabs-scroll-wrap');
  if (!wrap) return;
  const leftBtn = wrap.querySelector('.tab-scroll-left');
  const rightBtn = wrap.querySelector('.tab-scroll-right');

  const maxScroll = el.scrollWidth - el.clientWidth;
  if (leftBtn) {
    if (el.scrollLeft <= 10) {
      leftBtn.classList.add('hidden');
    } else {
      leftBtn.classList.remove('hidden');
    }
  }
  if (rightBtn) {
    if (maxScroll <= 5 || el.scrollLeft >= maxScroll - 10) {
      rightBtn.classList.add('hidden');
    } else {
      rightBtn.classList.remove('hidden');
    }
  }
}

window.addEventListener('resize', () => {
  updateTabsScrollIndicators('admin-tabs');
  updateTabsScrollIndicators('dash-tabs');
});

if (typeof document !== 'undefined') {
  setTimeout(() => {
    updateTabsScrollIndicators('admin-tabs');
    updateTabsScrollIndicators('dash-tabs');
  }, 500);
}

window.scrollTabsLeft = scrollTabsLeft;
window.scrollTabsRight = scrollTabsRight;
window.updateTabsScrollIndicators = updateTabsScrollIndicators;

// 📸 Technician Selfie Change & Review System Exports
window.openTechChangeSelfieModal = openTechChangeSelfieModal;
window.closeChangeSelfieModal = closeChangeSelfieModal;
window.startChangeSelfieCamera = startChangeSelfieCamera;
window.stopChangeSelfieCamera = stopChangeSelfieCamera;
window.switchChangeSelfieCamera = switchChangeSelfieCamera;
window.captureChangeSelfie = captureChangeSelfie;
window.retakeChangeSelfie = retakeChangeSelfie;
window.submitTechChangeSelfie = submitTechChangeSelfie;
window.notifyAdminSelfieChangeRequest = notifyAdminSelfieChangeRequest;
window.loadPendingSelfiesAdmin = loadPendingSelfiesAdmin;
window.acceptTechSelfie = acceptTechSelfie;
window.declineTechSelfie = declineTechSelfie;
window.toggleTechJobsMap = toggleTechJobsMap;
window.focusJobOnTechMap = focusJobOnTechMap;
window.renderTechJobsMap = renderTechJobsMap;

if (typeof globalThis !== 'undefined') {
  globalThis.openTechChangeSelfieModal = openTechChangeSelfieModal;
  globalThis.closeChangeSelfieModal = closeChangeSelfieModal;
  globalThis.startChangeSelfieCamera = startChangeSelfieCamera;
  globalThis.stopChangeSelfieCamera = stopChangeSelfieCamera;
  globalThis.switchChangeSelfieCamera = switchChangeSelfieCamera;
  globalThis.captureChangeSelfie = captureChangeSelfie;
  globalThis.retakeChangeSelfie = retakeChangeSelfie;
  globalThis.submitTechChangeSelfie = submitTechChangeSelfie;
  globalThis.notifyAdminSelfieChangeRequest = notifyAdminSelfieChangeRequest;
  globalThis.loadPendingSelfiesAdmin = loadPendingSelfiesAdmin;
  globalThis.acceptTechSelfie = acceptTechSelfie;
  globalThis.declineTechSelfie = declineTechSelfie;
  globalThis.toggleTechJobsMap = toggleTechJobsMap;
  globalThis.focusJobOnTechMap = focusJobOnTechMap;
  globalThis.renderTechJobsMap = renderTechJobsMap;
}



