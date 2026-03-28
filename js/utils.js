/* ===================================================
   utils.js  —  Helper functions
   =================================================== */

/** Show toast notification */
function showToast(msg, duration = 2200) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), duration);
}

/** Add XP and update UI */
function addXP(amount) {
  S.xp += amount;
  saveState();
  document.getElementById('xpNum').textContent  = S.xp;
  document.getElementById('statXP').textContent = S.xp;
  updateLevelBar();
}

/** Update level progress bar */
function updateLevelBar() {
  const LEVELS = ['HSK 1 · Pemula','HSK 1 · Dasar','HSK 2 · Menengah Awal','HSK 3 · Menengah','HSK 4 · Mahir'];
  const lvl = Math.min(Math.floor(S.xp / 200), LEVELS.length - 1);
  const pct = Math.min(100, (S.xp % 200) / 200 * 100);

  const fill = document.getElementById('levelBarFill');
  const name = document.getElementById('levelName');
  const pctEl= document.getElementById('levelPercent');
  const bar  = fill && fill.parentElement;

  if (fill)  fill.style.width = pct + '%';
  if (name)  name.textContent = LEVELS[lvl];
  if (pctEl) pctEl.textContent = Math.floor(pct) + '%';
  if (bar)   bar.setAttribute('aria-valuenow', Math.floor(pct));
}

/** Shuffle array (Fisher-Yates) */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Get N random items from array, excluding specific items */
function randomPick(arr, n, exclude = []) {
  const pool = arr.filter(x => !exclude.includes(x));
  return shuffle(pool).slice(0, n);
}

/** Escape HTML */
function esc(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/** Open modal */
function openModal(title, body, actions = []) {
  document.getElementById('modalTitle').innerHTML   = title;
  document.getElementById('modalBody').innerHTML    = body;
  document.getElementById('modalActions').innerHTML = actions.map(a =>
    `<button class="btn ${a.cls||'btn--ghost'}" onclick="${a.fn}">${a.label}</button>`
  ).join('');
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden','false');
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden','true');
}

/** Update home stats */
function updateHomeStats() {
  document.getElementById('statWords').textContent  = S.wordsLearned.length;
  document.getElementById('statQuiz').textContent   = S.quizDone;
  document.getElementById('statStreak').textContent = S.streak;
  document.getElementById('statXP').textContent     = S.xp;
  document.getElementById('streakNum').textContent  = S.streak;
  updateLevelBar();
}

/** Play simple beep SFX using Web Audio */
function playSFX(type) {
  if (!S.sfx) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain= ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = type === 'correct' ? 880 : 300;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
  } catch(e){}
}
