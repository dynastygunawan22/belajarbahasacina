/* ===================================================
   app.js  —  App entry point & initialization
   =================================================== */

document.addEventListener('DOMContentLoaded', function () {

  // Init voices for TTS
  initVoices();

  // Init home stats
  updateHomeStats();

  // Render daily tip
  renderDailyTip();

  // Render vocab (preload data)
  renderVocab();

  // Render flashcard
  renderFlashcard();

  // Init quiz setup
  renderQuizSetup();

  // Init game highscore display
  const hsScore = document.getElementById('hsScore');
  const hsBest  = document.getElementById('hsBest');
  if (hsScore) hsScore.textContent = S.highScore;
  if (hsBest)  hsBest.textContent  = S.highCorrect;

  // Init AI sidebar
  initAIPage();

  // Init settings
  initSettingsPage();

  // Sync all api key inputs if key exists
  if (S.apiKey) {
    ['apiKeyQuiz','apiKeyAI','apiKeySettings'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = S.apiKey;
    });
    ['quizApiNotice','aiApiNotice'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  }

  // Show first page
  showPage('home');

  // Swipe navigation on mobile
  initSwipeNav();

  console.log('汉语学堂 HanYu Academy — Loaded successfully ✅');
});

/* ---- Swipe navigation (mobile) ---- */
let _touchStartX = 0;
let _touchStartY = 0;

function initSwipeNav() {
  const pages = ['home','vocab','flashcard','quiz','game','ai'];

  document.addEventListener('touchstart', e => {
    _touchStartX = e.changedTouches[0].screenX;
    _touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].screenX - _touchStartX;
    const dy = e.changedTouches[0].screenY - _touchStartY;

    // Only horizontal swipe, not too vertical
    if (Math.abs(dx) < 60 || Math.abs(dy) > 80) return;

    // Don't swipe when interacting with cards/chat
    if (e.target.closest('.card-scene,.chat-messages,.chat-input,.game-choices,.quiz-options')) return;

    const idx = pages.indexOf(_currentPage);
    if (dx < 0 && idx < pages.length - 1) showPage(pages[idx + 1]);
    if (dx > 0 && idx > 0)                showPage(pages[idx - 1]);
  }, { passive: true });
}
