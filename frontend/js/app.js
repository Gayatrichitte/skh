/**
 * KisanSathi - Core Application Logic & Router
 */

const APP_STATE = {
  language: localStorage.getItem('kisansathi_lang') || 'en', // 'mr', 'hi', 'en'
  darkMode: localStorage.getItem('kisansathi_theme') === 'dark',
  user: {
    name: 'Ramesh',
    role: 'Premium Farmer',
    location: 'Nashik, Maharashtra',
    crop: 'Onion',
    landSize: '2 acres',
    soilType: 'Black Clay Loam',
    irrigation: 'Drip Irrigation',
    phone: '+91 98234 56789'
  },
  currentRoute: 'welcome',
  activeScanResult: {
    crop: 'Onion (कांदा / प्याज)',
    disease: 'Purple Blotch (Stemphylium vesicarium)',
    confidence: '98%',
    severity: 'Moderate (28% affected)',
    recommendation: 'Spray Mancozeb 75% WP @ 2.5g/L or Organic Neem Oil 1500ppm @ 5ml/L.',
    actionRequired: 'Apply within 48 hours before impending rainfall.'
  }
};

// Multi-language strings
const TRANSLATIONS = {
  en: {
    appName: 'KisanSathi',
    tagline: 'Cultivating smarter farming',
    selectLang: 'Select your preferred language to begin',
    welcomeBack: 'Welcome Back',
    mobileNumber: 'Mobile Number',
    password: 'Password',
    login: 'Login',
    signUp: 'Sign Up',
    todayTasks: "YOUR TASKS TODAY",
    weatherRisk: "WEATHER RISK",
    cropStatus: "CROP STATUS",
    cropAnalysis: "Crop Analysis",
    cropScanner: "Crop Scanner",
    aiMentor: "AI Mentor",
    schemes: "Government Schemes",
    suggestions: "Impact Suggestions",
    management: "Farming Workflow",
    listen: "Listen",
    why: "Why?",
    delayIrrigation: "Delay Irrigation",
    rainExpected: "Rain is expected within 24 hours (72% probability).",
    scanTitle: "AI Crop Health Scanner",
    scanSubtitle: "Capture or upload leaf photo for instant pathogen detection",
    startScan: "Start Diagnostic Scan",
    chatPlaceholder: "Ask Kisan AI about crops, fertilizers, pests, weather...",
    applyNow: "Apply Now",
    checkEligibility: "Check Eligibility"
  },
  hi: {
    appName: 'किसान साथी',
    tagline: 'स्मार्ट खेती, समृद्ध किसान',
    selectLang: 'आरंभ करने के लिए अपनी पसंदीदा भाषा चुनें',
    welcomeBack: 'पुनः स्वागत है',
    mobileNumber: 'मोबाइल नंबर',
    password: 'पासवर्ड',
    login: 'लॉग इन करें',
    signUp: 'साइन अप करें',
    todayTasks: "आज के आवश्यक कार्य",
    weatherRisk: "मौसम जोखिम पूर्वानुमान",
    cropStatus: "फसल स्वास्थ्य स्थिति",
    cropAnalysis: "फसल विश्लेषण",
    cropScanner: "क्रॉप स्कैनर (रोग जांच)",
    aiMentor: "किसान AI सलाहकार",
    schemes: "सरकारी योजनाएं व सब्सिडी",
    suggestions: "सुझाव व लाभ",
    management: "खेती प्रबंधन कैलेंडर",
    listen: "सुनें",
    why: "कारण जानें",
    delayIrrigation: "सिंचाई रोकें",
    rainExpected: "अगले 24 घंटों में 72% बारिश की संभावना है।",
    scanTitle: "एआई फसल रोग स्कैनर",
    scanSubtitle: "रोग की तुरंत पहचान के लिए पत्ते की फोटो खींचें या अपलोड करें",
    startScan: "जांच शुरू करें",
    chatPlaceholder: "फसल, खाद, कीट या मौसम के बारे में कुछ भी पूछें...",
    applyNow: "आवेदन करें",
    checkEligibility: "पात्रता जांचें"
  },
  mr: {
    appName: 'किसान साथी',
    tagline: 'स्मार्ट शेती, समृद्ध शेतकरी',
    selectLang: 'सुरुवात करण्यासाठी आपली पसंतीची भाषा निवडा',
    welcomeBack: 'परत स्वागत आहे',
    mobileNumber: 'मोबाईल नंबर',
    password: 'पासवर्ड',
    login: 'लॉगिन करा',
    signUp: 'नवीन नोंदणी',
    todayTasks: "आजची महत्त्वाची कामे",
    weatherRisk: "हवामान अंदाज व जोखीम",
    cropStatus: "पीक आरोग्य स्थिती",
    cropAnalysis: "पीक विश्लेषण अहवाल",
    cropScanner: "पीक रोग स्कॅनर",
    aiMentor: "किसान AI मार्गदर्शक",
    schemes: "शासकीय योजना व अनुदान",
    suggestions: "स्मार्ट सल्ले व नफा",
    management: "शेती व्यवस्थापन दिनदर्शिका",
    listen: "ऐका",
    why: "कारण पाहा",
    delayIrrigation: "पाणी देणे पुढे ढकला",
    rainExpected: "पुढील २४ तासांत ७२% पाऊस पडण्याची शक्यता आहे.",
    scanTitle: "एआय पीक रोग स्कॅनर",
    scanSubtitle: "रोगाची तत्काळ तपासणी करण्यासाठी पानाचा फोटो काढा किंवा निवडा",
    startScan: "तपासणी सुरू करा",
    chatPlaceholder: "पीक, खते, कीड अथवा हवामानाबद्दल काहीही विचारा...",
    applyNow: "अर्ज करा",
    checkEligibility: "पात्रता तपासा"
  }
};

// Audio Speech Helper
function speakText(text) {
  if (!('speechSynthesis' in window)) {
    alert('Speech synthesis not supported on this browser.');
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  if (APP_STATE.language === 'mr') {
    utterance.lang = 'mr-IN';
  } else if (APP_STATE.language === 'hi') {
    utterance.lang = 'hi-IN';
  } else {
    utterance.lang = 'en-US';
  }
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

// Theme Management
function initTheme() {
  if (APP_STATE.darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

function toggleDarkMode() {
  APP_STATE.darkMode = !APP_STATE.darkMode;
  localStorage.setItem('kisansathi_theme', APP_STATE.darkMode ? 'dark' : 'light');
  initTheme();
  updateThemeIcons();
}

function updateThemeIcons() {
  const themeIcons = document.querySelectorAll('.theme-toggle-icon');
  themeIcons.forEach(icon => {
    icon.textContent = APP_STATE.darkMode ? 'light_mode' : 'dark_mode';
  });
}

// Language Setting
function setLanguage(lang) {
  APP_STATE.language = lang;
  localStorage.setItem('kisansathi_lang', lang);
  updateLanguageUI();
}

function updateLanguageUI() {
  const t = TRANSLATIONS[APP_STATE.language] || TRANSLATIONS.en;
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    if (t[key]) {
      el.textContent = t[key];
    }
  });
  document.querySelectorAll('[data-t-placeholder]').forEach(el => {
    const key = el.getAttribute('data-t-placeholder');
    if (t[key]) {
      el.setAttribute('placeholder', t[key]);
    }
  });
}

// Router
function navigateTo(route) {
  window.location.hash = route;
}

function handleRouting() {
  const rawHash = window.location.hash.replace('#', '') || 'welcome';
  const cleanRoute = rawHash.split('?')[0];
  APP_STATE.currentRoute = cleanRoute;

  // Hide all views
  const views = document.querySelectorAll('.app-view');
  views.forEach(v => v.classList.add('hidden'));

  // Show active view
  const targetView = document.getElementById(`view-${cleanRoute}`) || document.getElementById('view-welcome');
  if (targetView) {
    targetView.classList.remove('hidden');
    targetView.classList.add('fade-in-up');
  }

  // Update navigation headers & sidebars visibility
  const appShell = document.getElementById('app-shell-container');
  const isPublicPage = ['welcome', 'login', 'onboarding'].includes(cleanRoute);
  
  if (appShell) {
    if (isPublicPage) {
      appShell.classList.add('hidden');
      document.body.classList.remove('md:pl-80', 'pt-16', 'pb-20');
    } else {
      appShell.classList.remove('hidden');
      document.body.classList.add('md:pl-80', 'pt-16', 'pb-20');
    }
  }

  // Update active navigation link styling
  document.querySelectorAll('.nav-link').forEach(link => {
    const route = link.getAttribute('data-route');
    if (route === cleanRoute) {
      link.classList.add('bg-secondary-container', 'text-on-secondary-container', 'font-semibold');
      link.classList.remove('text-on-surface-variant');
    } else {
      link.classList.remove('bg-secondary-container', 'text-on-secondary-container', 'font-semibold');
      link.classList.add('text-on-surface-variant');
    }
  });

  // Close mobile drawer on route change
  closeDrawer();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Drawer Controls
function openDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
  }
}

function closeDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
  }
}

// Simulated AI Crop Scan Flow
let currentSelectedSample = 'onion';

function selectSampleLeaf(sampleType) {
  currentSelectedSample = sampleType;
  const sampleMap = {
    onion: {
      crop: 'Onion (कांदा / प्याज)',
      disease: 'Purple Blotch (Stemphylium vesicarium)',
      confidence: '98%',
      severity: 'Moderate (28% affected leaf area)',
      recommendation: 'Spray Mancozeb 75% WP @ 2.5g/L or Hexaconazole 5% EC @ 1ml/L.',
      actionRequired: 'Apply preventative fungicide before upcoming rains.'
    },
    tomato: {
      crop: 'Tomato (टोमॅटो / टमाटर)',
      disease: 'Early Blight (Alternaria solani)',
      confidence: '95%',
      severity: 'Mild (12% affected)',
      recommendation: 'Apply Chlorothalonil 75% WP or Copper Oxychloride 50% WP @ 2.5g/L.',
      actionRequired: 'Remove affected lower foliage and improve airflow.'
    },
    wheat: {
      crop: 'Wheat (गहू / गेहूं)',
      disease: 'Yellow Rust (Puccinia striiformis)',
      confidence: '99%',
      severity: 'Critical (42% affected)',
      recommendation: 'Spray Propiconazole 25% EC (Tilt) @ 1ml/L immediately.',
      actionRequired: 'Urgent containment needed to prevent spread across plot.'
    },
    healthy: {
      crop: 'Onion (कांदा / प्याज)',
      disease: 'Healthy Crop (निरोगी पीक)',
      confidence: '99.4%',
      severity: 'No infection detected',
      recommendation: 'Maintain standard micro-nutrient schedule & soil moisture.',
      actionRequired: 'No pesticide needed.'
    }
  };

  APP_STATE.activeScanResult = sampleMap[sampleType] || sampleMap.onion;

  // Highlight selected sample leaf
  document.querySelectorAll('.sample-leaf-btn').forEach(btn => {
    if (btn.getAttribute('data-sample') === sampleType) {
      btn.classList.add('ring-2', 'ring-primary', 'scale-105');
    } else {
      btn.classList.remove('ring-2', 'ring-primary', 'scale-105');
    }
  });
}

function runCropScan() {
  const scanOverlay = document.getElementById('scan-processing-modal');
  const scanProgressText = document.getElementById('scan-progress-text');
  if (scanOverlay) scanOverlay.classList.remove('hidden');

  const steps = [
    'Initializing Neural Vision model...',
    'Segmenting leaf contours & chlorophyll index...',
    'Detecting pathogen signatures...',
    'Cross-referencing agritech disease database...',
    'Generating diagnosis report...'
  ];

  let stepIdx = 0;
  const interval = setInterval(() => {
    if (stepIdx < steps.length) {
      if (scanProgressText) scanProgressText.textContent = steps[stepIdx];
      stepIdx++;
    } else {
      clearInterval(interval);
      if (scanOverlay) scanOverlay.classList.add('hidden');
      updateCropAnalysisView();
      navigateTo('crop-analysis');
    }
  }, 450);
}

function updateCropAnalysisView() {
  const res = APP_STATE.activeScanResult;
  const elCrop = document.getElementById('analysis-crop-name');
  const elDisease = document.getElementById('analysis-disease-name');
  const elConfidence = document.getElementById('analysis-confidence');
  const elSeverity = document.getElementById('analysis-severity');
  const elRec = document.getElementById('analysis-recommendation');
  const elAction = document.getElementById('analysis-action');

  if (elCrop) elCrop.textContent = res.crop;
  if (elDisease) elDisease.textContent = res.disease;
  if (elConfidence) elConfidence.textContent = res.confidence;
  if (elSeverity) elSeverity.textContent = res.severity;
  if (elRec) elRec.textContent = res.recommendation;
  if (elAction) elAction.textContent = res.actionRequired;
}

// AI Mentor Conversational Chat Engine
const CHAT_HISTORY = [
  {
    sender: 'ai',
    text: 'Namaste Ramesh ji! 🙏 I am your Kisan AI Mentor. How can I help you today with your Onion crop or farm schemes?',
    time: '10:00 AM'
  }
];

function renderChatMessages() {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  container.innerHTML = '';
  CHAT_HISTORY.forEach(msg => {
    const isUser = msg.sender === 'user';
    const bubble = document.createElement('div');
    bubble.className = `flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 fade-in-up`;
    bubble.innerHTML = `
      <div class="flex items-start gap-2 max-w-[85%] md:max-w-[70%] ${isUser ? 'flex-row-reverse' : 'flex-row'}">
        <div class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${isUser ? 'bg-secondary text-white' : 'bg-primary text-white'} text-sm">
          <span class="material-symbols-outlined text-base">${isUser ? 'person' : 'smart_toy'}</span>
        </div>
        <div class="p-3.5 rounded-2xl ${isUser ? 'bg-primary text-white rounded-tr-none' : 'bg-surface-container-lowest border border-sage text-on-surface rounded-tl-none'} shadow-sm">
          <p class="text-sm md:text-base leading-relaxed">${msg.text}</p>
          <div class="flex justify-between items-center mt-1 text-[11px] opacity-70">
            <span>${msg.time}</span>
            ${!isUser ? `<button onclick="speakText('${msg.text.replace(/'/g, "\\'")}')" class="ml-2 hover:opacity-100 flex items-center gap-0.5"><span class="material-symbols-outlined text-xs">volume_up</span> Speak</button>` : ''}
          </div>
        </div>
      </div>
    `;
    container.appendChild(bubble);
  });
  container.scrollTop = container.scrollHeight;
}

function sendChatMessage(text) {
  const query = text || (document.getElementById('chat-input') ? document.getElementById('chat-input').value.trim() : '');
  if (!query) return;

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  CHAT_HISTORY.push({ sender: 'user', text: query, time: now });
  if (document.getElementById('chat-input')) document.getElementById('chat-input').value = '';
  renderChatMessages();

  // Show typing indicator
  setTimeout(() => {
    const answer = generateAIResponse(query);
    const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    CHAT_HISTORY.push({ sender: 'ai', text: answer, time: replyTime });
    renderChatMessages();
  }, 600);
}

function generateAIResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('purple blotch') || q.includes('disease') || q.includes('रोग') || q.includes('करपा')) {
    return "For Purple Blotch in Onion, spray Mancozeb 75% WP @ 2.5g per litre of water or Hexaconazole 5% EC @ 1ml/L. Ensure good sticker (wetting agent) is added, and apply during a dry morning window before the forecasted rainfall.";
  } else if (q.includes('rain') || q.includes('weather') || q.includes('irrigation') || q.includes('पाऊस') || q.includes('हवामान')) {
    return "Nashik district forecast shows a 72% probability of moderate shower in the next 24 hours. We recommend postponing flood/drip irrigation by 48 hours to prevent soil waterlogging and root asphyxiation.";
  } else if (q.includes('scheme') || q.includes('subsidy') || q.includes('pm kisan') || q.includes('योजना') || q.includes('अनुदान')) {
    return "Under Maharashtra's Magel Tyala Saur Krushi Pump & PM-KUSUM, you are eligible for an 90% subsidy on a 5HP solar irrigation pump. Also, the 17th installment of PM-KISAN (₹2,000) has been credited to verified Aadhaar linked accounts.";
  } else if (q.includes('fertilizer') || q.includes('onion') || q.includes('खाद') || q.includes('खत')) {
    return "For onions at 45 days after transplanting (bulb development phase), apply Nitrogen:Potash in 1:2 ratio. You can top-dress 19:19:19 @ 5kg/acre via drip fertigation, complemented with Micronutrient spray (Zinc + Boron).";
  } else {
    return "I understand your query regarding your farm operations. Based on your 2-acre plot in Nashik with clay loam soil, maintaining regulated drip moisture and monitoring for seasonal pests will yield an estimated 18-20% higher output. Would you like a detailed step-by-step action plan?";
  }
}

// Schemes Filter Logic
function filterSchemes(category) {
  document.querySelectorAll('.scheme-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-category') === category) {
      btn.classList.add('bg-primary', 'text-on-primary');
      btn.classList.remove('bg-surface-container', 'text-on-surface');
    } else {
      btn.classList.remove('bg-primary', 'text-on-primary');
      btn.classList.add('bg-surface-container', 'text-on-surface');
    }
  });

  document.querySelectorAll('.scheme-card').forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

function openSchemeModal(schemeTitle, subsidyPercent) {
  const modal = document.getElementById('scheme-apply-modal');
  const titleEl = document.getElementById('scheme-modal-title');
  const subsidyEl = document.getElementById('scheme-modal-subsidy');
  if (titleEl) titleEl.textContent = schemeTitle;
  if (subsidyEl) subsidyEl.textContent = subsidyPercent;
  if (modal) modal.classList.remove('hidden');
}

function closeSchemeModal() {
  const modal = document.getElementById('scheme-apply-modal');
  if (modal) modal.classList.add('hidden');
}

// Initialize Application
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateLanguageUI();
  updateThemeIcons();
  handleRouting();

  window.addEventListener('hashchange', handleRouting);

  // Setup form submit handlers
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      navigateTo('dashboard');
    });
  }

  const onboardingForm = document.getElementById('onboarding-form');
  if (onboardingForm) {
    onboardingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      navigateTo('dashboard');
    });
  }

  renderChatMessages();
});
