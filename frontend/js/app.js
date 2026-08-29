/* Minimal app.js stub - restores basic runtime and prevents syntax errors.
   Original file saved as app.js.bak
*/

// Basic app state
const APP_STATE = { language: 'en', darkMode: false, currentUser: null, user: { name: 'Farmer', location: 'Nashik, Maharashtra', crop: 'Onion', landSize: '1 Acre', soilType: 'Loam', irrigation: 'Drip' }, currentRoute: 'welcome' };

const TRANSLATIONS = { en: { appName: 'KisanSathi' } };

function initTheme(){ if (APP_STATE.darkMode) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark'); }
function updateThemeIcons(){ /* no-op stub */ }
function updateLanguageUI(){ /* no-op stub */ }
function renderChatMessages(){ /* no-op stub */ }
function closeDrawer(){ /* no-op stub */ }
function navigateTo(route){ if(route) location.hash = route; }

function handleRouting(){ const rawHash = (location.hash || '#welcome').replace('#',''); const view = document.getElementById(`view-${rawHash}`) || document.getElementById('view-welcome'); document.querySelectorAll('.app-view').forEach(v=>v.classList.add('hidden')); if(view) view.classList.remove('hidden'); APP_STATE.currentRoute = rawHash; }

// Minimal AUTH_SERVICE
window.AUTH_SERVICE = { initAuth(){ /* no-op stub to satisfy callers */ } };

// Minimal WEATHER_SERVICE
window.WEATHER_SERVICE = { activeLocationName: APP_STATE.user.location || 'Nashik, Maharashtra', searchAndLoadWeather(loc){ this.activeLocationName = loc || this.activeLocationName; console.log('Weather load for', this.activeLocationName); }, initWeatherMap(){}, refreshMapSize(){} };

// Minimal MANDI_SERVICE providing show-more/show-less behaviour
window.MANDI_SERVICE = {
  currentCrop: 'Onion', currentState: 'all', currentRecords: [], initialized: false, cardsExpanded:false, tableExpanded:false, initialCardsCount:3, expandedCardsCount:6, initialTableRowsCount:6,

  init(){ if(this.initialized) return; this.initialized = true; const defaultCrop = (APP_STATE.user && APP_STATE.user.crop) ? APP_STATE.user.crop : 'Onion'; this.search(defaultCrop); },

  async search(cropQuery){ if(!cropQuery) return; this.currentCrop = cropQuery; this.cardsExpanded=false; this.tableExpanded=false; await this.fetchMandiData(this.currentCrop, this.currentState); },

  async fetchMandiData(cropName, stateFilter){ // minimal: do not call external API, just reset
    this.currentRecords = []; // empty dataset by default
    // Try to pick up sample rows from DOM data-attributes if any, else create placeholders
    const sample = [{ state:'Maharashtra', district:'Nashik', market:'Peth Market', variety:'Common', arrival_date:'Today', min_price:'--', max_price:'--', modal_price:'--' }];
    this.currentRecords = sample;
    // Render
    this.renderMandiResults(cropName, this.currentRecords);
  },

  renderMandiResults(cropName, records){ const sectionCropTitle = document.getElementById('mandi-section-crop-title'); if(sectionCropTitle) sectionCropTitle.textContent = `${cropName} (${records.length} mandis reporting)`; this.renderCardsGrid(); this.renderTable(); },

  renderCardsGrid(){ const container = document.getElementById('mandi-cards-grid'); const toggleBtn = document.getElementById('mandi-cards-toggle-btn'); const toggleText = document.getElementById('mandi-cards-toggle-text'); const records = Array.isArray(this.currentRecords)?this.currentRecords:[]; const show = this.cardsExpanded?Math.min(this.expandedCardsCount, records.length):Math.min(this.initialCardsCount, records.length); if(container){ container.innerHTML = records.slice(0,show).map(r=>`<div class="p-3 border rounded">${r.market} <div class="text-sm">₹${r.modal_price || '--'}</div></div>`).join('') } if(toggleBtn){ if(records.length>this.initialCardsCount){ toggleBtn.classList.remove('hidden'); toggleText.textContent = this.cardsExpanded?`Show Less (Top ${this.initialCardsCount} Mandis)`:`Show More Mandis (${Math.max(0,records.length-this.initialCardsCount)} more)`; } else toggleBtn.classList.add('hidden'); } },

  renderTable(){ const tbody = document.getElementById('mandi-table-body'); const countInfo = document.getElementById('mandi-table-count-info'); const toggleBtn = document.getElementById('mandi-table-toggle-btn'); const toggleText = document.getElementById('mandi-table-toggle-text'); const records = Array.isArray(this.currentRecords)?this.currentRecords:[]; const total = records.length; const show = this.tableExpanded?total:Math.min(this.initialTableRowsCount,total); if(tbody){ tbody.innerHTML = records.slice(0,show).map(r=>`<tr><td class="px-4 py-3">${r.state} • ${r.district}</td><td class="px-4 py-3">${r.market}</td><td class="px-3 py-3">${r.variety}</td><td class="px-3 py-3">${r.arrival_date}</td><td class="text-right px-3 py-3">${r.min_price}</td><td class="text-right px-3 py-3">${r.max_price}</td><td class="text-right px-4 py-3">${r.modal_price}</td></tr>`).join(''); }
    if(countInfo) countInfo.textContent = `Showing ${show} of ${total} Mandi records`;
    if(toggleBtn){ if(total>this.initialTableRowsCount){ toggleBtn.classList.remove('hidden'); toggleText.textContent = this.tableExpanded?`Show Less (Top ${this.initialTableRowsCount} Rows)`:`Show All ${total} Records (${Math.max(0,total-this.initialTableRowsCount)} more)`; } else toggleBtn.classList.add('hidden'); }
  },

  toggleCards(){ this.cardsExpanded = !this.cardsExpanded; this.renderCardsGrid(); },
  toggleTable(){ this.tableExpanded = !this.tableExpanded; this.renderTable(); }
};

// DOM ready wiring (keeps behavior similar to original entry points)
window.addEventListener('DOMContentLoaded', ()=>{
  initTheme(); updateLanguageUI(); updateThemeIcons(); handleRouting(); AUTH_SERVICE.initAuth(); window.addEventListener('hashchange', handleRouting);
  const savedLoc = localStorage.getItem('kisansathi_location'); const initialLoc = savedLoc || APP_STATE.user.location || 'Nashik, Maharashtra'; APP_STATE.user.location = initialLoc; WEATHER_SERVICE.activeLocationName = initialLoc; WEATHER_SERVICE.searchAndLoadWeather(initialLoc);
  if(window.MANDI_SERVICE) MANDI_SERVICE.init();
});
