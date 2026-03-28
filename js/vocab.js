/* ===================================================
   vocab.js  —  Vocabulary page
   =================================================== */

function renderVocab() {
  // Filter buttons
  const filterBar = document.getElementById('vocabFilter');
  filterBar.innerHTML = Object.keys(VOCAB_DATA).map(cat =>
    `<button class="chip ${cat === S._fcCategory ? 'active' : ''}"
      onclick="filterVocab('${cat}')">${cat}</button>`
  ).join('');

  // Word grid
  const grid = document.getElementById('vocabGrid');
  const words = VOCAB_DATA[S._fcCategory] || [];
  grid.innerHTML = words.map((w, i) => `
    <div class="vocab-card ${S.wordsLearned.includes(w.char) ? 'learned' : ''}"
         role="listitem"
         onclick="vocabCardClick(${i})"
         tabindex="0"
         onkeypress="if(event.key==='Enter')vocabCardClick(${i})"
         aria-label="${w.char}, ${w.pinyin}, ${w.meaning}">
      <div class="vocab-char">${w.char}</div>
      <div class="vocab-pinyin">${w.pinyin}</div>
      <div class="vocab-meaning">${w.meaning}</div>
    </div>
  `).join('');
}

function filterVocab(cat) {
  S._fcCategory = cat;
  renderVocab();
}

function vocabCardClick(i) {
  const w = VOCAB_DATA[S._fcCategory][i];
  speak(w.char);
  showToast(`🔊 ${w.char}  ·  ${w.pinyin}  ·  ${w.meaning}`);
}
