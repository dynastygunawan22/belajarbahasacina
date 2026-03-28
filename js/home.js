/* ===================================================
   home.js  —  Home page & daily tips
   =================================================== */

function initHomePage() {
  updateHomeStats();
  renderDailyTip();
}

function renderDailyTip() {
  const idx = new Date().getDate() % DAILY_TIPS.length;
  const tip = DAILY_TIPS[idx];
  const el = document.getElementById('tipText');
  const titleEl = el && el.closest('.daily-tip') && el.closest('.daily-tip').querySelector('.tip-title');
  if (el)      el.textContent = tip.tip;
  if (titleEl) titleEl.textContent = tip.label;
}
