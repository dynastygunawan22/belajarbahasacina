/* ===================================================
   nav.js  —  Page navigation
   =================================================== */

let _currentPage = 'home';

function showPage(id) {
  if (_currentPage === id) return;

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Deactivate nav tabs
  document.querySelectorAll('.nav-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected','false');
  });

  // Deactivate mobile nav
  document.querySelectorAll('.mob-btn').forEach(b => b.classList.remove('active'));

  // Activate target page
  const page = document.getElementById('page-' + id);
  if (!page) return;
  page.classList.add('active');

  // Activate nav tab
  const tab = document.querySelector(`.nav-tab[data-page="${id}"]`);
  if (tab) { tab.classList.add('active'); tab.setAttribute('aria-selected','true'); }

  // Activate mobile button
  const mob = document.querySelector(`.mob-btn[data-mob="${id}"]`);
  if (mob) mob.classList.add('active');

  _currentPage = id;

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Page-specific init
  if (id === 'home')      updateHomeStats();
  if (id === 'vocab')     renderVocab();
  if (id === 'flashcard') renderFlashcard();
  if (id === 'quiz')      initQuizPage();
  if (id === 'ai')        initAIPage();
  if (id === 'settings')  initSettingsPage();
}
