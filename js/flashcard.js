/* ===================================================
   flashcard.js  —  Flashcard page
   =================================================== */

function renderFlashcard() {
  // Category chips
  const controls = document.getElementById('fcControls');
  controls.innerHTML = Object.keys(VOCAB_DATA).map(cat =>
    `<button class="chip ${cat === S._fcCategory ? 'active' : ''}"
       onclick="setFCCategory('${cat}')">${cat}</button>`
  ).join('');

  updateCardUI();
}

function setFCCategory(cat) {
  S._fcCategory = cat;
  S._fcIndex    = 0;
  S._fcFlipped  = false;
  document.getElementById('cardInner').classList.remove('flipped');
  renderFlashcard();
}

function updateCardUI() {
  const words = VOCAB_DATA[S._fcCategory];
  if (!words || words.length === 0) return;

  const w = words[S._fcIndex];

  // Front
  document.getElementById('fcChar').textContent = w.char;

  // Tone dots (up to 4)
  const dotsEl = document.getElementById('fcToneDots');
  if (dotsEl) {
    dotsEl.innerHTML = [1,2,3,4].map(t =>
      `<div class="tone-dot ${w.tone === t ? 'active' : ''}"></div>`
    ).join('');
  }

  // Back
  document.getElementById('fcPinyin').textContent  = w.pinyin;
  document.getElementById('fcMeaning').textContent = w.meaning;

  const exEl = document.getElementById('fcExample');
  if (exEl && w.example) {
    exEl.innerHTML = `
      <span class="cn-ex">${w.example.cn}</span>
      <span style="color:rgba(255,255,255,0.38);font-size:12px;margin-top:4px;display:block">${w.example.id}</span>
    `;
  }

  // Counter
  document.getElementById('cardCounter').textContent = `${S._fcIndex + 1} / ${words.length}`;

  // Progress bar
  const bar = document.getElementById('fcProgressBar');
  if (bar) bar.style.width = ((S._fcIndex + 1) / words.length * 100) + '%';

  // Reset flip
  S._fcFlipped = false;
  document.getElementById('cardInner').classList.remove('flipped');
}

function flipCard() {
  S._fcFlipped = !S._fcFlipped;
  document.getElementById('cardInner').classList.toggle('flipped', S._fcFlipped);
  if (S._fcFlipped) {
    // Small XP reward for reviewing
    addXP(1);
    // Auto-speak if enabled
    if (S.autoSpeak) {
      const words = VOCAB_DATA[S._fcCategory];
      if (words && words[S._fcIndex]) speak(words[S._fcIndex].char);
    }
  }
}

function nextCard() {
  const words = VOCAB_DATA[S._fcCategory];
  S._fcIndex = (S._fcIndex + 1) % words.length;
  updateCardUI();
}

function prevCard() {
  const words = VOCAB_DATA[S._fcCategory];
  S._fcIndex = (S._fcIndex - 1 + words.length) % words.length;
  updateCardUI();
}

function markLearned() {
  const w = VOCAB_DATA[S._fcCategory][S._fcIndex];
  if (!S.wordsLearned.includes(w.char)) {
    S.wordsLearned.push(w.char);
    saveState();
    addXP(5);
    showToast('✅ Ditandai hafal! +5 XP 🌟');
    playSFX('correct');
    // Update stat
    const el = document.getElementById('statWords');
    if (el) el.textContent = S.wordsLearned.length;
  } else {
    showToast('ℹ️ Kata ini sudah ditandai hafal sebelumnya');
  }
  nextCard();
}

// Keyboard navigation for flashcard
document.addEventListener('keydown', function(e) {
  if (_currentPage !== 'flashcard') return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key === 'ArrowRight') nextCard();
  if (e.key === 'ArrowLeft')  prevCard();
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipCard(); }
});
