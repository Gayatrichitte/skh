/**
 * KisanSathi - Intelligent Agritech Platform
 * Features:
 * 1. Firebase v12.18.0 Modular SDK (Analytics, Auth, Google Sign-In, Email/Phone, Demo Guest Auth)
 * 2. Open-Meteo High-Resolution Real-Time Weather & Agromet Engine
 * 3. Interactive Leaflet GIS & Satellite Maps with Pin Pointing
 * 4. Multi-language Support (Marathi, Hindi, English)
 * 5. Conversational AI Mentor & Leaf Scanner Diagnostics
 */

const APP_STATE = {
  language: localStorage.getItem('kisansathi_lang') || 'en', // 'mr', 'hi', 'en'
  darkMode: localStorage.getItem('kisansathi_theme') === 'dark',
  currentUser: null,
  user: {
    name: 'Ramesh Patil',
    role: 'Premium Farmer',
    location: 'Nashik, Maharashtra',
    crop: 'Onion',
    landSize: '2 Acres',
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
  },
  weather: null
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
    rainExpected: "Rain is expected within 24 hours.",
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
    rainExpected: "अगले 24 घंटों में बारिश की संभावना है।",
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
    rainExpected: "पुढील २४ तासांत पाऊस पडण्याची शक्यता आहे.",
    scanTitle: "एआई पीक रोग स्कॅनर",
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

  // Invalidate Leaflet maps on route change to ensure smooth tiles rendering
  if (cleanRoute === 'weather') {
    setTimeout(() => {
      WEATHER_SERVICE.initWeatherMap();
      WEATHER_SERVICE.refreshMapSize();
    }, 150);
  }

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

// ==========================================
// FIREBASE MODULAR AUTHENTICATION SERVICE (v12.18.0)
// ==========================================
window.AUTH_SERVICE = {
  authMode: 'signin', // 'signin' or 'signup'

  initAuth() {
    this.bindModularAuth();
  },

  bindModularAuth() {
    if (window.firebaseAuth && window.firebaseAuthMethods) {
      const { onAuthStateChanged } = window.firebaseAuthMethods;
      onAuthStateChanged(window.firebaseAuth, (user) => {
        if (user) {
          APP_STATE.currentUser = user;
          const name = user.displayName || (user.email ? user.email.split('@')[0] : 'Ramesh Patil');
          APP_STATE.user.name = name;
          APP_STATE.user.phone = user.phoneNumber || user.email || '+91 98234 56789';

          WEATHER_SERVICE.renderProfileLocations();

          if (['login', 'welcome'].includes(APP_STATE.currentRoute)) {
            navigateTo('dashboard');
          }
        } else {
          APP_STATE.currentUser = null;
        }
      });
    }
  },

  switchTab(mode) {
    this.authMode = mode;
    const tabIn = document.getElementById('tab-sign-in');
    const tabUp = document.getElementById('tab-sign-up');
    const nameField = document.getElementById('signup-name-field');
    const heading = document.getElementById('auth-heading');
    const btnText = document.getElementById('auth-btn-text');

    this.hideAlert();

    if (mode === 'signup') {
      if (tabUp) tabUp.className = 'flex-1 py-2 rounded-lg bg-primary text-on-primary shadow-sm transition-all text-center';
      if (tabIn) tabIn.className = 'flex-1 py-2 rounded-lg text-outline hover:text-primary transition-all text-center';
      if (nameField) nameField.classList.remove('hidden');
      if (heading) heading.textContent = 'Create Farm Account';
      if (btnText) btnText.textContent = 'Register & Setup Farm';
    } else {
      if (tabIn) tabIn.className = 'flex-1 py-2 rounded-lg bg-primary text-on-primary shadow-sm transition-all text-center';
      if (tabUp) tabUp.className = 'flex-1 py-2 rounded-lg text-outline hover:text-primary transition-all text-center';
      if (nameField) nameField.classList.add('hidden');
      if (heading) heading.textContent = 'Welcome Back';
      if (btnText) btnText.textContent = 'Login to Farm';
    }
  },

  normalizeEmail(input) {
    const trimmed = input.trim();
    if (trimmed.includes('@')) return trimmed;
    const digits = trimmed.replace(/\D/g, '');
    return `${digits || 'farmer'}@kisansathi.agri`;
  },

  async handleFormSubmit() {
    const emailInput = document.getElementById('auth-email-input');
    const passwordInput = document.getElementById('auth-password-input');
    const nameInput = document.getElementById('auth-name-input');

    if (!emailInput || !passwordInput) return;

    const email = this.normalizeEmail(emailInput.value);
    const password = passwordInput.value;
    const name = nameInput && nameInput.value ? nameInput.value.trim() : 'Farmer';

    const submitBtn = document.getElementById('auth-submit-btn');
    if (submitBtn) submitBtn.disabled = true;

    try {
      if (window.firebaseAuth && window.firebaseAuthMethods) {
        const { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } = window.firebaseAuthMethods;

        if (this.authMode === 'signup') {
          const cred = await createUserWithEmailAndPassword(window.firebaseAuth, email, password);
          if (cred.user && name) {
            await updateProfile(cred.user, { displayName: name });
          }
          APP_STATE.user.name = name;
          this.showAlert('Account created successfully! Welcome to KisanSathi.', 'success');
          setTimeout(() => navigateTo('onboarding'), 600);
        } else {
          await signInWithEmailAndPassword(window.firebaseAuth, email, password);
          this.showAlert('Login successful! Loading your farm dashboard...', 'success');
          setTimeout(() => navigateTo('dashboard'), 500);
        }
      } else {
        APP_STATE.user.name = name || 'Ramesh Patil';
        navigateTo('dashboard');
      }
    } catch (err) {
      console.warn('Firebase Auth Note:', err);
      let msg = err.message || 'Authentication error';
      
      if (err.code === 'auth/configuration-not-found') {
        msg = "⚠️ Firebase Auth not yet enabled in Console. Logging you in via Demo mode...";
        this.showAlert(msg, 'success');
        APP_STATE.user.name = name || 'Ramesh Patil';
        setTimeout(() => navigateTo('dashboard'), 900);
        return;
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = 'Invalid credentials. You can use Quick Demo Sign-In or Register a new account.';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = 'An account with this email/number already exists. Please Sign In.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      }
      this.showAlert(msg, 'error');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  },

  async signInWithGoogle() {
    try {
      if (window.firebaseAuth && window.firebaseAuthMethods) {
        const { signInWithPopup, GoogleAuthProvider } = window.firebaseAuthMethods;
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(window.firebaseAuth, provider);
        if (result.user) {
          APP_STATE.user.name = result.user.displayName || 'Farmer';
          this.showAlert(`Welcome ${APP_STATE.user.name}!`, 'success');
          setTimeout(() => navigateTo('dashboard'), 500);
        }
      } else {
        this.signInDemoFarmer();
      }
    } catch (err) {
      console.warn('Google Sign-In note:', err);
      if (err.code === 'auth/configuration-not-found' || err.code === 'auth/operation-not-allowed') {
        this.showAlert("Google Provider not yet enabled in Firebase Console. Logging in as Demo Farmer...", 'success');
        setTimeout(() => this.signInDemoFarmer(), 800);
      } else {
        this.showAlert(err.message || 'Google sign-in was cancelled.', 'error');
      }
    }
  },

  async signInDemoFarmer() {
    try {
      if (window.firebaseAuth && window.firebaseAuthMethods) {
        const { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signInAnonymously } = window.firebaseAuthMethods;
        try {
          await signInWithEmailAndPassword(window.firebaseAuth, 'ramesh.patil@kisansathi.agri', 'kisan1234');
        } catch (e) {
          try {
            const cred = await createUserWithEmailAndPassword(window.firebaseAuth, 'ramesh.patil@kisansathi.agri', 'kisan1234');
            if (cred.user) {
              await updateProfile(cred.user, { displayName: 'Ramesh Patil' });
            }
          } catch (e2) {
            try {
              await signInAnonymously(window.firebaseAuth);
            } catch (e3) {
              console.log('Using local session fallback');
            }
          }
        }
      }
    } catch (err) {
      console.warn('Demo login note:', err);
    }
    APP_STATE.user.name = 'Ramesh Patil';
    APP_STATE.user.location = 'Nashik, Maharashtra';
    APP_STATE.user.crop = 'Onion';
    WEATHER_SERVICE.renderProfileLocations();
    navigateTo('dashboard');
  },

  async forgotPassword() {
    const emailInput = document.getElementById('auth-email-input');
    const rawVal = emailInput ? emailInput.value : '';
    const email = prompt('Enter your registered email address to receive password reset link:', rawVal || '');
    if (!email) return;

    try {
      if (window.firebaseAuth && window.firebaseAuthMethods) {
        const { sendPasswordResetEmail } = window.firebaseAuthMethods;
        await sendPasswordResetEmail(window.firebaseAuth, email.trim());
        alert(`Password reset link sent to ${email}. Please check your inbox.`);
      } else {
        alert('Password reset link simulated for ' + email);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  },

  async logout() {
    try {
      if (window.firebaseAuth && window.firebaseAuthMethods) {
        const { signOut } = window.firebaseAuthMethods;
        await signOut(window.firebaseAuth);
      }
    } catch (e) {
      console.warn(e);
    }
    APP_STATE.currentUser = null;
    navigateTo('welcome');
  },

  showAlert(message, type = 'error') {
    const alertEl = document.getElementById('auth-alert');
    if (!alertEl) return;

    alertEl.textContent = message;
    alertEl.classList.remove('hidden', 'bg-error/15', 'text-error', 'border-error/40', 'bg-leaf/15', 'text-leaf', 'border-leaf/40');
    
    if (type === 'success') {
      alertEl.classList.add('bg-leaf/15', 'text-leaf', 'border', 'border-leaf/40');
    } else {
      alertEl.classList.add('bg-error/15', 'text-error', 'border', 'border-error/40');
    }
  },

  hideAlert() {
    const alertEl = document.getElementById('auth-alert');
    if (alertEl) alertEl.classList.add('hidden');
  }
};

// ==========================================
// OPEN-METEO & LEAFLET AGRO-GIS MAP SERVICE
// ==========================================

const WEATHER_SERVICE = {
  activeLocationName: 'Nashik, Maharashtra',
  latitude: 19.9973,
  longitude: 73.7910,
  rawData: null,
  analysis: null,
  isFetching: false,

  // Leaflet Map Properties
  weatherMap: null,
  weatherMarker: null,
  onboardingMap: null,
  onboardingMarker: null,
  activeLayerType: 'street',
  tileLayers: {},

  // WMO Weather interpretation codes
  decodeWMO(code, isDay = 1) {
    const table = {
      0: { label: 'Clear Sky', icon: isDay ? 'wb_sunny' : 'clear_night', iconClass: 'text-amber-500' },
      1: { label: 'Mainly Clear', icon: isDay ? 'partly_cloudy_day' : 'partly_cloudy_night', iconClass: 'text-yellow-500' },
      2: { label: 'Partly Cloudy', icon: isDay ? 'partly_cloudy_day' : 'partly_cloudy_night', iconClass: 'text-blue-400' },
      3: { label: 'Overcast Cloud Cover', icon: 'cloud', iconClass: 'text-gray-400' },
      45: { label: 'Foggy / Hazy', icon: 'foggy', iconClass: 'text-gray-400' },
      48: { label: 'Depositing Rime Fog', icon: 'foggy', iconClass: 'text-gray-400' },
      51: { label: 'Light Drizzle', icon: 'rainy', iconClass: 'text-blue-500' },
      53: { label: 'Moderate Drizzle', icon: 'rainy', iconClass: 'text-blue-500' },
      55: { label: 'Heavy Drizzle', icon: 'rainy', iconClass: 'text-blue-600' },
      61: { label: 'Slight Rain', icon: 'rainy', iconClass: 'text-leaf' },
      63: { label: 'Moderate Rain Showers', icon: 'rainy', iconClass: 'text-leaf' },
      65: { label: 'Heavy Rain Band', icon: 'thunderstorm', iconClass: 'text-blue-600' },
      80: { label: 'Scattered Rain Showers', icon: 'rainy', iconClass: 'text-leaf' },
      81: { label: 'Moderate Showers', icon: 'rainy', iconClass: 'text-blue-600' },
      82: { label: 'Violent Cloudburst', icon: 'thunderstorm', iconClass: 'text-purple-600' },
      95: { label: 'Thunderstorm', icon: 'thunderstorm', iconClass: 'text-amber-600' },
      96: { label: 'Thunderstorm with Hail', icon: 'thunderstorm', iconClass: 'text-red-500' },
      99: { label: 'Severe Hailstorm Alert', icon: 'thunderstorm', iconClass: 'text-red-600' }
    };
    return table[code] || { label: 'Partly Cloudy', icon: 'partly_cloudy_day', iconClass: 'text-yellow-500' };
  },

  // Geocoding API: Open-Meteo Geocoding
  async fetchGeocoding(query) {
    const cleanQuery = query.split(',')[0].trim();
    const primaryUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanQuery)}&count=1&countryCode=IN`;
    
    try {
      const resp = await fetch(primaryUrl);
      if (!resp.ok) throw new Error('Geocoding fetch failed');
      const json = await resp.json();
      
      if (json.results && json.results.length > 0) {
        const top = json.results[0];
        const state = top.admin1 ? `, ${top.admin1}` : '';
        return {
          name: `${top.name}${state}`,
          lat: top.latitude,
          lon: top.longitude,
          timezone: top.timezone || 'Asia/Kolkata'
        };
      }
      
      // Fallback without country code filter
      const fallbackUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanQuery)}&count=1`;
      const fbResp = await fetch(fallbackUrl);
      const fbJson = await fbResp.json();
      if (fbJson.results && fbJson.results.length > 0) {
        const top = fbJson.results[0];
        const state = top.admin1 ? `, ${top.admin1}` : '';
        return {
          name: `${top.name}${state}`,
          lat: top.latitude,
          lon: top.longitude,
          timezone: top.timezone || 'auto'
        };
      }
    } catch (err) {
      console.warn('Geocoding request failed:', err);
    }
    
    return {
      name: query,
      lat: 19.9973,
      lon: 73.7910,
      timezone: 'Asia/Kolkata'
    };
  },

  // Forecast API: Open-Meteo Forecast
  async fetchForecast(lat, lon, timezone = 'auto') {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&timezone=${timezone || 'auto'}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Weather forecast API error');
    return await resp.json();
  },

  // Agro-meteorological risk algorithm
  analyzeAgroRisk(current, daily, cropType = APP_STATE.user.crop) {
    const curTemp = current.temperature_2m || 26;
    const humidity = current.relative_humidity_2m || 70;
    const windSpeed = current.wind_speed_10m || 10;
    const maxRainProb24h = (daily && daily.precipitation_probability_max && daily.precipitation_probability_max[0]) || 0;
    const precipSum24h = (daily && daily.precipitation_sum && daily.precipitation_sum[0]) || 0;
    const maxRainProb48h = (daily && daily.precipitation_probability_max && daily.precipitation_probability_max[1]) || 0;
    const weatherInfo = this.decodeWMO(current.weather_code, current.is_day);

    // 1. IRRIGATION ADVISORY
    let irrigation = {};
    if (maxRainProb24h >= 45 || precipSum24h >= 1.5 || maxRainProb48h >= 60) {
      irrigation = {
        badgeText: 'Postpone Irrigation',
        badgeClass: 'bg-warning/20 text-warning',
        taskTitle: 'Delay Irrigation',
        taskDesc: `Rain expected in ${this.activeLocationName} (${maxRainProb24h}% prob, ~${precipSum24h.toFixed(1)}mm). Delay irrigation 24-48 hrs to prevent root asphyxiation.`,
        actionLabel: 'Postpone Drip Cycle',
        soilNeed: 'Sufficient / Rain Inbound'
      };
    } else if (curTemp > 33 && humidity < 40) {
      irrigation = {
        badgeText: 'Irrigate Today',
        badgeClass: 'bg-leaf/20 text-leaf',
        taskTitle: 'Schedule Irrigation',
        taskDesc: `High evapotranspiration due to ${curTemp}°C temperature and low humidity (${humidity}%). Run drip irrigation in early morning or dusk for ~2.5 hrs.`,
        actionLabel: 'Irrigate Today',
        soilNeed: 'High Evaporation Deficit'
      };
    } else {
      irrigation = {
        badgeText: 'Normal Routine',
        badgeClass: 'bg-primary/20 text-primary',
        taskTitle: 'Maintain Regular Schedule',
        taskDesc: `Balanced weather (${curTemp}°C, ${humidity}% humidity). Maintain standard drip fertigation schedule for ${cropType}.`,
        actionLabel: 'Standard Schedule',
        soilNeed: 'Optimal Moisture'
      };
    }

    // 2. SPRAYING WINDOW ADVISORY
    let spraying = {};
    if (windSpeed > 18) {
      spraying = {
        badgeText: 'Unfavorable',
        badgeClass: 'bg-error/20 text-error',
        desc: `High wind speed of ${windSpeed} km/h risks severe pesticide drift. Postpone foliar spraying until wind drops below 14 km/h.`,
        driftRisk: 'High Wind Drift Risk'
      };
    } else if (maxRainProb24h >= 60) {
      spraying = {
        badgeText: 'Rain Wash-off Risk',
        badgeClass: 'bg-error/20 text-error',
        desc: `Rain chance is ${maxRainProb24h}%. Fungicide sprays may wash off before absorption. Wait for a 6-hour dry window.`,
        driftRisk: 'Wash-off Threat'
      };
    } else if (windSpeed <= 14 && maxRainProb24h < 30) {
      spraying = {
        badgeText: 'Ideal Spray Window',
        badgeClass: 'bg-leaf/20 text-leaf',
        desc: `Calm wind (${windSpeed} km/h) and clear canopy. Excellent window for preventative fungicide and micro-nutrient foliar spray.`,
        driftRisk: 'Calm & Safe (< 14 km/h)'
      };
    } else {
      spraying = {
        badgeText: 'Moderate Caution',
        badgeClass: 'bg-warning/20 text-warning',
        desc: `Moderate conditions (${windSpeed} km/h wind, ${maxRainProb24h}% rain). Use spreader/sticker adjuvant if spraying is urgent.`,
        driftRisk: 'Moderate Drift'
      };
    }

    // 3. FUNGAL & PEST RISK
    let fungal = {};
    if (humidity >= 78 && curTemp >= 20 && curTemp <= 32) {
      fungal = {
        badgeText: 'High Fungal Alert',
        badgeClass: 'bg-error/20 text-error',
        desc: `High humidity (${humidity}%) and warm temperatures (${curTemp}°C) accelerate Purple Blotch, Downy Mildew, and Thrips in ${cropType}.`,
        pathogenIndex: 'Critical Spore Propagation'
      };
    } else if (humidity >= 60) {
      fungal = {
        badgeText: 'Moderate Risk',
        badgeClass: 'bg-warning/20 text-warning',
        desc: `Relative humidity is ${humidity}%. Scout field boundaries and lower canopy for early pathogen lesions.`,
        pathogenIndex: 'Elevated Spore Activity'
      };
    } else {
      fungal = {
        badgeText: 'Low Risk',
        badgeClass: 'bg-leaf/20 text-leaf',
        desc: `Dry atmospheric air (${humidity}% humidity) naturally inhibits fungal spore germination on foliage.`,
        pathogenIndex: 'Pathogen Dormant'
      };
    }

    // Spoken strings
    const spokenEn = `Real-time agro weather for ${this.activeLocationName}: Currently ${curTemp}°C, ${weatherInfo.label} with ${humidity}% humidity and ${windSpeed} km/h wind. Rain probability is ${maxRainProb24h}%. Agro-Advisory: ${irrigation.taskTitle} - ${irrigation.taskDesc}`;
    const spokenHi = `मौसम सलाह ${this.activeLocationName}: तापमान ${curTemp}°C, नमी ${humidity}% और हवा की गति ${windSpeed} किमी/घंटा है। बारिश की संभावना ${maxRainProb24h}% है। सलाह: ${irrigation.taskTitle}।`;
    const spokenMr = `हवामान सल्ला ${this.activeLocationName}: तापमान ${curTemp}°C, आर्द्रता ${humidity}% आणि वाऱ्याचा वेग ${windSpeed} किमी/तास आहे. पाऊस पडण्याची शक्यता ${maxRainProb24h}% आहे. सल्ला: ${irrigation.taskTitle}।`;

    return {
      curTemp,
      humidity,
      windSpeed,
      precipSum24h,
      maxRainProb24h,
      weatherInfo,
      irrigation,
      spraying,
      fungal,
      spoken: {
        en: spokenEn,
        hi: spokenHi,
        mr: spokenMr
      }
    };
  },

  // ==========================================
  // LEAFLET MAP INTEGRATION & EVENT HANDLERS
  // ==========================================

  createCustomMarkerIcon(label = 'Farm Pin') {
    if (typeof L === 'undefined') return null;
    return L.divIcon({
      className: 'custom-farm-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="w-10 h-10 rounded-full bg-primary border-2 border-white shadow-xl flex items-center justify-center text-white text-base animate-bounce">
            <span class="material-symbols-outlined text-lg text-secondary-container">agriculture</span>
          </div>
          <div class="absolute -bottom-1 w-3 h-1 bg-charcoal/40 rounded-full blur-[1px]"></div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 38],
      popupAnchor: [0, -38]
    });
  },

  initWeatherMap() {
    const mapContainer = document.getElementById('weather-leaflet-map');
    if (!mapContainer || typeof L === 'undefined') return;

    if (this.weatherMap) {
      this.weatherMap.invalidateSize();
      return;
    }

    this.weatherMap = L.map('weather-leaflet-map', {
      center: [this.latitude, this.longitude],
      zoom: 11,
      zoomControl: true
    });

    this.tileLayers = {
      street: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }),
      satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: '&copy; Esri & NASA Earth'
      }),
      topo: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: '&copy; OpenTopoMap'
      })
    };

    this.tileLayers.street.addTo(this.weatherMap);

    const icon = this.createCustomMarkerIcon();
    this.weatherMarker = L.marker([this.latitude, this.longitude], {
      draggable: true,
      icon: icon || undefined
    }).addTo(this.weatherMap);

    this.weatherMarker.on('dragend', (e) => {
      const pos = e.target.getLatLng();
      this.handleMapLocationSelect(pos.lat, pos.lng);
    });

    this.weatherMap.on('click', (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      this.handleMapLocationSelect(lat, lng);
    });

    this.updateMarkerPopup();
  },

  switchMapLayer(layerType) {
    if (!this.weatherMap || !this.tileLayers[layerType]) return;

    Object.values(this.tileLayers).forEach(layer => {
      if (this.weatherMap.hasLayer(layer)) {
        this.weatherMap.removeLayer(layer);
      }
    });

    this.tileLayers[layerType].addTo(this.weatherMap);
    this.activeLayerType = layerType;

    ['street', 'satellite', 'topo'].forEach(type => {
      const btn = document.getElementById(`map-layer-${type}`);
      if (btn) {
        if (type === layerType) {
          btn.className = 'px-2.5 py-1 rounded-lg font-semibold bg-primary text-on-primary transition-all';
        } else {
          btn.className = 'px-2.5 py-1 rounded-lg font-medium text-outline hover:text-primary transition-all';
        }
      }
    });
  },

  locateFarmerOnMap() {
    if (this.weatherMap) {
      this.weatherMap.flyTo([this.latitude, this.longitude], 12, { animate: true, duration: 1.2 });
    }
  },

  async handleMapLocationSelect(lat, lon) {
    this.latitude = lat;
    this.longitude = lon;

    if (this.weatherMarker) {
      this.weatherMarker.setLatLng([lat, lon]);
    }

    const coordsBadge = document.getElementById('map-coords-badge');
    if (coordsBadge) {
      coordsBadge.textContent = `Lat: ${lat.toFixed(4)}°N, Lon: ${lon.toFixed(4)}°E`;
    }

    try {
      const forecast = await this.fetchForecast(lat, lon);
      this.rawData = forecast;
      this.activeLocationName = `Sector (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E)`;
      APP_STATE.user.location = this.activeLocationName;

      this.analysis = this.analyzeAgroRisk(forecast.current, forecast.daily, APP_STATE.user.crop);
      APP_STATE.weather = {
        location: this.activeLocationName,
        lat,
        lon,
        current: forecast.current,
        daily: forecast.daily,
        analysis: this.analysis
      };

      this.renderWeatherView();
      this.renderDashboardWeather();
      this.renderProfileLocations();
      this.updateMarkerPopup();
    } catch (err) {
      console.error('Error fetching weather on map select:', err);
    }
  },

  updateMarkerPopup() {
    if (!this.weatherMarker || !this.analysis) return;
    const a = this.analysis;
    const popupContent = `
      <div class="p-2 text-center text-charcoal font-sans">
        <div class="flex items-center justify-center gap-1 text-xs font-bold text-primary mb-1">
          <span class="material-symbols-outlined text-sm text-leaf">eco</span>
          <span>${this.activeLocationName}</span>
        </div>
        <p class="text-xl font-black text-primary">${Math.round(a.curTemp)}°C</p>
        <p class="text-[11px] text-outline">${a.weatherInfo.label}</p>
        <div class="mt-2 pt-1 border-t border-sage/60 text-[10px] font-semibold text-leaf">
          💧 Rain Prob: ${a.maxRainProb24h}%
        </div>
      </div>
    `;
    this.weatherMarker.bindPopup(popupContent).openPopup();
  },

  refreshMapSize() {
    if (this.weatherMap) {
      this.weatherMap.invalidateSize();
    }
    if (this.onboardingMap) {
      this.onboardingMap.invalidateSize();
    }
  },

  toggleOnboardingMap() {
    const wrap = document.getElementById('onboarding-map-wrap');
    if (!wrap) return;

    if (wrap.classList.contains('hidden')) {
      wrap.classList.remove('hidden');
      setTimeout(() => {
        this.initOnboardingMap();
        if (this.onboardingMap) this.onboardingMap.invalidateSize();
      }, 100);
    } else {
      wrap.classList.add('hidden');
    }
  },

  initOnboardingMap() {
    const container = document.getElementById('onboarding-leaflet-map');
    if (!container || typeof L === 'undefined') return;

    if (this.onboardingMap) {
      this.onboardingMap.invalidateSize();
      return;
    }

    this.onboardingMap = L.map('onboarding-leaflet-map', {
      center: [this.latitude, this.longitude],
      zoom: 9,
      zoomControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OSM'
    }).addTo(this.onboardingMap);

    const icon = this.createCustomMarkerIcon();
    this.onboardingMarker = L.marker([this.latitude, this.longitude], {
      draggable: true,
      icon: icon || undefined
    }).addTo(this.onboardingMap);

    const updateOnboardingPos = (lat, lng) => {
      this.latitude = lat;
      this.longitude = lng;
      this.onboardingMarker.setLatLng([lat, lng]);
      const locInput = document.getElementById('onboarding-location');
      if (locInput) {
        locInput.value = `Farm Plot (${lat.toFixed(3)}°N, ${lng.toFixed(3)}°E)`;
      }
    };

    this.onboardingMap.on('click', (e) => {
      updateOnboardingPos(e.latlng.lat, e.latlng.lng);
    });

    this.onboardingMarker.on('dragend', (e) => {
      const pos = e.target.getLatLng();
      updateOnboardingPos(pos.lat, pos.lng);
    });
  },

  async searchAndLoadWeather(locationQuery) {
    if (this.isFetching) return;
    this.isFetching = true;

    try {
      const searchInput = document.getElementById('weather-search-input');
      if (searchInput) searchInput.value = locationQuery;

      const geo = await this.fetchGeocoding(locationQuery);
      this.activeLocationName = geo.name;
      this.latitude = geo.lat;
      this.longitude = geo.lon;

      APP_STATE.user.location = geo.name;

      const forecast = await this.fetchForecast(geo.lat, geo.lon, geo.timezone);
      this.rawData = forecast;
      this.analysis = this.analyzeAgroRisk(forecast.current, forecast.daily, APP_STATE.user.crop);
      APP_STATE.weather = {
        location: geo.name,
        lat: geo.lat,
        lon: geo.lon,
        current: forecast.current,
        daily: forecast.daily,
        analysis: this.analysis
      };

      this.renderWeatherView();
      this.renderDashboardWeather();
      this.renderProfileLocations();

      if (this.weatherMap) {
        this.weatherMap.flyTo([geo.lat, geo.lon], 11, { animate: true, duration: 1.0 });
        if (this.weatherMarker) {
          this.weatherMarker.setLatLng([geo.lat, geo.lon]);
          this.updateMarkerPopup();
        }
      }

      const coordsBadge = document.getElementById('map-coords-badge');
      if (coordsBadge) {
        coordsBadge.textContent = `Lat: ${geo.lat.toFixed(3)}°N, Lon: ${geo.lon.toFixed(3)}°E`;
      }
    } catch (err) {
      console.error('Failed to load real-time weather:', err);
    } finally {
      this.isFetching = false;
    }
  },

  handleSearchSubmit() {
    const input = document.getElementById('weather-search-input');
    if (input && input.value.trim()) {
      this.searchAndLoadWeather(input.value.trim());
    }
  },

  loadUserGPSWeather() {
    if (!('geolocation' in navigator)) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    const sub = document.getElementById('weather-view-subtitle');
    if (sub) sub.textContent = 'Detecting current GPS coordinates...';

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        this.handleMapLocationSelect(lat, lon);
        if (this.weatherMap) {
          this.weatherMap.flyTo([lat, lon], 13);
        }
      },
      (err) => {
        alert('Could not obtain GPS location: ' + err.message);
      },
      { timeout: 10000 }
    );
  },

  renderWeatherView() {
    if (!this.analysis || !this.rawData) return;
    const a = this.analysis;
    const raw = this.rawData;
    const current = raw.current;
    const daily = raw.daily;

    const sub = document.getElementById('weather-view-subtitle');
    if (sub) sub.textContent = `Real-time satellite & agro-meteorological analysis for ${this.activeLocationName}`;

    const lastUp = document.getElementById('weather-last-updated');
    if (lastUp) {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      lastUp.textContent = `Live Synced at ${timeStr}`;
    }

    const elTemp = document.getElementById('weather-current-temp');
    const elLoc = document.getElementById('weather-current-location');
    const elCond = document.getElementById('weather-current-condition');
    const elIcon = document.getElementById('weather-current-icon');
    const elRain = document.getElementById('weather-rain-prob');
    const elWind = document.getElementById('weather-wind-speed');
    const elHum = document.getElementById('weather-humidity');
    const elPrecip = document.getElementById('weather-precipitation');

    if (elTemp) elTemp.textContent = `${Math.round(a.curTemp)}°C`;
    if (elLoc) elLoc.textContent = `${this.activeLocationName}`;
    if (elCond) elCond.textContent = `${a.weatherInfo.label} • Feels like ${Math.round(current.apparent_temperature || a.curTemp)}°C`;
    if (elIcon) {
      elIcon.textContent = a.weatherInfo.icon;
      elIcon.className = `material-symbols-outlined text-4xl fill-1 ${a.weatherInfo.iconClass}`;
    }
    if (elRain) elRain.textContent = `${a.maxRainProb24h}%`;
    if (elWind) elWind.textContent = `${Math.round(a.windSpeed)} km/h`;
    if (elHum) elHum.textContent = `${a.humidity}%`;
    if (elPrecip) elPrecip.textContent = `${a.precipSum24h.toFixed(1)} mm`;

    const elIrrBadge = document.getElementById('weather-irrigation-badge');
    const elIrrDesc = document.getElementById('weather-irrigation-desc');
    const elSoilStatus = document.getElementById('weather-soil-status');
    if (elIrrBadge) {
      elIrrBadge.textContent = a.irrigation.badgeText;
      elIrrBadge.className = `px-2 py-0.5 text-[10px] font-bold rounded-full ${a.irrigation.badgeClass}`;
    }
    if (elIrrDesc) elIrrDesc.textContent = a.irrigation.taskDesc;
    if (elSoilStatus) elSoilStatus.textContent = a.irrigation.soilNeed;

    const elSprayBadge = document.getElementById('weather-spraying-badge');
    const elSprayDesc = document.getElementById('weather-spraying-desc');
    const elSprayDrift = document.getElementById('weather-spray-drift-status');
    if (elSprayBadge) {
      elSprayBadge.textContent = a.spraying.badgeText;
      elSprayBadge.className = `px-2 py-0.5 text-[10px] font-bold rounded-full ${a.spraying.badgeClass}`;
    }
    if (elSprayDesc) elSprayDesc.textContent = a.spraying.desc;
    if (elSprayDrift) elSprayDrift.textContent = a.spraying.driftRisk;

    const elFungBadge = document.getElementById('weather-fungal-badge');
    const elFungDesc = document.getElementById('weather-fungal-desc');
    const elPathogen = document.getElementById('weather-pathogen-status');
    if (elFungBadge) {
      elFungBadge.textContent = a.fungal.badgeText;
      elFungBadge.className = `px-2 py-0.5 text-[10px] font-bold rounded-full ${a.fungal.badgeClass}`;
    }
    if (elFungDesc) elFungDesc.textContent = a.fungal.desc;
    if (elPathogen) elPathogen.textContent = a.fungal.pathogenIndex;

    const container7Day = document.getElementById('weather-7day-container');
    if (container7Day && daily && daily.time) {
      container7Day.innerHTML = '';
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      daily.time.forEach((dateStr, idx) => {
        const d = new Date(dateStr);
        const dayName = idx === 0 ? 'Today' : (idx === 1 ? 'Tomorrow' : daysOfWeek[d.getDay()]);
        const maxT = Math.round(daily.temperature_2m_max[idx]);
        const minT = Math.round(daily.temperature_2m_min[idx]);
        const rainProb = daily.precipitation_probability_max[idx] || 0;
        const wCode = daily.weather_code[idx] || 0;
        const wInfo = this.decodeWMO(wCode, 1);
        const isSelected = idx === 0;

        let tagText = 'Normal';
        let tagClass = 'text-outline';
        if (rainProb >= 50) {
          tagText = `${rainProb}% Rain`;
          tagClass = 'text-leaf font-semibold';
        } else if (daily.wind_speed_10m_max && daily.wind_speed_10m_max[idx] <= 14) {
          tagText = 'Spray Window';
          tagClass = 'text-leaf font-semibold';
        } else {
          tagText = 'Dry & Clear';
          tagClass = 'text-outline';
        }

        const card = document.createElement('div');
        card.className = `p-3 rounded-xl text-center transition-all hover:scale-105 ${isSelected ? 'bg-secondary-container/40 border border-leaf/40 shadow-sm' : 'bg-surface-container-low border border-sage/30'}`;
        card.innerHTML = `
          <p class="text-xs font-bold ${isSelected ? 'text-primary dark:text-primary-fixed' : 'text-outline'}">${dayName}</p>
          <span class="material-symbols-outlined text-2xl my-1.5 ${wInfo.iconClass}">${wInfo.icon}</span>
          <p class="text-xs font-extrabold text-charcoal dark:text-white">${maxT}° / ${minT}°</p>
          <p class="text-[10px] mt-0.5 ${tagClass}">${tagText}</p>
        `;
        container7Day.appendChild(card);
      });
    }
  },

  renderDashboardWeather() {
    if (!this.analysis) return;
    const a = this.analysis;

    const dLoc = document.getElementById('dashboard-location-text');
    if (dLoc) dLoc.textContent = this.activeLocationName;

    const dTitle = document.getElementById('dashboard-task-title');
    const dDesc = document.getElementById('dashboard-task-desc');
    const dBadge = document.getElementById('dashboard-task-badge');
    if (dTitle) dTitle.textContent = a.irrigation.taskTitle;
    if (dDesc) dDesc.textContent = a.irrigation.taskDesc;
    if (dBadge) {
      dBadge.className = `px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${a.irrigation.badgeClass}`;
    }

    const wTemp = document.getElementById('dashboard-weather-temp');
    const wCond = document.getElementById('dashboard-weather-condition');
    const wRain = document.getElementById('dashboard-weather-rain-prob');
    const wIcon = document.getElementById('dashboard-weather-icon');

    if (wTemp) wTemp.textContent = `${Math.round(a.curTemp)}°C`;
    if (wCond) wCond.textContent = `${a.weatherInfo.label} (${a.humidity}% Hum)`;
    if (wRain) wRain.textContent = `${a.maxRainProb24h}% Rain Probability (${this.activeLocationName.split(',')[0]})`;
    if (wIcon) {
      wIcon.textContent = a.weatherInfo.icon;
      wIcon.className = `material-symbols-outlined text-2xl ${a.weatherInfo.iconClass}`;
    }
  },

  renderProfileLocations() {
    const sLoc = document.getElementById('sidebar-location-text');
    const hProf = document.getElementById('header-profile-text');
    const sCrop = document.getElementById('sidebar-crop-summary');
    const dCrop = document.getElementById('dashboard-crop-summary');
    const sName = document.getElementById('sidebar-farmer-name');
    const hName = document.getElementById('header-farmer-name');
    const dName = document.getElementById('dashboard-farmer-name');
    const hAvatar = document.getElementById('header-avatar');

    if (sLoc) sLoc.textContent = this.activeLocationName;
    if (hProf) hProf.textContent = `${this.activeLocationName.split(',')[0]} • ${APP_STATE.user.crop}`;
    if (sCrop) sCrop.textContent = `🌾 ${APP_STATE.user.landSize} • ${APP_STATE.user.crop}`;
    if (dCrop) dCrop.textContent = `${APP_STATE.user.crop} • ${APP_STATE.user.landSize}`;
    if (sName) sName.textContent = APP_STATE.user.name;
    if (hName) hName.textContent = APP_STATE.user.name.split(' ')[0];
    if (dName) dName.textContent = `Hi ${APP_STATE.user.name.split(' ')[0]}`;
    if (hAvatar) hAvatar.textContent = (APP_STATE.user.name || 'R').charAt(0).toUpperCase();
  },

  speakCurrentAdvisory() {
    if (!this.analysis) {
      speakText('Loading live weather intelligence for your farm.');
      return;
    }
    const text = this.analysis.spoken[APP_STATE.language] || this.analysis.spoken.en;
    speakText(text);
  }
};

// ==========================================
// SIMULATED AI CROP SCAN FLOW
// ==========================================
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

// ==========================================
// AI MENTOR CONVERSATIONAL CHAT ENGINE
// ==========================================
const CHAT_HISTORY = [
  {
    sender: 'ai',
    text: 'Namaste Ramesh ji! 🙏 I am your Kisan AI Mentor. How can I help you today with your Onion crop, real-time weather alerts, or farm schemes?',
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

  setTimeout(() => {
    const answer = generateAIResponse(query);
    const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    CHAT_HISTORY.push({ sender: 'ai', text: answer, time: replyTime });
    renderChatMessages();
  }, 500);
}

function generateAIResponse(query) {
  const q = query.toLowerCase();
  const w = APP_STATE.weather;
  const loc = (w && w.location) || APP_STATE.user.location;
  const temp = (w && w.current && Math.round(w.current.temperature_2m)) || 26;
  const hum = (w && w.current && w.current.relative_humidity_2m) || 75;
  const rainProb = (w && w.analysis && w.analysis.maxRainProb24h) || 72;
  const wind = (w && w.current && Math.round(w.current.wind_speed_10m)) || 16;

  if (q.includes('purple blotch') || q.includes('disease') || q.includes('रोग') || q.includes('करपा')) {
    return `For Purple Blotch in ${APP_STATE.user.crop}, spray Mancozeb 75% WP @ 2.5g/L or Hexaconazole 5% EC @ 1ml/L. Due to current high humidity (${hum}%), apply early in the morning before any rain occurs.`;
  } else if (q.includes('rain') || q.includes('weather') || q.includes('irrigation') || q.includes('पाऊस') || q.includes('हवामान') || q.includes('spray')) {
    return `Live Open-Meteo analysis for ${loc}: Current temperature is ${temp}°C, humidity is ${hum}%, and wind speed is ${wind} km/h. There is a ${rainProb}% rain probability in the next 24 hours. Recommendation: ${rainProb >= 40 ? 'Postpone irrigation by 24-48 hours to prevent root waterlogging.' : 'Scheduled irrigation is safe.'}`;
  } else if (q.includes('scheme') || q.includes('subsidy') || q.includes('pm kisan') || q.includes('योजना') || q.includes('अनुदान')) {
    return "Under Maharashtra's Magel Tyala Saur Krushi Pump & PM-KUSUM, you are eligible for up to a 90% subsidy on solar irrigation pumps. Also, PM-KISAN 17th installment has been credited to Aadhaar-linked accounts.";
  } else if (q.includes('fertilizer') || q.includes('onion') || q.includes('खाद') || q.includes('खत')) {
    return `For ${APP_STATE.user.crop} in ${APP_STATE.user.soilType}, apply 19:19:19 @ 5kg/acre via drip fertigation, accompanied by micronutrient foliar spray (Zinc 12% + Boron 20%).`;
  } else {
    return `I am analyzing conditions for your ${APP_STATE.user.landSize} ${APP_STATE.user.crop} plot in ${loc}. With current temperature at ${temp}°C and ${hum}% humidity, maintaining regulated moisture and disease prophylaxis will maximize crop yield. What specific guidance do you need?`;
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

  // Initialize Firebase Auth state listener
  AUTH_SERVICE.initAuth();

  window.addEventListener('hashchange', handleRouting);

  // Setup onboarding form handler
  const onboardingForm = document.getElementById('onboarding-form');
  if (onboardingForm) {
    onboardingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const farmerName = document.getElementById('onboarding-farmer-name');
      const locationInput = document.getElementById('onboarding-location');
      const cropSelect = document.getElementById('onboarding-crop');
      const landInput = document.getElementById('onboarding-land-size');
      const soilSelect = document.getElementById('onboarding-soil');
      const irrSelect = document.getElementById('onboarding-irrigation');

      if (farmerName && farmerName.value) APP_STATE.user.name = farmerName.value;
      if (cropSelect && cropSelect.value) APP_STATE.user.crop = cropSelect.value;
      if (landInput && landInput.value) APP_STATE.user.landSize = landInput.value;
      if (soilSelect && soilSelect.value) APP_STATE.user.soilType = soilSelect.value;
      if (irrSelect && irrSelect.value) APP_STATE.user.irrigation = irrSelect.value;

      const loc = (locationInput && locationInput.value) ? locationInput.value : 'Nashik, Maharashtra';
      APP_STATE.user.location = loc;

      WEATHER_SERVICE.searchAndLoadWeather(loc);
      navigateTo('dashboard');
    });
  }

  renderChatMessages();

  // Automatically connect to real-time Open-Meteo weather analysis for default location (Nashik)
  WEATHER_SERVICE.searchAndLoadWeather('Nashik, Maharashtra');
});
